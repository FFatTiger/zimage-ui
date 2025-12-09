import { useState, useRef, useCallback, useEffect } from 'react';

/**
 * Custom hook for image generation with WebSocket progress tracking
 * @returns {Object} - generation state and control functions
 */
export function useImageGeneration() {
    const [isGenerating, setIsGenerating] = useState(false);
    const [progress, setProgress] = useState(0);
    const [statusText, setStatusText] = useState('Initializing...');
    const [currentImage, setCurrentImage] = useState(null);
    const [lastTimeTaken, setLastTimeTaken] = useState(null);

    const [elapsedTime, setElapsedTime] = useState(0);
    const timerRef = useRef(null);
    const startTimeRef = useRef(0);

    const wsRef = useRef(null);
    const clientIdRef = useRef(`client_${Date.now()}_${Math.random().toString(36).substring(7)}`);

    // Timer functions
    const startTimer = useCallback(() => {
        if (timerRef.current) clearInterval(timerRef.current);
        startTimeRef.current = Date.now();
        setElapsedTime(0);
        timerRef.current = setInterval(() => {
            setElapsedTime(((Date.now() - startTimeRef.current) / 1000).toFixed(1));
        }, 100);
    }, []);

    const stopTimer = useCallback(() => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    }, []);

    // Cleanup timer on unmount
    useEffect(() => {
        return () => stopTimer();
    }, [stopTimer]);

    // WebSocket connection
    const connectWebSocket = useCallback(() => {
        if (wsRef.current) {
            wsRef.current.close();
        }

        const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        const wsUrl = `${wsProtocol}//${window.location.host}/ws/${clientIdRef.current}`;

        const ws = new WebSocket(wsUrl);

        ws.onmessage = (event) => {
            try {
                // Ignore binary messages (previews)
                if (event.data instanceof Blob) {
                    return;
                }

                const message = JSON.parse(event.data);

                if (message.type === 'progress') {
                    const progressPercent = Math.round((message.data.value / message.data.max) * 100);
                    setProgress(progressPercent);
                    setStatusText(`Processing... ${message.data.value}/${message.data.max}`);
                } else if (message.type === 'executing') {
                    if (message.data.node) {
                        setStatusText(`Executing node: ${message.data.node}`);
                    } else {
                        setStatusText('Finalizing...');
                    }
                } else if (message.type === 'executed') {
                    setStatusText('Complete!');
                    setProgress(100);
                    // Signal completion
                    if (ws.onExecutionComplete) {
                        ws.onExecutionComplete();
                    }
                }
            } catch (error) {
                console.error('WebSocket message error:', error);
            }
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        ws.onclose = () => {
            console.log('WebSocket closed');
        };

        wsRef.current = ws;
    }, []);

    // Generate function
    const generate = async (params, t) => {
        if (!params.prompt.trim()) {
            if (t) {
                alert(t('messages.enterPrompt'));
            }
            return null;
        }

        setIsGenerating(true);
        setProgress(0);
        setStatusText(t ? t('messages.starting') : 'Starting...');
        // Note: We don't clear currentImage immediately so user can see previous image while generating?
        // Actually usually we might want to keep it or visually indicate loading.
        // Let's keep currentImage for now but the UI will show loading overlay.

        startTimer(); // Start the timer

        try {
            // Connect WebSocket
            connectWebSocket();

            // Send generation request
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...params,
                    client_id: clientIdRef.current
                })
            });

            if (!response.ok) {
                throw new Error('Generation failed');
            }

            const result = await response.json();
            const promptId = result.prompt_id;

            // Poll for completion
            let attempts = 0;
            const maxAttempts = 300; // 5 minutes timeout
            let executionSignalResolver = null;
            let isSignalResolved = false; // Flag to track if signal has triggered
            const executionSignal = new Promise(resolve => {
                executionSignalResolver = resolve;
            });

            // Attach signal handler to WebSocket
            if (wsRef.current) {
                wsRef.current.onExecutionComplete = () => {
                    if (executionSignalResolver) executionSignalResolver(true);
                };
            }

            // Loop that checks either timer or execution signal
            while (attempts < maxAttempts) {
                let shouldCheckHistory = false;

                // Check if we should check immediately due to signal
                if (!isSignalResolved) {
                    // Check if WS is CONNECTING (0) or OPEN (1)
                    // We trust WS if it's not closing/closed
                    const isWsActive = wsRef.current && wsRef.current.readyState < 2;

                    if (isWsActive) {
                        const signalReceived = await Promise.race([
                            new Promise(resolve => setTimeout(() => resolve(false), 1000)),
                            executionSignal
                        ]);
                        if (signalReceived) {
                            isSignalResolved = true;
                            shouldCheckHistory = true;
                        }
                        // If no signal and WS is open, we do nothing (shouldCheckHistory remains false)
                        // This prevents polling while generating
                    } else {
                        // Fallback: If WS is not open, we must poll
                        await new Promise(resolve => setTimeout(resolve, 1000));
                        shouldCheckHistory = true;
                    }
                } else {
                    // Signal already received but result not found yet (race condition).
                    // Wait 1s to avoid busy-looping and exhausting attempts instantly.
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    shouldCheckHistory = true;
                }

                if (!shouldCheckHistory) {
                    attempts++;
                    continue;
                }

                let historyData;
                try {
                    const historyResponse = await fetch(`/api/history/${promptId}`);
                    if (!historyResponse.ok) {
                        attempts++;
                        continue;
                    }
                    historyData = await historyResponse.json();
                } catch (fetchError) {
                    console.warn('Fetch history failed, retrying:', fetchError);
                    attempts++;
                    continue;
                }

                const promptData = historyData[promptId];

                if (promptData && promptData.outputs) {
                    // Find the image output
                    for (const nodeId in promptData.outputs) {
                        const output = promptData.outputs[nodeId];
                        if (output.images && output.images.length > 0) {
                            const image = output.images[0];
                            const imageUrl = `/api/view?filename=${encodeURIComponent(image.filename)}&subfolder=${encodeURIComponent(image.subfolder || '')}&type=${encodeURIComponent(image.type || 'output')}`;

                            setCurrentImage(imageUrl);
                            setIsGenerating(false);
                            setProgress(100);
                            setStatusText(t ? t('messages.complete') : 'Complete!');

                            stopTimer(); // Stop timer
                            // Ensure the final time is captured accurately from start
                            const finalTime = ((Date.now() - startTimeRef.current) / 1000).toFixed(1);
                            setElapsedTime(finalTime);
                            setLastTimeTaken(parseFloat(finalTime));

                            // Close WebSocket
                            if (wsRef.current) {
                                wsRef.current.close();
                            }

                            return {
                                id: promptId,
                                imageUrl,
                                timeTaken: parseFloat(finalTime),
                                timestamp: new Date().toLocaleString()
                            };
                        }
                    }
                }

                attempts++;
            }

            throw new Error('Generation timeout');

        } catch (error) {
            console.error('Generation error:', error);
            setIsGenerating(false);
            stopTimer(); // Stop timer on error
            setStatusText(t ? t('messages.error') : 'Error');
            if (t) {
                alert(t('messages.generationFailed') + ': ' + error.message);
            }

            if (wsRef.current) {
                wsRef.current.close();
            }

            return null;
        }
    };

    return {
        isGenerating,
        progress,
        statusText,
        currentImage,
        lastTimeTaken,
        elapsedTime, // Export elapsed time
        setCurrentImage,
        generate
    };
}

import React, { useState } from 'react';
import { ChevronUp, Send, Maximize2, Minimize2, Dice5, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const RESOLUTION_PRESETS = [
    { key: '720p', name: '720p', width: 1280, height: 720 },
    { key: '1080p_landscape', name: '1080p', width: 1920, height: 1080 },
    { key: '2k', name: '2K', width: 2560, height: 1440 },
    { key: '4k', name: '4K', width: 3840, height: 2160 },
    { key: 'square512', name: 'Square 512', width: 512, height: 512 },
    { key: 'square1024', name: 'Square 1024', width: 1024, height: 1024 },
];

export default function QuickInput({
    isMobile,
    showQuickInput,
    showSidebar,
    params,
    setParams,
    quickGenerate,
    isGenerating,
    showControls,
    setShowControls,
    randomizeSeed
}) {
    const { t } = useTranslation();
    const [isExpanded, setIsExpanded] = useState(false);
    const [isEnhancing, setIsEnhancing] = useState(false);

    const handleEnhance = async () => {
        if (!params.prompt || isEnhancing) return;

        try {
            setIsEnhancing(true);
            const response = await fetch('/api/enhance_prompt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: params.prompt }),
            });

            if (!response.ok) throw new Error('Failed to enhance prompt');

            const data = await response.json();
            if (data.enhanced_prompt) {
                setParams(prev => ({ ...prev, prompt: data.enhanced_prompt }));
            }
        } catch (error) {
            console.error('Error enhancing prompt:', error);
            // Optionally add toast notification here
        } finally {
            setIsEnhancing(false);
        }
    };


    if (!isMobile) return null;
    if (showSidebar) return null;

    return (
        <div
            className={`fixed z-50 transition-all duration-300 ${isExpanded
                ? 'inset-0 bg-background flex flex-col'
                : `left-4 right-4 flex flex-col gap-0 ${showQuickInput ? 'translate-y-0' : 'translate-y-full'}`
                }`}
            style={!isExpanded ? {
                bottom: 'max(1rem, env(safe-area-inset-bottom, 0px))'
            } : undefined}
        >

            {/* Handle/Arrow for Settings (Compact Mode Only) */}
            {!isExpanded && (
                <div
                    className="w-full flex justify-center pb-2 cursor-pointer touch-none"
                    onClick={() => setShowControls(!showControls)}
                >
                    <div className="w-12 h-4 flex items-center justify-center">
                        <ChevronUp
                            size={20}
                            className={`text-muted-foreground/80 transition-transform duration-300 scale-y-75 ${showControls ? 'rotate-180' : ''}`}
                        />
                    </div>
                </div>
            )}

            <div className={`flex-1 bg-card ${isExpanded ? 'h-full rounded-none border-0' : 'border border-border rounded-[20px] shadow-2xl'} overflow-hidden flex flex-col`}>

                {/* Header for expanded mode */}
                {isExpanded && (
                    <div className="p-4 border-b border-border flex justify-between items-center bg-card">
                        <h3 className="font-bold text-lg text-foreground">{t('quickInput.quickInput')}</h3>
                        <button onClick={() => setIsExpanded(false)} className="text-muted-foreground hover:text-foreground">
                            <Minimize2 size={24} />
                        </button>
                    </div>
                )}

                {/* Compact mode: Single row with all controls */}
                {!isExpanded && (
                    <div className="flex items-center gap-2 px-3 py-2.5 bg-card">
                        {/* Settings toggle button */}
                        {/* AI Enhance button */}
                        <button
                            onClick={handleEnhance}
                            disabled={!params.prompt || isEnhancing}
                            className={`flex items-center justify-center w-9 h-9 rounded-lg transition-all flex-shrink-0 ${isEnhancing
                                ? 'bg-purple-100/30 text-purple-600 animate-pulse'
                                : 'hover:bg-purple-50/20 text-purple-500'
                                }`}
                            title={t('controls.aiEnhance')}
                        >
                            <Sparkles
                                size={18}
                                className={isEnhancing ? 'animate-spin' : ''}
                            />
                        </button>

                        {/* Input field */}
                        <input
                            value={params.prompt}
                            onChange={(e) => setParams(prev => ({ ...prev, prompt: e.target.value }))}
                            onKeyUp={(e) => e.key === 'Enter' && quickGenerate()}
                            type="text"
                            className="flex-1 bg-transparent placeholder:text-muted-foreground text-base outline-none text-foreground min-w-0"
                            placeholder={t('quickInput.enterPrompt')}
                        />

                        {/* Fullscreen button */}
                        <button
                            onClick={() => setIsExpanded(true)}
                            className="flex items-center justify-center w-9 h-9 rounded-lg hover:bg-muted transition-colors text-muted-foreground flex-shrink-0"
                        >
                            <Maximize2 size={18} />
                        </button>

                        {/* Send button */}
                        <button
                            onClick={quickGenerate}
                            disabled={!params.prompt || isGenerating}
                            className="w-10 h-10 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-medium disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center shadow-lg shadow-primary/30 transition-all active:scale-95 flex-shrink-0"
                        >
                            <Send size={18} />
                        </button>
                    </div>
                )}

                {/* Expanded mode input area */}
                {isExpanded && (
                    <div className="flex items-start gap-3 px-4 py-4 bg-card flex-1">
                        <textarea
                            value={params.prompt}
                            onChange={(e) => setParams(prev => ({ ...prev, prompt: e.target.value }))}
                            className="flex-1 bg-transparent placeholder:text-muted-foreground text-base outline-none text-foreground py-2 h-full resize-none"
                            placeholder={t('quickInput.enterPrompt')}
                        />
                    </div>
                )}

                {/* Expanded controls */}
                {showControls && !isExpanded && (
                    <div className="border-t border-border p-4 space-y-4 max-h-[50vh] overflow-y-auto bg-card">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                                {t('controls.negativePrompt')}
                            </label>
                            <textarea
                                value={params.negative_prompt}
                                onChange={(e) => setParams(prev => ({ ...prev, negative_prompt: e.target.value }))}
                                rows="2"
                                className="w-full bg-muted/50 border border-input rounded-xl p-3 text-sm text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none placeholder:text-muted-foreground"
                                placeholder={t('controls.negativePromptPlaceholder')}
                            ></textarea>
                        </div>

                        {/* Resolution Presets */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{t('controls.resolution')}</label>
                            <div className="grid grid-cols-3 gap-2">
                                {RESOLUTION_PRESETS.map((preset) => (
                                    <button
                                        key={preset.key}
                                        onClick={() => setParams(prev => ({ ...prev, width: preset.width, height: preset.height }))}
                                        className={`px-2 py-2 rounded-lg text-xs font-medium transition-all ${params.width === preset.width && params.height === preset.height
                                            ? 'bg-primary text-primary-foreground shadow-md'
                                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                                            }`}
                                    >
                                        <div className="font-bold">{t(`controls.resolutionPresets.${preset.key}`)}</div>
                                        <div className="text-[10px] opacity-75">{preset.width}x{preset.height}</div>
                                    </button>
                                ))}
                            </div>
                            {/* Show custom resolution if not matching presets */}
                            {!RESOLUTION_PRESETS.find(p => p.width === params.width && p.height === params.height) && (
                                <div className="text-xs text-muted-foreground mt-1">
                                    {t('controls.custom')}: {params.width}x{params.height}
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs text-muted-foreground">{t('controls.steps')}</label>
                                <input type="number" value={params.steps} onChange={(e) => setParams(prev => ({ ...prev, steps: parseInt(e.target.value) }))} className="w-full bg-muted/50 border border-input rounded-lg px-3 py-2 text-sm text-foreground focus:ring-1 focus:ring-primary outline-none" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs text-muted-foreground">{t('controls.cfgScale')}</label>
                                <input type="number" value={params.cfg} onChange={(e) => setParams(prev => ({ ...prev, cfg: parseFloat(e.target.value) }))} step="0.1" className="w-full bg-muted/50 border border-input rounded-lg px-3 py-2 text-sm text-foreground focus:ring-1 focus:ring-primary outline-none" />
                            </div>
                            <div className="space-y-1 col-span-2">
                                <label className="text-xs text-muted-foreground flex justify-between">
                                    <span>{t('controls.seed')}</span>
                                    <button onClick={randomizeSeed} className="text-primary hover:text-primary/80 transition-opacity flex items-center gap-1 font-medium">
                                        <Dice5 size={14} /> {t('controls.randomize')}
                                    </button>
                                </label>
                                <input type="number" value={params.seed} onChange={(e) => setParams(prev => ({ ...prev, seed: parseInt(e.target.value) }))} className="w-full bg-muted/50 border border-input rounded-lg px-3 py-2 text-sm text-foreground focus:ring-1 focus:ring-primary outline-none" />
                            </div>
                        </div>
                    </div>
                )}

                {/* Footer for expanded mode */}
                {isExpanded && (
                    <div className="p-4 border-t border-border flex justify-end bg-card">
                        <button
                            onClick={() => {
                                quickGenerate();
                                setIsExpanded(false);
                            }}
                            disabled={!params.prompt || isGenerating}
                            className="px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-md"
                        >
                            <span>{t('quickInput.generate')}</span>
                            <Send size={18} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

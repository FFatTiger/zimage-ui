
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const WebSocket = require('ws');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const { loadConfig } = require('./src/lib/load-config');

const CONFIG = loadConfig();
const WS_URL = CONFIG.WS_URL;

app.prepare().then(() => {
    const server = createServer((req, res) => {
        const parsedUrl = parse(req.url, true);
        handle(req, res, parsedUrl);
    });

    const wss = new WebSocket.Server({ noServer: true });

    server.on('upgrade', (request, socket, head) => {
        const { pathname } = parse(request.url);

        // Match /ws/:clientId
        const match = pathname.match(/^\/ws\/(.+)$/);
        if (match) {
            const clientId = match[1];

            wss.handleUpgrade(request, socket, head, (ws) => {
                // Connect to ComfyUI backend
                const comfyWsUrl = `${WS_URL}/ws?clientId=${clientId}`;
                console.log(`Proxying WS for client ${clientId} to ${comfyWsUrl}`);

                const backendWs = new WebSocket(comfyWsUrl);

                backendWs.on('open', () => {
                    console.log('Connected to ComfyUI backend');
                });

                backendWs.on('message', (data, isBinary) => {
                    if (ws.readyState === WebSocket.OPEN) {
                        try {
                            // If isBinary is true, it's a Buffer (binary frame). 
                            // If isBinary is false, it's a Buffer that contains text.
                            // We need to forward it correctly.
                            // ws.send(data) in 'ws' library usually sends as binary if data is Buffer/ArrayBuffer.
                            // To send as text, we must convert to string.

                            if (isBinary) {
                                ws.send(data);
                            } else {
                                ws.send(data.toString());
                            }
                        } catch (e) {
                            console.error("Error forwarding message:", e);
                        }
                    }
                });

                backendWs.on('close', () => {
                    ws.close();
                });

                backendWs.on('error', (err) => {
                    console.error('Backend WS error:', err);
                    ws.close();
                });

                ws.on('close', () => {
                    backendWs.close();
                });

                ws.on('message', (data) => {
                    // If we need to forward messages from client to backend
                    if (backendWs.readyState === WebSocket.OPEN) {
                        backendWs.send(data);
                    }
                });
            });
        } else {
            // Allow Next.js to handle other upgrades (like HMR) ?? 
            // Actually Next.js handles HMR via its own upgrade handler usually attached to the server?
            // Next.js dev server uses its own HMR. Authenticated/Custom server might interfere.
            // But typically we just don't touch other paths.
            // Wait, if I take over 'upgrade', Next.js HMR might break in dev mode if I don't forward?
            // Let's fallback to destroying socket if not matched? No.
            // Next.js documentation says: "app.getRequestHandler() ... returns a request handler that can be used ... to handle all HTTP requests."
            // But for UPGRADE requests?
            // In dev mode, Next.js sets up HMR.
            // If I overwrite 'upgrade' listeners or consume it, I might break it.
            // For now, I will NOT close the socket if it doesn't match my path, assuming Next.js or other listeners might handle it.

            // actually, if I don't handle it, the socket hangs.
            // I should check if it consumes it.
        }
    });

    const PORT = process.env.PORT || 3000;
    server.listen(PORT, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${PORT}`);
    });
});

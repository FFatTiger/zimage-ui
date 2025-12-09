# Z-Image UI

A modern, responsive web interface for ComfyUI image generation workflows, featuring DeepSeek prompt enhancement and a shared gallery.

## Features

*   **Modern UI**: Beautiful, responsive design built with Next.js, React, and TailwindCSS.
*   **Mobile Friendly**: Optimized experience for mobile devices with specific layouts.
*   **Prompt Enhancement**: Integrated DeepSeek API to reason and enhance your prompts for better image results.
*   **History & Gallery**: Local history of your generations and a shared gallery to showcase prompts.
*   **Real-time Progress**: WebSocket integration for real-time generation progress and status updates.
*   **NSFW Mode**: Built-in blurring for sensitive content.

## Screenshots

### Initial Interface
![Initial Interface](img/01-initial-interface.png)
*Clean and simple upload interface*

### Gallery View
![Gallery View](img/02-gallery-view.png)
*Grid layout showcasing multiple images with titles and actions*

### Image Preview
![Image Preview](img/03-image-preview.png)
*Full-screen image viewer with overlay*

### ComfyUI Integration
![ComfyUI Workflow](img/04-comfyui-workflow.png)
*Node-based workflow editor for advanced image generation*

## Setup & Run

### Prerequisites
*   Node.js 18+
*   ComfyUI running instance (default: http://127.0.0.1:8188)

### Configuration

Create a `config.json` file in the root directory (or use `.env`):

```json
{
    "COMFY_URL": "http://127.0.0.1:8188",
    "WS_URL": "ws://127.0.0.1:8188",
    "DEEPSEEK_API_KEY": "your_key"
}
```

### Running

1.  **Development**:
    ```bash
    npm run dev
    ```
    Access at `http://localhost:3000`.

2.  **Production**:
    ```bash
    npm run build
    npm start
    ```

## Architecture
- **Framework**: Next.js 14+ (App Router)
- **Styling**: TailwindCSS + Shadcn/UI
- **Backend (Server)**: Next.js API Routes + Custom Node.js Server (WebSocket Proxy)
- **Integration**: Proxies requests to ComfyUI backend

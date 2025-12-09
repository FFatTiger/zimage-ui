
const fs = require('fs');
const path = require('path');

const DEFAULT_CONFIG = {
    COMFY_URL: "http://127.0.0.1:8188",
    WS_URL: "ws://127.0.0.1:8188",
    DEEPSEEK_API_URL: "https://api.deepseek.com/chat/completions",
    DEEPSEEK_API_KEY: "",
    MODELS: {
        unet: "z_image_turbo_bf16.safetensors",
        vae: "ae.safetensors",
        clip: "qwen_3_4b.safetensors",
        clip_type: "lumina2"
    },
    DEFAULT_PARAMS: {
        steps: 9,
        cfg: 1.0,
        sampler_name: "euler",
        scheduler: "simple",
        width: 1024,
        height: 1024,
        denoise: 1.0,
        shift: 3
    }
};

function loadConfig() {
    let config = { ...DEFAULT_CONFIG };

    // Load from config.json if exists
    try {
        const configPath = path.join(process.cwd(), 'config.json');
        if (fs.existsSync(configPath)) {
            const fileConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
            // Deep merge (simplified)
            config = {
                ...config,
                ...fileConfig,
                MODELS: { ...config.MODELS, ...(fileConfig.MODELS || {}) },
                DEFAULT_PARAMS: { ...config.DEFAULT_PARAMS, ...(fileConfig.DEFAULT_PARAMS || {}) }
            };
        }
    } catch (e) {
        console.error("Error loading config.json:", e);
    }

    // Environment variables override
    if (process.env.COMFY_URL) config.COMFY_URL = process.env.COMFY_URL;
    if (process.env.WS_URL) config.WS_URL = process.env.WS_URL;
    if (process.env.DEEPSEEK_API_URL) config.DEEPSEEK_API_URL = process.env.DEEPSEEK_API_URL;
    if (process.env.DEEPSEEK_API_KEY) config.DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;

    return config;
}

module.exports = {
    loadConfig,
    DEFAULT_CONFIG
};

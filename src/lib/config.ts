
// @ts-ignore
import { loadConfig as loadConfigJs } from './load-config';

interface Config {
    COMFY_URL: string;
    WS_URL: string;
    DEEPSEEK_API_URL: string;
    DEEPSEEK_API_KEY: string;
    MODELS: {
        unet: string;
        vae: string;
        clip: string;
        clip_type: string;
    };
    DEFAULT_PARAMS: {
        steps: number;
        cfg: number;
        sampler_name: string;
        scheduler: string;
        width: number;
        height: number;
        denoise: number;
        shift: number;
    };
}

export function loadConfig(): Config {
    return loadConfigJs() as Config;
}

export const CONFIG = loadConfig();

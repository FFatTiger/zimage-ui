
import fs from 'fs';
import path from 'path';
import { CONFIG } from './config';

interface WorkflowNode {
    class_type: string;
    inputs: Record<string, any>;
    [key: string]: any;
}

export type Workflow = Record<string, WorkflowNode>;

export interface GenerateParams {
    prompt: string;
    negative_prompt?: string;
    seed?: number;
    steps?: number;
    cfg?: number;
    sampler_name?: string;
    scheduler?: string;
    width?: number;
    height?: number;
    denoise?: number;
    client_id: string;
    // Img2Img specific
    input_image_name?: string;
    control_strength?: number;
    google_translate?: boolean;
}

export function loadWorkflowTemplate(filename: string): Workflow | null {
    try {
        const filePath = path.join(process.cwd(), 'src/config/workflows', filename);
        if (fs.existsSync(filePath)) {
            return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        }
    } catch (e) {
        console.error(`Error loading workflow template ${filename}:`, e);
    }
    return null;
}

function applyModelConfig(workflow: Workflow): Workflow {
    const models = CONFIG.MODELS;
    const defaultParams = CONFIG.DEFAULT_PARAMS;

    for (const node of Object.values(workflow)) {
        const classType = node.class_type;

        if (classType === "UNETLoader" && models.unet) {
            node.inputs.unet_name = models.unet;
        } else if (classType === "VAELoader" && models.vae) {
            node.inputs.vae_name = models.vae;
        } else if (classType === "CLIPLoader") {
            if (models.clip) node.inputs.clip_name = models.clip;
            if (models.clip_type) node.inputs.type = models.clip_type;
        } else if (classType === "ModelSamplingAuraFlow") {
            if (defaultParams.shift) node.inputs.shift = defaultParams.shift;
        }
    }
    return workflow;
}

export function prepareGenerateWorkflow(params: GenerateParams, templateName: string = "workflow_api.json"): Workflow | null {
    const template = loadWorkflowTemplate(templateName);
    if (!template) return null;

    // Deep copy
    const workflow: Workflow = JSON.parse(JSON.stringify(template));
    applyModelConfig(workflow);

    // Update nodes based on params
    for (const node of Object.values(workflow)) {
        const classType = node.class_type;
        const inputs = node.inputs;

        if (classType === "KSampler") {
            if (params.seed !== undefined) inputs.seed = params.seed;
            if (params.steps !== undefined) inputs.steps = params.steps;
            if (params.cfg !== undefined) inputs.cfg = params.cfg;
            if (params.sampler_name) inputs.sampler_name = params.sampler_name;
            if (params.scheduler) inputs.scheduler = params.scheduler;
            if (params.denoise !== undefined) inputs.denoise = params.denoise;

            // Prompt handling for KSampler which connects to CLIPTextEncode
            // This assumes standard connections: inputs.positive = [id, 0]
            if (inputs.positive && Array.isArray(inputs.positive)) {
                const posId = inputs.positive[0];
                if (workflow[posId]) workflow[posId].inputs.text = params.prompt;
            }
            if (inputs.negative && Array.isArray(inputs.negative)) {
                const negId = inputs.negative[0];
                // Logic from main.py: check if negative node exists. 
                // Note: main.py had special check if node 126 was ZeroOut.
                // We'll trust the main.py logic: "Update Negative Prompt ... if neg_id in workflow"
                if (workflow[negId]) workflow[negId].inputs.text = params.negative_prompt || "";
            }

        } else if (classType === "EmptySD3LatentImage") {
            if (params.width) inputs.width = params.width;
            if (params.height) inputs.height = params.height;
        }
    }

    return workflow;
}

export function prepareImg2ImgWorkflow(params: GenerateParams): Workflow | null {
    const template = loadWorkflowTemplate("workflow_img2img_api.json");
    if (!template) return null;

    const workflow: Workflow = JSON.parse(JSON.stringify(template));
    applyModelConfig(workflow);

    // Specific node updates based on main.py logic
    // 1. Update Load Image (Node 145)
    if (workflow["145"] && params.input_image_name) {
        workflow["145"].inputs.image = params.input_image_name;
    }
    // 2. Control Strength (Node 156)
    if (workflow["156"] && params.control_strength !== undefined) {
        workflow["156"].inputs.strength = params.control_strength;
    }
    // 3. Prompt (Node 149)
    if (workflow["149"]) {
        workflow["149"].inputs.text = params.prompt;
    }
    // 4. KSampler (Node 125)
    if (workflow["125"]) {
        const inputs = workflow["125"].inputs;
        if (params.seed !== undefined) inputs.seed = params.seed;
        if (params.steps !== undefined) inputs.steps = params.steps;
        if (params.cfg !== undefined) inputs.cfg = params.cfg;
    }

    return workflow;
}

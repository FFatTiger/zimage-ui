import json
import uuid
import asyncio
import aiohttp
import requests
import os
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

from fastapi import FastAPI, WebSocket, Request, HTTPException
from fastapi.responses import FileResponse, JSONResponse, StreamingResponse
from fastapi.staticfiles import StaticFiles
from fastapi import UploadFile, File, Form
from pydantic import BaseModel
from typing import Optional, List, Dict, Any

app = FastAPI()

# Configuration loading logic
def load_config():
    config = {
        "COMFY_URL": "http://127.0.0.1:8188",
        "WS_URL": "ws://127.0.0.1:8188",
        "DEEPSEEK_API_URL": "https://api.deepseek.com/chat/completions",
        "DEEPSEEK_API_KEY": ""
    }
    
    # Load from config.json if exists
    config_file = "config.json"
    if os.path.exists(config_file):
        try:
            with open(config_file, "r", encoding="utf-8") as f:
                file_config = json.load(f)
                config.update(file_config)
        except Exception as e:
            print(f"Error loading config.json: {e}")

    # Environment variables override config
    for key in config:
        env_val = os.getenv(key)
        if env_val:
            config[key] = env_val
            
    return config

CONFIG = load_config()

COMFY_URL = CONFIG["COMFY_URL"]
WS_URL = CONFIG["WS_URL"]
DEEPSEEK_API_URL = CONFIG["DEEPSEEK_API_URL"]
# System prompt for DeepSeek - to be configured by user
SYSTEM_PROMPT = """
### **核心目标**
生成一个**单一、静态、充满故事感**的镜头画面描述，可直接用于AI绘画。重点在于 **“用文字绘画”** ，让AI能“看懂”构图、光影和情绪。

### **核心要求清单（你关心的所有要点）**
在构思时，确保你的描述涵盖以下层面，并力求将它们有机融合：

1.  **角色与核心视觉**：明确主体是谁（如“一位年轻的中国女性”），并赋予她一个**瞬间的、具体的动作或状态**（如“正伸手触碰”、“刚仰头喝下”、“蜷缩睡着”），而不是静止站立。
2.  **富有创意的场景**：场景不应是通用背景，而应是**有独特气息、时代感或矛盾感的**具体环境（如“雨后健身房”、“午夜便利店前”、“玻璃花房晨雾中”）。
3.  **清凉装扮与身体叙事**：衣着（如吊带裙、湿透的背心、运动Bra）需符合场景逻辑，并**通过光影、动态和质感（湿透、飘拂、贴合）来展现身体的美感、活力或情绪**，而非单纯暴露。
4.  **决定性的镜头语言（最关键）**：这是将“描述”升级为“画面”的核心。必须明确：
    *   **机位/视角**：是低角度仰拍、高角度俯拍、平视，还是透过某个框架（窗、门）拍摄？
    *   **构图**：是对称构图、三分法、纵深引导线，还是前景框景？
    *   **景深与焦点**：什么是清晰的（焦点主体），什么是模糊的（背景/前景）？焦点是否在人物眼睛、某个动作细节，或在环境与人物之间游移？
    *   **光影设计**：光源是什么（自然光/人造光）？方向如何（侧光、逆光、顶光）？质感如何（硬光、柔光、漫射光）？光影创造了怎样的氛围和情绪？
    *   **氛围**：整体氛围是温馨、冷峻、神秘还是活泼？
5.  **气息与氛围**：最终画面应传递出一种可感知的“气息”——是**生活烟火气、孤独疏离感、静谧诗意、还是活力动感**？这由以上所有元素共同作用达成。

### **描述方法与流程**
1.  **从“瞬间”或“矛盾”入手**：先找到一个动人的瞬间（如“跃起入水前的一刹”）或一组有趣的对比（如“冰库门内的冷雾与门外的热浪”），以此为核心构建场景。
2.  **像导演一样思考**：在写下每个句子前，先在心里“架设好机位”。问自己：我这个镜头想突出什么？是环境的宏大，还是表情的细微？然后用文字执行这个“拍摄方案”。
3.  **使用具象的、可视觉化的词汇**：
    *   避免“很美”、“很有感觉”。改用“**阳光在她湿发上镀了一层跳动的金边**”。
    *   避免“穿着清凉”。改用“**薄荷绿亚麻吊带裙的裙摆，被穿堂风吹得紧贴在小腿后又扬起**”。
4.  **遵循逻辑顺序**：通常描述顺序为：**镜头设定 -> 环境氛围 -> 人物引入（衣着、姿态）-> 细节焦点（表情、动作、衣物质感）-> 光影效果 -> 最终氛围**。确保读起来像镜头一次扫过的画面。

### **示例公式（简化版）**
> **【镜头视角 + 构图】+ 在【具体且有气息的场景】中，【人物 + 清凉装扮 + 具体瞬间动作】。光影是【光影描述】，焦点落在【焦点细节】上，整体营造出【某种氛围/气息】。**

**举例（套用公式）：**
> **（低角度仰拍）在（雨后霓虹倒影的潮湿街面）上，（一位身着米色风衣的女子正迈过水洼）。光影是（头顶路灯与地面倒影的交织），焦点落在（她沉静的面容和溅起的水珠）上，整体营造出（都市夜归的孤寂与清冷感）。**
禁止输出任何markdown标签，使用中括号或者括号做重点标记或段落开头
"""


# Load the workflow API template
try:
    with open("workflow_api.json", "r", encoding="utf-8") as f:
        WORKFLOW_TEMPLATE = json.load(f)
except Exception as e:
    print(f"Error loading workflow_api.json: {e}")
    WORKFLOW_TEMPLATE = {}

# Load the img2img workflow template
try:
    with open("workflow_img2img_api.json", "r", encoding="utf-8") as f:
        WORKFLOW_IMG2IMG_TEMPLATE = json.load(f)
except Exception as e:
    print(f"Error loading workflow_img2img_api.json: {e}")
    WORKFLOW_IMG2IMG_TEMPLATE = {}

class GenerateRequest(BaseModel):
    prompt: str
    negative_prompt: Optional[str] = ""
    seed: Optional[int] = None
    steps: Optional[int] = 9
    cfg: Optional[float] = 1.0
    sampler_name: Optional[str] = "euler"
    scheduler: Optional[str] = "simple"
    width: Optional[int] = 1024
    height: Optional[int] = 1024
    denoise: Optional[float] = 1.0
    client_id: str

class GalleryShareRequest(BaseModel):
    username: str
    prompt: str
    negative_prompt: str
    imageUrl: str
    params: Dict[str, Any]
    timestamp: str
    timeTaken: float

class Img2ImgRequest(BaseModel):
    prompt: str
    negative_prompt: Optional[str] = ""
    seed: Optional[int] = None
    steps: Optional[int] = 10
    cfg: Optional[float] = 1.0
    sampler_name: Optional[str] = "euler"
    scheduler: Optional[str] = "simple"
    denoise: Optional[float] = 1.0
    client_id: str
    input_image_name: str
    control_strength: float = 0.6

class EnhancePromptRequest(BaseModel):
    prompt: str


# Gallery file path
GALLERY_FILE = "gallery.json"

# Helper functions for gallery
def load_gallery() -> Dict[str, Any]:
    """Load gallery from JSON file"""
    if os.path.exists(GALLERY_FILE):
        try:
            with open(GALLERY_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception as e:
            print(f"Error loading gallery: {e}")
            return {"items": []}
    return {"items": []}

def save_gallery(gallery_data: Dict[str, Any]) -> bool:
    """Save gallery to JSON file"""
    try:
        with open(GALLERY_FILE, "w", encoding="utf-8") as f:
            json.dump(gallery_data, f, ensure_ascii=False, indent=2)
        return True
    except Exception as e:
        print(f"Error saving gallery: {e}")
        return False

@app.post("/api/upload")
async def upload_image(file: UploadFile = File(...)):
    """Upload image to ComfyUI input directory via proxy"""
    try:
        # Proxy to ComfyUI
        async with aiohttp.ClientSession() as session:
            data = aiohttp.FormData()
            data.add_field('image', file.file, filename=file.filename, content_type=file.content_type)
            # You can add 'subfolder' or 'type' if needed, e.g. type='input'
            data.add_field('type', 'input')
            data.add_field('overwrite', 'true')
            
            async with session.post(f"{COMFY_URL}/upload/image", data=data) as resp:
                if resp.status != 200:
                    raise HTTPException(status_code=resp.status, detail=await resp.text())
                result = await resp.json()
                # result format: {"name": "filename.png", "subfolder": "", "type": "input"}
                return result
    except Exception as e:
        print(f"Error uploading image: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/generate_img2img")
async def generate_img2img(req: Img2ImgRequest):
    if not WORKFLOW_IMG2IMG_TEMPLATE:
        raise HTTPException(status_code=500, detail="Img2Img Workflow template not loaded")

    workflow = json.loads(json.dumps(WORKFLOW_IMG2IMG_TEMPLATE)) # Deep copy
    client_id = req.client_id
    
    # 1. Update Load Image (Node 145)
    if "145" in workflow:
        workflow["145"]["inputs"]["image"] = req.input_image_name
        
    # 2. Update Control Strength (Node 156)
    if "156" in workflow:
        workflow["156"]["inputs"]["strength"] = req.control_strength
        
    # 3. Update Prompt (Node 149)
    if "149" in workflow:
        workflow["149"]["inputs"]["text"] = req.prompt

    # 4. Update KSampler (Node 125)
    if "125" in workflow:
        inputs = workflow["125"]["inputs"]
        if req.seed is not None:
            inputs["seed"] = req.seed
        if req.steps is not None:
            inputs["steps"] = req.steps
        if req.cfg is not None:
            inputs["cfg"] = req.cfg
        # Note: scheduler/sampler might differ in this workflow, adhere to defaults or map if needed
        # workflow has "res_multistep" / "simple" as default in template
        
    # 5. Update Negative Prompt if needed (This workflow seems to have negative at Node 126? No, 126 is ZeroOut)
    # The template uses "Z-image_ControlNet控制生图.json"
    # Node 125 (KSampler) -> negative -> [126, 0]
    # Node 126 (ConditioningZeroOut) -> inputs: conditioning -> [149, 0] (Wait, this is ZeroOut from Positive?)
    # Let's check the workflow JSON structure again. 
    # Ah, Node 149 is CLIPTextEncode (Positive). 
    # Node 126 takes [149, 0] and ZeroOuts it. So it doesn't have a separate text input for negative.
    # It seems this specific workflow derives negative conditioning by zeroing out the positive one, or similar?
    # Actually, if we look at `control_img2img_logic.py`:
    # It ONLY updates Node 149 (text). It doesn't seem to update any negative prompt node.
    # So we will stick to updating only Node 149.
    
    payload = {
        "prompt": workflow,
        "client_id": client_id
    }
    
    async with aiohttp.ClientSession() as session:
        async with session.post(f"{COMFY_URL}/prompt", json=payload) as resp:
            if resp.status != 200:
                raise HTTPException(status_code=resp.status, detail=await resp.text())
            result = await resp.json()
            
    return {"prompt_id": result["prompt_id"], "client_id": client_id}


@app.post("/api/generate")
async def generate(req: GenerateRequest):
    if not WORKFLOW_TEMPLATE:
        raise HTTPException(status_code=500, detail="Workflow template not loaded")

    workflow = json.loads(json.dumps(WORKFLOW_TEMPLATE)) # Deep copy
    client_id = req.client_id

    # Update nodes
    for node_id, node in workflow.items():
        class_type = node["class_type"]
        inputs = node["inputs"]
        
        if class_type == "KSampler":
            if req.seed is not None:
                inputs["seed"] = req.seed
            if req.steps is not None:
                inputs["steps"] = req.steps
            if req.cfg is not None:
                inputs["cfg"] = req.cfg
            if req.sampler_name is not None:
                inputs["sampler_name"] = req.sampler_name
            if req.scheduler is not None:
                inputs["scheduler"] = req.scheduler
            if req.denoise is not None:
                inputs["denoise"] = req.denoise
                
        elif class_type == "EmptySD3LatentImage":
            if req.width is not None:
                inputs["width"] = req.width
            if req.height is not None:
                inputs["height"] = req.height

    # Better approach: Find KSampler first
    ksampler_node = None
    for node_id, node in workflow.items():
        if node["class_type"] == "KSampler":
            ksampler_node = node
            break
            
    if ksampler_node:
        # Update KSampler
        inputs = ksampler_node["inputs"]
        if req.seed is not None:
            inputs["seed"] = req.seed
        if req.steps is not None:
            inputs["steps"] = req.steps
        if req.cfg is not None:
            inputs["cfg"] = req.cfg
        if req.sampler_name is not None:
            inputs["sampler_name"] = req.sampler_name
        if req.scheduler is not None:
            inputs["scheduler"] = req.scheduler
        if req.denoise is not None:
            inputs["denoise"] = req.denoise
            
        # Update Positive Prompt
        # inputs['positive'] is [node_id, slot]
        pos_id = inputs['positive'][0]
        if pos_id in workflow:
            workflow[pos_id]["inputs"]["text"] = req.prompt
            
        # Update Negative Prompt
        neg_id = inputs['negative'][0]
        if neg_id in workflow:
            workflow[neg_id]["inputs"]["text"] = req.negative_prompt
    else:
        raise HTTPException(status_code=500, detail="KSampler node not found in workflow")

    payload = {
        "prompt": workflow,
        "client_id": client_id
    }
    
    async with aiohttp.ClientSession() as session:
        async with session.post(f"{COMFY_URL}/prompt", json=payload) as resp:
            if resp.status != 200:
                raise HTTPException(status_code=resp.status, detail=await resp.text())
            result = await resp.json()
            
    return {"prompt_id": result["prompt_id"], "client_id": client_id}

@app.get("/api/history/{prompt_id}")
async def get_history(prompt_id: str):
    async with aiohttp.ClientSession() as session:
        async with session.get(f"{COMFY_URL}/history/{prompt_id}") as resp:
            if resp.status != 200:
                raise HTTPException(status_code=resp.status, detail="History not found")
            return await resp.json()

@app.get("/api/view")
async def view_image(filename: str, subfolder: str = "", type: str = "output"):
    params = {"filename": filename, "subfolder": subfolder, "type": type}
    async with aiohttp.ClientSession() as session:
        async with session.get(f"{COMFY_URL}/view", params=params) as resp:
            if resp.status != 200:
                raise HTTPException(status_code=resp.status, detail="Image not found")
            content = await resp.read()
            return StreamingResponse(iter([content]), media_type=resp.headers.get("Content-Type", "image/png"))

@app.post("/api/gallery/share")
async def share_to_gallery(req: GalleryShareRequest):
    """Share a creation to the gallery"""
    try:
        gallery_data = load_gallery()
        
        # Create new gallery item
        gallery_item = {
            "id": str(uuid.uuid4()),
            "username": req.username,
            "prompt": req.prompt,
            "negative_prompt": req.negative_prompt,
            "imageUrl": req.imageUrl,
            "params": req.params,
            "timestamp": req.timestamp,
            "timeTaken": req.timeTaken
        }
        
        # Add to gallery items (newest first)
        gallery_data["items"].insert(0, gallery_item)
        
        # Save to file
        if save_gallery(gallery_data):
            return {"success": True, "id": gallery_item["id"]}
        else:
            raise HTTPException(status_code=500, detail="Failed to save to gallery")
            
    except Exception as e:
        print(f"Error sharing to gallery: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/gallery")
async def get_gallery():
    """Get all gallery items"""
    try:
        gallery_data = load_gallery()
        return gallery_data
    except Exception as e:
        print(f"Error getting gallery: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/enhance_prompt")
async def enhance_prompt(req: EnhancePromptRequest):
    """Enhance prompt using DeepSeek API"""
    try:
        api_key = CONFIG.get("DEEPSEEK_API_KEY")
        if not api_key:
            # Fallback for development if not in env
            # You should set this in your environment or .env file
            print("Warning: DEEPSEEK_API_KEY not set")
            raise HTTPException(status_code=500, detail="DeepSeek API key not configured")

        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {api_key}"
        }

        messages = []
        if SYSTEM_PROMPT:
            messages.append({"role": "system", "content": SYSTEM_PROMPT})
        
        messages.append({"role": "user", "content": req.prompt})

        payload = {
            "model": "deepseek-reasoner",
            "messages": messages,
            "stream": False
        }

        async with aiohttp.ClientSession() as session:
            async with session.post(DEEPSEEK_API_URL, headers=headers, json=payload) as resp:
                if resp.status != 200:
                    error_text = await resp.text()
                    print(f"DeepSeek API Error: {error_text}")
                    raise HTTPException(status_code=resp.status, detail=f"DeepSeek API error: {error_text}")
                
                result = await resp.json()
                content = result["choices"][0]["message"]["content"]
                return {"enhanced_prompt": content}

    except Exception as e:
        print(f"Error enhancing prompt: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@app.websocket("/ws/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: str):
    await websocket.accept()
    async with aiohttp.ClientSession() as session:
        async with session.ws_connect(f"{WS_URL}/ws?clientId={client_id}") as ws:
            async for msg in ws:
                if msg.type == aiohttp.WSMsgType.TEXT:
                    await websocket.send_text(msg.data)
                elif msg.type == aiohttp.WSMsgType.BINARY:
                    await websocket.send_bytes(msg.data)
                elif msg.type == aiohttp.WSMsgType.ERROR:
                    break

app.mount("/", StaticFiles(directory="frontend/dist", html=True), name="static")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8080)

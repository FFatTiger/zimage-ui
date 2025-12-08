# ComfyUI Pro 部署指南

## 架构说明

当前架构已经完美整合：
- **前端**: Vue 3 + Tailwind CSS (位于 `static/` 目录)
- **后端**: FastAPI (`main.py`)
  - 提供静态文件服务
  - 代理内网 ComfyUI API (127.0.0.1:8000)
  - WebSocket 实时通信

## 部署方式

### 方式1: 直接运行 (开发/测试)
```bash
# 启动后端 (已包含前端)
python main.py
# 或者
uvicorn main:app --host 0.0.0.0 --port 8080
```

### 方式2: 生产环境 (推荐)
```bash
# 安装依赖
pip install fastapi uvicorn aiohttp pydantic

# 使用 Gunicorn + Uvicorn workers (Linux)
pip install gunicorn
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8080

# 或使用 Uvicorn 多进程 (跨平台)
uvicorn main:app --host 0.0.0.0 --port 8080 --workers 4
```

### 方式3: 使用 PM2 守护进程
```bash
# 安装 PM2
npm install -g pm2

# 启动应用
pm2 start main.py --name comfyui-pro --interpreter python3

# 其他命令
pm2 stop comfyui-pro
pm2 restart comfyui-pro
pm2 logs comfyui-pro
pm2 startup  # 开机自启
```

## 外网访问配置

### 1. 内网穿透 (简单方案)

#### 使用 ngrok
```bash
# 下载安装 ngrok
ngrok http 8080
```

#### 使用 frp
服务端配置 `frps.ini`:
```ini
[common]
bind_port = 7000
```

客户端配置 `frpc.ini`:
```ini
[common]
server_addr = your_server_ip
server_port = 7000

[comfyui]
type = http
local_port = 8080
custom_domains = your_domain.com
```

### 2. 云服务器部署 (推荐)

#### Nginx 反向代理配置
```nginx
server {
    listen 80;
    server_name your_domain.com;
    
    # 前端和API
    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
    
    # WebSocket 特殊配置
    location /ws/ {
        proxy_pass http://127.0.0.1:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_read_timeout 86400;
    }
}
```

启用 HTTPS (推荐):
```bash
# 安装 Certbot
sudo apt install certbot python3-certbot-nginx

# 获取证书
sudo certbot --nginx -d your_domain.com
```

### 3. Docker 部署 (容器化)

创建 `Dockerfile`:
```dockerfile
FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8080

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
```

创建 `requirements.txt`:
```txt
fastapi==0.104.1
uvicorn[standard]==0.24.0
aiohttp==3.9.0
pydantic==2.5.0
```

创建 `docker-compose.yml`:
```yaml
version: '3.8'

services:
  comfyui-pro:
    build: .
    ports:
      - "8080:8080"
    environment:
      - COMFY_URL=http://host.docker.internal:8000
    extra_hosts:
      - "host.docker.internal:host-gateway"
    restart: unless-stopped
```

运行:
```bash
docker-compose up -d
```

## 安全建议

### 1. 添加身份验证 (可选)

创建 `auth.py`:
```python
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBasic, HTTPBasicCredentials
import secrets

security = HTTPBasic()

def verify_credentials(credentials: HTTPBasicCredentials = Depends(security)):
    correct_username = secrets.compare_digest(credentials.username, "admin")
    correct_password = secrets.compare_digest(credentials.password, "your_password")
    if not (correct_username and correct_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Basic"},
        )
    return credentials.username
```

在 `main.py` 中使用:
```python
from auth import verify_credentials

@app.post("/api/generate")
async def generate(req: GenerateRequest, username: str = Depends(verify_credentials)):
    # ... 原有代码
```

### 2. 速率限制

```bash
pip install slowapi
```

在 `main.py` 添加:
```python
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

@app.post("/api/generate")
@limiter.limit("10/minute")
async def generate(request: Request, req: GenerateRequest):
    # ... 原有代码
```

### 3. CORS 配置 (如果需要跨域)

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://your-domain.com"],  # 指定允许的域名
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## 性能优化

### 1. 静态文件缓存

修改 `main.py`:
```python
app.mount("/", StaticFiles(directory="static", html=True), name="static")

@app.middleware("http")
async def add_cache_headers(request: Request, call_next):
    response = await call_next(request)
    if request.url.path.startswith("/static"):
        response.headers["Cache-Control"] = "public, max-age=31536000"
    return response
```

### 2. 启用 Gzip 压缩

```python
from fastapi.middleware.gzip import GZipMiddleware

app.add_middleware(GZipMiddleware, minimum_size=1000)
```

## 监控和日志

### 使用 Sentry (错误追踪)
```bash
pip install sentry-sdk[fastapi]
```

```python
import sentry_sdk
from sentry_sdk.integrations.fastapi import FastApiIntegration

sentry_sdk.init(
    dsn="your_sentry_dsn",
    integrations=[FastApiIntegration()],
)
```

### 日志配置
```python
import logging

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('app.log'),
        logging.StreamHandler()
    ]
)
```

## 故障排查

### 检查服务状态
```bash
# 检查端口占用
netstat -ano | findstr :8080  # Windows
lsof -i :8080                 # Linux/Mac

# 测试 ComfyUI 连接
curl http://127.0.0.1:8000

# 测试前端
curl http://localhost:8080
```

### 常见问题

1. **WebSocket 连接失败**
   - 检查防火墙设置
   - 确认 Nginx 配置了 WebSocket 支持

2. **图片无法加载**
   - 检查 ComfyUI 是否正常运行
   - 查看浏览器控制台错误信息

3. **CORS 错误**
   - 添加 CORS 中间件
   - 检查域名配置

## 快速启动命令

```bash
# 开发环境
python main.py

# 生产环境 (Linux)
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8080 --access-logfile - --error-logfile -

# 生产环境 (Windows)
uvicorn main:app --host 0.0.0.0 --port 8080 --workers 4

# 后台运行 (Linux)
nohup python main.py > app.log 2>&1 &
```

## 总结

您的应用已经完全整合，只需要：
1. 运行 `python main.py` 启动服务
2. 确保 ComfyUI 在 `127.0.0.1:8000` 运行
3. 通过外网 IP + 8080 端口访问
4. (可选) 使用 Nginx 反向代理并配置域名

所有前端和后端都在同一个服务中，非常适合部署！

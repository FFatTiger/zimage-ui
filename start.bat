@echo off
echo Building Frontend...
cd frontend
call npm run build
if %errorlevel% neq 0 (
    echo Frontend build failed!
    pause
    exit /b %errorlevel%
)
cd ..
cd venv
call Scripts\activate.bat
cd ..
echo Starting Backend...
uvicorn main:app --host 0.0.0.0 --port 8080 --workers 4
pause

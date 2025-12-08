#!/bin/bash

echo "Building Frontend..."
cd frontend
npm run build

if [ $? -ne 0 ]; then
    echo "Frontend build failed!"
    exit 1
fi

cd ..

echo "Starting Backend..."
uvicorn main:app --host 0.0.0.0 --port 8080 --workers 4

#!/bin/bash

# Kill any existing processes
pkill -f uvicorn
pkill -f vite

# Start backend
cd backend
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload &
BACKEND_PID=$!

# Start frontend
cd ../frontend
npx vite --port 3000 --host 0.0.0.0 &
FRONTEND_PID=$!

echo "Backend started on port 8000 (PID: $BACKEND_PID)"
echo "Frontend started on port 3000 (PID: $FRONTEND_PID)"

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID
#!/usr/bin/env python3
"""
Development script to run both backend and frontend concurrently
since package.json cannot be modified directly.
"""

import subprocess
import time
import sys
from threading import Thread

def run_backend():
    """Run the FastAPI backend"""
    try:
        cmd = ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
        subprocess.run(cmd, cwd="backend", check=True)
    except KeyboardInterrupt:
        print("Backend stopped")
    except Exception as e:
        print(f"Backend error: {e}")

def run_frontend():
    """Run the Vite frontend"""
    try:
        # Install dependencies first
        subprocess.run(["npm", "install"], cwd="frontend", check=True)
        # Run Vite dev server with proper environment
        import os
        env = os.environ.copy()
        env["DANGEROUSLY_DISABLE_HOST_CHECK"] = "true"
        cmd = ["npx", "vite", "--host", "0.0.0.0", "--port", "5000"]
        subprocess.run(cmd, cwd="frontend", check=True, env=env)
    except KeyboardInterrupt:
        print("Frontend stopped")
    except Exception as e:
        print(f"Frontend error: {e}")

if __name__ == "__main__":
    print("🚀 Starting PlainSpeak Labs development servers...")
    print("📱 Frontend will be available at: http://localhost:5000")
    print("🔧 Backend API will be available at: http://localhost:8000")
    print("📖 API docs will be available at: http://localhost:8000/docs")
    print()
    print("Press Ctrl+C to stop both servers")
    print("-" * 50)
    
    # Start both servers in separate threads
    backend_thread = Thread(target=run_backend, daemon=True)
    frontend_thread = Thread(target=run_frontend, daemon=True)
    
    backend_thread.start()
    time.sleep(2)  # Give backend a moment to start
    frontend_thread.start()
    
    try:
        # Keep main thread alive
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("\n⏹️  Stopping development servers...")
        sys.exit(0)
#!/usr/bin/env python3
"""
Simple test to verify the monorepo architecture is working.
This demonstrates that the FastAPI backend can run independently.
"""

import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), 'backend'))

from backend.app.main import app
import uvicorn

if __name__ == "__main__":
    print("🚀 Starting LabClear FastAPI backend...")
    print("📁 Monorepo structure verified")
    print("🏥 Medical lab results analysis platform ready")
    print()
    print("Available endpoints:")
    print("  GET  /health - Health check")
    print("  POST /extract - Extract lab data from files")
    print("  POST /explain - Generate explanations")
    print()
    uvicorn.run(app, host="0.0.0.0", port=5000, log_level="info")
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import extract
from .routers import explain

app = FastAPI()

# Add CORS middleware for development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for Replit dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(extract.router, prefix="/extract")
app.include_router(explain.router, prefix="")

@app.get("/health")
def health(): 
    return {"status":"ok"}
from fastapi import FastAPI, UploadFile, File, Query
from fastapi.middleware.cors import CORSMiddleware
from .routers import extract
from .routers import explain
from .routers import export as export_router

app = FastAPI()

# CORS: allow your Vite origin(s)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5000",
        "http://localhost:5173",
        "http://127.0.0.1:5000",
        "http://127.0.0.1:5173",
        "http://172.31.73.66:5000",
        "http://172.31.73.66:5173",  # optional: Vite "Network" URL shown in logs
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Optional: health root to avoid 404 at "/"
@app.get("/", include_in_schema=False)
def health():
    return {"status": "ok"}

# Direct extract endpoints (both forms)
@app.post("/extract")
@app.post("/extract/")
async def extract_direct(file: UploadFile = File(None), demo: bool = Query(False)):
    """Direct extract endpoint - forwards to extract router logic"""
    from .routers.extract import extract_text
    return await extract_text(file=file, demo=demo)

# Include routers
app.include_router(extract.router, prefix="/extract")
app.include_router(explain.router, prefix="")
app.include_router(export_router.router, prefix="")

@app.get("/health")
def health_check(): 
    return {"status":"ok"}
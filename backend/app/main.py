from fastapi import FastAPI, UploadFile, File, Query
from fastapi.middleware.cors import CORSMiddleware

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

from typing import List, Optional, Literal
from pydantic import BaseModel
import re

class ExtractRequest(BaseModel):
    text: Optional[str] = None

class LabItem(BaseModel):
    name: str
    value: float
    unit: str
    ref_low: Optional[float] = None
    ref_high: Optional[float] = None
    flag: Literal["low","normal","high","unknown"] = "unknown"
    explanation: str = ""

class AnalysisResponse(BaseModel):
    items: List[LabItem]
    summary: str
    notes: List[str] = []

ALIASES = {"glucose":"Glucose","alt":"ALT","ast":"AST","got":"AST","hemoglobin":"Hemoglobin","hgb":"Hemoglobin"}

REFS = {
    "Glucose": (70, 99, "mg/dL"),
    "ALT": (7, 55, "U/L"),
    "AST": (8, 48, "U/L"),
    "Hemoglobin": (13.5, 17.5, "g/dL"),
}

def analyze_pairs(pairs):
    items, hi, lo = [], 0, 0
    for name, value, unit in pairs:
        low, high, ref_unit = REFS.get(name, (None, None, unit))
        flag = "unknown"
        if low is not None and high is not None:
            if value < low: flag, lo = "low", lo + 1
            elif value > high: flag, hi = "high", hi + 1
            else: flag = "normal"
        items.append(LabItem(
            name=name, value=value, unit=unit,
            ref_low=low, ref_high=high, flag=flag,
            explanation=("Within normal range." if flag=="normal"
                         else "Below the typical reference range." if flag=="low"
                         else ("Slightly above the typical range; consider a fasting re-test."
                               if name=="Glucose" and flag=="high" else "Above the typical range.")
                         if flag=="high" else "No reference range available.")
        ))
    total = len(items)
    summary = f"{hi} high, {lo} low, {total - hi - lo} normal."
    return AnalysisResponse(items=items, summary=summary, notes=[])

def norm(name, value, unit):
    u = unit.lower()
    if name=="Glucose" and ("mmol" in u):
        return value*18.0, "mg/dL"
    return value, unit

def parse_free_text(text: str):
    # Tiny parser for patterns like: "Glucose 108 mg/dL, ALT 42 U/L"
    pattern = r'(Glucose|ALT|AST|Hemoglobin)\s*[:\-]?\s*([0-9]+(?:\.[0-9]+)?)\s*([A-Za-z/%]+)'
    pairs = []
    for m in re.finditer(pattern, text, flags=re.I):
        name = ALIASES.get(m.group(1).lower(), m.group(1).title())
        value = float(m.group(2))
        unit = m.group(3)
        value, unit = norm(name, value, unit)
        pairs.append((name, value, unit))
    return analyze_pairs(pairs)

@app.get("/demo", response_model=AnalysisResponse)
def demo():
    return analyze_pairs([("Glucose",108,"mg/dL"), ("ALT",42,"U/L")])

@app.post("/extract", response_model=AnalysisResponse)
@app.post("/extract/", response_model=AnalysisResponse)
async def extract(payload: ExtractRequest):
    from fastapi import HTTPException
    if not payload.text:
        raise HTTPException(status_code=400, detail="Provide 'text' for now (file upload path comes next).")
    return parse_free_text(payload.text)



from fastapi import UploadFile, File, HTTPException
import io
import pdfplumber
from PIL import Image
import pytesseract

@app.post("/extract-file", response_model=AnalysisResponse)
async def extract_file(file: UploadFile = File(...)):
    if file.content_type not in {"application/pdf","image/png","image/jpeg"}:
        raise HTTPException(415, "Only PDF/PNG/JPG allowed")
    raw = await file.read()
    text = ""
    if file.content_type == "application/pdf":
        with pdfplumber.open(io.BytesIO(raw)) as pdf:
            text = "\n".join((p.extract_text() or "") for p in pdf.pages)
    else:
        img = Image.open(io.BytesIO(raw))
        text = pytesseract.image_to_string(img)
    if not text or not text.strip():
        raise HTTPException(400, "Could not extract text from file")
    return parse_free_text(text)

@app.get("/health")
def health_check(): 
    return {"status":"ok"}
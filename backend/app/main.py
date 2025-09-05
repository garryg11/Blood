from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .schemas import LabResult, LabExplanation, ExtractResponse, ExplainRequest
from typing import List
import json
import os

app = FastAPI(title="LabClear API", version="1.0.0")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
async def health_check():
    return {"status": "ok"}

@app.post("/extract", response_model=ExtractResponse)
async def extract_lab_data(file: UploadFile = File(...)):
    """
    Extract lab data from uploaded file (PDF/JPG/PNG).
    Stub implementation - returns mock data.
    """
    if not file.content_type or file.content_type not in [
        "application/pdf", 
        "image/jpeg", 
        "image/png", 
        "image/jpg"
    ]:
        raise HTTPException(status_code=400, detail="Unsupported file type")
    
    # Stub: Return mock extracted data
    mock_results = [
        LabResult(
            test_name="Total Cholesterol",
            value=185.0,
            unit="mg/dL",
            normal_range="< 200 mg/dL"
        ),
        LabResult(
            test_name="LDL Cholesterol",
            value=145.0,
            unit="mg/dL",
            normal_range="< 100 mg/dL"
        ),
        LabResult(
            test_name="HDL Cholesterol",
            value=52.0,
            unit="mg/dL",
            normal_range="> 40 mg/dL (men), > 50 mg/dL (women)"
        )
    ]
    
    return ExtractResponse(results=mock_results)

@app.post("/explain", response_model=List[LabExplanation])
async def explain_lab_results(request: ExplainRequest):
    """
    Generate plain-language explanations for lab results.
    Stub implementation - returns mock explanations.
    """
    explanations = []
    
    for result in request.results:
        # Mock explanation logic
        interpretation = "normal"
        explanation = f"Your {result.test_name} level appears to be within normal range."
        meaning = "This value suggests normal function for this test."
        is_urgent = False
        
        # Simple mock rules for demonstration
        if "cholesterol" in result.test_name.lower():
            if result.value > 200:
                interpretation = "high"
                explanation = f"Your {result.test_name} level is elevated and may increase cardiovascular risk."
                meaning = f"{result.test_name} levels above 200 mg/dL are considered high and may require lifestyle changes or medication."
            elif result.value > 180:
                interpretation = "borderline-high"
                explanation = f"Your {result.test_name} level is in the borderline high range."
                meaning = "Consider dietary changes and exercise to help improve cholesterol levels."
        
        if "glucose" in result.test_name.lower():
            if result.value > 200:
                interpretation = "high"
                explanation = f"Your blood glucose level is significantly elevated and may indicate diabetes."
                meaning = "Glucose levels above 200 mg/dL may indicate diabetes and require immediate medical attention."
                is_urgent = True
            elif result.value > 100:
                interpretation = "borderline-high"
                explanation = f"Your blood glucose level is elevated and may indicate prediabetes."
                meaning = "Consider lifestyle changes to help manage blood sugar levels."
        
        explanations.append(LabExplanation(
            test_name=result.test_name,
            value=result.value,
            unit=result.unit,
            normal_range=result.normal_range,
            interpretation=interpretation,
            explanation=explanation,
            meaning=meaning,
            is_urgent=is_urgent
        ))
    
    return explanations
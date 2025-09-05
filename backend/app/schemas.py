from pydantic import BaseModel
from typing import List, Optional

class LabResult(BaseModel):
    test_name: str
    value: float
    unit: str
    normal_range: Optional[str] = None

class ExtractResponse(BaseModel):
    results: List[LabResult]

class ExplainRequest(BaseModel):
    results: List[LabResult]
    language: str = "en"

class LabExplanation(BaseModel):
    test_name: str
    value: float
    unit: str
    normal_range: Optional[str] = None
    interpretation: str  # 'normal', 'high', 'low', 'borderline-high', 'borderline-low'
    explanation: str
    meaning: str
    is_urgent: bool = False
from pydantic import BaseModel
from typing import List, Optional, Literal

class LabResult(BaseModel):
    test_name: str
    value: float
    unit: str
    normal_range: Optional[str] = None

class ExtractResponse(BaseModel):
    results: List[LabResult]

class ExplainRequest(BaseModel):
    items: List[AnalyteItem]

class LabExplanation(BaseModel):
    test_name: str
    value: float
    unit: str
    normal_range: Optional[str] = None
    interpretation: str  # 'normal', 'high', 'low', 'borderline-high', 'borderline-low'
    explanation: str
    meaning: str
    is_urgent: bool = False

class AnalyteIn(BaseModel):
    analyte: str
    value: float
    unit: Optional[str] = None
    sex: Optional[str] = None
    age: Optional[int] = None

class RefRange(BaseModel):
    low: float
    high: float
    unit: str

class ExplainItem(BaseModel):
    analyte: str
    value: float
    unit: str
    refRange: RefRange
    level: Literal["low", "in-range", "high"]
    message: str
    sources: List[str]
    flag: Literal["none", "caution", "urgent"]

class ExplainResponse(BaseModel):
    items: List[ExplainItem]
    warnings: List[str]
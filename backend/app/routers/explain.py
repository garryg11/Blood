
from fastapi import APIRouter
from app.schemas import ExplainRequest, ExplainResponse, ExplainItem, RefRange
from app.catalog import get_ref_range
from app.rules import classify, message_for
from typing import List

router = APIRouter()

@router.post("/explain", response_model=ExplainResponse)
async def explain_lab_results(request: ExplainRequest):
    """
    Generate explanations for lab results using reference ranges and rules.
    """
    items: List[ExplainItem] = []
    warnings: List[str] = []
    
    for item in request.items:
        # Resolve reference range
        ref_range = get_ref_range(
            analyte_key=item.analyte,
            sex=item.sex,
            age=item.age
        )
        
        if not ref_range:
            warnings.append(f"unknown_analyte:{item.analyte}")
            continue
        
        # Classify the value
        level = classify(item.value, ref_range["low"], ref_range["high"])
        
        # Generate message
        message = message_for(item.analyte, level)
        
        # Build ExplainItem
        explain_item = ExplainItem(
            analyte=item.analyte,
            value=item.value,
            unit=item.unit or ref_range["unit"],
            refRange=RefRange(
                low=ref_range["low"],
                high=ref_range["high"],
                unit=ref_range["unit"]
            ),
            level=level,
            message=message,
            sources=ref_range["sources"],
            flag="none"
        )
        
        items.append(explain_item)
    
    return ExplainResponse(items=items, warnings=warnings)

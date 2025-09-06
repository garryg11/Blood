
from fastapi import APIRouter, HTTPException
from fastapi.responses import Response
from pydantic import BaseModel
from app.exporter import build_summary_pdf

router = APIRouter()

class ExportPayload(BaseModel):
    locale: str = "en"
    extracted_text: str = ""
    explained_items: list = []
    app_name: str = "CoreVitals"
    disclaimer: str = "Information only — not medical advice."

@router.post("/export/summary")
def export_summary(payload: ExportPayload):
    try:
        pdf_bytes = build_summary_pdf(
            app_name=payload.app_name,
            locale=payload.locale,
            extracted_text=payload.extracted_text or "",
            explained_items=payload.explained_items or [],
            disclaimer=payload.disclaimer,
        )
        return Response(
            content=pdf_bytes,
            media_type="application/pdf",
            headers={"Content-Disposition": 'attachment; filename="corevitals-summary.pdf"'}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

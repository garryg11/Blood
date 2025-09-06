
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


from fastapi import APIRouter, HTTPException
from fastapi.responses import Response
from pydantic import BaseModel
from app.exporter import build_summary_pdf

router = APIRouter()

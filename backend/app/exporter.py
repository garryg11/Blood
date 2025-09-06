
from io import BytesIO
from datetime import datetime
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from reportlab.lib.units import cm

def build_summary_pdf(*, app_name: str, locale: str, extracted_text: str, explained_items: list, disclaimer: str) -> bytes:
    buf = BytesIO()
    c = canvas.Canvas(buf, pagesize=A4)
    W, H = A4
    x, y = 2*cm, H - 2*cm

    def writeln(text, size=11, leading=14):
        nonlocal y
        if y < 2*cm:
            c.showPage(); y = H - 2*cm
        c.setFont("Helvetica", size)
        for line in text.split("\n"):
            c.drawString(x, y, line)
            y -= leading

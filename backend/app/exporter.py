
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

    # Header
    c.setFont("Helvetica-Bold", 16)
    c.drawString(x, y, f"{app_name} — Summary")
    y -= 20
    c.setFont("Helvetica", 9)
    c.drawString(x, y, datetime.now().strftime("%Y-%m-%d %H:%M"))
    y -= 18

    # Disclaimer
    c.setFont("Helvetica-Oblique", 9)
    writeln(disclaimer, size=9, leading=12)
    y -= 6

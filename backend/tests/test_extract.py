import io
import os
import sys
sys.path.append('..')
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_extract_without_file():
    """Test POST /extract without file returns friendly error"""
    response = client.post("/extract/")
    assert response.status_code == 422  # FastAPI validation error for missing file

def test_extract_with_invalid_file_type():
    """Test POST /extract with invalid file type"""
    # Create a fake .txt file
    fake_file = io.BytesIO(b"This is not a valid file type")
    response = client.post(
        "/extract/",
        files={"file": ("test.txt", fake_file, "text/plain")}
    )
    assert response.status_code == 200
    data = response.json()
    assert "invalid_file_type" in data["warnings"]
    assert data["text"] == ""

def test_extract_with_sample_jpg():
    """Test POST /extract with sample.jpg returns text or stub"""
    fixtures_path = os.path.join(os.path.dirname(__file__), "..", "fixtures")
    jpg_path = os.path.join(fixtures_path, "sample.jpg")
    
    if os.path.exists(jpg_path):
        with open(jpg_path, "rb") as f:
            response = client.post(
                "/extract/",
                files={"file": ("sample.jpg", f, "image/jpeg")}
            )
        assert response.status_code == 200
        data = response.json()
        assert data["text"] != ""
        # Should contain either extracted text or demo stub
        assert len(data["text"]) > 0
    else:
        # If sample.jpg doesn't exist, test with a simple image
        # Create minimal valid JPEG bytes (header)
        minimal_jpeg = b'\\xff\\xd8\\xff\\xe0\\x00\\x10JFIF\\x00\\x01\\x01\\x01\\x00H\\x00H\\x00\\x00\\xff\\xd9'
        response = client.post(
            "/extract/",
            files={"file": ("test.jpg", io.BytesIO(minimal_jpeg), "image/jpeg")}
        )
        assert response.status_code == 200
        data = response.json()
        # Should return stub text since minimal JPEG won't have readable text
        assert "Demo lab results" in data["text"]

def test_extract_with_sample_pdf():
    """Test POST /extract with sample.pdf or stub returns non-empty text"""
    fixtures_path = os.path.join(os.path.dirname(__file__), "..", "fixtures")
    
    # Try with sample.pdf if it exists, otherwise create minimal PDF
    pdf_path = os.path.join(fixtures_path, "sample.pdf")
    if os.path.exists(pdf_path):
        with open(pdf_path, "rb") as f:
            response = client.post(
                "/extract/",
                files={"file": ("sample.pdf", f, "application/pdf")}
            )
    else:
        # Create minimal PDF header for testing
        minimal_pdf = b'%PDF-1.4\\n1 0 obj\\n<<\\n/Type /Catalog\\n/Pages 2 0 R\\n>>\\nendobj\\n2 0 obj\\n<<\\n/Type /Pages\\n/Kids [3 0 R]\\n/Count 1\\n>>\\nendobj\\n3 0 obj\\n<<\\n/Type /Page\\n/Parent 2 0 R\\n/Contents 4 0 R\\n>>\\nendobj\\n4 0 obj\\n<<\\n/Length 44\\n>>\\nstream\\nBT\\n/F1 12 Tf\\n100 700 Td\\n(Hemoglobin 14.1 g/dL) Tj\\nET\\nendstream\\nendobj\\nxref\\n0 5\\n0000000000 65535 f \\n0000000009 00000 n \\n0000000074 00000 n \\n0000000120 00000 n \\n0000000179 00000 n \\ntrailer\\n<<\\n/Size 5\\n/Root 1 0 R\\n>>\\nstartxref\\n271\\n%%EOF'
        response = client.post(
            "/extract/",
            files={"file": ("test.pdf", io.BytesIO(minimal_pdf), "application/pdf")}
        )
    
    assert response.status_code == 200
    data = response.json()
    assert data["text"] != ""
    # Should contain either "Hemoglobin" from extracted text or demo stub
    assert "Hemoglobin" in data["text"] or "Demo lab results" in data["text"]

def test_extract_file_too_large():
    """Test POST /extract with file larger than 10MB"""
    # Create a large file (simulate 11MB)
    large_content = b"x" * (11 * 1024 * 1024)
    response = client.post(
        "/extract/",
        files={"file": ("large.pdf", io.BytesIO(large_content), "application/pdf")}
    )
    assert response.status_code == 200
    data = response.json()
    assert "file_too_large" in data["warnings"]
    assert data["text"] == ""

def test_extract_health():
    """Test GET /extract/health endpoint"""
    response = client.get("/extract/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"
    assert data["service"] == "extract"
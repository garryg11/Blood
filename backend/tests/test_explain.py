
import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_explain_happy_path():
    """Test normal hemoglobin value for male."""
    payload = {
        "items": [
            {
                "analyte": "hemoglobin",
                "value": 14.1,
                "unit": "g/dL",
                "sex": "m",
                "age": 45
            }
        ]
    }
    
    response = client.post("/explain", json=payload)
    assert response.status_code == 200
    
    data = response.json()
    assert len(data["items"]) == 1
    assert data["items"][0]["level"] == "in-range"
    assert data["items"][0]["analyte"] == "hemoglobin"
    assert data["items"][0]["value"] == 14.1
    assert data["items"][0]["refRange"]["low"] == 13.5
    assert data["items"][0]["refRange"]["high"] == 17.5

def test_explain_low_value():
    """Test low hemoglobin value."""
    payload = {
        "items": [
            {
                "analyte": "hemoglobin",
                "value": 10.0,
                "unit": "g/dL",
                "sex": "m",
                "age": 45
            }
        ]
    }
    
    response = client.post("/explain", json=payload)
    assert response.status_code == 200
    
    data = response.json()
    assert len(data["items"]) == 1
    assert data["items"][0]["level"] == "low"

def test_explain_high_value():
    """Test high hemoglobin value."""
    payload = {
        "items": [
            {
                "analyte": "hemoglobin",
                "value": 20.0,
                "unit": "g/dL",
                "sex": "m",
                "age": 45
            }
        ]
    }
    
    response = client.post("/explain", json=payload)
    assert response.status_code == 200
    
    data = response.json()
    assert len(data["items"]) == 1
    assert data["items"][0]["level"] == "high"

def test_explain_unknown_analyte():
    """Test unknown analyte returns warning."""
    payload = {
        "items": [
            {
                "analyte": "unknown_test",
                "value": 100.0,
                "unit": "mg/dL",
                "sex": "f",
                "age": 30
            }
        ]
    }
    
    response = client.post("/explain", json=payload)
    assert response.status_code == 200
    
    data = response.json()
    assert len(data["items"]) == 0
    assert len(data["warnings"]) == 1
    assert "unknown_analyte:unknown_test" in data["warnings"]

def test_explain_multiple_items():
    """Test multiple analytes in one request."""
    payload = {
        "items": [
            {
                "analyte": "hemoglobin",
                "value": 14.1,
                "unit": "g/dL",
                "sex": "m",
                "age": 45
            },
            {
                "analyte": "wbc",
                "value": 8.5,
                "unit": "10^9/L",
                "sex": "f",
                "age": 30
            }
        ]
    }
    
    response = client.post("/explain", json=payload)
    assert response.status_code == 200
    
    data = response.json()
    assert len(data["items"]) == 2
    assert data["items"][0]["analyte"] == "hemoglobin"
    assert data["items"][1]["analyte"] == "wbc"

def test_explain_no_unit_uses_default():
    """Test that missing unit uses default from reference range."""
    payload = {
        "items": [
            {
                "analyte": "hemoglobin",
                "value": 14.1,
                "sex": "m",
                "age": 45
            }
        ]
    }
    
    response = client.post("/explain", json=payload)
    assert response.status_code == 200
    
    data = response.json()
    assert len(data["items"]) == 1
    assert data["items"][0]["unit"] == "g/dL"

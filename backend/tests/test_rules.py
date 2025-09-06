
import pytest
from app.rules import classify, message_for, get_flag

def test_classify_low():
    """Test classification of low value."""
    result = classify(10.0, 12.0, 16.0)
    assert result == "low"

def test_classify_in_range():
    """Test classification of in-range value."""
    result = classify(14.0, 12.0, 16.0)
    assert result == "in-range"

def test_classify_high():
    """Test classification of high value."""
    result = classify(18.0, 12.0, 16.0)
    assert result == "high"

def test_classify_boundary_low():
    """Test classification at lower boundary."""
    result = classify(12.0, 12.0, 16.0)
    assert result == "in-range"

def test_classify_boundary_high():
    """Test classification at upper boundary."""
    result = classify(16.0, 12.0, 16.0)
    assert result == "in-range"

def test_message_for_in_range():
    """Test message for in-range value."""
    message = message_for("hemoglobin", "in-range")
    assert "Within typical range" in message

def test_message_for_low():
    """Test message for low value."""
    message = message_for("hemoglobin", "low")
    assert "Below typical range" in message
    assert "doctor" in message

def test_message_for_high():
    """Test message for high value."""
    message = message_for("hemoglobin", "high")
    assert "Above typical range" in message
    assert "doctor" in message

def test_get_flag_in_range():
    """Test flag for in-range value."""
    flag = get_flag("hemoglobin", "in-range", 14.0, 12.0, 16.0)
    assert flag == "none"

def test_get_flag_slightly_high():
    """Test flag for slightly high value."""
    flag = get_flag("hemoglobin", "high", 17.0, 12.0, 16.0)  # 6.25% over
    assert flag == "none"

def test_get_flag_moderately_high():
    """Test flag for moderately high value."""
    flag = get_flag("hemoglobin", "high", 20.0, 12.0, 16.0)  # 25% over
    assert flag == "caution"

def test_get_flag_very_high():
    """Test flag for very high value."""
    flag = get_flag("hemoglobin", "high", 25.0, 12.0, 16.0)  # 56.25% over
    assert flag == "urgent"

def test_get_flag_very_low():
    """Test flag for very low value."""
    flag = get_flag("hemoglobin", "low", 6.0, 12.0, 16.0)  # 50% below
    assert flag == "urgent"

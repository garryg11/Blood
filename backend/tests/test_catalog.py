
import pytest
from backend.app.catalog import get_ref_range, get_analyte_by_key, list_analyte_keys

def test_get_ref_range_hemoglobin_male():
    """Test getting reference range for male hemoglobin."""
    result = get_ref_range("hemoglobin", sex="m", age=25)
    assert result is not None
    assert result["low"] == 13.5
    assert result["high"] == 17.5
    assert result["unit"] == "g/dL"
    assert len(result["sources"]) > 0

def test_get_ref_range_hemoglobin_female():
    """Test getting reference range for female hemoglobin."""
    result = get_ref_range("hemoglobin", sex="f", age=25)
    assert result is not None
    assert result["low"] == 12.0
    assert result["high"] == 16.0
    assert result["unit"] == "g/dL"

def test_get_ref_range_any_sex():
    """Test getting reference range for analyte with 'any' sex."""
    result = get_ref_range("wbc", age=25)
    assert result is not None
    assert result["low"] == 4.0
    assert result["high"] == 11.0
    assert result["unit"] == "10³/µL"

def test_get_ref_range_nonexistent():
    """Test getting reference range for non-existent analyte."""
    result = get_ref_range("nonexistent")
    assert result is None

def test_get_analyte_by_key():
    """Test getting analyte definition by key."""
    result = get_analyte_by_key("hemoglobin")
    assert result is not None
    assert result["name"] == "Hemoglobin"
    assert result["key"] == "hemoglobin"
    assert result["unit"] == "g/dL"

def test_list_analyte_keys():
    """Test listing all analyte keys."""
    keys = list_analyte_keys()
    assert "hemoglobin" in keys
    assert "wbc" in keys
    assert "platelets" in keys
    assert len(keys) >= 11  # We added 11 analytes

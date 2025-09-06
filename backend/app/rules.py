
from typing import Literal

def classify(value: float, low: float, high: float) -> Literal["low", "in-range", "high"]:
    """
    Classify a lab value based on reference range.
    
    Args:
        value: The measured value
        low: Lower bound of reference range
        high: Upper bound of reference range
    
    Returns:
        Classification as 'low', 'in-range', or 'high'
    """
    if value < low:
        return "low"
    elif value > high:
        return "high"
    else:
        return "in-range"

def message_for(analyte_key: str, level: Literal["low", "in-range", "high"]) -> str:
    """
    Get a cautious message for an analyte level.
    
    Args:
        analyte_key: The analyte key
        level: The classification level
    
    Returns:
        A short, cautious message in English
    """
    # General messages for now - can be made analyte-specific later
    if level == "in-range":
        return "Within typical range."
    elif level == "low":
        return "Below typical range. Consider discussing with your doctor if persistent."
    elif level == "high":
        return "Above typical range. Consider discussing with your doctor if persistent."
    else:
        return "Unable to interpret."

def get_flag(analyte_key: str, level: Literal["low", "in-range", "high"], value: float, low: float, high: float) -> Literal["none", "caution", "urgent"]:
    """
    Determine flag level based on how far outside normal range the value is.
    
    Args:
        analyte_key: The analyte key
        level: The classification level
        value: The measured value
        low: Lower bound of reference range
        high: Upper bound of reference range
    
    Returns:
        Flag level: 'none', 'caution', or 'urgent'
    """
    if level == "in-range":
        return "none"
    
    # Calculate how far outside the range (as a percentage)
    if level == "low":
        deviation = (low - value) / low
    else:  # level == "high"
        deviation = (value - high) / high
    
    # Simple rules for now - can be made analyte-specific
    if deviation > 0.5:  # More than 50% outside range
        return "urgent"
    elif deviation > 0.2:  # More than 20% outside range
        return "caution"
    else:
        return "none"

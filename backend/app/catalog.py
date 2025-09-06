
import json
import os
from typing import Optional, Dict, Any, List

# Load ranges data once at module level
_ranges_data: Optional[Dict[str, Any]] = None

def _load_ranges() -> Dict[str, Any]:
    """Load ranges.json data once and cache it."""
    global _ranges_data
    if _ranges_data is None:
        # Get the path to shared/ranges.json from the backend directory
        current_dir = os.path.dirname(__file__)
        project_root = os.path.dirname(os.path.dirname(current_dir))
        ranges_path = os.path.join(project_root, "shared", "ranges.json")
        
        try:
            with open(ranges_path, 'r') as f:
                _ranges_data = json.load(f)
        except FileNotFoundError:
            _ranges_data = {"analytes": []}
    
    return _ranges_data

def get_ref_range(
    analyte_key: str, 
    sex: Optional[str] = None, 
    age: Optional[int] = None
) -> Optional[Dict[str, Any]]:
    """
    Get reference range for an analyte based on key, sex, and age.
    
    Args:
        analyte_key: The analyte key to look up
        sex: 'm', 'f', or None (defaults to 'any')
        age: Age in years or None
    
    Returns:
        Dict with keys: low, high, unit, sources
        None if no matching range found
    """
    ranges_data = _load_ranges()
    
    # Find the analyte
    analyte = None
    for a in ranges_data["analytes"]:
        if a["key"] == analyte_key:
            analyte = a
            break
    
    if not analyte:
        return None
    
    # Find the best matching range
    best_match = None
    best_score = -1
    
    for range_def in analyte["ranges"]:
        score = 0
        
        # Check sex match
        range_sex = range_def.get("sex", "any")
        if range_sex == "any":
            score += 1
        elif sex and range_sex == sex:
            score += 2
        elif sex and range_sex != sex:
            continue  # Skip if sex doesn't match
        
        # Check age match
        age_min = range_def.get("ageMin")
        age_max = range_def.get("ageMax")
        
        if age is not None:
            if age_min is not None and age < age_min:
                continue  # Skip if too young
            if age_max is not None and age > age_max:
                continue  # Skip if too old
            if age_min is not None:
                score += 1
        
        if score > best_score:
            best_score = score
            best_match = range_def
    
    if best_match:
        return {
            "low": best_match["low"],
            "high": best_match["high"],
            "unit": analyte["unit"],
            "sources": analyte["sources"]
        }
    
    return None

def get_analyte_by_key(analyte_key: str) -> Optional[Dict[str, Any]]:
    """Get analyte definition by key."""
    ranges_data = _load_ranges()
    
    for analyte in ranges_data["analytes"]:
        if analyte["key"] == analyte_key:
            return analyte
    
    return None

def list_analyte_keys() -> List[str]:
    """Get list of all available analyte keys."""
    ranges_data = _load_ranges()
    return [a["key"] for a in ranges_data["analytes"]]

export interface LabResult {
  test_name: string;
  value: number;
  unit: string;
  normal_range?: string;
}

export interface ExtractResponse {
  results: LabResult[];
}

export interface ExplainRequest {
  results: LabResult[];
  language?: string;
}

export interface LabExplanation {
  test_name: string;
  value: number;
  unit: string;
  normal_range?: string;
  interpretation: 'normal' | 'high' | 'low' | 'borderline-high' | 'borderline-low';
  explanation: string;
  meaning: string;
  is_urgent: boolean;
}
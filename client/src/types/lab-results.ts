export interface LabResult {
  id: string;
  sessionId: string;
  testName: string;
  value: number;
  unit: string;
  normalRangeMin?: number;
  normalRangeMax?: number;
  normalRangeText?: string;
  interpretation: 'normal' | 'high' | 'low' | 'borderline-high' | 'borderline-low';
  explanation: string;
  meaning: string;
  isUrgent: string;
  createdAt: string;
}

export interface LabSession {
  id: string;
  filename?: string;
  fileType?: string;
  language: string;
  processingStatus: 'pending' | 'processing' | 'completed' | 'failed';
  createdAt: string;
}

export interface ManualLabEntry {
  testName: string;
  value: string;
  unit: string;
}

export const COMMON_ANALYTES = {
  CHOLESTEROL: {
    name: 'Total Cholesterol',
    unit: 'mg/dL',
    normalRange: '< 200 mg/dL'
  },
  LDL_CHOLESTEROL: {
    name: 'LDL Cholesterol', 
    unit: 'mg/dL',
    normalRange: '< 100 mg/dL'
  },
  HDL_CHOLESTEROL: {
    name: 'HDL Cholesterol',
    unit: 'mg/dL',
    normalRange: '> 40 mg/dL (men), > 50 mg/dL (women)'
  },
  TRIGLYCERIDES: {
    name: 'Triglycerides',
    unit: 'mg/dL', 
    normalRange: '< 150 mg/dL'
  },
  GLUCOSE: {
    name: 'Fasting Glucose',
    unit: 'mg/dL',
    normalRange: '70-100 mg/dL'
  },
  HBA1C: {
    name: 'HbA1c',
    unit: '%',
    normalRange: '< 5.7%'
  }
} as const;

export const API_ENDPOINTS = {
  HEALTH: '/health',
  EXTRACT: '/extract',
  EXPLAIN: '/explain'
} as const;
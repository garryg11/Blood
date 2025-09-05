import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ExtractionResult {
  text: string;
  fields: string[];
  warnings: string[];
}

interface ResultsContextType {
  results: ExtractionResult | null;
  setResults: (results: ExtractionResult) => void;
  clearResults: () => void;
}

const ResultsContext = createContext<ResultsContextType | undefined>(undefined);

export const ResultsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [results, setResultsState] = useState<ExtractionResult | null>(null);

  const setResults = (results: ExtractionResult) => {
    setResultsState(results);
  };

  const clearResults = () => {
    setResultsState(null);
  };

  return (
    <ResultsContext.Provider value={{ results, setResults, clearResults }}>
      {children}
    </ResultsContext.Provider>
  );
};

export const useResults = () => {
  const context = useContext(ResultsContext);
  if (context === undefined) {
    throw new Error('useResults must be used within a ResultsProvider');
  }
  return context;
};
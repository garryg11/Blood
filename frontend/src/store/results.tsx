import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ResultsContextType {
  results: any[];
  setResults: (results: any[]) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const ResultsContext = createContext<ResultsContextType | undefined>(undefined);

export const ResultsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const value = {
    results,
    setResults,
    isLoading,
    setIsLoading,
  };

  return (
    <ResultsContext.Provider value={value}>
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
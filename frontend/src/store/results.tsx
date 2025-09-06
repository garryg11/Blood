
import React, { createContext, useContext, useState } from "react";

export interface Extracted {
  text: string;
  fields: any[];
  warnings: string[];
}

export interface Explained {
  items: any[];
  warnings: string[];
}

interface ResultsContextType {
  extracted: Extracted | null;
  setExtracted: (v: Extracted | null) => void;
  explained: Explained | null;
  setExplained: (v: Explained | null) => void;
  explaining: boolean;
  setExplaining: (v: boolean) => void;
}

const ResultsContext = createContext<ResultsContextType | undefined>(
  undefined
);

export const ResultsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [extracted, setExtracted] = useState<Extracted | null>(null);
  const [explained, setExplained] = useState<Explained | null>(null);
  const [explaining, setExplaining] = useState(false);

  return (
    <ResultsContext.Provider
      value={{
        extracted,
        setExtracted,
        explained,
        setExplained,
        explaining,
        setExplaining,
      }}
    >
      {children}
    </ResultsContext.Provider>
  );
};

export function useResults() {
  const ctx = useContext(ResultsContext);
  if (!ctx) throw new Error("useResults must be used inside ResultsProvider");
  return ctx;
}

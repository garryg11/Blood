import React from "react";
import { useResults } from "../store/results";
import SafetyBanner from "../components/SafetyBanner";
import ResultSummary from "../components/ResultSummary";
import AnalyteTable from "../components/AnalyteTable";

const Results: React.FC = () => {
  const { extracted, explained, explaining } = useResults();

  if (!extracted) {
    return (
      <div className="p-6 text-center">
        <a href="/" className="text-blue-600 underline">Go to Upload</a>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <SafetyBanner />
      {explaining && (
        <div className="text-sm text-gray-500">Analyzing values…</div>
      )}
      <ResultSummary text={extracted.text} />
      {explained ? (
        <>
          {explained.warnings?.length > 0 && (
            <div className="text-amber-600 text-sm">
              Some items couldn't be explained.
            </div>
          )}
          <AnalyteTable rows={explained.items} />
        </>
      ) : (
        <AnalyteTable rows={extracted.fields || []} />
      )}
    </div>
  );
};

export default Results;
import { Link } from 'react-router-dom';
import { useResults } from '../contexts/ResultsContext';
import LangSwitch from '../components/LangSwitch';
import SafetyBanner from '../components/SafetyBanner';

const Results = () => {
  const { results } = useResults();

  if (!results) {
    return (
      <div className="min-h-screen bg-[#f9f9f9] flex flex-col">
        <header className="w-full py-4 px-6 flex justify-between items-center">
          <Link 
            to="/" 
            className="text-[#007aff] text-sm font-medium hover:text-[#0056b3] transition-colors duration-200"
            data-testid="back-home-link"
          >
            ← Back
          </Link>
          <h1 className="text-xl font-bold text-[#111111]" data-testid="app-title">
            PlainSpeak Labs
          </h1>
          <div>
            <LangSwitch />
          </div>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center px-6 pb-12">
          <div className="w-full max-w-sm mx-auto text-center">
            <p className="text-[#111111] text-lg">No results to display</p>
            <Link 
              to="/" 
              className="inline-block mt-4 text-[#007aff] hover:text-[#0056b3] transition-colors duration-200"
            >
              Upload a file to get started
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const displayText = results.text.length > 300 
    ? results.text.substring(0, 300) + "..." 
    : results.text;

  const hasExtractionFailed = results.warnings.includes('extraction_failed');

  return (
    <div className="min-h-screen bg-[#f9f9f9] flex flex-col">
      {/* Top Bar */}
      <header className="w-full py-4 px-6 flex justify-between items-center">
        <Link 
          to="/" 
          className="text-[#007aff] text-sm font-medium hover:text-[#0056b3] transition-colors duration-200"
          data-testid="back-home-link"
        >
          ← Back
        </Link>
        <h1 className="text-xl font-bold text-[#111111]" data-testid="app-title">
          PlainSpeak Labs
        </h1>
        <div>
          <LangSwitch />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 pb-12">
        <div className="w-full max-w-2xl mx-auto">
          {/* Safety Banner */}
          <SafetyBanner />

          {/* Results Section */}
          <div className="space-y-6">
            {/* Extraction Failed Notice */}
            {hasExtractionFailed && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4" data-testid="extraction-failed-notice">
                <p className="text-yellow-800 text-sm">
                  We couldn't extract your results. Please try uploading a clearer image or different file format.
                </p>
              </div>
            )}

            {/* Extracted Text */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-[#111111] mb-4">Extracted Text</h3>
              <div className="bg-gray-50 rounded-lg p-4 text-sm font-mono text-[#111111] whitespace-pre-wrap" data-testid="extracted-text">
                {displayText || "No text extracted"}
              </div>
            </div>

            {/* Parsed Fields */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-[#111111] mb-4">Parsed Fields</h3>
              <div className="text-gray-500 text-sm italic" data-testid="parsed-fields-empty">
                No parsed fields yet - coming soon!
              </div>
            </div>

            {/* Warnings */}
            {results.warnings.length > 0 && !hasExtractionFailed && (
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                <h4 className="text-orange-800 font-medium mb-2">Warnings</h4>
                <ul className="text-orange-700 text-sm space-y-1">
                  {results.warnings.map((warning, index) => (
                    <li key={index} data-testid={`warning-${index}`}>• {warning}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Results;
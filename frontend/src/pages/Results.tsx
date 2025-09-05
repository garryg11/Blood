import { Link } from 'react-router-dom';
import { useResults } from '../contexts/ResultsContext';
import LangSwitch from '../components/LangSwitch';
import SafetyBanner from '../components/SafetyBanner';
import ResultSummary from '../components/ResultSummary';

const Results = () => {
  const { results } = useResults();

  if (!results) {
    return (
      <div className="min-h-screen bg-[#f5f5f7] flex flex-col">
        <header className="w-full py-6 px-8 flex justify-between items-center">
          <Link 
            to="/" 
            className="text-[#007aff] text-lg font-medium hover:text-[#0056b3] transition-colors duration-200"
            data-testid="back-home-link"
          >
            ← Back
          </Link>
          <h1 className="text-2xl font-bold text-[#1d1d1f]" data-testid="app-title">
            PlainSpeak Labs
          </h1>
          <div>
            <LangSwitch />
          </div>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center px-8 pb-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-[#1d1d1f] mb-6">No results to display</h2>
            <Link 
              to="/" 
              className="inline-block text-xl text-[#007aff] hover:text-[#0056b3] transition-colors duration-200 font-medium"
              data-testid="go-to-upload-link"
            >
              Go to Upload
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f7] flex flex-col">
      {/* Top Bar */}
      <header className="w-full py-6 px-8 flex justify-between items-center">
        <Link 
          to="/" 
          className="text-[#007aff] text-lg font-medium hover:text-[#0056b3] transition-colors duration-200"
          data-testid="back-home-link"
        >
          ← Back
        </Link>
        <h1 className="text-2xl font-bold text-[#1d1d1f]" data-testid="app-title">
          PlainSpeak Labs
        </h1>
        <div>
          <LangSwitch />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-8 pb-16">
        <div className="w-full max-w-4xl mx-auto">
          <SafetyBanner />
          <ResultSummary text={results.text} />
        </div>
      </main>
    </div>
  );
};

export default Results;
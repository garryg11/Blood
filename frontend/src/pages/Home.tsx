import { useState } from 'react';
import UploadCard from '../components/UploadCard';
import ManualEntryLink from '../components/ManualEntryLink';
import LangSwitch from '../components/LangSwitch';

const Home = () => {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  return (
    <div className="min-h-screen bg-[#f9f9f9] flex flex-col">
      {/* Top Bar */}
      <header className="w-full py-4 px-6 flex justify-between items-center">
        <div></div> {/* Empty left side */}
        <h1 className="text-xl font-bold text-[#111111]" data-testid="app-title">
          PlainSpeak Labs
        </h1>
        <div>
          <LangSwitch />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 pb-12">
        <div className="w-full max-w-sm mx-auto text-center space-y-12">
          {/* Hero Section */}
          <div className="space-y-6">
            <div className="space-y-3">
              <h2 className="text-4xl font-bold text-[#111111] leading-tight" data-testid="hero-headline">
                Your lab results, made clear.
              </h2>
              <p className="text-lg text-[#666666] leading-relaxed">
                Upload a PDF or photo. Get plain-language explanations in seconds.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <UploadCard setBusy={setBusy} setErr={setErr} />
            {/* Error Display */}
            {err && (
              <div className="text-xs text-red-600 text-center">
                {err}
              </div>
            )}
            {/* Privacy Notice */}
            <div className="text-xs text-gray-500 text-center">
              Private by design. Files aren't stored.
            </div>
          </div>

          {/* Manual Entry Link */}
          <div>
            <ManualEntryLink />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-4 px-6 text-center">
        <div className="text-xs text-gray-400">
          PlainSpeak Labs does not provide medical advice.
        </div>
      </footer>

      {/* Overlay Spinner */}
      {busy && (
        <div style={{position:"fixed",inset:0,background:"rgba(255,255,255,.6)",display:"grid",placeItems:"center"}}>
          Analyzing…
        </div>
      )}
    </div>
  );
};

export default Home;
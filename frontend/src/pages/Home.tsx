import { useState } from 'react';
import UploadCard from '../components/UploadCard';
import ManualEntryLink from '../components/ManualEntryLink';
import LangSwitch from '../components/LangSwitch';

const Home = () => {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  return (
    <div className="min-h-screen bg-[#f9f9f9] flex flex-col">
      {/* Top Bar - 56px height */}
      <header className="w-full h-14 px-6 flex justify-between items-center">
        <div></div> {/* Empty left side */}
        <h1 className="text-xl text-[#111111] header__brand" data-testid="app-title">
          PlainSpeak Labs
        </h1>
        <div>
          <LangSwitch />
        </div>
      </header>

      {/* Main Content - starts 104px below top (56px header + 48px spacing) */}
      <main className="flex-1 flex flex-col items-center px-6" style={{paddingTop: "48px"}}>
        <div className="w-full max-w-[720px] mx-auto text-center" style={{margin: "0 auto"}}>
          {/* Hero Section */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="h-hero text-[#111111]" data-testid="hero-headline">
                Your lab results, made clear.
              </h2>
              <p className="h-sub">
                Upload a PDF or photo. Get plain-language explanations in seconds.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4 mt-10">
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
          <div className="mt-8">
            <ManualEntryLink />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full px-6 text-center">
        <div className="footer-note">
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
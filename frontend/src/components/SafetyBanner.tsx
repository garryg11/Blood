const SafetyBanner = () => {
  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8" data-testid="safety-banner">
      <p className="text-yellow-800 font-medium text-lg">
        Information only — not medical advice.
      </p>
    </div>
  );
};

export default SafetyBanner;
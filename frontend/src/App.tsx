import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ResultsProvider } from './contexts/ResultsContext';
import Home from './pages/Home';
import Manual from './pages/Manual';
import Results from './pages/Results';

function App() {
  return (
    <ResultsProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/manual" element={<Manual />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </Router>
    </ResultsProvider>
  );
}

export default App;
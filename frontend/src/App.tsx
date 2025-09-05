import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Manual from './pages/Manual';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/manual" element={<Manual />} />
      </Routes>
    </Router>
  );
}

export default App;
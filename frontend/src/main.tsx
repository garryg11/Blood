import "./i18n";
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ResultsProvider } from "./store/results";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ResultsProvider>
      <App />
    </ResultsProvider>
  </React.StrictMode>,
)
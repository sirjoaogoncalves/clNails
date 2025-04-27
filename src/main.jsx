import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { setupPlaceholders } from './utils/setupPlaceholders.js';

// Set up placeholders for development
if (import.meta.env.DEV) {
  window.addEventListener('load', setupPlaceholders);
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

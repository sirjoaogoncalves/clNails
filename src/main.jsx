import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Lazy load analytics to avoid blocking main thread

const SpeedInsights = React.lazy(() => import('@vercel/speed-insights/react').then(module => ({ default: module.SpeedInsights })));
const Analytics = React.lazy(() => import('@vercel/analytics/react').then(module => ({ default: module.Analytics })));

if (import.meta.env.DEV) {
  import('./utils/setupPlaceholders.js').then(({ setupPlaceholders }) => {
    window.addEventListener('load', setupPlaceholders);
  }).catch(() => {
    // Silent fail in development
  });
}

// Register service worker
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(() => {
        // Silent registration for production
      })
      .catch(() => {
        // Silent failure for production
      });
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <React.Suspense fallback={null}>
      <SpeedInsights />
      <Analytics />
    </React.Suspense>
  </React.StrictMode>,
);

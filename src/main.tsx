// File: src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Standardizes parent context for all child navigation links
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import './index.css';

// Step 3: Wrap mount target in ErrorBoundary and BrowserRouter to prevent runtime rendering crashes
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);

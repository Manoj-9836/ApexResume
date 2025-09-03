import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { TemplateProvider } from './context/TemplateContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TemplateProvider>
      <App />
    </TemplateProvider>
  </React.StrictMode>
);
reportWebVitals();

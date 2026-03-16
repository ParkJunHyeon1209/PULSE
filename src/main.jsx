import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import AppThemeWrapper from './components/layout/AppThemeWrapper';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AppThemeWrapper>
        <App />
      </AppThemeWrapper>
    </BrowserRouter>
  </StrictMode>
);

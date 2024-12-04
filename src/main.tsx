import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import './globals.css';
import { LoaderProvider } from '@/context/loader';
import { ThemeProvider } from '@/context/color-theme';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <LoaderProvider>
        <App />
      </LoaderProvider>
    </ThemeProvider>
  </React.StrictMode>
);

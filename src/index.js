import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './AuthProvider';
import { BrowserRouter } from 'react-router-dom';
import SessionManager from './SessionManager';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <SessionManager/>
        <App />
      </BrowserRouter>
    </AuthProvider>
  // </React.StrictMode>
);

reportWebVitals();

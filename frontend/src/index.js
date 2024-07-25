// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // Note le changement d'import
import './index.css';
import App from './App';

// Créer un root à partir du DOM
const root = ReactDOM.createRoot(document.getElementById('root'));



// Rendre le composant App à l'intérieur du root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


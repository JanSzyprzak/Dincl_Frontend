import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import ModalWrapper from './components/ModalWrapper.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Render the modal root directly in main.jsx
ReactDOM.createRoot(document.getElementById('modal-root')).render(
  <React.StrictMode>
    <ModalWrapper />
  </React.StrictMode>
);
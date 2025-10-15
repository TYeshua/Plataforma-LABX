import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import 'keen-slider/keen-slider.min.css'; // <-- Adicione esta linha

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
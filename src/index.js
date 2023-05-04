import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import App from './components/app';

const container = document.getElementById('root');
const root = createRoot(container);

document.body.classList.add('body');

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

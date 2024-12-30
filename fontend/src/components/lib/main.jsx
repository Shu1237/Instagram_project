import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../lib/index.css'
import App from '../lib/App'; 
import { BrowserRouter as Router } from 'react-router-dom';



createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Router>
  <App />
  </Router>
  </StrictMode>
);

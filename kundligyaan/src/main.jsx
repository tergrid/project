import { StrictMode } from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { createRoot } from 'react-dom/client'
import './index.css'
import "./styles/Navbar.css";
import './styles/MainSection.css';
import "./styles/AstrologyCarousel.css";

import "./styles/Footer.css";
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './bootstrap/bootstrap.css';
import './css/main.css';
createRoot(document.getElementById('root')).render(
  <>
    <App />
  </>,
)

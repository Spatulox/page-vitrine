import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./main.css"
import "./pages/Sessions/Sessions.css"
import "./pages/Contact/Contact.css"
import "./pages/Account/Account.css"
import "./pages/Users/User.css"



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

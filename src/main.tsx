import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { AnalysesProvider } from './store/analyses'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AnalysesProvider>
        <App />
      </AnalysesProvider>
    </BrowserRouter>
  </StrictMode>,
)

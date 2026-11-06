import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './App.css'
import '../lib/turtle-ui/style.css'
import { App } from './App.jsx'
import { ToastProvider } from './components/toast/Toast.jsx'
import { initMetaPixel } from './lib/metaPixel.js'

initMetaPixel()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </HelmetProvider>
  </StrictMode>,
)

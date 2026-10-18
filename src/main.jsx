import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// NOTE: no StrictMode — it double-mounts the WebGL lamp and churns two
// GL contexts every load; single mount is the sane default for canvas work.
createRoot(document.getElementById('root')).render(<App />)

import React from 'react'
import ReactDOM from 'react-dom/client'
import SparklePortal from './SparklePortal.jsx'
import Hub from './Hub.jsx'

// "/og" (or "/archive") keeps the original spiral portal, exactly as it was.
const path = window.location.pathname.replace(/\/+$/, '')
const isOG = path === '/og' || path === '/archive'

function OGPage() {
  return (
    <>
      <SparklePortal />
      <a
        href="/"
        style={{
          position: 'fixed', bottom: 22, left: '50%', transform: 'translateX(-50%)', zIndex: 30,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
          fontFamily: "'Quicksand', sans-serif", fontSize: 12, fontWeight: 600,
          color: 'rgba(255,255,255,0.6)', textDecoration: 'none', whiteSpace: 'nowrap',
          padding: '6px 14px', borderRadius: 20,
          border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(5,13,24,0.75)',
        }}
      >
        <span>← the new portal ✨</span>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: 8, letterSpacing: 2,
          color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase',
        }}>og spirals · archive</span>
      </a>
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {isOG ? <OGPage /> : <Hub />}
  </React.StrictMode>,
)

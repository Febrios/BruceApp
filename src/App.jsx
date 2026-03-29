import { useEffect, useState } from 'react'
import './App.css'
import { fetchBruceInfo, fetchHealth } from './api'

function App() {
  const [bruceInfo, setBruceInfo] = useState(null)
  const [health, setHealth] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isAuthed, setIsAuthed] = useState(() => {
    if (typeof window === 'undefined') return false
    return Boolean(window.localStorage.getItem('bruceBasicToken'))
  })

  useEffect(() => {
    if (!isAuthed) return

    let cancelled = false

    async function load() {
      setLoading(true)
      try {
        const [info, healthStatus] = await Promise.all([
          fetchBruceInfo(),
          fetchHealth(),
        ])

        if (!cancelled) {
          setBruceInfo(info)
          setHealth(healthStatus)
          setError(null)
        }
      } catch (err) {
        if (!cancelled) {
          console.error('Failed to load Bruce API data', err)
          setError(err.message || 'Failed to load Bruce API data')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [isAuthed])

  function handleLogin(event) {
    event.preventDefault()

    try {
      const token = btoa(`${username}:${password}`)
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('bruceBasicToken', token)
      }
      setIsAuthed(true)
      setError(null)
    } catch (err) {
      console.error('Failed to encode credentials', err)
      setError('Failed to process credentials')
    }
  }

  function handleLogout() {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('bruceBasicToken')
    }
    setIsAuthed(false)
    setBruceInfo(null)
    setHealth(null)
    setUsername('')
    setPassword('')
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Meet Bruce</h1>
        <p>Your OpenClaw assistant, now wired to the live Bruce API.</p>
      </header>

      <main className="app-main">
        {!isAuthed && (
          <section className="card">
            <h2>Sign in to Bruce</h2>
            <p className="lead">Enter the static credentials to access the live Bruce API dashboard.</p>

            <form onSubmit={handleLogin} className="field-grid">
              <div className="field">
                <label className="label" htmlFor="username">Username</label>
                <input
                  id="username"
                  type="text"
                  className="value"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  required
                />
              </div>
              <div className="field">
                <label className="label" htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  className="value"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
              </div>
              <div className="field" style={{ alignSelf: 'flex-end' }}>
                <button type="submit" className="value">
                  Sign in
                </button>
              </div>
            </form>

            {error && (
              <p className="status status-error" style={{ marginTop: '1rem' }}>
                <span>{error}</span>
              </p>
            )}
          </section>
        )}

        {isAuthed && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              {loading && <p className="status status-loading">Loading Bruce API data…</p>}
              {!loading && error && (
                <p className="status status-error">
                  Unable to reach Bruce-Api: <span>{error}</span>
                </p>
              )}
              <button type="button" onClick={handleLogout} className="value">
                Sign out
              </button>
            </div>

            {!loading && !error && (
              <>
                {bruceInfo && (
                  <section className="card">
                    <h2>Bruce Profile (from API)</h2>
                    <p className="lead">{bruceInfo.description}</p>

                    <div className="field-grid">
                      <div className="field">
                        <span className="label">Name</span>
                        <span className="value">{bruceInfo.name}</span>
                      </div>
                      <div className="field">
                        <span className="label">Version</span>
                        <span className="value">{bruceInfo.version}</span>
                      </div>
                    </div>

                    {Array.isArray(bruceInfo.capabilities) && bruceInfo.capabilities.length > 0 && (
                      <div className="subsection">
                        <h3>Capabilities</h3>
                        <ul>
                          {bruceInfo.capabilities.map((cap, idx) => (
                            <li key={idx}>{cap}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {bruceInfo.principles && (
                      <div className="subsection principles">
                        <h3>Design Principles</h3>
                        <ul>
                          {Object.entries(bruceInfo.principles).map(([key, value]) => (
                            <li key={key}>
                              <strong>{key}</strong> – {value}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </section>
                )}

                {health && (
                  <section className="card">
                    <h2>Bruce-Api Health</h2>
                    <div className="field-grid">
                      <div className="field">
                        <span className="label">Status</span>
                        <span className={`value badge badge-${health.status?.toLowerCase?.() || 'unknown'}`}>
                          {health.status}
                        </span>
                      </div>
                      <div className="field">
                        <span className="label">Service</span>
                        <span className="value">{health.service}</span>
                      </div>
                      <div className="field">
                        <span className="label">Environment</span>
                        <span className="value">{health.environment}</span>
                      </div>
                      <div className="field">
                        <span className="label">Timestamp (UTC)</span>
                        <span className="value small">{health.timestampUtc}</span>
                      </div>
                    </div>
                  </section>
                )}
              </>
            )}
          </>
        )}
      </main>

      <footer className="app-footer">
        <small>
          Frontend: React + Vite. Backend: Bruce-Api (.NET) @{' '}
          <code>{import.meta.env.VITE_BRUCE_API_BASE_URL || 'https://bruce-api-web.azurewebsites.net'}</code>
        </small>
      </footer>
    </div>
  )
}

export default App

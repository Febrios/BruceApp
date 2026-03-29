import './App.css'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Meet Bruce</h1>
        <p>Your OpenClaw assistant: fast, pragmatic, and built to actually get things done.</p>
      </header>

      <main className="app-main">
        <section className="card">
          <h2>What Bruce Can Do</h2>
          <ul>
            <li>Automate workflows across chat, GitHub, and cron jobs.</li>
            <li>Read and update your OpenClaw workspace files safely.</li>
            <li>Monitor tasks like daily weather reports and system heartbeats.</li>
            <li>Spin up code projects, CI pipelines, and simple bots from scratch.</li>
          </ul>
        </section>

        <section className="card">
          <h2>Design Principles</h2>
          <ul>
            <li><strong>SOLID</strong> – clear responsibilities and extensible design.</li>
            <li><strong>DRY</strong> – no copy‑paste logic; reuse smart building blocks.</li>
            <li><strong>KISS</strong> – keep things stupidly simple and easy to reason about.</li>
          </ul>
        </section>

        <section className="card">
          <h2>Why This Sandbox Exists</h2>
          <p>
            BruceApp is a playground for exploring what Bruce can do: from simple
            status pages to interactive tools that showcase real capabilities running
            on your OpenClaw instance.
          </p>
        </section>
      </main>

      <footer className="app-footer">
        <small>Powered by React, Vite, and OpenClaw.</small>
      </footer>
    </div>
  )
}

export default App

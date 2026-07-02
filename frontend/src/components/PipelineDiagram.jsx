// The hero's signature visual: a small animated diagram of a request
// traveling Client → Django API → PostgreSQL, with an async branch to
// Celery/Redis — literally the shape of the systems this portfolio's
// owner builds for a living, rendered as glowing pulses on moving paths.
export default function PipelineDiagram() {
  return (
    <div className="pipeline-card">
      <div className="pipeline-card-label">
        <span>system overview</span>
        <span>live</span>
      </div>
      <svg viewBox="0 0 440 260" width="100%" role="img" aria-label="Diagram of a request flowing from client to API to database, with an async branch to Celery and Redis">
        <defs>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#6c63ff" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0.55" />
          </linearGradient>
        </defs>

        {/* connecting lines */}
        <path id="p1" d="M70,60 L215,60" stroke="url(#lineGrad)" strokeWidth="1.5" fill="none" />
        <path id="p2" d="M225,70 L225,150" stroke="url(#lineGrad)" strokeWidth="1.5" fill="none" />
        <path id="p3" d="M235,60 L380,60" stroke="url(#lineGrad)" strokeWidth="1.5" fill="none" />

        {/* Client node */}
        <g className="pipeline-node">
          <circle cx="45" cy="60" r="22" fill="#121828" stroke="#6c63ff" strokeWidth="1.5" />
          <text x="45" y="65" textAnchor="middle" fontSize="9" fill="#eef1f8">client</text>
        </g>

        {/* API node */}
        <g className="pipeline-node">
          <rect x="185" y="38" width="80" height="44" rx="10" fill="#121828" stroke="#2dd4bf" strokeWidth="1.5" />
          <text x="225" y="56" textAnchor="middle" fontSize="9" fill="#eef1f8">Django</text>
          <text x="225" y="70" textAnchor="middle" fontSize="9" fill="#9aa4bb">DRF API</text>
        </g>

        {/* DB node */}
        <g className="pipeline-node">
          <ellipse cx="405" cy="52" rx="26" ry="9" fill="#121828" stroke="#6c63ff" strokeWidth="1.5" />
          <path d="M379,52 L379,72 A26,9 0 0 0 431,72 L431,52" fill="#121828" stroke="#6c63ff" strokeWidth="1.5" />
          <text x="405" y="86" textAnchor="middle" fontSize="9" fill="#9aa4bb">PostgreSQL</text>
        </g>

        {/* Celery/Redis node */}
        <g className="pipeline-node">
          <rect x="185" y="150" width="80" height="44" rx="10" fill="#121828" stroke="#6c63ff" strokeWidth="1.5" />
          <text x="225" y="168" textAnchor="middle" fontSize="9" fill="#eef1f8">Celery</text>
          <text x="225" y="182" textAnchor="middle" fontSize="9" fill="#9aa4bb">+ Redis</text>
        </g>

        {/* animated pulses traveling the paths */}
        <circle r="3.2" fill="#2dd4bf" className="pipeline-glow">
          <animateMotion dur="2.4s" repeatCount="indefinite" begin="0s">
            <mpath href="#p1" />
          </animateMotion>
        </circle>
        <circle r="3.2" fill="#6c63ff" className="pipeline-glow">
          <animateMotion dur="2.2s" repeatCount="indefinite" begin="0.6s">
            <mpath href="#p3" />
          </animateMotion>
        </circle>
        <circle r="3" fill="#6c63ff" className="pipeline-glow">
          <animateMotion dur="2.6s" repeatCount="indefinite" begin="1.1s">
            <mpath href="#p2" />
          </animateMotion>
        </circle>

        <text x="150" y="105" textAnchor="middle" fontSize="8" fill="#626d85" fontFamily="JetBrains Mono, monospace">
          sync
        </text>
        <text x="255" y="120" textAnchor="middle" fontSize="8" fill="#626d85" fontFamily="JetBrains Mono, monospace">
          async job
        </text>
      </svg>
      <div className="pipeline-card-label" style={{ marginTop: 4, marginBottom: 0 }}>
        <span>request → response</span>
        <span style={{ color: '#34d399' }}>200 OK · ~80ms</span>
      </div>
    </div>
  )
}

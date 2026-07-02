import { useEffect, useState } from 'react'

// The hero's signature element: a mock terminal window that "types out"
// a GET /profile response, since the person behind this portfolio builds
// REST APIs for a living. Kept to one moment of motion, everything else
// on the page stays quiet.
export default function ResponseCard({ profile }) {
  const lines = buildLines(profile)
  const fullText = lines.join('\n')
  const [shown, setShown] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!fullText) return
    let i = 0
    const speed = 6 // ms per character batch
    const step = () => {
      i += 3
      setShown(fullText.slice(0, i))
      if (i < fullText.length) {
        window.requestAnimationFrame(() => setTimeout(step, speed))
      } else {
        setDone(true)
      }
    }
    step()
  }, [fullText])

  return (
    <div className="response-card">
      <div className="response-card-bar">
        <div className="traffic"><span /><span /><span /></div>
        <span className="req">GET /api/profile → 200 OK</span>
      </div>
      <pre>{renderColored(shown)}{!done && <span className="cursor" />}</pre>
    </div>
  )
}

function buildLines(profile) {
  if (!profile) {
    return ['{', '  "status": "loading..."', '}']
  }
  return [
    '{',
    `  "name": "${profile.name}",`,
    `  "title": "${profile.title}",`,
    `  "location": "${profile.location}",`,
    `  "focus": ["Django", "DRF", "PostgreSQL", "Celery"],`,
    `  "experience_years": 1.5,`,
    `  "available_for_hire": ${profile.available_for_hire},`,
    '}',
  ]
}

// Very small hand-rolled syntax highlighter for the JSON-ish text above —
// no need for a dependency for four token types.
function renderColored(text) {
  const parts = text.split(/(".*?")/g)
  return parts.map((part, idx) => {
    if (part.startsWith('"') && part.endsWith('"')) {
      const isKey = text.indexOf(part) > 0 && text[text.indexOf(part) - 1] !== ':'
      return <span key={idx} className={isKey ? 'k' : 's'}>{part}</span>
    }
    return <span key={idx} className="punct">{part}</span>
  })
}

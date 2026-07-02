import { useEffect, useState } from 'react'
import RouteTag from '../components/RouteTag.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import { Reveal } from '../hooks/useReveal.jsx'
import { api } from '../api/client.js'

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [state, setState] = useState('loading')

  useEffect(() => {
    api.getProjects()
      .then((data) => { setProjects(data); setState('ready') })
      .catch(() => setState('error'))
  }, [])

  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <RouteTag method="GET" path="/projects" status={state === 'ready' ? `200 · ${projects.length} results` : undefined} />
          <h2>Projects</h2>
        </div>

        {state === 'loading' && <p className="loading-state">Fetching /api/projects/ …</p>}
        {state === 'error' && (
          <p className="error-state">
            Couldn't reach the API. Make sure the Django backend is running on http://127.0.0.1:8000.
          </p>
        )}
        {state === 'ready' && (
          <div className="project-grid">
            {projects.map((p, i) => (
              <Reveal key={p.id} delay={(i % 3) + 1}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

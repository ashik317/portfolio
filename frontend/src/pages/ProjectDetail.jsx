import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import RouteTag from '../components/RouteTag.jsx'
import { api } from '../api/client.js'

export default function ProjectDetail() {
  const { slug } = useParams()
  const [project, setProject] = useState(null)
  const [state, setState] = useState('loading')

  useEffect(() => {
    setState('loading')
    api.getProject(slug)
      .then((data) => { setProject(data); setState('ready') })
      .catch(() => setState('error'))
  }, [slug])

  if (state === 'loading') return <p className="loading-state">Fetching /api/projects/{slug}/ …</p>
  if (state === 'error' || !project) return <p className="error-state">Project not found.</p>

  return (
    <section className="section project-detail">
      <div className="container">
        <Link to="/projects" className="back-link">← back to /projects</Link>

        <div className="project-detail-head">
          <RouteTag method="GET" path={`/projects/${project.slug}`} status="200" />
          <span className={`status-tag ${project.status}`}>
            {project.status === 'live' ? 'Live' : project.status === 'wip' ? 'In progress' : 'Archived'}
          </span>
        </div>

        <h1>{project.title}</h1>
        <p className="lede">{project.summary}</p>
        {project.description && <p className="body-text">{project.description}</p>}

        <div className="tech-row" style={{ marginBottom: 32 }}>
          {project.tech_list.map((t) => (
            <span className="tech-tag" key={t}>{t}</span>
          ))}
        </div>

        {project.highlights?.length > 0 && (
          <ul className="detail-highlights">
            {project.highlights.map((h) => (
              <li key={h.id}>
                <span className="marker">▸</span>
                <span>{h.text}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="hero-actions">
          {project.live_url && <a href={project.live_url} target="_blank" rel="noreferrer" className="btn btn-primary">Open live app ↗</a>}
          {project.docs_url && <a href={project.docs_url} target="_blank" rel="noreferrer" className="btn btn-ghost">API docs ↗</a>}
          {project.github_url && <a href={project.github_url} target="_blank" rel="noreferrer" className="btn btn-ghost">Source code ↗</a>}
        </div>
      </div>
    </section>
  )
}

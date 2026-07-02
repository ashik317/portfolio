import { Link } from 'react-router-dom'

const STATUS_LABEL = {
  live: 'Live',
  wip: 'In progress',
  archived: 'Archived',
}

export default function ProjectCard({ project }) {
  return (
    <div className="project-card">
      <div className="project-card-top">
        <span className={`status-tag ${project.status}`}>{STATUS_LABEL[project.status]}</span>
      </div>
      <h3>
        <Link to={`/projects/${project.slug}`}>{project.title}</Link>
      </h3>
      <p className="summary">{project.summary}</p>
      <div className="tech-row">
        {project.tech_list.slice(0, 5).map((tech) => (
          <span className="tech-tag" key={tech}>{tech}</span>
        ))}
      </div>
      <div className="project-links">
        <Link to={`/projects/${project.slug}`}>View details →</Link>
        {project.live_url && (
          <a href={project.live_url} target="_blank" rel="noreferrer">Live app ↗</a>
        )}
        {project.github_url && (
          <a href={project.github_url} target="_blank" rel="noreferrer">Code ↗</a>
        )}
      </div>
    </div>
  )
}

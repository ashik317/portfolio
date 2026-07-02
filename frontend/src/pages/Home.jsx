import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import RouteTag from '../components/RouteTag.jsx'
import PipelineDiagram from '../components/PipelineDiagram.jsx'
import RoleRotator from '../components/RoleRotator.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import { Reveal } from '../hooks/useReveal.jsx'
import { api } from '../api/client.js'

export default function Home({ profile }) {
  const [skillGroups, setSkillGroups] = useState([])
  const [experience, setExperience] = useState([])
  const [education, setEducation] = useState([])
  const [achievements, setAchievements] = useState([])
  const [projects, setProjects] = useState([])

  useEffect(() => {
    api.getSkillGroups().then(setSkillGroups).catch(() => {})
    api.getExperience().then(setExperience).catch(() => {})
    api.getEducation().then(setEducation).catch(() => {})
    api.getAchievements().then(setAchievements).catch(() => {})
    api.getProjects().then(setProjects).catch(() => {})
  }, [])

  const featured = projects.filter((p) => p.is_featured)

  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <div className="eyebrow-row">
              <RouteTag method="GET" path="/profile" status="200" />
              {profile?.available_for_hire && (
                <span className="availability">
                  <span className="pulse" /> Open to opportunities
                </span>
              )}
            </div>
            <h1>
              Hi, I'm <span className="gradient-text">{profile ? profile.name.split(' ')[0] : 'Ashikur'}</span>.
            </h1>
            <RoleRotator />
            <p className="hero-lede">
              {profile?.summary
                ? profile.summary
                : 'Backend developer specializing in Django REST Framework, multi-tenant SaaS architecture, and async task processing.'}
            </p>
            <div className="hero-actions">
              <Link to="/projects" className="btn btn-primary">View projects</Link>
              <Link to="/contact" className="btn btn-ghost">Get in touch</Link>
            </div>
          </div>
          <PipelineDiagram />
        </div>
      </section>

      {/* ---------- ABOUT ---------- */}
      <section className="section" id="about">
        <div className="container about-grid">
          <Reveal>
            <div className="section-head">
              <RouteTag method="GET" path="/about" />
              <h2>Building the parts users never see, so the parts they do see just work.</h2>
            </div>
            <div className="about-copy">
              <p>{profile?.summary}</p>
              {education.map((ed) => (
                <p key={ed.id}>
                  <strong>{ed.degree}</strong> — {ed.institution} ({ed.start_date} – {ed.end_date})
                </p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={2}>
            <div className="stat-grid">
              <div className="stat-card">
                <div className="num grad">1.5+ yrs</div>
                <div className="label">Production backend experience</div>
              </div>
              <div className="stat-card">
                <div className="num grad">2</div>
                <div className="label">Live multi-tenant SaaS platforms shipped</div>
              </div>
              <div className="stat-card">
                <div className="num grad">4</div>
                <div className="label">REST APIs designed &amp; documented</div>
              </div>
              <div className="stat-card">
                <div className="num grad">2×</div>
                <div className="label">Project-show runner-up awards</div>
              </div>
            </div>
            {achievements.length > 0 && (
              <div style={{ marginTop: 20 }}>
                {achievements.map((a) => (
                  <p key={a.id} style={{ fontSize: 14, color: 'var(--ink-soft)', marginBottom: 6 }}>
                    🏅 {a.text} <span style={{ color: 'var(--ink-faint)' }}>· {a.year}</span>
                  </p>
                ))}
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {/* ---------- SKILLS ---------- */}
      <section className="section-tight section-alt">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <RouteTag method="GET" path="/skills" />
              <h2>Toolbox</h2>
            </div>
          </Reveal>
          <div className="skills-grid">
            {skillGroups.map((group, i) => (
              <Reveal key={group.id} delay={(i % 3) + 1}>
                <div className="skill-group">
                  <h4>{group.name}</h4>
                  <div className="skill-chips">
                    {group.skills.map((s) => (
                      <span className="chip" key={s.id}>{s.name}</span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- EXPERIENCE ---------- */}
      <section className="section">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <RouteTag method="GET" path="/experience" />
              <h2>Where I've worked</h2>
            </div>
          </Reveal>
          <div className="timeline">
            {experience.map((exp) => (
              <Reveal as="div" key={exp.id}>
                <div className="timeline-item">
                  <div className="when">{exp.start_date} — {exp.end_date}</div>
                  <h3>{exp.role} · {exp.company}</h3>
                  {exp.subtitle && <p className="sub">{exp.subtitle}</p>}
                  <ul>
                    {exp.highlights.map((h) => (
                      <li key={h.id}>{h.text}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- FEATURED PROJECTS ---------- */}
      <section className="section section-alt">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <RouteTag method="GET" path="/projects?featured=true" />
              <h2>Selected work</h2>
            </div>
          </Reveal>
          <div className="project-grid">
            {featured.map((p, i) => (
              <Reveal key={p.id} delay={(i % 3) + 1}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
          <div style={{ marginTop: 40, textAlign: 'center' }}>
            <Link to="/projects" className="btn btn-ghost">See all projects →</Link>
          </div>
        </div>
      </section>
    </>
  )
}

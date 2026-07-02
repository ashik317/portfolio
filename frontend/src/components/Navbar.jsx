import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/#about', label: 'About', end: false, hash: true },
  { to: '/projects', label: 'Projects', end: false },
  { to: '/blog', label: 'Blog', end: false },
  { to: '/contact', label: 'Contact', end: false },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <NavLink to="/" className="brand" onClick={() => setOpen(false)}>
          Ashikur.dev | Software Engineer
        </NavLink>

        <button className="nav-toggle" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
          {open ? 'close' : 'menu'}
        </button>

        <nav className={`nav-links ${open ? 'open' : ''}`}>
          {LINKS.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              end={link.end}
              className={({ isActive }) => `nav-link ${isActive && !link.hash ? 'active' : ''}`}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}

import { useState } from 'react'
import RouteTag from '../components/RouteTag.jsx'
import { api } from '../api/client.js'

const EMPTY_FORM = { name: '', email: '', subject: '', message: '' }

export default function Contact({ profile }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [status, setStatus] = useState(null) // null | 'sending' | 'ok' | 'err'

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await api.sendContactMessage(form)
      setStatus('ok')
      setForm(EMPTY_FORM)
    } catch (err) {
      setStatus('err')
    }
  }

  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <RouteTag method="POST" path="/contact" />
          <h2>Let's talk</h2>
        </div>

        <div className="contact-grid">
          <div className="contact-card">
            <div className="item">
              <span className="label">Email</span>
              {profile?.email
                ? <a href={`mailto:${profile.email}`}>{profile.email}</a>
                : <span className="value">—</span>}
            </div>
            <div className="item">
              <span className="label">Phone</span>
              <span className="value">{profile?.phone || '—'}</span>
            </div>
            <div className="item">
              <span className="label">Location</span>
              <span className="value">{profile?.location || '—'}</span>
            </div>
            <div className="item">
              <span className="label">GitHub</span>
              {profile?.github_url
                ? <a href={profile.github_url} target="_blank" rel="noreferrer">{profile.github_url.replace('https://', '')}</a>
                : <span className="value">—</span>}
            </div>
            <div className="item">
              <span className="label">LinkedIn</span>
              {profile?.linkedin_url
                ? <a href={profile.linkedin_url} target="_blank" rel="noreferrer">{profile.linkedin_url.replace('https://', '')}</a>
                : <span className="value">—</span>}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {status === 'ok' && (
              <div className="form-status ok">201 Created — message sent. I'll reply by email soon.</div>
            )}
            {status === 'err' && (
              <div className="form-status err">Something went wrong sending that. Please try again or email directly.</div>
            )}

            <div className="form-field">
              <label htmlFor="name">Name</label>
              <input id="name" name="name" value={form.name} onChange={handleChange} required />
            </div>
            <div className="form-field">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" value={form.email} onChange={handleChange} required />
            </div>
            <div className="form-field">
              <label htmlFor="subject">Subject</label>
              <input id="subject" name="subject" value={form.subject} onChange={handleChange} />
            </div>
            <div className="form-field">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" value={form.message} onChange={handleChange} required />
            </div>

            <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

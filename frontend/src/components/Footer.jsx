export default function Footer({ profile }) {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">Ashikur.dev</div>
          <div className="footer-links">
            {profile?.github_url && <a href={profile.github_url} target="_blank" rel="noreferrer">GitHub</a>}
            {profile?.linkedin_url && <a href={profile.linkedin_url} target="_blank" rel="noreferrer">LinkedIn</a>}
            {profile?.email && <a href={`mailto:${profile.email}`}>Email</a>}
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {year} {profile?.name || 'Ashikur Rahman Likhon'}</span>
          <span>Built with Django REST Framework + React</span>
        </div>
      </div>
    </footer>
  )
}

import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import RouteTag from '../components/RouteTag.jsx'
import { api } from '../api/client.js'

function formatDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function BlogDetail() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [state, setState] = useState('loading')

  useEffect(() => {
    setState('loading')
    api.getBlogPost(slug)
      .then((data) => { setPost(data); setState('ready') })
      .catch(() => setState('error'))
  }, [slug])

  if (state === 'loading') return <p className="loading-state">Fetching /api/blog/{slug}/ …</p>
  if (state === 'error' || !post) return <p className="error-state">Post not found.</p>

  const paragraphs = post.body.split('\n').map((p) => p.trim()).filter(Boolean)

  return (
    <section className="section blog-detail">
      <div className="container">
        <Link to="/blog" className="back-link">← back to /blog</Link>
        <RouteTag method="GET" path={`/blog/${post.slug}`} status="200" />
        <h1 style={{ marginTop: 18 }}>{post.title}</h1>
        <div className="meta">Published {formatDate(post.published_at)}</div>
        <div className="body-text">
          {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
        </div>
      </div>
    </section>
  )
}

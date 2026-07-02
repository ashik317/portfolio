import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import RouteTag from '../components/RouteTag.jsx'
import { api } from '../api/client.js'

function formatDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

export default function Blog() {
  const [posts, setPosts] = useState([])
  const [state, setState] = useState('loading')

  useEffect(() => {
    api.getBlogPosts()
      .then((data) => { setPosts(data); setState('ready') })
      .catch(() => setState('error'))
  }, [])

  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <RouteTag path="/blog" status={state === 'ready' ? `200 · ${posts.length} results` : undefined} />
          <h2>Notes on backend work</h2>
        </div>

        {state === 'loading' && <p className="loading-state">Fetching /api/blog/ …</p>}
        {state === 'error' && <p className="error-state">Couldn't reach the API. Is Django running on :8000?</p>}
        {state === 'ready' && posts.length === 0 && <p className="empty-state">No posts published yet.</p>}

        {state === 'ready' && posts.length > 0 && (
          <div className="blog-list">
            {posts.map((post) => (
              <Link to={`/blog/${post.slug}`} className="blog-row" key={post.id}>
                <div className="blog-row-main">
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                </div>
                <span className="date">{formatDate(post.published_at)}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

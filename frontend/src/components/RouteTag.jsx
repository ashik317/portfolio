// A small pill styled like an API route, e.g. "GET /projects  200".
// Used as section eyebrows throughout the site since the portfolio
// owner is a REST API developer — the whole site is framed as a set
// of endpoints you're browsing.
export default function RouteTag({ method = 'GET', path, status }) {
  return (
    <span className={`route ${method.toLowerCase()}`}>
      <span className="method">{method}</span>
      <span>{path}</span>
      {status && <span className="status">{status}</span>}
    </span>
  )
}

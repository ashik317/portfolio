// Small fetch wrapper around the Django REST API.
// Change API_BASE if your backend runs somewhere other than localhost:8000.
const API_BASE = 'http://127.0.0.1:8000/api'

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`API error ${res.status}: ${body}`)
  }
  if (res.status === 204) return null
  return res.json()
}

export const api = {
  getProfile: () => request('/profile/'),
  getSkillGroups: () => request('/skills/'),
  getExperience: () => request('/experience/'),
  getEducation: () => request('/education/'),
  getAchievements: () => request('/achievements/'),
  getProjects: () => request('/projects/'),
  getProject: (slug) => request(`/projects/${slug}/`),
  getBlogPosts: () => request('/blog/'),
  getBlogPost: (slug) => request(`/blog/${slug}/`),
  sendContactMessage: (payload) =>
    request('/contact/', { method: 'POST', body: JSON.stringify(payload) }),
}

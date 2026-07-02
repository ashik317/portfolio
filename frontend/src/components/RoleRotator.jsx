import { useEffect, useState } from 'react'

const ROLES = [
  'Django Backend Developer',
  'DRF API Architect',
  'PostgreSQL Performance Tuner',
  'Multi-Tenant SaaS Builder',
]

// Simple typewriter that cycles through role titles — a small, contained
// bit of motion in the hero rather than scattered animation everywhere.
export default function RoleRotator() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = ROLES[roleIndex]
    const speed = deleting ? 28 : 55
    const pause = 1400

    if (!deleting && text === current) {
      const t = setTimeout(() => setDeleting(true), pause)
      return () => clearTimeout(t)
    }
    if (deleting && text === '') {
      setDeleting(false)
      setRoleIndex((i) => (i + 1) % ROLES.length)
      return
    }
    const t = setTimeout(() => {
      setText(deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1))
    }, speed)
    return () => clearTimeout(t)
  }, [text, deleting, roleIndex])

  return (
    <div className="role-rotator">
      {text}
      <span className="caret" />
    </div>
  )
}

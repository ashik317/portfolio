import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Projects from './pages/Projects.jsx'
import ProjectDetail from './pages/ProjectDetail.jsx'
import Blog from './pages/Blog.jsx'
import BlogDetail from './pages/BlogDetail.jsx'
import Contact from './pages/Contact.jsx'
import { api } from './api/client.js'

export default function App() {
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    api.getProfile().then(setProfile).catch(() => setProfile(null))
  }, [])

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home profile={profile} />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route path="/contact" element={<Contact profile={profile} />} />
      </Routes>
      <Footer profile={profile} />
    </>
  )
}

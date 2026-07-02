import { useEffect, useRef, useState } from 'react'

// Adds the .in-view class once an element scrolls into the viewport.
// Pair with the .reveal CSS class for a fade-up-on-scroll effect.
export function useReveal(threshold = 0.15) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.unobserve(el)
        }
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return [ref, inView]
}

// Wrapper component version for convenience.
export function Reveal({ as: Tag = 'div', delay, className = '', children, ...rest }) {
  const [ref, inView] = useReveal()
  const delayClass = delay ? `reveal-delay-${delay}` : ''
  return (
    <Tag ref={ref} className={`reveal ${delayClass} ${inView ? 'in-view' : ''} ${className}`} {...rest}>
      {children}
    </Tag>
  )
}

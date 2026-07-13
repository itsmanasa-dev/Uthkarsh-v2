import { useRef, useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { eventConfig } from '../../data/eventConfig'
import './Statistics.css'

interface StatDef {
  value: number | null
  display: string
  label: string
  sub: string | null
}

const stats: StatDef[] = [
  { value: 50, display: '50', label: 'MAXIMUM TEAMS', sub: 'LIMITED' },
  { value: 200, display: '200', label: 'MAXIMUM PARTICIPANTS', sub: null },
  { value: null, display: '6 HOURS', label: 'HACKATHON DURATION', sub: null },
  { value: null, display: '2\u20134', label: 'TEAM SIZE', sub: 'PER TEAM' },
]

function AnimatedValue({ stat, inView }: { stat: StatDef; inView: boolean }) {
  const [count, setCount] = useState(0)
  const frameRef = useRef(0)

  useEffect(() => {
    if (!inView || stat.value === null) return
    setCount(0)
    const target = stat.value
    const duration = 1200
    const start = performance.now()

    const tick = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) frameRef.current = requestAnimationFrame(tick)
    }

    frameRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameRef.current)
  }, [inView, stat.value])

  if (stat.value !== null) return <>{count}</>
  return <>{stat.display}</>
}

function StatCard({ stat, index }: { stat: StatDef; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect() } },
      { rootMargin: '-40px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <motion.div
      ref={ref}
      className="stats__item"
      initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="stats__index">
        <span className="stats__index-num">0{index + 1}</span>
        <span className="stats__index-line" />
      </div>
      <span className="stats__value">
        <AnimatedValue stat={stat} inView={inView} />
      </span>
      <span className="stats__label">{stat.label}</span>
      {stat.sub && <span className="stats__sub">{stat.sub}</span>}
      <div className="stats__bar">
        <motion.div
          className="stats__bar-fill"
          initial={{ width: '0%' }}
          whileInView={{ width: index === 0 ? '100%' : index === 1 ? '80%' : index === 2 ? '50%' : '60%' }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </motion.div>
  )
}

export function Statistics() {
  return (
    <section className="stats light-section" id="stats">
      <div className="container">
        <div className="stats__header">
          <span className="section-eyebrow">ACT 03 — SYSTEM METRICS</span>
        </div>
        <div className="stats__grid">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
        <div className="stats__footer">
          <span className="status-dot status-dot--active" />
          <span className="stats__footer-text">{eventConfig.eventDate} — {eventConfig.maximumTeams} teams max</span>
        </div>
      </div>
    </section>
  )
}

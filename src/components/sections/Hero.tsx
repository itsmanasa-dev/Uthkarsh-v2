import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { eventConfig } from '../../data/eventConfig'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import './Hero.css'

const metaItems = [
  { label: 'HOST', value: eventConfig.institutionShort },
  { label: 'DEPARTMENT', value: eventConfig.department },
  { label: 'LOCATION', value: eventConfig.location },
] as const

function slideUp(delay: number, reduced: boolean) {
  if (reduced) return { initial: { opacity: 1 }, animate: { opacity: 1 } }
  return {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const },
  }
}

function clipReveal(delay: number, reduced: boolean, dir: 'bottom' | 'left' = 'bottom') {
  if (reduced) return { initial: { opacity: 1 }, animate: { opacity: 1 } }
  const clip = dir === 'bottom' ? 'inset(100% 0 0 0)' : 'inset(0 100% 0 0)'
  const y = dir === 'bottom' ? 24 : 0
  return {
    initial: { clipPath: clip, y, opacity: 0.15 },
    animate: { clipPath: 'inset(0 0 0 0)', y: 0, opacity: 1 },
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
  }
}

export function Hero() {
  const reducedMotion = useReducedMotion()
  const [glitchActive, setGlitchActive] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const [mouseX, setMouseX] = useState(0)
  const [mouseY, setMouseY] = useState(0)
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => { setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0) }, [])

  // Ambient micro-glitch: fires every 8–12s, lasts 200ms, only 1–2px shift
  useEffect(() => {
    if (reducedMotion || isTouch) return
    let timer: ReturnType<typeof setTimeout>
    const schedule = () => {
      const delay = 8000 + Math.random() * 4000
      timer = setTimeout(() => {
        setGlitchActive(true)
        setTimeout(() => setGlitchActive(false), 200)
        schedule()
      }, delay)
    }
    schedule()
    return () => clearTimeout(timer)
  }, [reducedMotion, isTouch])

  // Desktop mouse parallax for the title
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isTouch || reducedMotion || !heroRef.current) return
    const rect = heroRef.current.getBoundingClientRect()
    setMouseX(((e.clientX - rect.left) / rect.width - 0.5) * 2)
    setMouseY(((e.clientY - rect.top) / rect.height - 0.5) * 2)
  }, [isTouch, reducedMotion])

  return (
    <section className="hero" id="hero" ref={heroRef} onMouseMove={handleMouseMove}>
      <div className="hero__bg">
        <div className="hero__grid" />
        <div className="hero__scanline" />
        <div className="hero__corner-tl" />
        <div className="hero__corner-tr" />
        <div className="hero__corner-bl" />
        <div className="hero__corner-br" />
      </div>

      <div className="container">
        <div className="hero__layout">
          <div className="hero__main">
            {/* 0ms–300ms: Badge with terminal left-to-right wipe */}
            <motion.div className="hero__badge" {...clipReveal(0.1, reducedMotion, 'left')}>
              <span className="crosshair" />
              <span>EVENT COMMAND // ACTIVE</span>
            </motion.div>

            {/* 300ms–750ms: UTKARSH with clip-path bottom-up reveal */}
            <motion.h1
              className={`hero__title${glitchActive ? ' hero__title--glitch' : ''}`}
              {...clipReveal(0.3, reducedMotion)}
              style={!reducedMotion && !isTouch ? {
                ['--parallax-x' as string]: `${mouseX * 0.6}px`,
                ['--parallax-y' as string]: `${mouseY * 0.6}px`,
              } : undefined}
            >
              <span className="hero__title-event">UTKARSH</span>
              {/* 750ms–1050ms: 26 enters with scale + orange flash */}
              <motion.span
                className="hero__title-num"
                initial={reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.92 }}
                animate={reducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                transition={reducedMotion ? {} : { duration: 0.45, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                26
              </motion.span>
            </motion.h1>

            {/* 1050ms–1400ms: Subtitle masked left-to-right */}
            <motion.p className="hero__subtitle" {...clipReveal(1.0, reducedMotion, 'left')}>
              SIX-HOUR INTER-COLLEGE HACKATHON
            </motion.p>

            {/* 1150ms–1400ms: Date fade */}
            <motion.p className="hero__date" {...slideUp(1.1, reducedMotion)}>
              {eventConfig.eventDate}
            </motion.p>

            {/* 1300ms–1600ms: Metadata stagger */}
            <div className="hero__meta">
              {metaItems.map((item, i) => (
                <motion.span key={item.label} className="hero__meta-item" {...slideUp(1.2 + i * 0.1, reducedMotion)}>
                  <span className="hero__meta-label">{item.label}</span>
                  <span className="hero__meta-value">{item.value}</span>
                  {i < metaItems.length - 1 && <span className="hero__meta-divider" />}
                </motion.span>
              ))}
            </div>

            {/* 1600ms–2000ms: CTAs staggered */}
            <motion.div className="hero__actions" {...slideUp(1.5, reducedMotion)}>
              <Link to="/register" className="hero__cta hero__cta--primary">
                <span className="hero__cta-text">Register Your Team</span>
                <span className="hero__cta-line" />
              </Link>
              <motion.a href="#about" className="hero__cta hero__cta--secondary" {...slideUp(1.6, reducedMotion)}>
                <span className="hero__cta-text">Explore System</span>
                <span className="hero__cta-arrow">{'\u2193'}</span>
              </motion.a>
            </motion.div>
          </div>

          {/* Side panel — parallel timeline */}
          <div className="hero__side">
            <motion.div
              className="hero__data-grid"
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="hero__data-item">
                <span className="hero__data-num">{eventConfig.maximumTeams}</span>
                <span className="hero__data-label">TEAMS</span>
              </div>
              <div className="hero__data-divider" />
              <div className="hero__data-item">
                <span className="hero__data-num">{eventConfig.maxParticipants}</span>
                <span className="hero__data-label">MINDS</span>
              </div>
              <div className="hero__data-divider" />
              <div className="hero__data-item">
                <span className="hero__data-num">06:00</span>
                <span className="hero__data-label">DURATION</span>
              </div>
              <div className="hero__data-divider" />
              <div className="hero__data-item">
                <span className="hero__data-num">{eventConfig.minTeamSize}–{eventConfig.maxTeamSize}</span>
                <span className="hero__data-label">TEAM SIZE</span>
              </div>
            </motion.div>

            {/* EVENT WINDOW — colon pulse, sequential digit reveal */}
            <motion.div
              className="hero__time-display"
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="hero__time-header">
                <span className="hero__time-tag">EVENT WINDOW</span>
                <span className="status-dot status-dot--active" />
              </div>
              <div className="hero__time-digits">
                <motion.span
                  initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
                >
                  06
                </motion.span>
                <span className="hero__time-sep">:</span>
                <motion.span
                  initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
                >
                  00
                </motion.span>
                <span className="hero__time-sep">:</span>
                <motion.span
                  initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
                >
                  00
                </motion.span>
              </div>
              <div className="hero__time-range">
                <span>{eventConfig.overallStart}</span>
                <span className="hero__time-bar">
                  <motion.span
                    className="hero__time-fill"
                    initial={reducedMotion ? { width: '30%' } : { width: '0%' }}
                    animate={{ width: '30%' }}
                    transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  />
                </span>
                <span>{eventConfig.overallEnd}</span>
              </div>
              <div className="hero__time-caption">THE CLOCK IS ALREADY TICKING.</div>
            </motion.div>
          </div>
        </div>

        <div className="hero__bottom-bar">
          <span className="hero__bottom-coord">N13°43' E75°37'</span>
          <span className="hero__bottom-divider" />
          <span className="hero__bottom-text">PESIAMS // SHIVAMOGGA</span>
          <span className="hero__bottom-divider" />
          <span className="hero__bottom-text">{eventConfig.overallStart} \u2013 {eventConfig.overallEnd}</span>
        </div>
      </div>
    </section>
  )
}

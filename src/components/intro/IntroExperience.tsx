import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { eventConfig } from '../../data/eventConfig'
import './IntroExperience.css'

interface IntroExperienceProps {
  onComplete: () => void
}

type IntroPhase = 'time' | 'institution' | 'department' | 'reveal' | 'done'

const PHASE_DURATIONS = {
  time: 1500,
  institution: 1800,
  department: 1500,
  reveal: 1800,
}

export function IntroExperience({ onComplete }: IntroExperienceProps) {
  const reducedMotion = useReducedMotion()
  const [phase, setPhase] = useState<IntroPhase>('time')
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [showSkip, setShowSkip] = useState(false)
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  const cleanup = useCallback(() => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
    document.body.style.overflow = ''
    document.documentElement.style.overflow = ''
  }, [])

  const skipIntro = useCallback(() => {
    cleanup()
    setPhase('done')
    onComplete()
  }, [cleanup, onComplete])

  useEffect(() => {
    if (reducedMotion) {
      skipIntro()
      return
    }

    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'

    const showSkipTimer = setTimeout(() => setShowSkip(true), 1000)

    const t1 = setTimeout(() => setPhase('institution'), PHASE_DURATIONS.time)
    const t2 = setTimeout(() => setPhase('department'), PHASE_DURATIONS.time + PHASE_DURATIONS.institution)
    const t3 = setTimeout(() => setPhase('reveal'), PHASE_DURATIONS.time + PHASE_DURATIONS.institution + PHASE_DURATIONS.department)
    const t4 = setTimeout(() => {
      cleanup()
      setPhase('done')
      onComplete()
    }, PHASE_DURATIONS.time + PHASE_DURATIONS.institution + PHASE_DURATIONS.department + PHASE_DURATIONS.reveal)

    timersRef.current = [showSkipTimer, t1, t2, t3, t4]

    return cleanup
  }, [reducedMotion, skipIntro, cleanup, onComplete])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter' || e.key === 'Escape') {
        e.preventDefault()
        skipIntro()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [skipIntro])

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          ref={containerRef}
          className="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="intro__scanline" />
          <div className="intro__grid" />

          <div className="intro__bg">
            {(phase === 'institution' || phase === 'department') && (
              <>
                <video
                  className={`intro__video${videoLoaded && !videoError ? ' intro__video--ready' : ''}`}
                  src={eventConfig.media.campusVideo}
                  muted autoPlay playsInline loop preload="auto"
                  poster={eventConfig.media.campusImage}
                  onLoadedData={() => setVideoLoaded(true)}
                  onError={() => setVideoError(true)}
                />
                <img
                  className={`intro__fallback-img${(!videoLoaded || videoError) && imageLoaded ? ' intro__fallback-img--visible' : ''}`}
                  src={eventConfig.media.campusImage} alt=""
                  onLoad={() => setImageLoaded(true)}
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
                />
                <div className="intro__mask">
                  <div className="intro__mask-line" />
                </div>
                <div className="intro__overlay" />
              </>
            )}
          </div>

          <div className="intro__content">
            {/* PHASE 01: SYSTEM INITIALIZATION */}
            {phase === 'time' && (
              <motion.div
                className="intro__phase-time"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
              >
                <div className="intro__sys-info">
                  <div className="intro__sys-row">
                    <span className="intro__sys-label">SYSTEM TIME</span>
                    <span className="intro__sys-value">09:00:00</span>
                  </div>
                  <div className="intro__sys-row">
                    <span className="intro__sys-label">LOCATION</span>
                    <span className="intro__sys-value">SHIVAMOGGA // KARNATAKA</span>
                  </div>
                  <div className="intro__sys-row">
                    <span className="intro__sys-label">STATUS</span>
                    <span className="intro__sys-value intro__sys-value--accent">INITIALIZING</span>
                  </div>
                </div>

                <div className="intro__timecode">
                  <span className="intro__timecode-tag">SYS//</span>
                  <span className="intro__timecode-val">09</span>
                  <span className="intro__timecode-sep">:</span>
                  <span className="intro__timecode-val">00</span>
                </div>
              </motion.div>
            )}

            {/* PHASE 02: PESIAMS TRANSMISSION */}
            {phase === 'institution' && (
              <motion.div
                className="intro__phase-inst"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
              >
                <div className="intro__signal-top">
                  <span className="intro__signal-dot" />
                  <span className="intro__signal-text">TRANSMISSION // ONLINE</span>
                </div>

                <div className="intro__inst-logo-wrap">
                  <img
                    className="intro__inst-logo"
                    src={eventConfig.media.logo}
                    alt={eventConfig.institutionShort}
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
                  />
                </div>

                <h2 className="intro__inst-name">
                  PES INSTITUTE OF<br />ADVANCED MANAGEMENT STUDIES
                </h2>
                <p className="intro__inst-location">SHIVAMOGGA // KARNATAKA</p>
              </motion.div>
            )}

            {/* PHASE 03: AUTHORIZATION */}
            {phase === 'department' && (
              <motion.div
                className="intro__phase-dept"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
              >
                <div className="intro__auth-badge">
                  <span className="intro__auth-dot" />
                  <span className="intro__auth-text">HOST PROTOCOL // VERIFIED</span>
                </div>

                <div className="intro__dept-block">
                  <div className="intro__dept-overline" />
                  <p className="intro__dept-line">DEPARTMENT OF</p>
                  <p className="intro__dept-line intro__dept-highlight">COMPUTER APPLICATIONS</p>
                  <div className="intro__dept-underline" />
                  <p className="intro__dept-presents">PRESENTS</p>
                </div>
              </motion.div>
            )}

            {/* PHASE 04: UTKARSH 26 ACTIVATION */}
            {phase === 'reveal' && (
              <motion.div
                className="intro__phase-reveal"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9 }}
              >
                <div className="intro__reveal-glitch-wrap">
                  <h1 className="intro__reveal-title">
                    <span className="intro__reveal-event" data-text="UTKARSH">UTKARSH</span>
                    <span className="intro__reveal-num" data-text="26">26</span>
                  </h1>
                </div>
                <p className="intro__reveal-tagline">SIX-HOUR INTER-COLLEGE HACKATHON</p>
                <div className="intro__reveal-bottom">
                  <span className="intro__reveal-status-dot" />
                  <span className="intro__reveal-status">PROTOCOL ACTIVE</span>
                </div>
                <div className="intro__reveal-sweep" />
              </motion.div>
            )}
          </div>

          {showSkip && (
            <motion.button
              className="intro__skip"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              onClick={skipIntro}
              aria-label="Skip introduction"
              type="button"
            >
              Skip Intro
            </motion.button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
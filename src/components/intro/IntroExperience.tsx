import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import './IntroExperience.css'

interface IntroExperienceProps {
  onComplete: () => void
}

type IntroPhase = 'time' | 'institution' | 'department' | 'reveal' | 'done'

const PHASE_DURATIONS = {
  time: 1200,
  institution: 1100,
  department: 1000,
  reveal: 1400,
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

    const showSkipTimer = setTimeout(() => setShowSkip(true), 800)

    const phaseTime = setTimeout(() => setPhase('institution'), PHASE_DURATIONS.time)
    const phaseInst = setTimeout(() => setPhase('department'), PHASE_DURATIONS.time + PHASE_DURATIONS.institution)
    const phaseDept = setTimeout(() => setPhase('reveal'), PHASE_DURATIONS.time + PHASE_DURATIONS.institution + PHASE_DURATIONS.department)
    const phaseDone = setTimeout(() => {
      cleanup()
      setPhase('done')
      onComplete()
    }, PHASE_DURATIONS.time + PHASE_DURATIONS.institution + PHASE_DURATIONS.department + PHASE_DURATIONS.reveal)

    timersRef.current = [showSkipTimer, phaseTime, phaseInst, phaseDept, phaseDone]

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
          <div className="intro__bg">
            {phase === 'institution' || phase === 'department' ? (
              <>
                <video
                  className={`intro__video${videoLoaded && !videoError ? ' intro__video--ready' : ''}`}
                  src="/media/homeBannerVideo.mp4"
                  muted
                  playsInline
                  loop
                  preload="metadata"
                  poster="/media/home_welcome.jpeg"
                  onLoadedData={() => setVideoLoaded(true)}
                  onError={() => setVideoError(true)}
                />
                <img
                  className={`intro__fallback-img${(!videoLoaded || videoError) && imageLoaded ? ' intro__fallback-img--visible' : ''}`}
                  src="/media/home_welcome.jpeg"
                  alt=""
                  onLoad={() => setImageLoaded(true)}
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
                />
                <div className="intro__overlay" />
              </>
            ) : null}
          </div>

          <div className="intro__content">
            {phase === 'time' && (
              <motion.div
                className="intro__time"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="intro__time-digit">09</span>
                <span className="intro__time-sep">:</span>
                <span className="intro__time-digit">00</span>
                <div className="intro__time-label">ARRIVAL</div>
              </motion.div>
            )}

            {phase === 'institution' && (
              <motion.div
                className="intro__institution"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="intro__inst-logo-wrap">
                  <img
                    className="intro__inst-logo"
                    src="/media/logo2.jpg"
                    alt="PESIAMS"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
                  />
                </div>
                <h2 className="intro__inst-name">PES INSTITUTE OF ADVANCED<br />MANAGEMENT STUDIES</h2>
                <p className="intro__inst-location">SHIVAMOGGA, KARNATAKA</p>
              </motion.div>
            )}

            {phase === 'department' && (
              <motion.div
                className="intro__department"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="intro__dept-line">DEPARTMENT OF</p>
                <p className="intro__dept-line intro__dept-line--highlight">COMPUTER APPLICATIONS</p>
                <div className="intro__dept-rule" />
                <p className="intro__dept-presents">PRESENTS</p>
              </motion.div>
            )}

            {phase === 'reveal' && (
              <motion.div
                className="intro__reveal"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                <h1 className="intro__reveal-title">
                  <span className="intro__reveal-event">UTKARSH</span>
                  <span className="intro__reveal-num">26</span>
                </h1>
                <p className="intro__reveal-tagline">SIX-HOUR INTER-COLLEGE HACKATHON</p>
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

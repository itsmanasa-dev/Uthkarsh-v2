import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { campusActivities } from '../../data/campusActivities'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import './CampusInMotion.css'

const FEATURED_INTERVAL = 6000
const FRAME_B_INTERVAL = 4800
const FRAME_C_INTERVAL = 6200
const FRAME_D_INTERVAL = 7400
const PAUSE_AFTER_INTERACTION = 8000

function useFrameIndex(interval: number, isPaused: boolean, isVisible: boolean, reducedMotion: boolean, total: number) {
  const [index, setIndex] = useState(() => Math.floor(Math.random() * total))

  useEffect(() => {
    if (reducedMotion || !isVisible || isPaused) return
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % total)
    }, interval)
    return () => clearInterval(timer)
  }, [interval, reducedMotion, isVisible, isPaused, total])

  return index
}

export function CampusInMotion() {
  const reducedMotion = useReducedMotion()
  const sectionRef = useRef<HTMLDivElement>(null)
  const [featuredIndex, setFeaturedIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set())
  const pauseTimerRef = useRef<number | undefined>(undefined)

  const total = campusActivities.length

  // Visibility detection
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Independent frame indices
  const frameBIndex = useFrameIndex(FRAME_B_INTERVAL, isPaused, isVisible, reducedMotion, total)
  const frameCIndex = useFrameIndex(FRAME_C_INTERVAL, isPaused, isVisible, reducedMotion, total)
  const frameDIndex = useFrameIndex(FRAME_D_INTERVAL, isPaused, isVisible, reducedMotion, total)

  // Featured auto-rotation
  useEffect(() => {
    if (reducedMotion || !isVisible || isPaused) return
    const timer = setInterval(() => {
      setFeaturedIndex((prev) => (prev + 1) % total)
    }, FEATURED_INTERVAL)
    return () => clearInterval(timer)
  }, [reducedMotion, isVisible, isPaused, total])

  const goTo = useCallback((index: number) => {
    setFeaturedIndex(index)
    setIsPaused(true)
    if (pauseTimerRef.current !== undefined) clearTimeout(pauseTimerRef.current)
    pauseTimerRef.current = window.setTimeout(() => setIsPaused(false), PAUSE_AFTER_INTERACTION)
  }, [])

  const goPrev = useCallback(() => {
    goTo((featuredIndex - 1 + total) % total)
  }, [featuredIndex, total, goTo])

  const goNext = useCallback(() => {
    goTo((featuredIndex + 1) % total)
  }, [featuredIndex, total, goTo])

  const frameAActivity = campusActivities[featuredIndex]
  const frameBActivity = campusActivities[frameBIndex]
  const frameCActivity = campusActivities[frameCIndex]
  const frameDActivity = campusActivities[frameDIndex]

  const fallbackImage = '/media/home_welcome.jpeg'

  const renderImage = (act: typeof frameAActivity, key: string, delay: number) => {
    const src = imageErrors.has(act.id) ? fallbackImage : act.image
    return (
      <motion.img
        key={`${key}-${act.id}`}
        src={src}
        alt={act.title}
        loading="lazy"
        decoding="async"
        initial={reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 1.03 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={
          reducedMotion
            ? {}
            : { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }
        }
        onError={() => setImageErrors((prev) => new Set(prev).add(act.id))}
      />
    )
  }

  return (
    <section className="campus-motion" ref={sectionRef} id="campus">
      <div className="container">
        <div className="section-eyebrow">ACT 06 — CAMPUS IN MOTION</div>

        <div className="campus-motion__layout">
          {/* LEFT: Editorial */}
          <div className="campus-motion__editorial">
            <h2 className="campus-motion__heading">Beyond the Classroom</h2>
            <p className="campus-motion__intro">
              PES Institute of Advanced Management Studies is a living campus.
              From industry MoUs to international expert talks, every activity
              shapes the next generation of professionals.
            </p>

            <AnimatePresence mode="wait">
              <motion.div
                key={frameAActivity.id}
                initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reducedMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="campus-motion__featured"
              >
                <span className="campus-motion__counter">
                  {String(featuredIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                </span>
                <h3 className="campus-motion__activity-title">{frameAActivity.title}</h3>
                <p className="campus-motion__activity-desc">{frameAActivity.description}</p>
                {frameAActivity.date && (
                  <span className="campus-motion__activity-date">{frameAActivity.date}</span>
                )}
              </motion.div>
            </AnimatePresence>

            <nav className="campus-motion__nav" aria-label="Activity navigation">
              <button
                className="campus-motion__nav-btn"
                onClick={goPrev}
                aria-label="Previous activity"
              >
                <span aria-hidden="true">&larr;</span> Prev
              </button>
              <div className="campus-motion__dots">
                {campusActivities.map((_, i) => (
                  <button
                    key={i}
                    className={`campus-motion__dot${i === featuredIndex ? ' campus-motion__dot--active' : ''}`}
                    onClick={() => goTo(i)}
                    aria-label={`Go to activity ${i + 1}`}
                  />
                ))}
              </div>
              <button
                className="campus-motion__nav-btn"
                onClick={goNext}
                aria-label="Next activity"
              >
                Next <span aria-hidden="true">&rarr;</span>
              </button>
            </nav>
          </div>

          {/* RIGHT: Cascading Image Composition */}
          <div className="campus-motion__frames">
            {/* Frame A — featured, dominant */}
            <div className="campus-motion__frame campus-motion__frame--a">
              <AnimatePresence mode="wait">
                {renderImage(frameAActivity, 'a', 0)}
              </AnimatePresence>
            </div>

            {/* Frame B — right-aligned accent */}
            <div className="campus-motion__frame campus-motion__frame--b">
              <AnimatePresence mode="wait">
                {renderImage(frameBActivity, 'b', 0.1)}
              </AnimatePresence>
            </div>

            {/* Frame C — left-aligned */}
            <div className="campus-motion__frame campus-motion__frame--c">
              <AnimatePresence mode="wait">
                {renderImage(frameCActivity, 'c', 0.2)}
              </AnimatePresence>
            </div>

            {/* Frame D — right-aligned bottom */}
            <div className="campus-motion__frame campus-motion__frame--d">
              <AnimatePresence mode="wait">
                {renderImage(frameDActivity, 'd', 0.3)}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

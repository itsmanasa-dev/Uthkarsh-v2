import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'motion/react'
import { timelineEvents } from '../../data/timeline'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import './Timeline.css'

const descriptions = [
  'Reporting at the venue, verification of college IDs, and allocation of team hack stations.',
  'Official opening briefing and hackathon inauguration ceremony.',
  'Release of the unknown problem statement. The 6-hour sprint commences officially.',
  'Refueling break. Team lunch is served at the dining hall.',
  'Release of a hidden twist to challenge adaptiveness and project scaling.',
  'Coding phase concludes. Projects must be compiled and submitted to the evaluation portal.',
  'Jury evaluation sequence. Teams pitch and demonstrate working prototypes.',
  'Closing ceremony, final feedback compilation, and prize distribution.',
  'System deactivation. Exit clearance and concluding team photo session.'
]

// 11 total points: Point 0 (Start), Points 1-9 (Checkpoints), Point 10 (Finish)
const POINTS = [
  { x: 450, y: 15 },    // Start Node (SYSTEM ENTRY)
  { x: 450, y: 95 },    // CP 0
  { x: 200, y: 205 },   // CP 1
  { x: 700, y: 315 },   // CP 2
  { x: 200, y: 425 },   // CP 3
  { x: 700, y: 535 },   // CP 4
  { x: 200, y: 645 },   // CP 5
  { x: 700, y: 755 },   // CP 6
  { x: 450, y: 875 },   // CP 7
  { x: 450, y: 985 },   // CP 8
  { x: 450, y: 1065 },  // Finish Node (MISSION COMPLETE)
]

const CARD_POSITIONS = [
  { left: '55%', top: '6.5%', width: '35%', align: 'left' as const },
  { left: '28%', top: '16.5%', width: '48%', align: 'left' as const },
  { left: '22%', top: '26.5%', width: '48%', align: 'right' as const },
  { left: '28%', top: '36.5%', width: '48%', align: 'left' as const },
  { left: '22%', top: '47.5%', width: '48%', align: 'right' as const },
  { left: '28%', top: '58.5%', width: '48%', align: 'left' as const },
  { left: '22%', top: '69.5%', width: '48%', align: 'right' as const },
  { left: '55%', top: '77.5%', width: '35%', align: 'left' as const },
  { left: '10%', top: '87.5%', width: '35%', align: 'right' as const },
]

export function Timeline() {
  const reducedMotion = useReducedMotion()
  const sectionRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start center', 'end center'],
  })

  // Travel progress for the energy pulse
  const pulseOffset = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  // Monitor the scroll progress to toggle Finish Node status
  const [finishStatus, setFinishStatus] = useState<'incoming' | 'active'>('incoming')
  
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setFinishStatus(latest > 0.96 ? 'active' : 'incoming')
  })

  // Path SVG rendering
  const pathD = POINTS.reduce((acc, p, i) => {
    return i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`
  }, '')

  return (
    <section className="mission-circuit" ref={sectionRef} id="timeline">
      <div className="container">
        <div className="mission-circuit__header">
          <div className="section-eyebrow">ACT 02 — MISSION CIRCUIT</div>
          <h2 className="mission-circuit__title">THE SIX-HOUR CIRCUIT</h2>
          <span className="mission-circuit__microcopy">
            06 HOURS // MULTIPLE CHECKPOINTS // ONE UNKNOWN PROBLEM
          </span>
        </div>

        {/* Desktop Circuit (width >= 992px) */}
        <div className="circuit-desktop-wrapper">
          <svg className="circuit-svg" viewBox="0 0 900 1100" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Background PCB track */}
            <path
              d={pathD}
              stroke="rgba(167, 163, 184, 0.12)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Illuminated scroll track */}
            {!reducedMotion && (
              <motion.path
                d={pathD}
                stroke="url(#circuitGradient)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ pathLength: scrollYProgress }}
              />
            )}
            <defs>
              <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="var(--electric-blue)" />
                <stop offset="50%" stopColor="var(--violet-purple)" />
                <stop offset="100%" stopColor="var(--electric-blue)" />
              </linearGradient>
            </defs>
          </svg>

          {/* Travel pulse */}
          {!reducedMotion && (
            <motion.div
              className="circuit-pulse"
              style={{ offsetDistance: pulseOffset }}
            />
          )}

          {/* Start Node */}
          <div className="circuit-node circuit-node--start circuit-node--completed" style={{ left: '50%', top: '1.36%' }}>
            <div className="circuit-node__ring" />
            <div className="circuit-node__core" />
            <div className="circuit-node__label circuit-node__label--left">START // SYSTEM ENTRY</div>
          </div>

          {/* Render desktop circuit checkpoints */}
          {timelineEvents.map((event, i) => (
            <CircuitDesktopStep
              key={`${event.time}-${i}`}
              event={event}
              index={i}
              description={descriptions[i]}
              point={POINTS[i + 1]}
              cardPos={CARD_POSITIONS[i]}
            />
          ))}

          {/* Finish Node */}
          <div className={`circuit-node circuit-node--finish circuit-node--${finishStatus}`} style={{ left: '50%', top: '96.81%' }}>
            <div className="circuit-node__ring" />
            <div className="circuit-node__core" />
            <div className="circuit-node__glow" />
            <div className="circuit-node__label circuit-node__label--right">FINISH // BUILD SUBMITTED</div>
          </div>
        </div>

        {/* Mobile Circuit (width < 992px) */}
        <div className="circuit-mobile">
          <div className="circuit-mobile__line-container">
            <svg className="circuit-mobile__svg" width="100%" height="100%" preserveAspectRatio="none">
              <line
                x1="24" y1="0"
                x2="24" y2="100%"
                stroke="rgba(167, 163, 184, 0.12)"
                strokeWidth="3"
                strokeDasharray="4 4"
              />
              {!reducedMotion && (
                <motion.line
                  x1="24" y1="0"
                  x2="24" y2="100%"
                  stroke="var(--electric-blue)"
                  strokeWidth="3"
                  style={{ pathLength: scrollYProgress }}
                />
              )}
            </svg>
          </div>

          <div className="circuit-mobile__steps">
            {/* Mobile Start Node */}
            <div className="circuit-mobile-step circuit-mobile-step--start circuit-mobile-step--completed">
              <div className="circuit-mobile-step__node">
                <div className="circuit-mobile-step__ring" />
                <div className="circuit-mobile-step__core" />
              </div>
              <div className="circuit-mobile-step__card circuit-mobile-step__card--start">
                <span className="circuit-mobile-step__id">START // 00</span>
                <h4 className="circuit-mobile-step__title">SYSTEM ENTRY</h4>
              </div>
            </div>

            {/* Mobile Checkpoints */}
            {timelineEvents.map((event, i) => (
              <CircuitMobileStep
                key={`${event.time}-m-${i}`}
                event={event}
                index={i}
                description={descriptions[i]}
              />
            ))}

            {/* Mobile Finish Node */}
            <div className={`circuit-mobile-step circuit-mobile-step--finish circuit-mobile-step--${finishStatus}`}>
              <div className="circuit-mobile-step__node">
                <div className="circuit-mobile-step__ring" />
                <div className="circuit-mobile-step__core" />
              </div>
              <div className="circuit-mobile-step__card circuit-mobile-step__card--finish">
                <span className="circuit-mobile-step__id">FINISH // 10</span>
                <h4 className="circuit-mobile-step__title">BUILD SUBMITTED // MISSION COMPLETE</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ========================================================================= */
/* DESKTOP CIRCUIT STEP COMPONENT */
/* ========================================================================= */
interface DesktopStepProps {
  event: typeof timelineEvents[number]
  index: number
  description: string
  point: typeof POINTS[number]
  cardPos: typeof CARD_POSITIONS[number]
}

function CircuitDesktopStep({ event, index, description, point, cardPos }: DesktopStepProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<'incoming' | 'active' | 'completed'>('incoming')

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatus('active')
        } else {
          if (entry.boundingClientRect.top < window.innerHeight / 2) {
            setStatus('completed')
          } else {
            setStatus('incoming')
          }
        }
      },
      { rootMargin: '-25% 0px -40% 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const dotStyle = {
    left: `${(point.x / 900) * 100}%`,
    top: `${(point.y / 1100) * 100}%`,
  }

  const cardStyle = {
    left: cardPos.left,
    top: cardPos.top,
    width: cardPos.width,
  }

  return (
    <>
      <div className={`circuit-node circuit-node--${status}`} style={dotStyle}>
        <div className="circuit-node__ring" />
        <div className="circuit-node__core" />
        <div className="circuit-node__glow" />
        <span className="circuit-node__tooltip">{event.time}</span>
      </div>

      <div
        ref={cardRef}
        className={`circuit-card circuit-card--${status} circuit-card--align-${cardPos.align}`}
        style={cardStyle}
      >
        <div className="circuit-card__header">
          <span className="circuit-card__id">CP_{String(index + 1).padStart(2, '0')}</span>
          <time className="circuit-card__time">{event.time}</time>
        </div>
        <h4 className="circuit-card__title">{event.label}</h4>
        <p className="circuit-card__desc">{description}</p>
        <div className="circuit-card__corner circuit-card__corner--tr" />
        <div className="circuit-card__corner circuit-card__corner--bl" />
      </div>
    </>
  )
}

/* ========================================================================= */
/* MOBILE CIRCUIT STEP COMPONENT */
/* ========================================================================= */
interface MobileStepProps {
  event: typeof timelineEvents[number]
  index: number
  description: string
}

function CircuitMobileStep({ event, index, description }: MobileStepProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<'incoming' | 'active' | 'completed'>('incoming')

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatus('active')
        } else {
          if (entry.boundingClientRect.top < window.innerHeight / 2) {
            setStatus('completed')
          } else {
            setStatus('incoming')
          }
        }
      },
      { rootMargin: '-20% 0px -45% 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={cardRef} className={`circuit-mobile-step circuit-mobile-step--${status}`}>
      <div className="circuit-mobile-step__node">
        <div className="circuit-mobile-step__ring" />
        <div className="circuit-mobile-step__core" />
      </div>
      <div className="circuit-mobile-step__card">
        <div className="circuit-mobile-step__header">
          <span className="circuit-mobile-step__id">CP_{String(index + 1).padStart(2, '0')}</span>
          <time className="circuit-mobile-step__time">{event.time}</time>
        </div>
        <h4 className="circuit-mobile-step__title">{event.label}</h4>
        <p className="circuit-mobile-step__desc">{description}</p>
      </div>
    </div>
  )
}
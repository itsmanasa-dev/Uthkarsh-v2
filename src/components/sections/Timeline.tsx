import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { timelineEvents } from '../../data/timeline'
import { eventConfig } from '../../data/eventConfig'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import './Timeline.css'

const keyEvents = [
  { time: '10:00 AM', label: 'Challenge\nReveal', type: 'start' as const },
  { time: '2:30 PM', label: 'Hidden\nTwist', type: 'twist' as const },
  { time: '4:00 PM', label: 'Hard\nDeadline', type: 'deadline' as const },
]

export function Timeline() {
  const reducedMotion = useReducedMotion()
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const progressWidth = useTransform(scrollYProgress, [0, 0.5], ['0%', '100%'])

  return (
    <section className="timeline section-surface--gunmetal" ref={sectionRef} id="timeline">
      <div className="container">
        <div className="section-eyebrow">ACT 06 — OPERATION SEQUENCE</div>
        <div className="timeline__layout">
          <div className="timeline__events">
            {timelineEvents.map((event, i) => (
              <motion.div
                key={`${event.time}-${i}`}
                className="timeline__event"
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="timeline__dot-wrap">
                  <span
                    className={`timeline__dot${
                      event.label.includes('Challenge Reveal') ? ' timeline__dot--start' : ''
                    }${event.label.includes('Twist Reveal') ? ' timeline__dot--twist' : ''}${
                      event.label.includes('Hard Submission') ? ' timeline__dot--deadline' : ''
                    }`}
                  />
                  {i < timelineEvents.length - 1 && <span className="timeline__connector" />}
                </div>
                <div className="timeline__info">
                  <time className="timeline__time">{event.time}</time>
                  <span className="timeline__label">{event.label}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="timeline__aside">
            <motion.div
              className="timeline__monitor"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="timeline__monitor-header">
                <span className="timeline__monitor-tag">{eventConfig.eventDate}</span>
                <span className="status-dot status-dot--active" />
              </div>
              <div className="timeline__monitor-main">
                <div className="timeline__monitor-time">10:00 AM</div>
                <div className="timeline__monitor-event">CHALLENGE REVEAL</div>
                <div className="timeline__monitor-bar">
                  {!reducedMotion && (
                    <motion.div
                      className="timeline__monitor-fill"
                      style={{ width: progressWidth }}
                    />
                  )}
                </div>
                <div className="timeline__monitor-elapsed">
                  <span>ELAPSED</span>
                  <span>01:00 / 06:00</span>
                </div>
              </div>
              <div className="timeline__monitor-keys">
                {keyEvents.map((ev) => (
                  <div key={ev.time} className="timeline__key-item">
                    <span className={`timeline__key-dot timeline__key-dot--${ev.type}`} />
                    <div className="timeline__key-info">
                      <span className="timeline__key-time">{ev.time}</span>
                      <span className="timeline__key-label">{ev.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
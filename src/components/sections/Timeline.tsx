import { motion } from 'motion/react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { timelineEvents } from '../../data/timeline'
import './Timeline.css'

export function Timeline() {
  const reducedMotion = useReducedMotion()

  return (
    <section className="timeline" id="timeline">
      <div className="container">
        <div className="timeline__header">
          <motion.span
            className="timeline__tag"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            THE COUNTDOWN
          </motion.span>
          <motion.h2
            className="timeline__heading"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            Six Hours. One Deadline.
          </motion.h2>
        </div>

        <div className="timeline__layout">
          <div className="timeline__events">
            {timelineEvents.map((event, i) => (
              <motion.div
                key={`${event.time}-${i}`}
                className="timeline__event"
                initial={reducedMotion ? { opacity: 1 } : { opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="timeline__dot-wrapper">
                  <span className={`timeline__dot${i === 2 ? ' timeline__dot--active' : ''}`} />
                  {i < timelineEvents.length - 1 && <span className="timeline__line" />}
                </div>
                <div className="timeline__info">
                  <time className="timeline__time">{event.time}</time>
                  <span className="timeline__label">{event.label}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.aside
            className="timeline__aside"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="timeline__summary">
              <span className="timeline__summary-num">6</span>
              <span className="timeline__summary-unit">HOURS</span>
              <div className="timeline__summary-bar">
                <div className="timeline__summary-fill" />
              </div>
              <span className="timeline__summary-sub">ONE DEADLINE</span>
              <span className="timeline__summary-range">10:00 – 16:00</span>
              <div className="timeline__summary-events">
                <div className="timeline__summary-event">
                  <span className="timeline__summary-event-dot" />
                  <span>Challenge Reveal</span>
                </div>
                <div className="timeline__summary-event">
                  <span className="timeline__summary-event-dot timeline__summary-event-dot--alt" />
                  <span>Twist Reveal</span>
                </div>
                <div className="timeline__summary-event">
                  <span className="timeline__summary-event-dot" />
                  <span>Hard Deadline</span>
                </div>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  )
}

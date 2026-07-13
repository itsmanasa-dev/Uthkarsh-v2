import { motion } from 'motion/react'
import { timelineEvents } from '../../data/timeline'
import './Timeline.css'

export function Timeline() {
  return (
    <section className="timeline" id="timeline">
      <div className="container">
        <div className="timeline__header">
          <motion.span
            className="section-eyebrow"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
          >
            ACT 06 — THE CLOCK
          </motion.span>
          <motion.h2
            className="timeline__heading"
            initial={{ opacity: 0, y: 15 }}
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
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="timeline__dot-wrap">
                  <span className={`timeline__dot${event.label.includes('Challenge Reveal') ? ' timeline__dot--active' : ''}${event.label.includes('Twist Reveal') ? ' timeline__dot--twist' : ''}${event.label.includes('Hard Submission') ? ' timeline__dot--deadline' : ''}`} />
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
              className="timeline__duration"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="timeline__duration-num">6</div>
              <div className="timeline__duration-unit">HOURS</div>
              <div className="timeline__duration-bar">
                <div className="timeline__duration-fill" />
              </div>
              <div className="timeline__duration-range">10:00 – 16:00</div>
              <div className="timeline__duration-key">
                <div className="timeline__key-item">
                  <span className="timeline__key-dot timeline__key-dot--start" />
                  <span>Challenge Reveal</span>
                </div>
                <div className="timeline__key-item">
                  <span className="timeline__key-dot timeline__key-dot--twist" />
                  <span>Hidden Twist</span>
                </div>
                <div className="timeline__key-item">
                  <span className="timeline__key-dot timeline__key-dot--end" />
                  <span>Deadline</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

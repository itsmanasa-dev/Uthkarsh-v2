import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import './HiddenTwist.css'

export function HiddenTwist() {
  const reducedMotion = useReducedMotion()
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section
      ref={sectionRef}
      className={`twist${isInView && !reducedMotion ? ' twist--disrupted' : ''}`}
      id="twist"
    >
      <div className="twist__bg" />
      <div className="container">
        <div className="twist__layout">
          <motion.div
            className="twist__time-marker"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="twist__time-num">2:30 PM</span>
            <span className="twist__time-label">SYSTEM DISRUPTION</span>
          </motion.div>

          <motion.h2
            className="twist__heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="twist__line">THEN THE</span>
            <span className="twist__line twist__line--break">RULES CHANGE.</span>
          </motion.h2>

          <motion.div
            className="twist__body"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="twist__text">
              A hidden challenge will be revealed during the hackathon.
              The rules shift. The strategy changes.
            </p>
            <div className="twist__commands">
              <span>ADAPT.</span>
              <span className="twist__sep">//</span>
              <span>REBUILD.</span>
              <span className="twist__sep">//</span>
              <span>KEEP MOVING.</span>
            </div>
          </motion.div>

          <motion.div
            className="twist__status"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <span className="status-dot status-dot--active" />
            <span className="twist__status-text">ACTIVE PROTOCOL // DISRUPTION STANDBY</span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
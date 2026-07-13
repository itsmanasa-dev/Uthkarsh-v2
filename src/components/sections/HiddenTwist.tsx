import { motion } from 'motion/react'
import './HiddenTwist.css'

export function HiddenTwist() {
  return (
    <section className="twist" id="twist">
      <div className="container">
        <div className="twist__layout">
          <motion.span
            className="section-eyebrow"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            ACT 05 — THE DISRUPTION
          </motion.span>

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
              <span>Adapt.</span>
              <span className="twist__sep">/</span>
              <span>Rebuild.</span>
              <span className="twist__sep">/</span>
              <span>Keep moving.</span>
            </div>
          </motion.div>

          <motion.div
            className="twist__marker"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>
    </section>
  )
}

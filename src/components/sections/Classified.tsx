import { motion } from 'motion/react'
import './Classified.css'

export function Classified() {
  return (
    <section className="classified">
      <div className="container">
        <div className="classified__content">
          <motion.span
            className="section-eyebrow"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            ACT 04 — THE UNKNOWN
          </motion.span>

          <motion.h2
            className="classified__title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            THE PROBLEM?
          </motion.h2>

          <motion.div
            className="classified__reveal"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="classified__status">
              <span className="classified__status-label">ACCESS</span>
              <span className="classified__status-value">RESTRICTED</span>
            </div>
            <div className="classified__status">
              <span className="classified__status-label">REVEAL</span>
              <span className="classified__status-value">10:00 AM</span>
            </div>
            <div className="classified__status">
              <span className="classified__status-label">STATUS</span>
              <span className="classified__status-value classified__status-value--sealed">CLASSIFIED</span>
            </div>
          </motion.div>

          <motion.p
            className="classified__sub"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            Revealed when the clock starts.
          </motion.p>
        </div>
      </div>
    </section>
  )
}

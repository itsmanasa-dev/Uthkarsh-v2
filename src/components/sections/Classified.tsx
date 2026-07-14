import { motion } from 'motion/react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import './Classified.css'

export function Classified() {
  const reducedMotion = useReducedMotion()

  return (
    <section className="classified section-surface--void" id="challenge">
      <div className="container">
        <div className="section-eyebrow">ACT 04 — CLASSIFIED DATA</div>
        <div className="classified__layout">
          <motion.div
            className="classified__content"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="classified__lock">
              <div className="classified__lock-icon">
                <span className="classified__lock-ring" />
                <span className="classified__lock-shackle" />
              </div>
              <span className="classified__lock-label">ENCRYPTED</span>
            </div>

            <h2 className="classified__title">
              THE PROBLEM?
            </h2>

            <div className="classified__status-grid">
              <div className="classified__status-row">
                <span className="classified__status-label">ACCESS LEVEL</span>
                <span className="classified__status-value classified__status-value--restricted">RESTRICTED</span>
              </div>
              <div className="classified__status-row">
                <span className="classified__status-label">REVEAL TIME</span>
                <span className="classified__status-value">10:00 AM</span>
              </div>
              <div className="classified__status-row">
                <span className="classified__status-label">STATUS</span>
                <span className="classified__status-value classified__status-value--sealed">
                  <span className="status-dot status-dot--active" />
                  SEALED
                </span>
              </div>
            </div>

            <div className="classified__redacted">
              <div className="classified__redacted-line" />
              <div className="classified__redacted-line classified__redacted-line--short" />
              <div className="classified__redacted-line classified__redacted-line--medium" />
              <div className="classified__redacted-line" />
            </div>

            <p className="classified__sub">Revealed when the clock starts.</p>
          </motion.div>

          <motion.div
            className="classified__terminal"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="classified__terminal-header">
              <span className="classified__terminal-dot" />
              <span className="classified__terminal-dot" />
              <span className="classified__terminal-dot" />
            </div>
            <div className="classified__terminal-body">
              <p className="classified__terminal-line"><span className="classified__terminal-prompt">$</span> ACCESS_CHALLENGE</p>
              <p className="classified__terminal-line classified__terminal-line--blink">&gt; ACCESS DENIED. INSUFFICIENT CLEARANCE.</p>
              <p className="classified__terminal-line"><span className="classified__terminal-prompt">$</span> STATUS</p>
              <p className="classified__terminal-line">&gt; SEALED. REVEAL AT 10:00 AM.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
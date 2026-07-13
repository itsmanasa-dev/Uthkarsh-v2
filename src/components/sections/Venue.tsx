import { motion } from 'motion/react'
import { eventConfig } from '../../data/eventConfig'
import './Venue.css'

export function Venue() {
  return (
    <section className="venue" id="venue">
      <div className="container">
        <div className="venue__layout">
          <motion.div
            className="venue__info"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="section-eyebrow">ACT 10 — THE DESTINATION</span>
            <h2 className="venue__title">Where It Happens</h2>
            <p className="venue__name">{eventConfig.institutionFull}</p>
            <p className="venue__location">{eventConfig.location}</p>
            <div className="venue__details">
              <div className="venue__detail">
                <span className="venue__detail-label">Reporting</span>
                <span className="venue__detail-value">{eventConfig.overallStart}</span>
              </div>
              <div className="venue__detail">
                <span className="venue__detail-label">Event Hours</span>
                <span className="venue__detail-value">{eventConfig.overallStart} – {eventConfig.overallEnd}</span>
              </div>
            </div>
            <p className="venue__note">Detailed directions will be shared with registered participants.</p>
          </motion.div>

          <motion.div
            className="venue__card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="venue__card-inner">
              <span className="venue__card-label">PESIAMS</span>
              <span className="venue__card-campus">Main Campus</span>
              <div className="venue__card-rule" />
              <span className="venue__card-address">
                PES Institute of Advanced Management Studies
                <br />
                Shivamogga, Karnataka
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

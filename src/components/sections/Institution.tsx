import { useState } from 'react'
import { motion } from 'motion/react'
import { eventConfig } from '../../data/eventConfig'
import './Institution.css'

export function Institution() {
  const [logoError, setLogoError] = useState(false)
  const [campusError, setCampusError] = useState(false)

  return (
    <section className="institution" id="institution">
      <div className="container">
        <div className="institution__layout">
          <motion.div
            className="institution__content"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="section-eyebrow">ACT 07 — THE INSTITUTION</span>
            <h2 className="institution__name">
              {eventConfig.institutionFull}
            </h2>
            <p className="institution__location">
              {eventConfig.location}
            </p>
            <div className="institution__dept">
              <h3 className="institution__dept-heading">Organised by</h3>
              <p className="institution__dept-name">{eventConfig.department}</p>
            </div>
            {!campusError && (
              <div className="institution__campus">
                <img
                  src="/media/home_welcome.jpeg"
                  alt="Campus"
                  className="institution__campus-img"
                  onError={() => setCampusError(true)}
                />
              </div>
            )}
          </motion.div>

          <motion.div
            className="institution__aside"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            {!logoError ? (
              <img
                className="institution__logo"
                src="/media/logo2.jpg"
                alt={eventConfig.institutionShort}
                onError={() => setLogoError(true)}
              />
            ) : (
              <div className="institution__logo-box">
                <span className="institution__logo-text">{eventConfig.institutionShort}</span>
                <span className="institution__logo-sub">Since 2008</span>
              </div>
            )}
            <p className="institution__blurb">
              PES Institute of Advanced Management Studies has been committed to academic
              excellence in management and computer applications education since 2008.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

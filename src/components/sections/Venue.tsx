import { motion } from 'motion/react'
import { eventConfig } from '../../data/eventConfig'
import './Venue.css'

const mapsUrl = `https://www.google.com/maps/search/${eventConfig.venue.mapsQuery}`

const venueDetails = [
  { label: 'Reporting', value: eventConfig.overallStart },
  { label: 'Event Hours', value: `${eventConfig.overallStart} – ${eventConfig.overallEnd}` },
  { label: 'Hackathon', value: `${eventConfig.hackathonStart} – ${eventConfig.hackathonEnd}` },
]

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
              {venueDetails.map((d) => (
                <div key={d.label} className="venue__detail">
                  <span className="venue__detail-label">{d.label}</span>
                  <span className="venue__detail-value">{d.value}</span>
                </div>
              ))}
            </div>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="venue__maps-cta"
            >
              Open in Google Maps
            </a>
          </motion.div>

          <motion.div
            className="venue__card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="venue__card-inner">
              <span className="venue__card-label">{eventConfig.institutionShort}</span>
              <span className="venue__card-campus">Main Campus</span>
              <div className="venue__card-rule" />
              <span className="venue__card-address">
                {eventConfig.institutionFull}
                <br />
                {eventConfig.location}
              </span>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="venue__card-cta"
              >
                Get Directions
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

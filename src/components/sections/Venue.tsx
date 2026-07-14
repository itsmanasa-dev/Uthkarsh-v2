import { useState } from 'react'
import { motion } from 'motion/react'
import { eventConfig } from '../../data/eventConfig'
import './Venue.css'

const mapsUrl = `https://www.google.com/maps/search/${eventConfig.venue.mapsQuery}`

const venueDetails = [
  { label: 'DATE', value: eventConfig.eventDate },
  { label: 'REPORTING', value: eventConfig.overallStart },
  { label: 'EVENT WINDOW', value: `${eventConfig.overallStart} \u2013 ${eventConfig.overallEnd}` },
  { label: 'HACKATHON', value: `${eventConfig.hackathonStart} \u2013 ${eventConfig.hackathonEnd}` },
]

export function Venue() {
  const [imageError, setImageError] = useState(false)

  return (
    <section className="venue section-surface--warm-black" id="venue">
      <div className="container">
        <div className="section-eyebrow">ACT 10 \u2014 LOCATION TERMINAL</div>
        <div className="venue__layout">
          <motion.div
            className="venue__info"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="venue__title">{eventConfig.venue.hall}</h2>
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
              <span>Open in Google Maps</span>
              <span className="venue__maps-arrow">{'\u2197'}</span>
            </a>
          </motion.div>

          <motion.div
            className="venue__map-wrap"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="venue__map-frame">
              <div className="venue__map-top">
                <span className="status-dot status-dot--active" />
                <span className="venue__map-coord">N13\u00b043' E75\u00b037'</span>
                <span className="venue__map-sep">|</span>
                <span className="venue__map-label">CAMPUS // PESIAMS</span>
              </div>
              <div className="venue__map">
                {!imageError ? (
                  <img
                    className="venue__map-image"
                    src={eventConfig.media.campusImage}
                    alt={`${eventConfig.institutionFull} campus`}
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="venue__map-fallback">
                    <p className="venue__map-fallback-text">{eventConfig.institutionShort} \u2014 Shivamogga</p>
                    <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="venue__map-fallback-cta">
                      Open in Google Maps {'\u2197'}
                    </a>
                  </div>
                )}
              </div>
              <div className="venue__map-bottom">
                <span className="venue__map-coord">{eventConfig.institutionShort}</span>
                <span>{eventConfig.location}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

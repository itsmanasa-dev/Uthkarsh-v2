import { useState } from 'react'
import { motion } from 'motion/react'
import { eventConfig } from '../../data/eventConfig'
import './Institution.css'

export function Institution() {
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [logoError, setLogoError] = useState(false)

  return (
    <section className="institution" id="institution">
      <div className="container">
        <div className="section-eyebrow">ACT 07 — HOST LOCATION</div>
        <div className="institution__layout">
          <motion.div
            className="institution__media"
            initial={{ clipPath: 'inset(0 0 100% 0)', opacity: 0 }}
            whileInView={{ clipPath: 'inset(0 0 0 0)', opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="institution__frame">
              <div className="institution__frame-top">
                <span className="status-dot status-dot--active" />
                <span className="institution__frame-signal">SIGNAL // STABLE</span>
                <span className="institution__frame-sep">|</span>
                <span>LOCATION // PESIAMS</span>
              </div>

              {!videoError ? (
                <video
                  className={`institution__video${videoLoaded ? ' institution__video--ready' : ''}`}
                  src={eventConfig.media.campusVideo}
                  muted autoPlay playsInline loop preload="auto"
                  poster={eventConfig.media.campusImage}
                  onLoadedData={() => setVideoLoaded(true)}
                  onError={() => setVideoError(true)}
                />
              ) : null}

              {!imageError && (videoError || !videoLoaded) ? (
                <img
                  className="institution__image"
                  src={eventConfig.media.campusImage}
                  alt={`${eventConfig.institutionFull} campus`}
                  onError={() => setImageError(true)}
                />
              ) : null}

              {videoError && imageError ? (
                <div className="institution__placeholder">
                  <span>{eventConfig.institutionShort}</span>
                  <span>Main Campus</span>
                </div>
              ) : null}

              <div className="institution__frame-bottom">
                <span>{eventConfig.institutionShort} · Main Campus</span>
                <span className="institution__frame-coord">N13°43' E75°37'</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="institution__content"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="institution__name">
              {eventConfig.institutionFull}
            </h2>
            <p className="institution__location">
              {eventConfig.location}
            </p>

            {!logoError ? (
              <div className="institution__logo-wrap">
                <img
                  className="institution__logo"
                  src={eventConfig.media.logo}
                  alt={eventConfig.institutionShort}
                  onError={() => setLogoError(true)}
                />
              </div>
            ) : (
              <div className="institution__logo-fallback">
                <span>{eventConfig.institutionShort}</span>
              </div>
            )}

            <div className="institution__dept">
              <span className="institution__dept-label">Organised by</span>
              <span className="institution__dept-name">{eventConfig.department}</span>
            </div>

            <p className="institution__blurb">
              PES Institute of Advanced Management Studies has been committed to academic
              excellence in management and computer applications education since 2008.
            </p>

            <div className="institution__host-badge">
              <span className="institution__host-dot" />
              <span className="institution__host-text">HOST // {eventConfig.institutionShort}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { contactConfig } from '../data/contact'
import { eventConfig } from '../data/eventConfig'
import './ContactUs.css'

export function ContactUs() {
  const reducedMotion = useReducedMotion()

  return (
    <div className="contact-page">
      <div className="contact-page__bg" />

      <div className="container">
        <div className="contact-page__hero">
          <motion.div
            className="contact-page__hero-content"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="contact-page__status">
              <span className="contact-page__status-dot" />
              <span className="contact-page__status-text">COMMUNICATION CHANNEL // OPEN</span>
            </div>

            <h1 className="contact-page__title">
              <span className="contact-page__title-line">COMMUNICATION</span>
              <span className="contact-page__title-line contact-page__title-line--accent">CHANNEL</span>
            </h1>

            <p className="contact-page__desc">
              Questions about registration, payment, team requirements, or the event?
              Connect directly with the UTKARSH 26 organising team.
            </p>

            <div className="contact-page__pulse-line" />
          </motion.div>
        </div>

        {/* Faculty Coordinators */}
        <motion.div
          className="contact-page__section"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="contact-page__section-header">
            <span className="contact-page__section-num">01</span>
            <h2 className="contact-page__section-title">FACULTY COORDINATORS</h2>
            <span className="contact-page__section-line" />
          </div>

          {contactConfig.facultyCoordinators.some(c => c.name || c.phone || c.email) ? (
            <div className="contact-page__grid">
              {contactConfig.facultyCoordinators.map((person, i) => (
                <div key={i} className="contact-page__card">
                  <span className="contact-page__card-index">FC{String(i + 1).padStart(2, '0')}</span>
                  {person.name && <p className="contact-page__card-name">{person.name}</p>}
                  {person.role && <p className="contact-page__card-role">{person.role}</p>}
                  <div className="contact-page__card-actions">
                    {person.phone && (
                      <a href={`tel:${person.phone}`} className="contact-page__action contact-page__action--call">
                        Call
                      </a>
                    )}
                    {person.email && (
                      <a href={`mailto:${person.email}`} className="contact-page__action contact-page__action--email">
                        Email
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="contact-page__empty">
              <span className="contact-page__empty-text">Faculty coordinator details pending confirmation.</span>
            </div>
          )}
        </motion.div>

        {/* Student Coordinators */}
        <motion.div
          className="contact-page__section"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="contact-page__section-header">
            <span className="contact-page__section-num">02</span>
            <h2 className="contact-page__section-title">STUDENT COORDINATORS</h2>
            <span className="contact-page__section-line" />
          </div>

          {contactConfig.studentCoordinators.some(c => c.name || c.phone || c.email) ? (
            <div className="contact-page__grid contact-page__grid--compact">
              {contactConfig.studentCoordinators.map((person, i) => (
                <div key={i} className="contact-page__card">
                  <span className="contact-page__card-index">SC{String(i + 1).padStart(2, '0')}</span>
                  {person.name && <p className="contact-page__card-name">{person.name}</p>}
                  {person.role && <p className="contact-page__card-role">{person.role}</p>}
                  <div className="contact-page__card-actions">
                    {person.phone && (
                      <a href={`tel:${person.phone}`} className="contact-page__action contact-page__action--call">
                        Call
                      </a>
                    )}
                    {person.email && (
                      <a href={`mailto:${person.email}`} className="contact-page__action contact-page__action--email">
                        Email
                      </a>
                    )}
                    {person.phone && contactConfig.whatsapp && (
                      <a
                        href={`https://wa.me/${contactConfig.whatsapp.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-page__action contact-page__action--whatsapp"
                      >
                        WhatsApp
                      </a>
                    )}
                  </div>
                  {!person.phone && person.name && (
                    <p className="contact-page__pending-text">Contact number pending confirmation</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="contact-page__empty">
              <span className="contact-page__empty-text">Student coordinator details pending confirmation.</span>
            </div>
          )}
        </motion.div>

        {/* Official Channels */}
        <motion.div
          className="contact-page__section"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="contact-page__section-header">
            <span className="contact-page__section-num">03</span>
            <h2 className="contact-page__section-title">OFFICIAL CHANNELS</h2>
            <span className="contact-page__section-line" />
          </div>

          <div className="contact-page__official">
            {contactConfig.official.email ? (
              <div className="contact-page__official-item">
                <span className="contact-page__official-label">EMAIL</span>
                <a href={`mailto:${contactConfig.official.email}`} className="contact-page__official-link">
                  {contactConfig.official.email}
                </a>
              </div>
            ) : (
              <div className="contact-page__official-item">
                <span className="contact-page__official-label">EMAIL</span>
                <span className="contact-page__official-pending">Pending confirmation</span>
              </div>
            )}

            {contactConfig.official.phone ? (
              <div className="contact-page__official-item">
                <span className="contact-page__official-label">PHONE</span>
                <a href={`tel:${contactConfig.official.phone}`} className="contact-page__official-link">
                  {contactConfig.official.phone}
                </a>
              </div>
            ) : (
              <div className="contact-page__official-item">
                <span className="contact-page__official-label">PHONE</span>
                <span className="contact-page__official-pending">Pending confirmation</span>
              </div>
            )}

            {contactConfig.official.website ? (
              <div className="contact-page__official-item">
                <span className="contact-page__official-label">WEBSITE</span>
                <a href={contactConfig.official.website} target="_blank" rel="noopener noreferrer" className="contact-page__official-link">
                  {contactConfig.official.website}
                </a>
              </div>
            ) : null}
          </div>
        </motion.div>

        {/* Location */}
        <motion.div
          className="contact-page__section"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="contact-page__section-header">
            <span className="contact-page__section-num">04</span>
            <h2 className="contact-page__section-title">LOCATION</h2>
            <span className="contact-page__section-line" />
          </div>

          <div className="contact-page__location">
            <p className="contact-page__location-name">{eventConfig.institutionFull}</p>
            <p className="contact-page__location-address">{eventConfig.location}</p>
            <div className="contact-page__location-detail">
              <span className="contact-page__location-label">REPORTING</span>
              <span className="contact-page__location-value">{eventConfig.overallStart}</span>
            </div>
            <div className="contact-page__location-detail">
              <span className="contact-page__location-label">DEPARTMENT</span>
              <span className="contact-page__location-value">{eventConfig.department}</span>
            </div>
            <a
              href={`https://www.google.com/maps/search/${eventConfig.venue.mapsQuery}`}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-page__maps-link"
            >
              Open in Google Maps {'\u2197'}
            </a>
          </div>
        </motion.div>

        {/* Quick Answers */}
        <motion.div
          className="contact-page__section"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          <div className="contact-page__section-header">
            <span className="contact-page__section-num">05</span>
            <h2 className="contact-page__section-title">QUICK ANSWERS</h2>
            <span className="contact-page__section-line" />
          </div>

            <div className="contact-page__quick">
            <div className="contact-page__quick-item">
              <span className="contact-page__quick-q">When is the event?</span>
              <span className="contact-page__quick-a">{eventConfig.eventDate}</span>
            </div>
            <div className="contact-page__quick-item">
              <span className="contact-page__quick-q">What time should I report?</span>
              <span className="contact-page__quick-a">{eventConfig.overallStart}</span>
            </div>
            <div className="contact-page__quick-item">
              <span className="contact-page__quick-q">How many participants are allowed per team?</span>
              <span className="contact-page__quick-a">{eventConfig.minTeamSize}\u2013{eventConfig.maxTeamSize} participants per team</span>
            </div>
            <div className="contact-page__quick-item">
              <span className="contact-page__quick-q">What is the registration fee?</span>
              <span className="contact-page__quick-a">{eventConfig.registrationFeeFormatted} per team</span>
            </div>
            <div className="contact-page__quick-item">
              <span className="contact-page__quick-q">What is the maximum number of teams?</span>
              <span className="contact-page__quick-a">Up to {eventConfig.maximumTeams} teams</span>
            </div>
            <div className="contact-page__quick-item">
              <span className="contact-page__quick-q">Is lunch provided?</span>
              <span className="contact-page__quick-a">Yes</span>
            </div>
            <div className="contact-page__quick-item">
              <span className="contact-page__quick-q">Where can I register?</span>
              <Link to="/register" className="contact-page__quick-link">Registration Portal {'\u2192'}</Link>
            </div>
            <div className="contact-page__quick-item">
              <span className="contact-page__quick-q">Where can I view the brochure?</span>
              <Link to="/#guidelines" className="contact-page__quick-link">View Brochure {'\u2192'}</Link>
            </div>
          </div>
        </motion.div>

        {/* Registration Support */}
        <motion.div
          className="contact-page__section contact-page__section--last"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="contact-page__section-header">
            <span className="contact-page__section-num">06</span>
            <h2 className="contact-page__section-title">REGISTRATION SUPPORT</h2>
            <span className="contact-page__section-line" />
          </div>

          <div className="contact-page__support">
            <p className="contact-page__support-text">
              For questions about payment verification, duplicate registration errors, UTR issues,
              participant details, or registration status, contact the organising team.
            </p>
            <Link to="/register" className="contact-page__support-cta">
              Go to Registration
            </Link>
          </div>
        </motion.div>

        <div className="contact-page__bottom">
          <Link to="/" className="contact-page__bottom-link">{'\u2190'} Back to Home</Link>
          <span className="contact-page__bottom-status">
            <span className="status-dot status-dot--active" />
            CHANNEL ACTIVE
          </span>
        </div>
      </div>
    </div>
  )
}
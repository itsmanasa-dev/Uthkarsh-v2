import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { contactConfig, hasContactData, hasAnyCoordinator } from '../../data/contact'
import './ContactSection.css'

function ContactAction({ href, label, type }: { href: string | null; label: string; type: 'phone' | 'email' | 'whatsapp' }) {
  if (!href) return null

  const classNames: Record<string, string> = {
    phone: 'contact__action contact__action--phone',
    email: 'contact__action contact__action--email',
    whatsapp: 'contact__action contact__action--whatsapp',
  }

  return (
    <a
      href={href}
      className={classNames[type]}
      target={type === 'email' ? undefined : '_blank'}
      rel={type === 'email' ? undefined : 'noopener noreferrer'}
      aria-label={`${label} via ${type}`}
    >
      <span className="contact__action-label">{label}</span>
      <span className="contact__action-arrow">{'\u2192'}</span>
    </a>
  )
}

function CoordinatorCard({ person, index, prefix }: {
  person: typeof contactConfig.facultyCoordinators[number]
  index: number
  prefix: string
}) {
  if (!person.name && !person.phone && !person.email) return null

  return (
    <div className="contact__card">
      <div className="contact__card-header">
        <span className="contact__card-index">{prefix}{String(index + 1).padStart(2, '0')}</span>
        {person.phone && (
          <span className="contact__card-status">
            <span className="status-dot status-dot--active" />
            <span className="contact__card-status-text">ONLINE</span>
          </span>
        )}
      </div>
      <div className="contact__card-body">
        {person.name && <p className="contact__card-name">{person.name}</p>}
        {person.role && <p className="contact__card-role">{person.role}</p>}
        {!person.phone && person.name && <p className="contact__card-role contact__card-role--pending">Contact number pending confirmation</p>}
      </div>
      <div className="contact__card-actions">
        <ContactAction href={person.phone ? `tel:${person.phone}` : null} label="Call" type="phone" />
        {person.phone && <ContactAction href={`https://wa.me/${person.phone.replace(/[^0-9]/g, '')}`} label="WhatsApp" type="whatsapp" />}
      </div>
    </div>
  )
}

export function ContactSection() {
  const coordinatorsExist = hasAnyCoordinator()
  const showContactLink = !coordinatorsExist && !hasContactData()

  const studentWithData = contactConfig.studentCoordinators.some(c => c.name || c.phone || c.email)
  const facultyWithData = contactConfig.facultyCoordinators.some(c => c.name || c.phone || c.email)

  return (
    <section className="contact section-surface--charcoal" id="contact">
      <div className="container">
        <div className="contact__header">
          <div className="contact__status">
            <span className="contact__status-dot" />
            <div className="contact__status-text">
              <span className="contact__status-line">COMMUNICATION CHANNEL</span>
              <span className="contact__status-line contact__status-line--open">STATUS // OPEN</span>
            </div>
          </div>
          <span className="contact__signal" />
        </div>

        <motion.div
          className="contact__intro"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="contact__intro-text">
            Questions about registration, payment, team requirements, or the event?
            <br />
            Contact the UTKARSH 26 organising team directly.
          </p>
        </motion.div>

        {(facultyWithData || studentWithData) && (
          <motion.div
            className="contact__directory"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {facultyWithData && (
              <div className="contact__group">
                <h3 className="contact__group-title">FACULTY COORDINATORS</h3>
                <div className="contact__grid contact__grid--faculty">
                  {contactConfig.facultyCoordinators.map((person, i) => (
                    <CoordinatorCard key={`fc-${i}`} person={person} index={i} prefix="FC" />
                  ))}
                </div>
              </div>
            )}

            {studentWithData && (
              <div className="contact__group">
                <h3 className="contact__group-title">STUDENT COORDINATORS</h3>
                <div className="contact__grid contact__grid--student">
                  {contactConfig.studentCoordinators.map((person, i) => (
                    <CoordinatorCard key={`sc-${i}`} person={person} index={i} prefix="SC" />
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {!facultyWithData && !studentWithData && (
          <motion.div
            className="contact__pending"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="contact__pending-grid">
              <div className="contact__pending-line" />
              <div className="contact__pending-line contact__pending-line--short" />
              <div className="contact__pending-line contact__pending-line--medium" />
            </div>
            <p className="contact__pending-text">
              Coordinator contact details will be available here once confirmed by the organising team.
            </p>
          </motion.div>
        )}

        <motion.div
          className="contact__resources"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="contact__resource">
            <span className="contact__resource-label">COMMON QUESTIONS</span>
            <Link to="/#guidelines" className="contact__resource-link">
              FAQ {'\u2192'}
            </Link>
          </div>
          {contactConfig.registrationSupport && (
            <div className="contact__resource">
              <span className="contact__resource-label">REGISTRATION SUPPORT</span>
              <span className="contact__resource-value">{contactConfig.registrationSupport}</span>
            </div>
          )}
          <div className="contact__resource">
            <span className="contact__resource-label">REGISTRATION HELP</span>
            <Link to="/register" className="contact__resource-link">
              Registration Portal {'\u2192'}
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          {contactConfig.official.email || contactConfig.official.phone ? (
            <div className="contact__official">
              <span className="contact__official-dot" />
              <div className="contact__official-info">
                {contactConfig.official.email && (
                  <a href={`mailto:${contactConfig.official.email}`} className="contact__official-link">
                    {contactConfig.official.email}
                  </a>
                )}
                {contactConfig.official.phone && (
                  <a href={`tel:${contactConfig.official.phone}`} className="contact__official-link">
                    {contactConfig.official.phone}
                  </a>
                )}
              </div>
            </div>
          ) : (
            <div className="contact__official contact__official--pending">
              <span className="contact__official-dot contact__official-dot--pending" />
              <span className="contact__official-text">Official contact details pending confirmation.</span>
            </div>
          )}
        </motion.div>

        {showContactLink && (
          <motion.div
            className="contact__details-link"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <Link to="/contact" className="contact__details-cta">
              View all contact information {'\u2192'}
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  )
}
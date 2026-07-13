import { useState } from 'react'
import { motion } from 'motion/react'
import { Accordion } from '../ui/Accordion'
import { rules as rulesData } from '../../data/rules'
import { faqItems } from '../../data/faq'
import { eventConfig } from '../../data/eventConfig'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import './Guidelines.css'

export function Guidelines() {
  const reducedMotion = useReducedMotion()
  const [brochureError, setBrochureError] = useState(false)

  const accordionItems = rulesData.map((rule) => ({
    id: rule.category.toLowerCase().replace(/\s+/g, '-'),
    title: rule.category,
    content: (
      <ul className="event-brief__list">
        {rule.items.map((item, i) => (
          <li key={i} className="event-brief__item">{item}</li>
        ))}
      </ul>
    ),
  }))

  const faqAccordionItems = faqItems.map((faq) => ({
    id: faq.question.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, ''),
    title: faq.question,
    content: faq.answer,
  }))

  const sections = [
    {
      id: 'brochure',
      title: '01 // OFFICIAL BROCHURE',
      content: (
        <div className="event-brief__documents">
          {!brochureError ? (
            <div className="event-brief__brochure">
              <div className="event-brief__brochure-image-wrap">
                <img
                  className="event-brief__brochure-image"
                  src={eventConfig.documents.brochureImage}
                  alt="Official UTKARSH 26 inter-college hackathon brochure"
                  onError={() => setBrochureError(true)}
                  loading="lazy"
                />
              </div>
              <p className="event-brief__brochure-desc">
                Everything you need to know about UTKARSH 26 \u2014 event schedule, eligibility, team requirements, rules, venue and registration information.
              </p>
              <div className="event-brief__brochure-actions">
                <a
                  href={eventConfig.documents.brochureImage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="event-brief__brochure-cta"
                >
                  <span>View Official Brochure</span>
                  <span className="event-brief__brochure-arrow">{'\u2197'}</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="event-brief__brochure event-brief__brochure--pending">
              <p className="event-brief__placeholder">The official brochure is being finalised. Check back soon for the complete event guide.</p>
            </div>
          )}
          <div className="event-brief__guidelines-card">
            <span className="event-brief__guidelines-card-label">GUIDELINES PDF</span>
            <span className="event-brief__guidelines-card-status">Coming Soon</span>
          </div>
        </div>
      ),
    },
    {
      id: 'prize',
      title: '02 // PRIZE POOL — UNLOCKED',
      content: (
        <div className="event-brief__prizes">
          <div className="event-brief__prizes-total">
            <span className="event-brief__prizes-amount">{eventConfig.prizes.totalFormatted}</span>
            <span className="event-brief__prizes-total-label">TOTAL CASH PRIZES</span>
          </div>
          <div className="event-brief__prizes-grid">
            <div className="event-brief__prize-card event-brief__prize-card--first">
              <div className="event-brief__prize-card-header">
                <span className="event-brief__prize-card-num">01</span>
                <span className="event-brief__prize-card-status">CHAMPION</span>
              </div>
              <span className="event-brief__prize-card-amount">{eventConfig.prizes.first.formatted}</span>
              <span className="event-brief__prize-card-label">{eventConfig.prizes.first.label}</span>
            </div>
            <div className="event-brief__prize-card event-brief__prize-card--second">
              <div className="event-brief__prize-card-header">
                <span className="event-brief__prize-card-num">02</span>
                <span className="event-brief__prize-card-status">RUNNER-UP</span>
              </div>
              <span className="event-brief__prize-card-amount">{eventConfig.prizes.second.formatted}</span>
              <span className="event-brief__prize-card-label">{eventConfig.prizes.second.label}</span>
            </div>
            <div className="event-brief__prize-card event-brief__prize-card--goodies">
              <div className="event-brief__prize-card-header">
                <span className="event-brief__prize-card-num">03</span>
                <span className="event-brief__prize-card-status">BONUS</span>
              </div>
              <div className="event-brief__prize-card-items">
                {eventConfig.prizes.items.map((item, i) => (
                  <span key={i} className="event-brief__prize-card-item">{item}</span>
                ))}
              </div>
              <span className="event-brief__prize-card-label">PERKS</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'rules',
      title: '03 // PROTOCOL RULES',
      content: <Accordion items={accordionItems} />,
    },
    {
      id: 'faq',
      title: '04 // FREQUENTLY ASKED QUESTIONS',
      content: <Accordion items={faqAccordionItems} />,
    },
  ]

  return (
    <section className="event-brief" id="guidelines">
      <div className="container">
        <div className="section-eyebrow">ACT 09 — EVENT DATABASE</div>
        <h2 className="event-brief__title">Event Brief</h2>

        <div className="event-brief__sections">
          {sections.map((section, i) => (
            <motion.div
              key={section.id}
              className="event-brief__section"
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 className="event-brief__section-title">
                <span className="event-brief__section-accent">#</span>
                {section.title}
              </h3>
              <div className="event-brief__section-body">
                {section.content}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
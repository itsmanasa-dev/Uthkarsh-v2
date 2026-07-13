import { motion } from 'motion/react'
import { Accordion } from '../ui/Accordion'
import { rules as rulesData } from '../../data/rules'
import { faqItems } from '../../data/faq'
import { eventConfig } from '../../data/eventConfig'
import './Guidelines.css'

export function Guidelines() {
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

  return (
    <section className="event-brief" id="guidelines">
      <div className="container">
        <motion.div
          className="event-brief__header"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="section-eyebrow">ACT 09 — THE BRIEF</span>
          <h2 className="event-brief__title">Event Brief</h2>
        </motion.div>

        <div className="event-brief__sections">
          {eventConfig.documents.brochureUrl && (
            <motion.div
              className="event-brief__section event-brief__section--brochure"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 className="event-brief__section-title">Official Brochure</h3>
              <p className="event-brief__brochure-desc">
                Everything participants need to know about {eventConfig.eventName}.
              </p>
              <a
                href={eventConfig.documents.brochureUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="event-brief__brochure-cta"
              >
                View Brochure
              </a>
            </motion.div>
          )}

          <motion.div
            className="event-brief__section"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="event-brief__section-title">Prize Pool</h3>
            <p className="event-brief__placeholder">
              To be revealed. Winners receive certificates and recognition.
            </p>
            <div className="event-brief__categories">
              <div className="event-brief__cat">
                <span className="event-brief__cat-num">01</span>
                <span className="event-brief__cat-label">Winner</span>
              </div>
              <div className="event-brief__cat">
                <span className="event-brief__cat-num">02</span>
                <span className="event-brief__cat-label">Runner-up</span>
              </div>
              <div className="event-brief__cat">
                <span className="event-brief__cat-num">03</span>
                <span className="event-brief__cat-label">Recognition</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="event-brief__section event-brief__section--full"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="event-brief__section-title">Essential Rules</h3>
            <Accordion items={accordionItems} />
          </motion.div>

          <motion.div
            className="event-brief__section event-brief__section--full"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="event-brief__section-title">Frequently Asked Questions</h3>
            <Accordion items={faqAccordionItems} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

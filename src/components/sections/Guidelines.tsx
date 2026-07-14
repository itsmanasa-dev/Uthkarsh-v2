import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Accordion } from '../ui/Accordion'
import { rules as rulesData } from '../../data/rules'
import { faqItems } from '../../data/faq'
import { eventConfig } from '../../data/eventConfig'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import './Guidelines.css'

function AnimatedTotal({ inView, reduced }: { inView: boolean; reduced: boolean }) {
  const [display, setDisplay] = useState(reduced ? '₹15,000+' : '₹0')

  useEffect(() => {
    if (!inView || reduced) {
      setDisplay('₹15,000+')
      return
    }
    const steps = ['₹0', '₹1,247', '₹3,892', '₹7,451', '₹11,203', '₹14,567', '₹15,000', '₹15,000+']
    let i = 0
    const interval = setInterval(() => {
      i++
      if (i >= steps.length) {
        clearInterval(interval)
        setDisplay('₹15,000+')
        return
      }
      setDisplay(steps[i])
    }, 110)
    return () => clearInterval(interval)
  }, [inView, reduced])

  return <>{display}</>
}

const ruleSummaries: Record<string, string> = {
  'Eligibility': 'Open to all inter-college students with valid institutional ID.',
  'Team Composition': `${eventConfig.minTeamSize}–${eventConfig.maxTeamSize} participants per team.`,
  'Development Rules': 'All development within designated hackathon hours only.',
  'AI Tool Policy': 'AI tool usage subject to event-day guidelines.',
  'Submission Requirements': 'Working prototype must be submitted before the hard deadline.',
  'Judging': 'Evaluated by a panel of judges. Decision is final.',
}

export function Guidelines() {
  const reducedMotion = useReducedMotion()
  const [brochureError, setBrochureError] = useState(false)
  const [openCard, setOpenCard] = useState<string | null>(null)
  const [faqShowAll, setFaqShowAll] = useState(false)

  const prizesInViewRef = useRef<HTMLDivElement>(null)
  const [prizesInView, setPrizesInView] = useState(false)

  useEffect(() => {
    const el = prizesInViewRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setPrizesInView(true); observer.disconnect() } },
      { rootMargin: '-40px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const cardTransition = (delay: number) => ({
    duration: 0.6,
    delay,
    ease: [0.22, 1, 0.36, 1] as const,
  })

  const prizeCardAnimation = (delay: number, reduced: boolean) => {
    if (reduced) return { initial: { opacity: 1 }, animate: { opacity: 1 } }
    return {
      initial: { opacity: 0, y: 24 },
      animate: { opacity: 1, y: 0 },
      transition: cardTransition(delay),
    }
  }

  const toggleCard = useCallback((id: string) => {
    setOpenCard(prev => prev === id ? null : id)
  }, [])

  const handleCardKeyDown = useCallback((e: React.KeyboardEvent, id: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      toggleCard(id)
    }
  }, [toggleCard])

  const displayedFaqs = faqShowAll ? faqItems : faqItems.slice(0, 5)

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
      title: '02 // REWARDS // UNLOCKED',
      content: (
        <div className="event-brief__prizes" ref={prizesInViewRef}>
          <motion.div
            className="event-brief__prizes-total"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
            animate={prizesInView || reducedMotion ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="event-brief__prizes-amount">
              <AnimatedTotal inView={prizesInView} reduced={reducedMotion} />
            </span>
            <span className="event-brief__prizes-total-label">TOTAL CASH PRIZES</span>
            <div className="event-brief__prizes-gold-line" />
          </motion.div>

          <div className="event-brief__prizes-grid">
            <motion.div
              className="event-brief__prize-card event-brief__prize-card--first"
              {...prizeCardAnimation(0.3, reducedMotion)}
            >
              <div className="event-brief__prize-card-scan" />
              <div className="event-brief__prize-card-header">
                <span className="event-brief__prize-card-num">01</span>
                <span className="event-brief__prize-card-status">CHAMPION</span>
              </div>
              <span className="event-brief__prize-card-amount">{eventConfig.prizes.first.formatted}</span>
              <span className="event-brief__prize-card-label">{eventConfig.prizes.first.label}</span>
            </motion.div>

            <motion.div
              className="event-brief__prize-card event-brief__prize-card--second"
              {...prizeCardAnimation(0.45, reducedMotion)}
            >
              <div className="event-brief__prize-card-header">
                <span className="event-brief__prize-card-num">02</span>
                <span className="event-brief__prize-card-status">RUNNER-UP</span>
              </div>
              <span className="event-brief__prize-card-amount">{eventConfig.prizes.second.formatted}</span>
              <span className="event-brief__prize-card-label">{eventConfig.prizes.second.label}</span>
            </motion.div>

            <motion.div
              className="event-brief__prize-card event-brief__prize-card--bonus"
              {...prizeCardAnimation(0.6, reducedMotion)}
            >
              <div className="event-brief__prize-card-header">
                <span className="event-brief__prize-card-num">03</span>
                <span className="event-brief__prize-card-status">BONUS</span>
              </div>
              <div className="event-brief__prize-card-bonus-grid">
                <motion.span
                  className="event-brief__prize-card-bonus-highlight"
                  initial={reducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
                  animate={prizesInView || reducedMotion ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
                >
                  EXCLUSIVE GOODIES
                </motion.span>
                <motion.div
                  className="event-brief__prize-card-bonus-row"
                  initial={reducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
                  animate={prizesInView || reducedMotion ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="event-brief__prize-card-bonus-line" />
                  <div className="event-brief__prize-card-bonus-content">
                    <span className="event-brief__prize-card-bonus-sub">WINNERS</span>
                    <span className="event-brief__prize-card-bonus-text">{eventConfig.prizes.certificates.winners}</span>
                  </div>
                </motion.div>
                <motion.div
                  className="event-brief__prize-card-bonus-row"
                  initial={reducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
                  animate={prizesInView || reducedMotion ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="event-brief__prize-card-bonus-line" />
                  <div className="event-brief__prize-card-bonus-content">
                    <span className="event-brief__prize-card-bonus-sub">ALL PARTICIPANTS</span>
                    <span className="event-brief__prize-card-bonus-text">{eventConfig.prizes.certificates.participation}</span>
                  </div>
                </motion.div>
              </div>
              <span className="event-brief__prize-card-label event-brief__prize-card-label--bonus">PERKS // UNLOCKED</span>
            </motion.div>
          </div>

          <motion.div
            className="event-brief__prizes-status"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={prizesInView || reducedMotion ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="event-brief__prizes-status-dot" />
            <span className="event-brief__prizes-status-text">REWARDS CONFIRMED</span>
            <span className="event-brief__prizes-status-sep" />
            <span className="event-brief__prizes-status-highlight">{eventConfig.prizes.totalFormatted} CASH POOL</span>
            <span className="event-brief__prizes-status-sep" />
            <span className="event-brief__prizes-status-dot" />
            <span className="event-brief__prizes-status-text">CERTIFICATES CONFIRMED</span>
          </motion.div>
        </div>
      ),
    },
    {
      id: 'rules',
      title: '03 // SYSTEM DIRECTIVES',
      content: (
        <div className="protocol-grid">
          {rulesData.map((rule, i) => {
            const cardId = `rule-${rule.category.toLowerCase().replace(/\s+/g, '-')}`
            const isOpen = openCard === cardId
            return (
              <div
                key={cardId}
                className={`protocol-card${isOpen ? ' protocol-card--open' : ''}`}
              >
                <button
                  className="protocol-card__trigger"
                  onClick={() => toggleCard(cardId)}
                  onKeyDown={(e) => handleCardKeyDown(e, cardId)}
                  aria-expanded={isOpen}
                  aria-controls={`protocol-content-${cardId}`}
                >
                  <div className="protocol-card__top">
                    <span className="protocol-card__num">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className={`protocol-card__icon${isOpen ? ' protocol-card__icon--open' : ''}`} aria-hidden="true">
                      <span className="protocol-card__icon-bar protocol-card__icon-bar--h" />
                      <span className={`protocol-card__icon-bar protocol-card__icon-bar--v${isOpen ? ' protocol-card__icon-bar--hide' : ''}`} />
                    </span>
                  </div>
                  <span className="protocol-card__title">{rule.category}</span>
                  <span className="protocol-card__summary">{ruleSummaries[rule.category]}</span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`protocol-content-${cardId}`}
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="protocol-card__content"
                      role="region"
                    >
                      <div className="protocol-card__body">
                        <ul className="event-brief__list">
                          {rule.items.map((item, j) => (
                            <li key={j} className="event-brief__item">{item}</li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      ),
    },
    {
      id: 'faq',
      title: '04 // FREQUENTLY ASKED QUESTIONS',
      content: (
        <div>
          <div className="faq-accordion">
            <Accordion
              items={displayedFaqs.map(faq => ({
                id: faq.question.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, ''),
                title: faq.question,
                content: faq.answer,
              }))}
            />
          </div>
          {faqItems.length > 5 && (
            <div className="faq-toggle">
              <button
                className="faq-toggle__btn"
                onClick={() => setFaqShowAll(prev => !prev)}
                aria-expanded={faqShowAll}
              >
                <span className="faq-toggle__text">
                  {faqShowAll ? 'COLLAPSE FAQs' : 'VIEW ALL FAQs'}
                </span>
                <span className={`faq-toggle__arrow${faqShowAll ? ' faq-toggle__arrow--up' : ''}`}>
                  {'\u2193'}
                </span>
              </button>
            </div>
          )}
        </div>
      ),
    },
  ]

  return (
    <section className="event-brief section-surface--warm-black" id="guidelines">
      <div className="container">
        <div className="section-eyebrow">ACT 08 — EVENT DATABASE</div>
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
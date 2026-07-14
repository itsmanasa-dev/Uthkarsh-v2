import { motion } from 'motion/react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { eventConfig } from '../../data/eventConfig'
import './About.css'

const lines = [
  { text: "YOU DON'T ARRIVE WITH THE SOLUTION.", delay: 0 },
  { text: 'THE PROBLEM IS REVEALED.', delay: 0.4 },
  { text: 'THE CLOCK STARTS.', delay: 0.8 },
  { text: 'YOU HAVE SIX HOURS.', delay: 1.2 },
  { text: 'THEN EVERYTHING CHANGES.', delay: 1.6, accent: true },
]

const ghostParams = [
  { text: '06 HOURS', top: '8%', left: '-5%', size: 'clamp(4rem, 12vw, 8rem)', delay: 0 },
  { text: '01 UNKNOWN PROBLEM', top: '30%', right: '-8%', size: 'clamp(2.5rem, 6vw, 4.5rem)', delay: 0.3 },
  { text: `${eventConfig.maximumTeams} TEAMS`, top: '55%', left: '-3%', size: 'clamp(3rem, 8vw, 5.5rem)', delay: 0.6 },
  { text: `${eventConfig.maxParticipants} MINDS`, top: '75%', right: '-5%', size: 'clamp(2rem, 5vw, 3.5rem)', delay: 0.9 },
]

export function About() {
  const reducedMotion = useReducedMotion()

  return (
    <section className="about section-surface--charcoal" id="about">
      <div className="about__bg" />

      <div className="ghost-overlay" aria-hidden="true">
        {ghostParams.map((p) => (
          <motion.span
            key={p.text}
            className="ghost-text"
            style={{
              position: 'absolute',
              top: p.top,
              left: p.left,
              right: p.right,
              fontSize: p.size,
              whiteSpace: 'nowrap',
            }}
            initial={reducedMotion ? { opacity: 0.025 } : { opacity: 0 }}
            whileInView={{ opacity: 0.025 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: p.delay, ease: [0.22, 1, 0.36, 1] }}
          >
            {p.text}
          </motion.span>
        ))}
      </div>

      <div className="about__signal-line" />

      <div className="container">
        <div className="section-eyebrow">ACT 01 — MISSION BRIEF</div>
        <div className="about__layout">
          <div className="about__statement">
            {lines.map((line) => (
              <motion.p
                key={line.text}
                className={`about__line${line.accent ? ' about__line--accent' : ''}`}
                initial={reducedMotion ? { opacity: 1 } : { opacity: 0.15 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: line.delay, ease: [0.22, 1, 0.36, 1] }}
              >
                {line.accent && <span className="about__line-accent-dot" />}
                {line.text}
              </motion.p>
            ))}
          </div>
          <div className="about__body">
            <motion.p
              className="about__text"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              UTKARSH 26 is a six-hour inter-college hackathon where up to {eventConfig.maximumTeams} teams
              of 2–4 participants build working solutions against the clock.
            </motion.p>
            <motion.p
              className="about__text"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              The problem is revealed on-site. A hidden challenge arrives during the hackathon.
              Teams must adapt.
            </motion.p>
          </div>
        </div>

        <motion.div
          className="about__params"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="about__param">
            <span className="about__param-label">CLASSIFICATION</span>
            <span className="about__param-value">UNRESTRICTED</span>
          </div>
          <div className="about__param">
            <span className="about__param-label">DURATION</span>
            <span className="about__param-value">{eventConfig.hackathonDuration}</span>
          </div>
          <div className="about__param">
            <span className="about__param-label">TEAMS</span>
            <span className="about__param-value">{eventConfig.maximumTeams} MAX</span>
          </div>
          <div className="about__param">
            <span className="about__param-label">PARTICIPANTS</span>
            <span className="about__param-value">{eventConfig.maxParticipants} MAX</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
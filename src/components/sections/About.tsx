import { motion } from 'motion/react'
import './About.css'

const lines = [
  { text: "YOU DON'T ARRIVE WITH THE SOLUTION.", delay: 0 },
  { text: 'THE PROBLEM IS REVEALED.', delay: 0.4 },
  { text: 'THE CLOCK STARTS.', delay: 0.8 },
  { text: 'YOU HAVE SIX HOURS.', delay: 1.2 },
  { text: 'THEN EVERYTHING CHANGES.', delay: 1.6, accent: true },
]

export function About() {
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about__layout">
          <div className="about__statement">
            {lines.map((line) => (
              <motion.p
                key={line.text}
                className={`about__line${line.accent ? ' about__line--accent' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: line.delay, ease: [0.22, 1, 0.36, 1] }}
              >
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
              UTKARSH 26 is a six-hour inter-college hackathon where up to 50 teams
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
      </div>
    </section>
  )
}

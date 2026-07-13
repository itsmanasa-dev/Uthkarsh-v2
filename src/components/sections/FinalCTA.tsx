import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { eventConfig } from '../../data/eventConfig'
import './FinalCTA.css'

export function FinalCTA() {
  return (
    <section className="final-cta">
      <div className="container">
        <motion.div
          className="final-cta__content"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="final-cta__title">
            <span className="final-cta__line">THE CLOCK</span>
            <span className="final-cta__line final-cta__line--accent">WON'T WAIT.</span>
            <span className="final-cta__line">WILL YOU?</span>
          </h2>

          <p className="final-cta__text">
            {eventConfig.maximumTeams} teams · {eventConfig.minTeamSize}–{eventConfig.maxTeamSize} participants per team
            <br />
            {eventConfig.registrationFeeFormatted} registration fee
          </p>

          <Link to="/register" className="final-cta__button">
            Register Your Team
          </Link>

          <p className="final-cta__note">
            Spots are limited to {eventConfig.maximumTeams} teams.
            <br />
            Registration is subject to payment verification.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

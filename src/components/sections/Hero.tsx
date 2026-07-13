import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { eventConfig } from '../../data/eventConfig'
import './Hero.css'

export function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="container">
        <div className="hero__layout">
          <div className="hero__left">
            <motion.div
              className="hero__badge"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <span>{eventConfig.institutionShort} · {eventConfig.department}</span>
            </motion.div>

            <motion.h1
              className="hero__title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="hero__title-event">UTKARSH</span>
              <span className="hero__title-num">26</span>
            </motion.h1>

            <motion.p
              className="hero__desc"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              Six-hour inter-college hackathon.
              <br />
              One unknown problem. One hidden disruption. One deadline.
            </motion.p>

            <motion.div
              className="hero__info"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <span>{eventConfig.institutionFull}</span>
              <span className="hero__info-sep" />
              <span>{eventConfig.location}</span>
            </motion.div>

            <motion.div
              className="hero__stats"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="hero__stat">
                <span className="hero__stat-value">{eventConfig.maximumTeams}</span>
                <span className="hero__stat-label">Teams</span>
              </div>
              <div className="hero__stat-divider" />
              <div className="hero__stat">
                <span className="hero__stat-value">200</span>
                <span className="hero__stat-label">Minds</span>
              </div>
              <div className="hero__stat-divider" />
              <div className="hero__stat">
                <span className="hero__stat-value">6</span>
                <span className="hero__stat-label">Hours</span>
              </div>
              <div className="hero__stat-divider" />
              <div className="hero__stat">
                <span className="hero__stat-value">2–4</span>
                <span className="hero__stat-label">Per Team</span>
              </div>
            </motion.div>

            <motion.div
              className="hero__actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link to="/register" className="hero__cta hero__cta--primary">
                Register Your Team
              </Link>
              <a href="#about" className="hero__cta hero__cta--secondary">
                Explore the Challenge
              </a>
            </motion.div>
          </div>

          <div className="hero__right">
            <motion.div
              className="hero__clock"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="hero__clock-digits">
                <span className="hero__clock-digit">06</span>
                <span className="hero__clock-sep">:</span>
                <span className="hero__clock-digit">00</span>
                <span className="hero__clock-sep">:</span>
                <span className="hero__clock-digit">00</span>
              </div>
              <div className="hero__clock-label">TIME ON THE CLOCK</div>
              <div className="hero__clock-rule" />
              <div className="hero__clock-range">10:00 → 16:00</div>
            </motion.div>

            <motion.div
              className="hero__big-26"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              aria-hidden="true"
            >
              26
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

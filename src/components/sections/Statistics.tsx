import { motion } from 'motion/react'
import './Statistics.css'

const stats = [
  { value: '50', label: 'Teams' },
  { value: '200', label: 'Minds' },
  { value: '6', label: 'Hours' },
  { value: '2–4', label: 'Per Team' },
]

export function Statistics() {
  return (
    <section className="stats">
      <div className="container">
        <div className="stats__strip">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="stats__item"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="stats__value">{stat.value}</span>
              <span className="stats__label">{stat.label}</span>
            </motion.div>
          ))}
          <motion.div
            className="stats__pulse"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <span className="stats__pulse-dot" />
            <span className="stats__pulse-label">Capacity: 50 teams</span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

import { motion } from 'motion/react'
import { facultyMembers } from '../../data/faculty'
import './Faculty.css'

const facultyConfig: Record<string, { objectPosition: string; role: string }> = {
  principal: { objectPosition: 'center 25%', role: 'Principal' },
  hod: { objectPosition: 'center 30%', role: 'Head of Department' },
  asma: { objectPosition: 'center 30%', role: 'Faculty' },
  sachidanand: { objectPosition: 'center 30%', role: 'Faculty' },
  banuprakash: { objectPosition: 'center 30%', role: 'Faculty' },
}

function FacultyCard({ member, index }: { member: typeof facultyMembers[number]; index: number }) {
  const config = facultyConfig[member.id] || { objectPosition: 'center 30%', role: '' }
  const isLeader = member.id === 'principal' || member.id === 'hod'

  return (
    <motion.div
      className={`faculty__card${isLeader ? ' faculty__card--leader' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="faculty__image-wrap">
        <img
          src={member.image}
          alt={member.name ? `${member.name}` : `${config.role}`}
          className="faculty__image"
          style={{ objectPosition: config.objectPosition }}
          onError={(e) => {
            const target = e.currentTarget
            target.style.display = 'none'
            const ph = target.nextElementSibling
            if (ph) (ph as HTMLElement).style.display = 'flex'
          }}
        />
        <div className="faculty__placeholder">
          <span className="faculty__placeholder-initial">
            {member.id === 'principal' ? 'PR' :
             member.id === 'hod' ? 'HD' :
             member.id.charAt(0).toUpperCase()}
          </span>
        </div>
      </div>
      <div className="faculty__info">
        {member.name ? (
          <h3 className="faculty__name">{member.name}</h3>
        ) : (
          <h3 className="faculty__name faculty__name--pending">{config.role}</h3>
        )}
        {member.designation && (
          <p className="faculty__role">{member.designation}</p>
        )}
        {!member.designation && config.role && (
          <p className="faculty__role">{config.role}</p>
        )}
      </div>
    </motion.div>
  )
}

export function Faculty() {
  const leaders = facultyMembers.filter(m => m.id === 'principal' || m.id === 'hod')
  const others = facultyMembers.filter(m => m.id !== 'principal' && m.id !== 'hod')

  return (
    <section className="faculty" id="faculty">
      <div className="container">
        <div className="faculty__header">
          <motion.span
            className="section-eyebrow"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
          >
            ACT 08 — THE PEOPLE
          </motion.span>
          <motion.h2
            className="faculty__heading"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            Faculty &amp; Leadership
          </motion.h2>
        </div>

        <div className="faculty__leadership">
          {leaders.map((member, i) => (
            <FacultyCard key={member.id} member={member} index={i} />
          ))}
        </div>

        <div className="faculty__grid">
          {others.map((member, i) => (
            <FacultyCard key={member.id} member={member} index={i + leaders.length} />
          ))}
        </div>
      </div>
    </section>
  )
}

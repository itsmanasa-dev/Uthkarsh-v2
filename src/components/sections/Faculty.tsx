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
  const displayName = member.name || config.role
  const isPlaceholder = !member.name && !isLeader

  return (
    <motion.div
      className={`faculty__card${isLeader ? ' faculty__card--leader' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="faculty__index">
        <span className="faculty__index-num">{String(index + 1).padStart(2, '0')}</span>
        <span className="faculty__index-line" />
      </div>
      <div className="faculty__image-wrap">
        <img
          src={member.image}
          alt={displayName || `${config.role || 'Faculty'}`}
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
             member.id.charAt(0).toUpperCase() + (member.id.length > 1 ? member.id.charAt(1) : '')}
          </span>
        </div>
      </div>
      <div className="faculty__info">
        <div className="faculty__status-line" />
        <h3 className="faculty__name">{displayName}</h3>
        {isPlaceholder ? (
          <p className="faculty__role faculty__role--pending">Details to be announced</p>
        ) : null}
      </div>
    </motion.div>
  )
}

export function Faculty() {
  const leaders = facultyMembers.filter(m => m.id === 'principal' || m.id === 'hod')
  const others = facultyMembers.filter(m => m.id !== 'principal' && m.id !== 'hod')

  return (
    <section className="faculty section-surface--charcoal" id="faculty">
      <div className="container">
        <div className="section-eyebrow">ACT 07 — PERSONNEL DIRECTORY</div>
        <h2 className="faculty__heading">People Behind the Protocol</h2>

        <div className="faculty__leadership">
          {leaders.map((member, i) => (
            <FacultyCard key={member.id} member={member} index={i} />
          ))}
        </div>

        <div className="faculty__divider">
          <span className="faculty__divider-line" />
          <span className="faculty__divider-label">FACULTY</span>
          <span className="faculty__divider-line" />
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
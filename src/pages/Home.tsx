import { useState, useEffect } from 'react'
import { Hero } from '../components/sections/Hero'
import { About } from '../components/sections/About'
import { Statistics } from '../components/sections/Statistics'
import { Classified } from '../components/sections/Classified'
import { HiddenTwist } from '../components/sections/HiddenTwist'
import { Timeline } from '../components/sections/Timeline'
import { CampusInMotion } from '../components/sections/CampusInMotion'
import { Institution } from '../components/sections/Institution'
import { Faculty } from '../components/sections/Faculty'
import { Guidelines } from '../components/sections/Guidelines'
import { Venue } from '../components/sections/Venue'
import { ContactSection } from '../components/sections/ContactSection'
import { FinalCTA } from '../components/sections/FinalCTA'
import { IntroExperience } from '../components/intro/IntroExperience'

const STORAGE_KEY = 'utkarsh26_intro_seen'

export function Home() {
  const [introComplete, setIntroComplete] = useState(() => {
    try {
      return sessionStorage.getItem(STORAGE_KEY) === 'true'
    } catch {
      return false
    }
  })
  const [showIntro, setShowIntro] = useState(!introComplete)

  useEffect(() => {
    if (introComplete) {
      setShowIntro(false)
    }
  }, [introComplete])

  const handleIntroComplete = () => {
    try {
      sessionStorage.setItem(STORAGE_KEY, 'true')
    } catch { /* noop */ }
    setIntroComplete(true)
  }

  return (
    <>
      {showIntro && !introComplete && (
        <IntroExperience onComplete={handleIntroComplete} />
      )}
      <Hero />
      <About />
      <Statistics />
      <Classified />
      <HiddenTwist />
      <Timeline />
      <CampusInMotion />
      <Institution />
      <Faculty />
      <Guidelines />
      <Venue />
      <ContactSection />
      <FinalCTA />
    </>
  )
}

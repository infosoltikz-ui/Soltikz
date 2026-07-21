import { Metadata } from 'next'
import { HeroSection } from '@/components/landing/HeroSection'
import { AboutWhatWeDo } from '@/components/about/AboutWhatWeDo'
import { AboutMission } from '@/components/about/AboutMission'
import { AboutWhyChoose } from '@/components/about/AboutWhyChoose'
import { AboutStats } from '@/components/about/AboutStats'
import { AboutCTA } from '@/components/about/AboutCTA'

export const metadata: Metadata = {
  title: 'About Us - Soltkiz IT AI Resume Builder',
  description: 'Empowering Talent. Building Careers. Transforming Futures.',
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <AboutWhatWeDo />
      <AboutMission />
      <AboutWhyChoose />
      <AboutStats />
      <AboutCTA />
    </main>
  )
}

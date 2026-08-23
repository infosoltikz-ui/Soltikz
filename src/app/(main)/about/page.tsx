import { Metadata } from 'next'
import { HeroSection } from '@/components/landing/HeroSection'
import { AboutWhatWeDo } from '@/components/about/AboutWhatWeDo'
import { AboutMission } from '@/components/about/AboutMission'
import { AboutWhyChoose } from '@/components/about/AboutWhyChoose'
import { AboutStats } from '@/components/about/AboutStats'
import { AboutCTA } from '@/components/about/AboutCTA'

export const metadata: Metadata = {
  title: 'About Us - Empowering Careers with AI Technology | Resume Builder One',
  description: 'Learn about Resume Builder One by Soltkiz IT Services. Our mission is to help job seekers worldwide create professional, ATS-beating resumes effortlessly.',
  alternates: {
    canonical: 'https://www.resumebuilderone.com/about',
  },
  openGraph: {
    title: 'About Us - Empowering Careers with AI Technology | Resume Builder One',
    description: 'Learn about Resume Builder One by Soltkiz IT Services. Our mission is to help job seekers worldwide create professional, ATS-beating resumes effortlessly.',
    url: 'https://www.resumebuilderone.com/about',
  },
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

import { Metadata } from 'next'
import { HeroSection } from '@/components/landing/HeroSection'
import { FeaturesSection } from '@/components/landing/FeaturesSection'
import { HowItWorksSection } from '@/components/landing/HowItWorksSection'
import { TemplatesSection } from '@/components/landing/TemplatesSection'
import { StatsSection } from '@/components/landing/StatsSection'
import { TestimonialsSection } from '@/components/landing/TestimonialsSection'
import { CTASection } from '@/components/landing/CTASection'

export const metadata: Metadata = {
  title: 'AI Resume Builder & Instant ATS Checker | Resume Builder One',
  description: 'Create recruiter-ready, ATS-friendly resumes in minutes with AI. Real-time ATS scoring, keyword optimization, modern templates, and instant PDF downloads.',
  alternates: {
    canonical: 'https://www.resumebuilderone.com',
  },
  openGraph: {
    title: 'AI Resume Builder & Instant ATS Checker | Resume Builder One',
    description: 'Create recruiter-ready, ATS-friendly resumes in minutes with AI. Real-time ATS scoring, keyword optimization, modern templates, and instant PDF downloads.',
    url: 'https://www.resumebuilderone.com',
  },
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TemplatesSection />
      <StatsSection />
      <TestimonialsSection />
      <CTASection />
    </>
  )
}

import { Metadata } from 'next'
import { HeroSection } from '@/components/landing/HeroSection'
import { StatsSection } from '@/components/landing/StatsSection'
import { ATSCompatibilitySection } from '@/components/landing/ATSCompatibilitySection'
import { FeaturesSection } from '@/components/landing/FeaturesSection'
import { BeforeAfterSection } from '@/components/landing/BeforeAfterSection'
import { ResumeTypesSection } from '@/components/landing/ResumeTypesSection'
import { PricingSection } from '@/components/landing/PricingSection'
import { TestimonialsSection } from '@/components/landing/TestimonialsSection'
import { FAQSection } from '@/components/landing/FAQSection'
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
      <StatsSection />
      <ATSCompatibilitySection />
      <FeaturesSection />
      <BeforeAfterSection />
      <ResumeTypesSection />
      <PricingSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </>
  )
}

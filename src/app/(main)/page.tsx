import { Metadata } from 'next'
import { HeroSection } from '@/components/landing/HeroSection'
import { StatsSection } from '@/components/landing/StatsSection'
import { BentoFeaturesSection } from '@/components/landing/BentoFeaturesSection'
import { HowItWorksSection } from '@/components/landing/HowItWorksSection'
import { TemplatesSection } from '@/components/landing/TemplatesSection'
import { BeforeAfterSection } from '@/components/landing/BeforeAfterSection'
import { PricingSection } from '@/components/landing/PricingSection'
import { TestimonialsSection } from '@/components/landing/TestimonialsSection'
import { FAQSection } from '@/components/landing/FAQSection'
import { CTASection } from '@/components/landing/CTASection'

export const metadata: Metadata = {
  title: 'AI Resume Builder & Instant ATS Checker | Soltkiz',
  description: 'Create recruiter-ready, ATS-friendly resumes in minutes with AI. Real-time ATS scoring, keyword optimization, modern templates, and instant Word (.docx) & PDF downloads.',
  alternates: {
    canonical: 'https://www.resumebuilderone.com',
  },
  openGraph: {
    title: 'AI Resume Builder & Instant ATS Checker | Soltkiz',
    description: 'Create recruiter-ready, ATS-friendly resumes in minutes with AI. Real-time ATS scoring, keyword optimization, modern templates, and instant Word (.docx) & PDF downloads.',
    url: 'https://www.resumebuilderone.com',
  },
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <BentoFeaturesSection />
      <HowItWorksSection />
      <TemplatesSection />
      <BeforeAfterSection />
      <PricingSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </>
  )
}

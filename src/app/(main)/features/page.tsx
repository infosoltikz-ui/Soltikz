import { Metadata } from 'next'
import { HeroSection } from '@/components/landing/HeroSection'
import { CoreFeatures } from '@/components/features/CoreFeatures'
import { AdvancedFeatures } from '@/components/features/AdvancedFeatures'
import { FeaturesWorkflow } from '@/components/features/FeaturesWorkflow'
import { FeaturesStats } from '@/components/features/FeaturesStats'
import { CTASection } from '@/components/landing/CTASection'

export const metadata: Metadata = {
  title: 'Powerful AI Resume Features & ATS Scoring Tools | Resume Builder One',
  description: 'Explore AI resume writing, real-time ATS compatibility scoring, cover letter generator, bullet point optimization, and job-tailored resume customization.',
  alternates: {
    canonical: 'https://www.resumebuilderone.com/features',
  },
  openGraph: {
    title: 'Powerful AI Resume Features & ATS Scoring Tools | Resume Builder One',
    description: 'Explore AI resume writing, real-time ATS compatibility scoring, cover letter generator, and job-tailored resume customization.',
    url: 'https://www.resumebuilderone.com/features',
  },
}

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <HeroSection />
      <CoreFeatures />
      <AdvancedFeatures />
      <FeaturesWorkflow />
      <FeaturesStats />
      <CTASection />
    </main>
  )
}

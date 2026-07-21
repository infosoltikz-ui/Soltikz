import { Metadata } from 'next'
import { HeroSection } from '@/components/landing/HeroSection'
import { CoreFeatures } from '@/components/features/CoreFeatures'
import { AdvancedFeatures } from '@/components/features/AdvancedFeatures'
import { FeaturesWorkflow } from '@/components/features/FeaturesWorkflow'
import { FeaturesStats } from '@/components/features/FeaturesStats'
import { CTASection } from '@/components/landing/CTASection'

export const metadata: Metadata = {
  title: 'Features - Soltkiz IT AI Resume Builder',
  description: 'Everything you need to build a perfect ATS-optimized resume.',
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

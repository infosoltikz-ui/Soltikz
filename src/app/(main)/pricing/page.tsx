import { Metadata } from 'next'
import { HeroSection } from '@/components/landing/HeroSection'
import { PricingCards } from '@/components/pricing/PricingCards'
import { PricingCompare } from '@/components/pricing/PricingCompare'
import { PricingBanner } from '@/components/pricing/PricingBanner'
import { PricingFAQ } from '@/components/pricing/PricingFAQ'

export const metadata: Metadata = {
  title: 'Pricing - Soltkiz IT AI Resume Builder',
  description: 'Simple, Transparent Pricing. Affordable Plans for Every Career Stage.',
}

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-slate-50 pb-16">
      <HeroSection />
      <PricingCards />
      <PricingCompare />
      <PricingBanner />
      <PricingFAQ />
    </main>
  )
}

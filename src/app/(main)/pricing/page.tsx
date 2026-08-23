import { Metadata } from 'next'
import { HeroSection } from '@/components/landing/HeroSection'
import { PricingCards } from '@/components/pricing/PricingCards'
import { PricingCompare } from '@/components/pricing/PricingCompare'
import { PricingBanner } from '@/components/pricing/PricingBanner'
import { PricingFAQ } from '@/components/pricing/PricingFAQ'

export const metadata: Metadata = {
  title: 'Affordable Pricing Plans - Free & Pro AI Resume Builder | Resume Builder One',
  description: 'Simple, transparent pricing. Free forever tier and affordable Pro plans with unlimited AI resume exports, ATS checker, and cover letters.',
  alternates: {
    canonical: 'https://www.resumebuilderone.com/pricing',
  },
  openGraph: {
    title: 'Affordable Pricing Plans - Free & Pro AI Resume Builder | Resume Builder One',
    description: 'Simple, transparent pricing. Free forever tier and affordable Pro plans with unlimited AI resume exports and ATS score checking.',
    url: 'https://www.resumebuilderone.com/pricing',
  },
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

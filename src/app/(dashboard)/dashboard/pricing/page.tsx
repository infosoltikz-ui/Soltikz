'use client'

import { useState } from 'react'
import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import { PricingToggle } from '@/components/dashboard/pricing/PricingToggle'
import { PricingTiers } from '@/components/dashboard/pricing/PricingTiers'
import { PricingTable } from '@/components/dashboard/pricing/PricingTable'
import { WhyUpgrade } from '@/components/dashboard/pricing/WhyUpgrade'
import { PricingFAQ } from '@/components/dashboard/pricing/PricingFAQ'
import { PricingCTA } from '@/components/dashboard/pricing/PricingCTA'

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(true)

  return (
    <div className="p-8 max-w-[1600px] mx-auto min-h-screen">

      {/* Top Header */}
      <DashboardHeader
        title="Pricing & Subscription"
        subtitle="Choose the perfect plan to build ATS-friendly resumes and accelerate your career."
      />

      {/* Main Content */}
      <div className="max-w-5xl mx-auto w-full">

        {/* Pricing Toggle & Tiers */}
        <PricingToggle isYearly={isYearly} onChange={setIsYearly} />
        <PricingTiers isYearly={isYearly} />

        {/* Feature Comparison Table */}
        <PricingTable />

        {/* Why Upgrade Section */}
        <WhyUpgrade />

        {/* FAQ Section */}
        <PricingFAQ />

        {/* Bottom CTA */}
        <PricingCTA />

      </div>

    </div>
  )
}

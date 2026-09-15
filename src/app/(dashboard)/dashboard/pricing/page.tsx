'use client'

import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import { PricingSection } from '@/components/landing/PricingSection'
import { PricingTable } from '@/components/dashboard/pricing/PricingTable'
import { WhyUpgrade } from '@/components/dashboard/pricing/WhyUpgrade'
import { PricingFAQ } from '@/components/dashboard/pricing/PricingFAQ'
import { PricingCTA } from '@/components/dashboard/pricing/PricingCTA'

export default function PricingPage() {

  return (
    <div className="p-8 max-w-[1600px] mx-auto min-h-screen">

      {/* Top Header */}
      <DashboardHeader
        title="Pricing & Subscription"
        subtitle="Choose the perfect plan to build ATS-friendly resumes and accelerate your career."
      />

      {/* Main Content */}
      <div className="max-w-5xl mx-auto w-full">

        {/* Pricing Section (Shared with Landing Page) */}
        <div className="-mx-8">
          <PricingSection />
        </div>

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

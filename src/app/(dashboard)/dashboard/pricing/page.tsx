import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import { PricingSidebar } from '@/components/dashboard/pricing/PricingSidebar'
import { PricingToggle } from '@/components/dashboard/pricing/PricingToggle'
import { PricingTiers } from '@/components/dashboard/pricing/PricingTiers'
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

      {/* Main Layout */}
      <div className="flex flex-col xl:flex-row gap-8">
        
        {/* Main Content Area */}
        <div className="flex-1 min-w-0 max-w-5xl mx-auto w-full">
          
          {/* Pricing Toggle & Tiers */}
          <PricingToggle />
          <PricingTiers />

          {/* Feature Comparison Table */}
          <PricingTable />

          {/* Why Upgrade Section */}
          <WhyUpgrade />

          {/* FAQ Section */}
          <PricingFAQ />

          {/* Bottom CTA */}
          <PricingCTA />
          
        </div>

        {/* Right Sidebar */}
        <PricingSidebar />

      </div>

    </div>
  )
}

import Link from 'next/link'
import { CreditCard } from 'lucide-react'
import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import { InsidePricingPlans } from '@/components/dashboard/pricing/InsidePricingPlans'
import { PricingTable } from '@/components/dashboard/pricing/PricingTable'
import { WhyUpgrade } from '@/components/dashboard/pricing/WhyUpgrade'
import { PricingFAQ } from '@/components/dashboard/pricing/PricingFAQ'
import { PricingCTA } from '@/components/dashboard/pricing/PricingCTA'

export default function PricingPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-6 pb-14 max-w-[1540px] mx-auto">
      <DashboardHeader
        eyebrow="Subscription & Credits"
        title="Pricing & Plans"
        subtitle="Choose the plan that fits your job search pace and unlock full ATS & interview prep tools."
        actions={
          <Link
            href="/dashboard/settings?tab=billing"
            className="inline-flex items-center gap-2 h-10 px-4 rounded-xl border border-slate-200 bg-white hover:bg-[#F8FAFC] hover:border-slate-300 text-slate-700 hover:text-[#0F2744] text-[13px] font-bold shadow-xs transition-all"
          >
            <CreditCard className="w-4 h-4 text-[#0F2744]" />
            <span>Manage Billing</span>
          </Link>
        }
      />

      <div className="max-w-5xl mx-auto w-full">
        <InsidePricingPlans />
        <PricingTable />
        <WhyUpgrade />
        <PricingFAQ />
        <PricingCTA />
      </div>
    </div>
  )
}

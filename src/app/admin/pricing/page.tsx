'use client'

import { useState } from 'react'
import { PricingAnalyticsCards } from '@/components/admin/pricing/PricingAnalyticsCards'
import { PricingActionToolbar } from '@/components/admin/pricing/PricingActionToolbar'
import { PricingPlanCards } from '@/components/admin/pricing/PricingPlanCards'
import { PlanConfigurationDrawer } from '@/components/admin/pricing/PlanConfigurationDrawer'
import { FeatureComparisonTable } from '@/components/admin/pricing/FeatureComparisonTable'
import { SubscriptionAnalyticsCharts } from '@/components/admin/pricing/SubscriptionAnalyticsCharts'
import { RecentSubscriptionsTable } from '@/components/admin/pricing/RecentSubscriptionsTable'
import { PricingBottomInsights } from '@/components/admin/pricing/PricingBottomInsights'

export default function PricingManagementPage() {
  const [editingPlanId, setEditingPlanId] = useState<string | null>(null)

  return (
    <div className="flex">
      {/* Main Center Content */}
      <div className="flex-1 p-8 overflow-x-hidden">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-[22px] font-black text-slate-900 tracking-tight">Pricing Management</h1>
          <p className="text-[13px] font-medium text-slate-500 mt-0.5">Manage subscription plans, pricing, AI credits, storage limits, and premium features.</p>
        </div>

        {/* Analytics Grid */}
        <PricingAnalyticsCards />

        {/* Toolbar & Filters */}
        <PricingActionToolbar />

        {/* Subscription Plan Cards Grid */}
        <PricingPlanCards onEditClick={(id) => setEditingPlanId(id)} />

        {/* Visual Analytics */}
        <SubscriptionAnalyticsCharts />

        {/* Feature Comparison Tabular View */}
        <FeatureComparisonTable />

        {/* Recent Subscriptions Table */}
        <RecentSubscriptionsTable />

        {/* Bottom Metrics Insights */}
        <PricingBottomInsights />

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] font-bold text-slate-400">
          <div>Soltikz Admin Portal v1.0 • Billing Module</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-slate-600 transition-colors">Support</a>
          </div>
        </footer>
      </div>

      {/* Sliding Drawer for Plan Configuration */}
      <PlanConfigurationDrawer 
        planId={editingPlanId} 
        onClose={() => setEditingPlanId(null)} 
      />
    </div>
  )
}

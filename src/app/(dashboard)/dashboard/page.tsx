import { DashboardHeader } from '@/components/dashboard/Header'
import { StatCards } from '@/components/dashboard/StatCards'
import { PlanDetails } from '@/components/dashboard/PlanDetails'
import { RecentActivity } from '@/components/dashboard/RecentActivity'
import { RecentResumes } from '@/components/dashboard/RecentResumes'
import { QuickActions } from '@/components/dashboard/QuickActions'
import { AITipBanner } from '@/components/dashboard/AITipBanner'

export default function DashboardPage() {
  return (
    <div className="px-8 pb-8 max-w-[1600px] mx-auto">
      <DashboardHeader />
      
      <main>
        <StatCards />

        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6 mb-6">
          <PlanDetails />
          <RecentActivity />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentResumes />
          <QuickActions />
        </div>

        <AITipBanner />
      </main>
    </div>
  )
}

import { AnalyticsCards } from '@/components/admin/dashboard/AnalyticsCards'
import { RecentUsersTable } from '@/components/admin/dashboard/RecentUsersTable'
import { ActivityTimeline } from '@/components/admin/dashboard/ActivityTimeline'
import { RecentPaymentsTable } from '@/components/admin/dashboard/RecentPaymentsTable'
import { LoginSuccessToast } from '@/components/admin/LoginSuccessToast'
import { Suspense } from 'react'

export default function AdminDashboardPage() {
  return (
    <div className="flex">
      <Suspense fallback={null}>
        <LoginSuccessToast />
      </Suspense>
      {/* Main Center Content */}
      <div className="flex-1 p-8 overflow-x-hidden">
        <AnalyticsCards />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <RecentUsersTable />
          </div>
          <div className="xl:col-span-1 mt-6">
            <ActivityTimeline />
          </div>
        </div>

        <RecentPaymentsTable />

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] font-bold text-slate-400">
          <div>Soltikz Admin Portal v1.0</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-slate-600 transition-colors">Support</a>
          </div>
        </footer>
      </div>
    </div>
  )
}

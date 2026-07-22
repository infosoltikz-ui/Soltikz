'use client'

import { useState } from 'react'
import { UserAnalyticsCards } from '@/components/admin/users/UserAnalyticsCards'
import { UserActionToolbar } from '@/components/admin/users/UserActionToolbar'
import { UserTable } from '@/components/admin/users/UserTable'
import { UserProfileDrawer } from '@/components/admin/users/UserProfileDrawer'
import { UserActivityTimeline } from '@/components/admin/users/UserActivityTimeline'
import { UserSubscriptionChart } from '@/components/admin/users/UserSubscriptionChart'
import { TopActiveUsers } from '@/components/admin/users/TopActiveUsers'

export default function UserManagementPage() {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)

  return (
    <div className="flex">
      {/* Main Center Content */}
      <div className="flex-1 p-8 overflow-x-hidden">
        
        {/* Header (Page specific, below main header) */}
        <div className="mb-8">
          <h1 className="text-[22px] font-black text-slate-900 tracking-tight">User Management</h1>
          <p className="text-[13px] font-medium text-slate-500 mt-0.5">Manage all registered users, subscriptions, and account activities.</p>
        </div>

        {/* Analytics Grid */}
        <UserAnalyticsCards />

        {/* Toolbar & Filters */}
        <UserActionToolbar />

        {/* Core Data Table */}
        <UserTable onRowClick={(id) => setSelectedUserId(id)} />

        {/* Secondary Info Row */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
          <div className="xl:col-span-2">
            <TopActiveUsers />
          </div>
          <div className="xl:col-span-1">
            {/* Doughnut Chart */}
            <UserSubscriptionChart />
          </div>
        </div>

        {/* Bottom Activity Timeline */}
        <div className="mt-6">
          <UserActivityTimeline />
        </div>

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

      {/* Sliding Drawer for User Profiles */}
      {selectedUserId !== null && (
        <UserProfileDrawer 
          userId={selectedUserId} 
          onClose={() => setSelectedUserId(null)} 
        />
      )}
    </div>
  )
}

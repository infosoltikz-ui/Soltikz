import { DashboardShell } from '@/components/dashboard/DashboardShell'
import { SessionManager } from '@/components/auth/SessionManager'
import { Suspense } from 'react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#0D131B] text-[#E4EAF2]">
      <DashboardShell>
        <Suspense fallback={null}>
          <SessionManager />
        </Suspense>
        {children}
      </DashboardShell>
    </div>
  )
}

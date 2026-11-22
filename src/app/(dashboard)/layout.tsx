import { DashboardShell } from '@/components/dashboard/DashboardShell'
import { SessionManager } from '@/components/auth/SessionManager'
import { Suspense } from 'react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[var(--desk)] text-[var(--ink)]">
      <DashboardShell>
        <Suspense fallback={null}>
          <SessionManager />
        </Suspense>
        {children}
      </DashboardShell>
    </div>
  )
}

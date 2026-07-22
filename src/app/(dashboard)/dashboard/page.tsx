import { DashboardHeader } from '@/components/dashboard/Header'
import { StatCards } from '@/components/dashboard/StatCards'
import { PlanDetails } from '@/components/dashboard/PlanDetails'
import { RecentActivity } from '@/components/dashboard/RecentActivity'
import { RecentResumes } from '@/components/dashboard/RecentResumes'
import { QuickActions } from '@/components/dashboard/QuickActions'
import { AITipBanner } from '@/components/dashboard/AITipBanner'
import { LoginToast } from '@/components/dashboard/LoginToast'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { format } from 'date-fns'

export default async function DashboardPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  // Fetch Profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  // Fetch Resumes
  const { data: resumes } = await supabase
    .from('resumes')
    .select('*')
    .eq('user_id', user.id)
    .order('updated_at', { ascending: false })

  // Fetch Active Subscription (safe single query by limit 1)
  const { data: subscription } = await supabase
    .from('payments_and_subscriptions')
    .select('*')
    .eq('user_id', user.id)
    .in('status', ['ACTIVE', 'SUCCESS'])
    .limit(1)
    .single()

  // Calculate stats
  const resumesCreated = profile?.resumes_generated || 0
  const planName = profile?.plan_id || 'FREE'
  const validUntil = subscription?.valid_until ? format(new Date(subscription.valid_until), 'dd MMM, yyyy') : null
  
  const atsScores = resumes?.map(r => r.ats_score).filter(Boolean) || []
  const avgAts = atsScores.length > 0 ? Math.round(atsScores.reduce((a, b) => a + b, 0) / atsScores.length) : 0

  // Calculate profile completion based on master_resume_data fields
  const masterData = profile?.master_resume_data || {}
  let profileCompletion = 0
  if (profile?.full_name) profileCompletion += 25
  if (profile?.phone) profileCompletion += 25
  if (masterData.experience) profileCompletion += 25
  if (masterData.education) profileCompletion += 25

  return (
    <div className="px-8 pb-8 max-w-[1600px] mx-auto">
      <LoginToast />
      <DashboardHeader />
      
      <main>
        <StatCards 
          resumesCreated={resumesCreated}
          planName={planName}
          avgAts={avgAts}
          profileCompletion={profileCompletion}
          validUntil={validUntil}
        />

        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6 mb-6">
          <PlanDetails 
            planName={planName}
            resumesUsed={resumesCreated}
            validUntil={validUntil}
            features={planName === 'FREE' ? ['5 AI Resume Generations', 'Basic Templates', 'PDF Export'] : ['Unlimited AI Resumes', 'Premium Templates', 'Advanced ATS Matching', 'Cover Letter Generator']}
          />
          <RecentActivity activities={[]} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentResumes resumes={resumes || []} />
          <QuickActions />
        </div>

        <AITipBanner />
      </main>
    </div>
  )
}

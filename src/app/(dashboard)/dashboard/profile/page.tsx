import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { ProfileContent } from '@/components/profile/ProfileContent'
import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import { ModuleHowItWorks } from '@/components/dashboard/ModuleHowItWorks'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function ProfilePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch Profile
  let { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (!profile) {
    profile = { id: user.id, email: user.email, full_name: user.user_metadata?.full_name || '' }
  }

  const steps = [
    { title: 'Master Profile', description: 'Update your foundational work history and skills here.', iconName: 'UserCircle' as const },
    { title: 'Secure Parsing', description: 'Your data acts as the secure source of truth for all AI generations.', iconName: 'ShieldAlert' as const },
    { title: 'Base for AI', description: 'AI only pulls from this profile to ensure 0% hallucination.', iconName: 'Key' as const },
  ]

  return (
    <div className="px-6 sm:px-8 pt-6 sm:pt-8 pb-14 max-w-[1600px] mx-auto bg-slate-50/50 min-h-screen">
      <DashboardHeader
        title="Master Profile"
        subtitle="Manage your base profile data. AI uses this to tailor your resumes."
      />
      <ModuleHowItWorks steps={steps} />
      <ProfileContent initialProfile={profile} />
    </div>
  )
}

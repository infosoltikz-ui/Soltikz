import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { ProfileContent } from '@/components/profile/ProfileContent'
import { ModuleHowItWorks, ModuleStep } from '@/components/dashboard/ModuleHowItWorks'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function ProfilePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  let { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (!profile) {
    profile = { id: user.id, email: user.email, full_name: user.user_metadata?.full_name || '' }
  }

  const steps: ModuleStep[] = [
    {
      iconName: 'UserCircle',
      title: 'Build Your Master Profile',
      description: 'Fill in your personal details, work experience, education, skills, and certifications.',
      bullets: [
        'Personal info — name, email, phone, LinkedIn, location',
        'Work experience with detailed role descriptions',
        'Education, certifications, and tech skills sections',
      ],
    },
    {
      iconName: 'ShieldAlert',
      title: 'This is Your AI Source of Truth',
      description: 'Every resume AI generates is based 100% on your master profile data — no hallucinations.',
      bullets: [
        'AI never invents experience you have not listed here',
        'Keep your profile updated to get the most accurate resumes',
        'Profile data is securely stored and encrypted',
      ],
    },
    {
      iconName: 'Key',
      title: 'Complete Profile = Better Resumes',
      description: 'A 100% complete profile gives the AI maximum context to tailor your resume perfectly.',
      bullets: [
        'Aim for 100% Profile Health score (visible on the right)',
        'Add all past roles, even older ones — AI picks the best matches',
        'Include all skills and certifications for full ATS coverage',
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-slate-50/50">
      <ModuleHowItWorks
        moduleTitle="Master Profile"
        tagline="Complete your profile once — AI uses it to generate unlimited tailored resumes."
        steps={steps}
      />
      <div className="px-6 sm:px-8 pt-6 sm:pt-8 pb-14 max-w-[1600px] mx-auto">
        <ProfileContent initialProfile={profile} />
      </div>
    </div>
  )
}

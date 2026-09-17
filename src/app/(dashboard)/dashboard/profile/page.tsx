import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { ProfileContent } from '@/components/profile/ProfileContent'

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

  return (
    <div className="px-6 sm:px-8 pt-6 sm:pt-8 pb-14 max-w-[1600px] mx-auto bg-slate-50/50 min-h-screen">
      <ProfileContent initialProfile={profile} />
    </div>
  )
}

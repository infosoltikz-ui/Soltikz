import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { ProfileContent } from '@/components/profile/ProfileContent'

export default async function ProfilePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
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
    <div className="px-8 pb-8 max-w-[1600px] mx-auto">
      <ProfileContent initialProfile={profile} />
    </div>
  )
}

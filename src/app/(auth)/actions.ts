'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'Email and password are required' }
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  const cookieStore = await cookies()
  cookieStore.set('session_start', Date.now().toString(), {
    path: '/',
    sameSite: 'lax',
    httpOnly: false,
  })

  revalidatePath('/dashboard')
  redirect('/dashboard?login=success')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const name = formData.get('name') as string

  if (!email || !password) {
    return { error: 'Email and password are required' }
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
      },
    },
  })

  if (error) {
    return { error: error.message }
  }

  // Auto-confirm the user's email using the Service Role Key so they can login immediately
  if (data?.user?.id && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    const { createClient: createSupabaseClient } = require('@supabase/supabase-js')
    const adminSupabase = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )
    
    await adminSupabase.auth.admin.updateUserById(data.user.id, { email_confirm: true })
  }

  const cookieStore = await cookies()
  cookieStore.set('session_start', Date.now().toString(), {
    path: '/',
    sameSite: 'lax',
    httpOnly: false,
  })

  revalidatePath('/dashboard')
  redirect('/dashboard?login=success')
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  
  const cookieStore = await cookies()
  cookieStore.delete('session_start')
  
  redirect('/login?logout=success')
}

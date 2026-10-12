import { createClient } from '@/utils/supabase/server'
import { createClient as createAdminClient } from '@supabase/supabase-js'

export const ADMIN_EMAILS = [
  'info.soltikz@gmail.com',
  'balajiprojects049@gmail.com'
]

export function isAuthorizedAdminEmail(email?: string | null): boolean {
  if (!email) return false
  return ADMIN_EMAILS.includes(email.toLowerCase().trim())
}

/**
 * Validates that the current request is from an authenticated admin.
 * Returns { authorized: true, user } if valid, or { authorized: false, user: null }.
 */
export async function verifyAdminSession() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user || !isAuthorizedAdminEmail(user.email)) {
    return { authorized: false as const, user: null }
  }

  return { authorized: true as const, user }
}

/**
 * Returns a Supabase client with the service role key for admin-only operations.
 * Must only be called after verifying the admin session.
 */
export function getAdminSupabaseClient() {
  return createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
    process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder_key'
  )
}

import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Service role bypasses RLS — can count ALL rows
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET() {
  try {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const [
      { count: total },
      { count: premium },
      { count: free },
      { count: newToday },
    ] = await Promise.all([
      supabase.from('profiles').select('*', { count: 'exact', head: true }),
      supabase.from('profiles').select('*', { count: 'exact', head: true }).in('plan_id', ['PRO_MONTHLY', 'PRO_YEARLY']),
      supabase.from('profiles').select('*', { count: 'exact', head: true }).or('plan_id.eq.FREE,plan_id.is.null'),
      supabase.from('profiles').select('*', { count: 'exact', head: true }).gte('created_at', today.toISOString()),
    ])

    return NextResponse.json({
      total: total || 0,
      premium: premium || 0,
      free: free || 0,
      newToday: newToday || 0,
      verified: total || 0,  // all registered users are considered verified
      blocked: 0,
    })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

import { NextResponse } from 'next/server'
import { verifyAdminSession, getAdminSupabaseClient } from '@/utils/adminAuth'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const { authorized } = await verifyAdminSession()
    if (!authorized) {
      return NextResponse.json({ error: 'Unauthorized: Admin access required' }, { status: 401 })
    }

    const supabase = getAdminSupabaseClient()
    const { userId, targetPlan = 'PRO' } = await req.json()

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    // Update the profile to the new plan
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ plan_id: targetPlan })
      .eq('id', userId)

    if (updateError) {
      throw updateError
    }

    return NextResponse.json({ success: true, message: `User upgraded to ${targetPlan} successfully` })
  } catch (err: any) {
    console.error('Upgrade User Error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

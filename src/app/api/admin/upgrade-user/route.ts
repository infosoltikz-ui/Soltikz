import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
    process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder_key'
  )
}

export async function POST(req: Request) {
  try {
    const supabase = getAdminClient()
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

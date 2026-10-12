import { NextResponse } from 'next/server'
import { getAdminSupabaseClient } from '@/utils/adminAuth'

export const dynamic = 'force-dynamic'

// GET: Returns current active provider ('openai' or 'claude') for user generation dispatch
export async function GET() {
  try {
    const supabase = getAdminSupabaseClient()
    const { data } = await supabase
      .from('system_settings')
      .select('metadata')
      .eq('id', 'GLOBAL_CONFIG')
      .maybeSingle()

    const provider = data?.metadata?.ai_provider === 'claude' ? 'claude' : 'openai'
    return NextResponse.json({ provider })
  } catch (err: any) {
    return NextResponse.json({ provider: 'openai' })
  }
}

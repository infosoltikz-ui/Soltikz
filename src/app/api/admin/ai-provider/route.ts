import { NextResponse } from 'next/server'
import { verifyAdminSession, getAdminSupabaseClient } from '@/utils/adminAuth'

export const dynamic = 'force-dynamic'

// GET: Fetch the current active AI provider (open to client for dispatching)
export async function GET() {
  try {
    const supabase = getAdminSupabaseClient()
    const { data, error } = await supabase
      .from('system_settings')
      .select('metadata')
      .eq('id', 'GLOBAL_CONFIG')
      .maybeSingle()

    if (error) {
      console.error('Failed to read system settings:', error)
      return NextResponse.json({ provider: 'openai' })
    }

    const provider = data?.metadata?.ai_provider === 'claude' ? 'claude' : 'openai'
    return NextResponse.json({ provider })
  } catch (err: any) {
    return NextResponse.json({ provider: 'openai' })
  }
}

// POST: Save active AI provider (Admin only)
export async function POST(req: Request) {
  try {
    const { authorized } = await verifyAdminSession()
    if (!authorized) {
      return NextResponse.json({ error: 'Unauthorized: Admin access required' }, { status: 401 })
    }

    const { provider } = await req.json()
    if (provider !== 'openai' && provider !== 'claude') {
      return NextResponse.json({ error: 'Invalid provider. Must be "openai" or "claude"' }, { status: 400 })
    }

    const supabase = getAdminSupabaseClient()

    // 1. Fetch current metadata
    const { data } = await supabase
      .from('system_settings')
      .select('metadata')
      .eq('id', 'GLOBAL_CONFIG')
      .maybeSingle()

    const currentMetadata = (data?.metadata as any) || {}
    const updatedMetadata = {
      ...currentMetadata,
      ai_provider: provider,
      ai_provider_updated_at: new Date().toISOString()
    }

    // 2. Upsert
    const { error: updateError } = await supabase
      .from('system_settings')
      .upsert({
        id: 'GLOBAL_CONFIG',
        metadata: updatedMetadata,
        updated_at: new Date().toISOString()
      })

    if (updateError) {
      throw updateError
    }

    return NextResponse.json({ 
      success: true, 
      provider, 
      message: `Active AI provider set to ${provider === 'claude' ? 'Claude 3.5 Sonnet' : 'OpenAI (GPT-4o)'}` 
    })
  } catch (err: any) {
    console.error('Update AI Provider Error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

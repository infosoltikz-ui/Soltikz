import { createClient } from '@/utils/supabase/client'

export type UsageEventType = 'resume_generated' | 'pdf_download' | 'docx_download'

export async function logUsageEvent(resumeId: string | null, eventType: UsageEventType) {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    await supabase.from('usage_events').insert({
      user_id: user.id,
      resume_id: resumeId,
      event_type: eventType,
    })
  } catch (error) {
    // Non-critical: never let usage logging break the actual download/generation flow.
    console.error('Failed to log usage event:', error)
  }
}

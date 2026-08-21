-- Run this script in the Supabase SQL Editor.
-- Adds real usage tracking (resume generations + PDF/DOCX downloads) to replace
-- the previously fake/hardcoded "Downloads" stats across the dashboard and admin panel.

CREATE TABLE IF NOT EXISTS usage_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    resume_id UUID REFERENCES resumes_v2(id) ON DELETE CASCADE,
    event_type VARCHAR(50) NOT NULL, -- 'resume_generated' | 'pdf_download' | 'docx_download'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS usage_events_resume_id_idx ON usage_events(resume_id);
CREATE INDEX IF NOT EXISTS usage_events_user_id_idx ON usage_events(user_id);

ALTER TABLE usage_events ENABLE ROW LEVEL SECURITY;

-- Users can log and view their own events. Admins can view all.
CREATE POLICY "Users can insert own usage_events" ON usage_events FOR INSERT
  WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can view own usage_events" ON usage_events FOR SELECT
  USING (auth.uid() = user_id OR auth.jwt()->>'email' IN ('info.soltikz@gmail.com', 'balajiprojects049@gmail.com'));

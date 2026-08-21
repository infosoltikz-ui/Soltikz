-- Run this script in the Supabase SQL Editor.
-- Adds storage for AI-generated cover letters, tied to a specific tailored resume.

CREATE TABLE IF NOT EXISTS cover_letters (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    resume_id UUID REFERENCES resumes_v2(id) ON DELETE CASCADE,
    content JSONB NOT NULL, -- { salutation, paragraphs: string[], sign_off }
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS cover_letters_resume_id_idx ON cover_letters(resume_id);

ALTER TABLE cover_letters ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own cover_letters" ON cover_letters FOR ALL
  USING (auth.uid() = user_id OR auth.jwt()->>'email' IN ('info.soltikz@gmail.com', 'balajiprojects049@gmail.com'));

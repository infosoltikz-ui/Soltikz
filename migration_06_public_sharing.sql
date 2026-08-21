-- Run this script in the Supabase SQL Editor.
-- Adds opt-in public sharing for a resume (a "view this resume without logging in" link).
--
-- Privacy design note: the public page must NOT need read access to the `profiles`
-- table (it stays fully private, no public policy added). Instead, when a user makes
-- a resume public, the app snapshots just the display fields it needs (name, email,
-- phone, location, linkedin) into `public_snapshot` on the resume row itself. The
-- public route only ever reads resumes_v2 + resume_sections, scoped to is_public = true.

ALTER TABLE resumes_v2 ADD COLUMN IF NOT EXISTS is_public BOOLEAN DEFAULT false;
ALTER TABLE resumes_v2 ADD COLUMN IF NOT EXISTS share_slug TEXT UNIQUE;
ALTER TABLE resumes_v2 ADD COLUMN IF NOT EXISTS public_snapshot JSONB;

-- Additive to the owner policy from migration_03 (not a replacement) - anyone can
-- read a resume specifically marked public, regardless of auth state.
CREATE POLICY "Anyone can view public resumes_v2" ON resumes_v2 FOR SELECT
  USING (is_public = true);

CREATE POLICY "Anyone can view sections of public resumes_v2" ON resume_sections FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM resumes_v2
      WHERE resumes_v2.id = resume_sections.resume_id
      AND resumes_v2.is_public = true
    )
  );

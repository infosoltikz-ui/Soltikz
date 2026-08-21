-- Run this script in the Supabase SQL Editor.
-- SECURITY FIX: the V2 AI-pipeline tables (created in supabase_schema_v2.sql) were
-- created without Row Level Security. Without RLS, any authenticated user can read
-- or modify ANY other user's resumes, job descriptions, and AI-generated content
-- via direct Supabase REST calls (the browser client queries these tables directly,
-- e.g. ResumeGrid.tsx -> resumes_v2). This enables RLS and adds owner-scoped
-- policies, matching the same pattern already used in supabase_schema.sql.

ALTER TABLE resumes_v2 ENABLE ROW LEVEL SECURITY;
ALTER TABLE resume_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE parsed_job_descriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE resume_strategies ENABLE ROW LEVEL SECURITY;
ALTER TABLE ats_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE interview_preparations ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_telemetry_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE prompt_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_rules_config ENABLE ROW LEVEL SECURITY;

-- Resumes v2: users can fully manage their own resumes. Admins can view all.
CREATE POLICY "Users can manage own resumes_v2" ON resumes_v2 FOR ALL
  USING (auth.uid() = user_id OR auth.jwt()->>'email' IN ('info.soltikz@gmail.com', 'balajiprojects049@gmail.com'));

-- Resume sections: scoped via the parent resume's owner.
CREATE POLICY "Users can manage own resume_sections" ON resume_sections FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM resumes_v2
      WHERE resumes_v2.id = resume_sections.resume_id
      AND (resumes_v2.user_id = auth.uid() OR auth.jwt()->>'email' IN ('info.soltikz@gmail.com', 'balajiprojects049@gmail.com'))
    )
  );

-- Parsed job descriptions: owned directly by user_id.
CREATE POLICY "Users can manage own parsed_job_descriptions" ON parsed_job_descriptions FOR ALL
  USING (auth.uid() = user_id OR auth.jwt()->>'email' IN ('info.soltikz@gmail.com', 'balajiprojects049@gmail.com'));

-- Resume strategies: scoped via the parsed JD's owner.
CREATE POLICY "Users can manage own resume_strategies" ON resume_strategies FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM parsed_job_descriptions
      WHERE parsed_job_descriptions.id = resume_strategies.parsed_jd_id
      AND (parsed_job_descriptions.user_id = auth.uid() OR auth.jwt()->>'email' IN ('info.soltikz@gmail.com', 'balajiprojects049@gmail.com'))
    )
  );

-- ATS analyses: scoped via the resume's owner.
CREATE POLICY "Users can manage own ats_analyses" ON ats_analyses FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM resumes_v2
      WHERE resumes_v2.id = ats_analyses.resume_id
      AND (resumes_v2.user_id = auth.uid() OR auth.jwt()->>'email' IN ('info.soltikz@gmail.com', 'balajiprojects049@gmail.com'))
    )
  );

-- Interview preparations: scoped via the resume's owner.
CREATE POLICY "Users can manage own interview_preparations" ON interview_preparations FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM resumes_v2
      WHERE resumes_v2.id = interview_preparations.resume_id
      AND (resumes_v2.user_id = auth.uid() OR auth.jwt()->>'email' IN ('info.soltikz@gmail.com', 'balajiprojects049@gmail.com'))
    )
  );

-- AI telemetry / audit logs: inserted by the API routes using the caller's own
-- authenticated session (not service role), so RLS applies to these inserts too.
-- Users can insert/view only their own rows; admins can view all.
CREATE POLICY "Users can view own ai_telemetry_logs" ON ai_telemetry_logs FOR SELECT
  USING (auth.uid() = user_id OR auth.jwt()->>'email' IN ('info.soltikz@gmail.com', 'balajiprojects049@gmail.com'));
CREATE POLICY "Users can insert own ai_telemetry_logs" ON ai_telemetry_logs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own ai_audit_logs" ON ai_audit_logs FOR SELECT
  USING (auth.uid() = user_id OR auth.jwt()->>'email' IN ('info.soltikz@gmail.com', 'balajiprojects049@gmail.com'));
CREATE POLICY "Users can insert own ai_audit_logs" ON ai_audit_logs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Prompt versions / business rules: global AI config, not per-user data. Anyone
-- authenticated can read (needed by the orchestrator at request time), only admins edit.
CREATE POLICY "Anyone can view prompt_versions" ON prompt_versions FOR SELECT USING (true);
CREATE POLICY "Admins manage prompt_versions" ON prompt_versions FOR ALL
  USING (auth.jwt()->>'email' IN ('info.soltikz@gmail.com', 'balajiprojects049@gmail.com'));

CREATE POLICY "Anyone can view business_rules_config" ON business_rules_config FOR SELECT USING (true);
CREATE POLICY "Admins manage business_rules_config" ON business_rules_config FOR ALL
  USING (auth.jwt()->>'email' IN ('info.soltikz@gmail.com', 'balajiprojects049@gmail.com'));

-- ====================================================================================
-- SOLTKIZ RESUME BUILDER - V2 ENTERPRISE SCHEMA (AI PIPELINE)
-- ====================================================================================

-- 1. PROMPT VERSIONS
-- Stores versions of prompts to allow rollbacks and testing
CREATE TABLE IF NOT EXISTS prompt_versions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    prompt_name VARCHAR(255) NOT NULL, -- e.g., 'resume_generator_c2c', 'jd_parser'
    version_number INT NOT NULL,
    system_prompt TEXT NOT NULL,
    user_prompt_template TEXT NOT NULL,
    is_active BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. BUSINESS RULES CONFIG
-- Stores JSON rules for different scenarios (C2C vs Full-Time)
CREATE TABLE IF NOT EXISTS business_rules_config (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    rule_name VARCHAR(255) NOT NULL UNIQUE, -- e.g., 'c2c_rules', 'fulltime_rules'
    config JSONB NOT NULL, -- e.g., {"max_summary_points": 9, "max_bullets_per_role": 7}
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. PARSED JOB DESCRIPTIONS
-- Caches parsed JDs to avoid re-running the AI parser
CREATE TABLE IF NOT EXISTS parsed_job_descriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    original_text TEXT NOT NULL,
    job_title VARCHAR(255),
    company_name VARCHAR(255),
    parsed_data JSONB NOT NULL, -- { skills, tech_stack, responsibilities, keywords }
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. RESUME STRATEGIES
-- Intermediate AI plan for how to build the resume
CREATE TABLE IF NOT EXISTS resume_strategies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    parsed_jd_id UUID REFERENCES parsed_job_descriptions(id) ON DELETE CASCADE,
    strategy_data JSONB NOT NULL, -- { prioritized_skills, emphasized_projects, tone }
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. RESUMES (UPDATED FOR LIFECYCLE & VERSIONING)
CREATE TABLE IF NOT EXISTS resumes_v2 (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    parent_id UUID REFERENCES resumes_v2(id) ON DELETE SET NULL, -- For duplicates/versions
    parsed_jd_id UUID REFERENCES parsed_job_descriptions(id) ON DELETE SET NULL,
    strategy_id UUID REFERENCES resume_strategies(id) ON DELETE SET NULL,
    resume_type VARCHAR(50) NOT NULL, -- 'C2C' or 'Full-Time'
    status VARCHAR(50) DEFAULT 'Draft', -- Draft, Queued, Generating, Validating, Ready, Error
    version_number INT DEFAULT 1,
    title VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. RESUME SECTIONS
-- Granular storage for individual sections to allow partial regeneration & locking
CREATE TABLE IF NOT EXISTS resume_sections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    resume_id UUID REFERENCES resumes_v2(id) ON DELETE CASCADE,
    section_type VARCHAR(50) NOT NULL, -- 'Summary', 'Experience', 'Skills', 'Education'
    content JSONB NOT NULL,
    is_locked BOOLEAN DEFAULT false,
    is_ai_generated BOOLEAN DEFAULT true,
    confidence_score DECIMAL(5,2),
    jd_match_score DECIMAL(5,2),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. ATS ANALYSES
-- Detailed ATS scoring
CREATE TABLE IF NOT EXISTS ats_analyses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    resume_id UUID REFERENCES resumes_v2(id) ON DELETE CASCADE,
    overall_score INT NOT NULL,
    category_scores JSONB NOT NULL, -- { grammar: 90, formatting: 85, keywords: 95 }
    missing_keywords JSONB,
    improvement_suggestions JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. INTERVIEW PREPARATIONS
-- Generated prep materials tied to a specific resume
CREATE TABLE IF NOT EXISTS interview_preparations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    resume_id UUID REFERENCES resumes_v2(id) ON DELETE CASCADE,
    hr_questions JSONB,
    tech_questions JSONB,
    star_answers JSONB,
    self_introduction TEXT,
    company_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. AI TELEMETRY LOGS
-- Tracks cost and token usage for SaaS billing & monitoring
CREATE TABLE IF NOT EXISTS ai_telemetry_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    resume_id UUID REFERENCES resumes_v2(id) ON DELETE SET NULL,
    action_type VARCHAR(100), -- 'Parse JD', 'Generate Summary', 'Validate'
    provider VARCHAR(50), -- 'OpenAI', 'Claude'
    model VARCHAR(100),
    input_tokens INT NOT NULL,
    output_tokens INT NOT NULL,
    duration_ms INT NOT NULL,
    estimated_cost_usd DECIMAL(10,6),
    status VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. AI AUDIT LOGS
-- Tracks regeneration reasons and human vs AI edits
CREATE TABLE IF NOT EXISTS ai_audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    resume_section_id UUID REFERENCES resume_sections(id) ON DELETE SET NULL,
    prompt_version_id UUID REFERENCES prompt_versions(id) ON DELETE SET NULL,
    action_taken VARCHAR(255) NOT NULL, -- 'Regenerated Section', 'User Edited', 'Locked'
    reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

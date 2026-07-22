-- ==============================================================================
-- SOLTIKZ RESUME BUILDER - FULL DATABASE SCHEMA
-- Note: This script will drop existing tables to cleanly rebuild the new schema.
-- ==============================================================================

DROP TABLE IF EXISTS admin_logs CASCADE;
DROP TABLE IF EXISTS resumes CASCADE;
DROP TABLE IF EXISTS payments_and_subscriptions CASCADE;
DROP TABLE IF EXISTS system_settings CASCADE;
DROP TABLE IF EXISTS pricing_plans CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

-- 1. Create Profiles Table (Master Profile & User Data)
CREATE TABLE profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    phone TEXT,
    location TEXT,
    plan_id TEXT DEFAULT 'FREE',
    resumes_generated INTEGER DEFAULT 0,
    credits_remaining INTEGER DEFAULT 5,
    master_resume_data JSONB DEFAULT '{}'::jsonb,
    settings JSONB DEFAULT '{"theme": "light", "email_notifications": true}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Resumes Table (AI Generated Resumes)
CREATE TABLE resumes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    target_job_description TEXT,
    ats_score INTEGER,
    content JSONB NOT NULL DEFAULT '{}'::jsonb,
    is_favorite BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create Admin Logs Table (Dashboard Security & Logs)
CREATE TABLE admin_logs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    event_type TEXT NOT NULL,
    email TEXT,
    ip_address TEXT,
    status TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Create Pricing Plans Table (Admin Managed Pricing)
CREATE TABLE pricing_plans (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    price_inr NUMERIC NOT NULL,
    features JSONB NOT NULL DEFAULT '[]'::jsonb,
    razorpay_plan_id TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Create Payments and Subscriptions Table (Razorpay Tracking)
CREATE TABLE payments_and_subscriptions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    razorpay_payment_id TEXT,
    razorpay_order_id TEXT,
    amount_paid NUMERIC NOT NULL,
    status TEXT NOT NULL,
    valid_until TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Create System Settings Table (Admin Global Settings)
CREATE TABLE system_settings (
    id TEXT PRIMARY KEY,
    maintenance_mode BOOLEAN DEFAULT false,
    allow_new_signups BOOLEAN DEFAULT true,
    announcement_banner TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- DEFAULT DATA INSERTS
-- ==============================================================================

-- Insert Default Pricing Plans
INSERT INTO pricing_plans (id, name, price_inr, features, is_active) VALUES
('FREE', 'Free Plan', 0, '["5 AI Resume Generations", "Basic Templates", "PDF Export"]'::jsonb, true),
('PRO_MONTHLY', 'Pro Monthly', 499, '["Unlimited AI Resumes", "Premium Templates", "Advanced ATS Matching", "Cover Letter Generator"]'::jsonb, true);

-- Insert Default System Settings
INSERT INTO system_settings (id, maintenance_mode, allow_new_signups, announcement_banner) VALUES
('GLOBAL_CONFIG', false, true, NULL);

-- ==============================================================================
-- AUTOMATIC PROFILE CREATION TRIGGER
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, plan_id, resumes_generated, credits_remaining, master_resume_data)
  VALUES (
    new.id, 
    new.email, 
    new.raw_user_meta_data->>'full_name',
    'FREE',
    0,
    5,
    '{}'::jsonb
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing trigger if it exists from previous run
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments_and_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_settings ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can view and edit their own profile. Admins can view all.
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id OR auth.jwt()->>'email' IN ('info.soltikz@gmail.com', 'balajiprojects049@gmail.com'));
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Resumes: Users can completely control their own resumes. Admins can view all.
CREATE POLICY "Users can manage own resumes" ON resumes FOR ALL USING (auth.uid() = user_id OR auth.jwt()->>'email' IN ('info.soltikz@gmail.com', 'balajiprojects049@gmail.com'));

-- Payments: Users can view their own payments. Admins can view all.
CREATE POLICY "Users can view own payments" ON payments_and_subscriptions FOR SELECT USING (auth.uid() = user_id OR auth.jwt()->>'email' IN ('info.soltikz@gmail.com', 'balajiprojects049@gmail.com'));
CREATE POLICY "Admins can insert payments" ON payments_and_subscriptions FOR INSERT WITH CHECK (auth.jwt()->>'email' IN ('info.soltikz@gmail.com', 'balajiprojects049@gmail.com'));

-- Admin Logs: ONLY Admins can view and insert
CREATE POLICY "Admins manage admin logs" ON admin_logs FOR ALL USING (auth.jwt()->>'email' IN ('info.soltikz@gmail.com', 'balajiprojects049@gmail.com'));

-- Pricing Plans: Anyone can view, only Admins can edit
CREATE POLICY "Anyone can view pricing plans" ON pricing_plans FOR SELECT USING (true);
CREATE POLICY "Admins manage pricing plans" ON pricing_plans FOR ALL USING (auth.jwt()->>'email' IN ('info.soltikz@gmail.com', 'balajiprojects049@gmail.com'));

-- System Settings: Anyone can view, only Admins can edit
CREATE POLICY "Anyone can view system settings" ON system_settings FOR SELECT USING (true);
CREATE POLICY "Admins manage system settings" ON system_settings FOR ALL USING (auth.jwt()->>'email' IN ('info.soltikz@gmail.com', 'balajiprojects049@gmail.com'));

-- 1. Create Profiles Table (Linked to auth.users)
CREATE TABLE profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    plan_id TEXT DEFAULT 'FREE',
    resumes_generated INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Resumes Table
CREATE TABLE resumes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    target_job_description TEXT,
    ats_score INTEGER,
    content JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create Admin Logs Table
CREATE TABLE admin_logs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    event_type TEXT NOT NULL,
    email TEXT,
    ip_address TEXT,
    status TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Create Pricing Plans Table
CREATE TABLE pricing_plans (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    price_inr NUMERIC NOT NULL,
    features JSONB NOT NULL DEFAULT '[]'::jsonb,
    razorpay_plan_id TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Create Payments and Subscriptions Table
CREATE TABLE payments_and_subscriptions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    razorpay_payment_id TEXT,
    razorpay_order_id TEXT,
    amount_paid NUMERIC NOT NULL,
    status TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Insert Default Pricing Plans
INSERT INTO pricing_plans (id, name, price_inr, features, is_active) VALUES
('FREE', 'Free Plan', 0, '["5 AI Resume Generations", "Basic Templates", "PDF Export"]'::jsonb, true),
('PRO_MONTHLY', 'Pro Monthly', 499, '["Unlimited AI Resumes", "Premium Templates", "Advanced ATS Matching", "Cover Letter Generator"]'::jsonb, true);


-- ==============================================================================
-- AUTOMATIC PROFILE CREATION TRIGGER
-- This automatically creates a profile when someone logs in via Google for the first time
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, plan_id, resumes_generated)
  VALUES (
    new.id, 
    new.email, 
    new.raw_user_meta_data->>'full_name',
    'FREE',
    0
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();


-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments_and_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing_plans ENABLE ROW LEVEL SECURITY;

-- 1. Profiles: Users can view and edit their own profile. Admins can view all.
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id OR auth.jwt()->>'email' IN ('info.soltikz@gmail.com', 'balajiprojects049@gmail.com'));
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- 2. Resumes: Users can completely control their own resumes. Admins can view all.
CREATE POLICY "Users can manage own resumes" ON resumes FOR ALL USING (auth.uid() = user_id OR auth.jwt()->>'email' IN ('info.soltikz@gmail.com', 'balajiprojects049@gmail.com'));

-- 3. Payments: Users can view their own payments. Admins can view all.
CREATE POLICY "Users can view own payments" ON payments_and_subscriptions FOR SELECT USING (auth.uid() = user_id OR auth.jwt()->>'email' IN ('info.soltikz@gmail.com', 'balajiprojects049@gmail.com'));
CREATE POLICY "Admins can insert payments" ON payments_and_subscriptions FOR INSERT WITH CHECK (auth.jwt()->>'email' IN ('info.soltikz@gmail.com', 'balajiprojects049@gmail.com'));

-- 4. Admin Logs: ONLY Admins can view and insert
CREATE POLICY "Admins manage admin logs" ON admin_logs FOR ALL USING (auth.jwt()->>'email' IN ('info.soltikz@gmail.com', 'balajiprojects049@gmail.com'));

-- 5. Pricing Plans: Anyone can view (so they can see the pricing page), but only Admins can edit
CREATE POLICY "Anyone can view pricing plans" ON pricing_plans FOR SELECT USING (true);
CREATE POLICY "Admins manage pricing plans" ON pricing_plans FOR ALL USING (auth.jwt()->>'email' IN ('info.soltikz@gmail.com', 'balajiprojects049@gmail.com'));

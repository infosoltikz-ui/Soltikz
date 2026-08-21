-- Run this script in the Supabase SQL Editor.
-- Adds the Pro Yearly plan (20% off the monthly price: 499 * 12 * 0.8 = ~4790).

INSERT INTO pricing_plans (id, name, price_inr, features, is_active) VALUES
('PRO_YEARLY', 'Pro Yearly', 4790, '["Unlimited AI Resumes", "Premium Templates", "Advanced ATS Matching", "Cover Letter Generator", "2 months free vs. monthly"]'::jsonb, true)
ON CONFLICT (id) DO NOTHING;

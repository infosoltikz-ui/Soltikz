-- Run this script in the Supabase SQL Editor to add the credits_remaining column

ALTER TABLE profiles
ADD COLUMN credits_remaining INTEGER DEFAULT 5;

-- Give existing users 5 free credits retroactively
UPDATE profiles SET credits_remaining = 5 WHERE credits_remaining IS NULL;

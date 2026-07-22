-- Run this script in the Supabase SQL Editor to add the metadata column for general settings
ALTER TABLE system_settings
ADD COLUMN metadata JSONB DEFAULT '{}'::jsonb;

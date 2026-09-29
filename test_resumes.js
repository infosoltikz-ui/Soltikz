require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function run() {
  const { data, error } = await supabase
    .from('resumes_v2')
    .select('*, profiles(full_name), parsed_job_descriptions(company_name, job_title), ats_analyses(overall_score)')
    .order('updated_at', { ascending: false })
    .limit(5);
    
  if (error) {
    console.error('ERROR:', error.message, error.details, error.hint);
  } else {
    console.log('SUCCESS, fetched', data.length, 'records');
  }
}

run();

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseServiceKey) {
  throw new Error(
    'SUPABASE_SERVICE_ROLE_KEY is not set. Admin client requires the service role key — falling back to anon key is not allowed.'
  );
}

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

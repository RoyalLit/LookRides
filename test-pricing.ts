import { supabaseAdmin } from './src/lib/supabase-admin';

async function run() {
  const { data, error } = await supabaseAdmin.from('pricing_routes').select('*');
  console.log(data);
}
run();

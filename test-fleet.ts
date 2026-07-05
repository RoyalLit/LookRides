import { supabaseAdmin } from './src/lib/supabase-admin';

async function run() {
  const { data, error } = await supabaseAdmin.from('fleet').select('*');
  console.log(data);
}
run();

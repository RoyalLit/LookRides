import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

// Parse .env.local
const envPath = path.resolve(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const supabaseUrl = envContent.match(/NEXT_PUBLIC_SUPABASE_URL=(.*)/)?.[1]?.trim();
const supabaseKey = envContent.match(/NEXT_PUBLIC_SUPABASE_ANON_KEY=(.*)/)?.[1]?.trim();

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase credentials in .env.local");
}

const supabase = createClient(supabaseUrl, supabaseKey);

// We will read the built JS file or dynamically import the TS file.
// Since tsx supports TS, we can just import from src
import { allRoutes } from '../src/lib/routes-data';

async function sync() {
  // Get existing routes
  const { data: existing, error: err } = await supabase.from('pricing_routes').select('*');
  if (err) throw err;

  const existingSet = new Set(existing?.map(r => `${r.from_city}-${r.to_city}`));

  const newRoutes = [];
  let orderIndex = existing?.length || 0;

  for (const route of allRoutes) {
    if (!existingSet.has(`${route.fromCity}-${route.toCity}`)) {
      newRoutes.push({
        from_city: route.fromCity,
        to_city: route.toCity,
        distance: route.distance,
        sedan_price: route.sedanPrice,
        suv_price: route.suvPrice,
        order_index: orderIndex++,
      });
    }
  }

  if (newRoutes.length > 0) {
    console.log(`Inserting ${newRoutes.length} new routes...`);
    const { error } = await supabase.from('pricing_routes').insert(newRoutes);
    if (error) throw error;
    console.log('Success!');
  } else {
    console.log('No new routes to insert.');
  }
}

sync().catch(console.error);

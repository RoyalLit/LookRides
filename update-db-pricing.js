const fs = require('fs');

async function updateDb() {
  const envFile = fs.readFileSync('.env.local', 'utf8');
  const env = {};
  envFile.split('\n').forEach(line => {
    if (line.includes('=')) {
      const [key, ...rest] = line.split('=');
      env[key] = rest.join('=');
    }
  });

  const supabaseUrl = env['NEXT_PUBLIC_SUPABASE_URL'];
  const supabaseKey = env['SUPABASE_SERVICE_ROLE_KEY'];

  if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase credentials");
    return;
  }

  // Fetch existing
  const res = await fetch(`${supabaseUrl}/rest/v1/pricing_routes?select=*`, {
    headers: {
      'apikey': supabaseKey,
      'Authorization': `Bearer ${supabaseKey}`
    }
  });
  const existing = await res.json();
  
  const updates = [
    { from_city: 'Chandigarh', to_city: 'Dharamshala', distance: '235 km', sedan_price: '₹4,500', suv_price: '₹6,500' },
    { from_city: 'Chandigarh', to_city: 'Kasol', distance: '270 km', sedan_price: '₹4,500', suv_price: '₹6,500' },
    { from_city: 'Chandigarh', to_city: 'Manali', distance: '280 km', sedan_price: '₹4,500', suv_price: '₹6,500' },
    { from_city: 'Chandigarh', to_city: 'Shimla', distance: '115 km', sedan_price: '₹4,500', suv_price: '₹6,500' },
    { from_city: 'Chandigarh', to_city: 'Amritsar', distance: '230 km', sedan_price: '₹3,500', suv_price: '₹5,500' },
    { from_city: 'Chandigarh', to_city: 'Delhi', distance: '250 km', sedan_price: '₹3,500', suv_price: '₹5,500' },
    { from_city: 'Chandigarh', to_city: 'McLeod Ganj', distance: '240 km', sedan_price: '₹4,500', suv_price: '₹6,500' },
    { from_city: 'Chandigarh', to_city: 'Bir Billing', distance: '280 km', sedan_price: '₹5,500', suv_price: '₹7,500' },
    { from_city: 'Delhi', to_city: 'Chandigarh', distance: '250 km', sedan_price: '₹3,500', suv_price: '₹5,500' }
  ];

  let nextOrderIndex = Math.max(...existing.map(r => r.order_index || 0)) + 1;

  for (const item of updates) {
    const exists = existing.find(r => r.from_city.toLowerCase() === item.from_city.toLowerCase() && r.to_city.toLowerCase() === item.to_city.toLowerCase());
    
    if (exists) {
      // Update
      const payload = { sedan_price: item.sedan_price, suv_price: item.suv_price };
      await fetch(`${supabaseUrl}/rest/v1/pricing_routes?id=eq.${exists.id}`, {
        method: 'PATCH',
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      console.log(`Updated ${item.from_city} to ${item.to_city}`);
    } else {
      // Insert
      const payload = { ...item, order_index: nextOrderIndex++ };
      await fetch(`${supabaseUrl}/rest/v1/pricing_routes`, {
        method: 'POST',
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify(payload)
      });
      console.log(`Inserted ${item.from_city} to ${item.to_city}`);
    }
  }
}

updateDb();

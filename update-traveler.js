const fs = require('fs');

const files = [
  'src/components/HomeClient.tsx',
  'src/app/services/page.tsx',
  'src/app/fleet/layout.tsx',
  'src/app/layout.tsx'
];

for (const file of files) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/Tempo Traveler/g, 'Tempo Traveller');
    content = content.replace(/tempo traveler/g, 'tempo traveller');
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
}

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

  if (!supabaseUrl || !supabaseKey) return;

  const payload = { name: 'Tempo Traveller' };
  
  await fetch(`${supabaseUrl}/rest/v1/fleet?name=eq.Tempo%20Traveler`, {
    method: 'PATCH',
    headers: {
      'apikey': supabaseKey,
      'Authorization': `Bearer ${supabaseKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
  console.log("Updated fleet name in DB");
}

updateDb().catch(console.error);

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function test() {
  const { data, error } = await supabase
    .from('booking_requests')
    .insert([{
      pickup_location: 'Test A',
      drop_location: 'Test B',
      date: '2026-07-01',
      time: '10:00',
      passenger_name: 'John',
      phone: '1234567890',
      status: 'pending'
    }]);
  console.log('Error:', JSON.stringify(error, null, 2));
}
test();

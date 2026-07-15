create table if not exists public.payment_links (
  id uuid default gen_random_uuid() primary key,
  amount numeric not null,
  customer_email text,
  customer_phone text,
  purpose text,
  status text not null default 'pending', -- pending, success, failed
  transaction_id text, -- PhonePe Transaction ID
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.payment_links enable row level security;

-- Policies
create policy "Allow public to read payment links"
  on public.payment_links for select
  using (true);

create policy "Allow admins to manage payment links"
  on public.payment_links for all
  using (
    (current_setting('request.jwt.claims', true))::jsonb ->> 'role' = 'service_role'
  );

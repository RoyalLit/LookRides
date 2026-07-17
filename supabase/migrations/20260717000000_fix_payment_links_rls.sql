-- Drop public read policy on payment_links
DROP POLICY IF EXISTS "Allow public to read payment links" ON public.payment_links;

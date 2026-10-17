-- step2'dan KEYIN Run qiling. Mijoz telefon login'i va backend-only buyurtma.
create table if not exists public.customers(phone text primary key,name text,created_at timestamptz default now());
create table if not exists public.otp_codes(phone text primary key,code_hash text not null,expires_at timestamptz not null,attempts int default 0,created_at timestamptz default now());
alter table public.orders add column if not exists customer_phone text;
alter table public.customers enable row level security;
alter table public.otp_codes enable row level security;
drop policy if exists "customers admin" on public.customers;
create policy "customers admin" on public.customers for select to authenticated using (public.is_admin());
-- Buyurtma va promo faqat backend (service_role) orqali:
revoke execute on function public.place_order(jsonb) from public, anon, authenticated;
revoke execute on function public.check_promo(text) from public, anon, authenticated;
grant execute on function public.place_order(jsonb) to service_role;
grant execute on function public.check_promo(text) to service_role;

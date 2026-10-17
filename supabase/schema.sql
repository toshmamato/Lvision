-- Supabase → SQL Editor → New query → shu faylni to'liq tashlab Run bosing
create table public.products(
 id bigint generated always as identity primary key,
 name text not null, dept text not null default 'lv', category text not null,
 price numeric not null check(price>=0), old_price numeric,
 color text default '#d0d0d0', is_new boolean default false,
 stock jsonb not null default '{"S":0,"M":0,"L":0,"XL":0}',
 description text default '', spec jsonb default '[]', created_at timestamptz default now());
create table public.orders(
 id bigint generated always as identity primary key,
 no text unique not null, name text not null, phone text not null, address text not null,
 delivery text, payment text, items jsonb not null,
 total numeric not null check(total>=0), status text not null default 'Новый', created_at timestamptz default now());
create table public.admins(email text primary key);

create or replace function public.is_admin() returns boolean language sql security definer set search_path=public as
$$ select exists(select 1 from public.admins where email = auth.jwt()->>'email') $$;

alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.admins enable row level security;

create policy "products read" on public.products for select using (true);
create policy "products admin" on public.products for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "orders create" on public.orders for insert to anon, authenticated with check (true);
create policy "orders admin read" on public.orders for select to authenticated using (public.is_admin());
create policy "orders admin update" on public.orders for update to authenticated using (public.is_admin()) with check (public.is_admin());

insert into storage.buckets(id,name,public) values('photos','photos',true) on conflict do nothing;
create policy "photos read" on storage.objects for select using (bucket_id='photos');
create policy "photos admin insert" on storage.objects for insert to authenticated with check (bucket_id='photos' and public.is_admin());
create policy "photos admin update" on storage.objects for update to authenticated using (bucket_id='photos' and public.is_admin());
create policy "photos admin delete" on storage.objects for delete to authenticated using (bucket_id='photos' and public.is_admin());

-- Admin qo'shish: avval Authentication → Users → Add user (email+parol), keyin:
-- insert into public.admins values ('sizning@email.com');

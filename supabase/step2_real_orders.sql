-- Haqiqiy buyurtmalar: narxni serverda hisoblash, ombor kamayishi, promo-kodlar, yetkazish narxi.
-- schema.sql'dan KEYIN Run qiling (SQL Editor).
alter table public.products add column if not exists dept text not null default 'lv';
create table if not exists public.promos(code text primary key, pct numeric, off numeric, active boolean default true);
create table if not exists public.settings(key text primary key, value numeric);
insert into public.settings values('delivery_std',30000),('delivery_exp',60000),('free_from',500000) on conflict do nothing;
alter table public.promos enable row level security;
alter table public.settings enable row level security;
drop policy if exists "settings read" on public.settings;
drop policy if exists "settings admin" on public.settings;
drop policy if exists "promos admin" on public.promos;
create policy "settings read" on public.settings for select using (true);
create policy "settings admin" on public.settings for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "promos admin" on public.promos for all to authenticated using (public.is_admin()) with check (public.is_admin());
drop policy if exists "orders create" on public.orders;

create or replace function public.check_promo(c text) returns jsonb language sql security definer set search_path=public as
$$ select jsonb_build_object('pct',pct,'off',off) from public.promos where code=upper(c) and active limit 1 $$;

create or replace function public.place_order(p jsonb) returns jsonb language plpgsql security definer set search_path=public as $$
declare it jsonb; pr public.products%rowtype; pm public.promos%rowtype; sub numeric:=0; d numeric:=0; dl numeric; qty int; sz text;
 lines jsonb:='[]'::jsonb; ono text; pcode text:=upper(coalesce(p->>'promo',''));
begin
 if coalesce(trim(p->>'name'),'')='' or coalesce(trim(p->>'phone'),'')='' or coalesce(trim(p->>'address'),'')='' then raise exception 'bad_input'; end if;
 if jsonb_typeof(p->'items')<>'array' or jsonb_array_length(p->'items')=0 then raise exception 'empty'; end if;
 for it in select value from jsonb_array_elements(p->'items') loop
  qty:=(it->>'qty')::int; sz:=it->>'size';
  if qty<1 or qty>50 then raise exception 'bad_qty'; end if;
  select * into pr from public.products where id=(it->>'id')::bigint for update;
  if not found then raise exception 'no_product'; end if;
  if coalesce((pr.stock->>sz)::int,0)<qty then raise exception 'out_of_stock:%',pr.name; end if;
  update public.products set stock=jsonb_set(stock,array[sz],to_jsonb((stock->>sz)::int-qty)) where id=pr.id;
  sub:=sub+pr.price*qty;
  lines:=lines||jsonb_build_array(jsonb_build_object('id',pr.id,'name',pr.name,'size',sz,'qty',qty,'price',pr.price));
 end loop;
 if pcode<>'' then
  select * into pm from public.promos where code=pcode and active;
  if found then d:=case when pm.pct is not null then round(sub*pm.pct/100) else least(coalesce(pm.off,0),sub) end; end if;
 end if;
 dl:=case when p->>'delivery'='exp' then (select value from public.settings where key='delivery_exp')
          when sub-d>=(select value from public.settings where key='free_from') then 0
          else (select value from public.settings where key='delivery_std') end;
 ono:='LV-'||to_char(now(),'YYMMDD')||'-'||lpad((floor(random()*9000)+1000)::text,4,'0');
 insert into public.orders(no,name,phone,address,delivery,payment,items,total)
  values(ono,trim(p->>'name'),trim(p->>'phone'),trim(p->>'address'),p->>'delivery',p->>'payment',lines,sub-d+dl);
 return jsonb_build_object('no',ono,'total',sub-d+dl);
end $$;
grant execute on function public.place_order(jsonb) to anon, authenticated;
grant execute on function public.check_promo(text) to anon, authenticated;
-- Promo-kod qo'shish (Table Editor → promos, yoki SQL): insert into public.promos(code,pct) values('LVISION10',10);
-- Yetkazish narxlarini o'zgartirish: Table Editor → settings.

# L Vision by Inoshkins — Next.js

Next.js 14 (App Router) + TypeScript + Tailwind + Framer Motion + Zustand + Supabase.

## Ishga tushirish
1. `npm install`
2. `.env.example` ni `.env.local` ga nusxalang va to'ldiring. `SUPABASE_SERVICE_ROLE_KEY` va `SESSION_SECRET` FAQAT serverda (Vercel Environment Variables), GitHub'ga yuklamang.
3. Supabase → SQL Editor: `schema.sql`, `step2_real_orders.sql`, keyin `step3_auth.sql` ni ketma-ket Run qiling.
4. Authentication → Users → Add user, so'ng SQL: `insert into public.admins values ('email@...');` va "Allow new users to sign up" ni o'chiring.
5. `npm run dev` → http://localhost:3000 ; admin: /admin

## Vercel
Project Settings → Environment Variables: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`. Framework Preset: **Next.js**.

## Rasmlar
Admin'dan yuklanadi (bucket `photos`): `p-ID.jpg` (mahsulot), `dept-lv.jpg`, `dept-marry.jpg`, `dept-flowers.jpg`, `dept-coffee.jpg` (bo'lim).

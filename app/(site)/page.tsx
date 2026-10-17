import Link from 'next/link';import {Banknote,PhoneCall,Sparkles,ArrowUpRight,ArrowRight} from 'lucide-react';import Hero from '@/components/Hero';import Art from '@/components/Art';import ProductCard from '@/components/ProductCard';import Reveal from '@/components/Reveal';
import {DEPTS} from '@/lib/depts';import {getProducts} from '@/lib/products';
export const dynamic='force-dynamic';

const Head=({t,h,sub}:{t:string;h:string;sub?:string})=><div className="mb-8 flex items-end justify-between gap-4 md:mb-10">
  <div><h2 className="text-4xl font-light md:text-6xl">{t}</h2>{sub&&<p className="mt-3 text-mute">{sub}</p>}<span className="mt-5 block h-px w-24 bg-gradient-to-r from-[var(--g1)] via-[var(--g2)] to-transparent"/></div>
  <Link href={h} className="btn o group !hidden shrink-0 items-center gap-2 !px-5 !py-3 sm:!inline-flex">Все <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1"/></Link></div>;
const Sec=({children}:{children:React.ReactNode})=><section className="mx-auto max-w-7xl px-5 py-14 md:py-20">{children}</section>;
const NAMES=DEPTS.map(d=>d.name);
const MQ=<>{NAMES.map(n=><span key={n} className="outline-t flex items-center px-8 text-[clamp(40px,7vw,96px)] font-extralight leading-none">{n}<i className="ml-16 h-2 w-2 rotate-45 bg-gradient-to-br from-[var(--g1)] to-[var(--g3)]"/></span>)}</>;

export default async function Home(){
 const all=await getProducts(),nw=all.filter(p=>p.is_new).slice(0,4),sale=all.filter(p=>p.old_price).slice(0,4);
 return <><Hero/>

 <div aria-hidden="true" className="overflow-hidden whitespace-nowrap border-y border-line py-6"><div className="flex w-max animate-[mq_60s_linear_infinite]"><div className="flex">{MQ}</div><div className="flex">{MQ}</div></div></div>

 <Sec><Head t="Главные разделы" h="/catalog"/>
  <Reveal><div className="grid grid-cols-2 gap-3 md:flex md:h-[540px]">{DEPTS.map(d=><Link key={d.id} href={`/catalog?d=${d.id}`} className="group relative block overflow-hidden rounded-[24px] border border-line transition-[flex-grow] duration-700 ease-[cubic-bezier(.16,1,.3,1)] focus-visible:flex-[2.6] md:flex-1 md:hover:flex-[2.6]">
   <Art file={`dept-${d.id}`} dept={d.id} fix className="aspect-[3/4] w-full md:aspect-auto md:h-full"/>
   <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent"/>
   <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{background:'linear-gradient(135deg,color-mix(in srgb,var(--g1) 30%,transparent),transparent 55%,color-mix(in srgb,var(--g3) 22%,transparent))'}}/>
   <span className="glass absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full text-white transition duration-500 group-hover:rotate-45"><ArrowUpRight size={18}/></span>
   <div className="absolute inset-x-5 bottom-5 text-white"><b className="block text-[15px] font-semibold leading-tight tracking-wide md:text-xl">{d.name}</b><span className="mt-1 block text-xs text-white/75 md:text-sm">{d.sub}</span></div>
  </Link>)}</div></Reveal></Sec>

 {nw.length>0&&<Sec><Head t="Новинки" h="/catalog"/><div className="grid grid-cols-2 gap-4 md:grid-cols-4">{nw.map(p=><ProductCard key={p.id} p={p}/>)}</div></Sec>}
 {sale.length>0&&<Sec><Head t="Подборка" h="/catalog"/><div className="grid grid-cols-2 gap-4 md:grid-cols-4">{sale.map(p=><ProductCard key={p.id} p={p}/>)}</div></Sec>}

 <Sec><div className="grid gap-4 md:grid-cols-3">{[[Banknote,'Оплата при получении','Платите, когда получите заказ'],[PhoneCall,'Заказ по номеру телефона','Подтверждение через ваш номер'],[Sparkles,'4 направления','Одежда, кольца, цветы и кофе в одном месте']].map(([I,t,s]:any,i:number)=><Reveal key={t} delay={i*.08}><div className="glass group h-full rounded-[24px] p-7 transition duration-500 hover:-translate-y-1 hover:shadow-[0_30px_70px_-35px_var(--glow)]">
  <span className="grad-ring mb-5 grid h-12 w-12 place-items-center rounded-2xl" style={{background:'color-mix(in srgb,var(--g2) 12%,transparent)'}}><I size={22} className="text-[var(--g2)]"/></span>
  <b className="block text-lg font-semibold tracking-tight">{t}</b><p className="mt-2 text-sm text-mute">{s}</p></div></Reveal>)}</div></Sec></>}

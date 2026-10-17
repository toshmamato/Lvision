'use client';
import Link from 'next/link';
import {usePathname,useRouter,useSearchParams} from 'next/navigation';
import {AnimatePresence,motion} from 'framer-motion';
import {Sun,Moon,Heart,ShoppingBag,Search,User,Menu,X,ChevronDown,ArrowUpRight} from 'lucide-react';
import {Suspense,useEffect,useRef,useState} from 'react';
import {useStore} from '@/lib/store';import {useMounted} from '@/lib/useMounted';import {DEPTS} from '@/lib/depts';import {toggleTheme,useTheme} from '@/lib/theme';

const ease=[.16,1,.3,1] as const;
const Badge=({n}:{n:number})=><motion.i key={n} initial={{scale:.4}} animate={{scale:1}} className="absolute right-0 top-0 grid h-4 min-w-4 place-items-center rounded-full bg-gradient-to-br from-[var(--g1)] to-[var(--g2)] px-1 text-[10px] font-semibold not-italic text-white">{n}</motion.i>;
const ic='relative grid h-10 w-10 place-items-center rounded-full transition duration-200 hover:bg-[var(--hair)] active:scale-90';

function Logo({className=''}:{className?:string}){return <Link href="/" aria-label="L Vision — на главную" className={'group flex items-center gap-2.5 '+className}>
  <span className="f-display grid h-8 w-8 place-items-center rounded-[10px] bg-gradient-to-br from-[var(--g1)] via-[var(--g2)] to-[var(--g3)] text-[13px] font-bold text-white shadow-[0_6px_20px_-6px_var(--glow)] transition-transform duration-300 group-hover:rotate-[-8deg]">L</span>
  <span className="f-display text-[15px] font-semibold tracking-tight">L Vision</span></Link>}

/** useSearchParams Suspense ichida bo'lishi shart (Next.js). */
function Nav(){
  const p=usePathname(),d=useSearchParams().get('d'),[open,setOpen]=useState(false),ref=useRef<HTMLDivElement>(null);
  useEffect(()=>setOpen(false),[p,d]);
  useEffect(()=>{if(!open)return;const k=(e:KeyboardEvent)=>e.key==='Escape'&&setOpen(false),c=(e:MouseEvent)=>{if(!ref.current?.contains(e.target as Node))setOpen(false)};addEventListener('keydown',k);addEventListener('mousedown',c);return()=>{removeEventListener('keydown',k);removeEventListener('mousedown',c)}},[open]);
  const item=(on:boolean)=>'relative rounded-full px-4 py-2 text-[13px] font-medium transition-colors '+(on?'text-fg':'text-mute hover:text-fg');
  const Pill=({on}:{on:boolean})=>on?<motion.span layoutId="navpill" transition={{duration:.4,ease}} className="absolute inset-0 -z-10 rounded-full bg-[var(--hair)] ring-1 ring-[var(--line)]"/>:null;
  const home=p==='/',cat=p==='/catalog'&&!d;
  return <nav aria-label="Основная навигация" className="hidden items-center gap-1 md:flex">
    <Link href="/" aria-current={home?'page':undefined} className={item(home)}><Pill on={home}/>Главная</Link>
    <Link href="/catalog" aria-current={cat?'page':undefined} className={item(cat)}><Pill on={cat}/>Каталог</Link>
    <div ref={ref} className="relative" onMouseEnter={()=>setOpen(true)} onMouseLeave={()=>setOpen(false)}>
      <button aria-expanded={open} aria-haspopup="true" onClick={()=>setOpen(o=>!o)} className={item(p==='/catalog'&&!!d)+' flex items-center gap-1'}><Pill on={p==='/catalog'&&!!d}/>Разделы<ChevronDown size={14} className={'transition-transform duration-300 '+(open?'rotate-180':'')}/></button>
      <AnimatePresence>{open&&<motion.div initial={{opacity:0,y:8,scale:.97}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:6,scale:.98}} transition={{duration:.22,ease}} className="absolute right-0 top-full z-50 w-[380px] pt-3">
        <div className="glass rounded-[20px] p-2 shadow-[0_30px_80px_-30px_var(--glow)]">{DEPTS.map(x=><Link key={x.id} href={`/catalog?d=${x.id}`} className="group flex items-center justify-between rounded-2xl px-4 py-3 transition-colors hover:bg-[var(--hair)]"><span><b className="block text-[13px] font-semibold tracking-wide">{x.name}</b><span className="text-xs text-mute">{x.sub}</span></span><ArrowUpRight size={16} className="text-mute transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg"/></Link>)}</div></motion.div>}</AnimatePresence>
    </div></nav>}

function Menu_({open,close}:{open:boolean;close:()=>void}){
  const r=useRouter(),{user,setLogin}=useStore(),theme=useTheme(),p=usePathname();
  useEffect(()=>{close()},[p]); // eslint-disable-line
  useEffect(()=>{if(!open)return;document.body.style.overflow='hidden';const k=(e:KeyboardEvent)=>e.key==='Escape'&&close();addEventListener('keydown',k);return()=>{document.body.style.overflow='';removeEventListener('keydown',k)}},[open]); // eslint-disable-line
  const L=[{h:'/',l:'Главная'},{h:'/catalog',l:'Каталог'},...DEPTS.map(d=>({h:`/catalog?d=${d.id}`,l:d.name,s:d.sub})),{h:'/fav',l:'Избранное'}];
  return <AnimatePresence>{open&&<motion.div id="mobile-menu" role="dialog" aria-modal="true" aria-label="Меню" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:.25}} className="fixed inset-0 z-[45] overflow-y-auto bg-bg/95 px-6 pb-10 pt-24 backdrop-blur-2xl md:hidden">
    <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full opacity-40 blur-3xl" style={{background:'radial-gradient(circle,var(--g2),transparent 70%)'}}/>
    <ul className="relative space-y-1">{L.map((x,i)=><motion.li key={x.h} initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{delay:.06+i*.05,duration:.5,ease}}>
      <Link href={x.h} onClick={close} className="flex items-baseline justify-between border-b border-line py-4"><span className="text-[22px] font-light tracking-tight">{x.l}</span>{'s' in x&&<span className="text-xs text-mute">{(x as any).s}</span>}</Link></motion.li>)}</ul>
    <motion.div initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{delay:.45,duration:.5,ease}} className="relative mt-8 flex gap-3">
      <button onClick={()=>{close();user?r.push('/profile'):setLogin(true)}} className="btn flex-1">{user?'Профиль':'Войти'}</button>
      <button onClick={toggleTheme} aria-label={theme==='dark'?'Включить светлую тему':'Включить тёмную тему'} className="btn o grid place-items-center !px-5">{theme==='dark'?<Sun size={18}/>:<Moon size={18}/>}</button>
    </motion.div></motion.div>}</AnimatePresence>}

export default function Header(){
  const m=useMounted(),r=useRouter(),theme=useTheme(),{cart,fav,user,setOpen,setSearch,setLogin}=useStore(),[menu,setMenu]=useState(false);
  const n=m?cart.reduce((a,c)=>a+c.qty,0):0,f=m?fav.length:0,dark=theme==='dark';
  return <><header className="v2 sticky top-0 z-50 bg-transparent px-3 pt-3"><div className="glass mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full pl-4 pr-2 shadow-[0_18px_50px_-30px_var(--glow)] md:pl-5">
    <Logo/>
    <Suspense fallback={<nav className="hidden md:block"/>}><Nav/></Suspense>
    <div className="flex items-center">
      <button aria-label="Поиск" onClick={()=>setSearch(true)} className={ic}><Search size={18}/></button>
      <button aria-label={dark?'Включить светлую тему':'Включить тёмную тему'} onClick={toggleTheme} className={ic+' hidden md:grid'}>
        <AnimatePresence mode="wait" initial={false}><motion.span key={theme} initial={{rotate:-70,opacity:0}} animate={{rotate:0,opacity:1}} exit={{rotate:70,opacity:0}} transition={{duration:.18}} className="block">{dark?<Sun size={18}/>:<Moon size={18}/>}</motion.span></AnimatePresence></button>
      <Link href="/fav" aria-label="Избранное" className={ic+' hidden md:grid'}><Heart size={18}/>{f>0&&<Badge n={f}/>}</Link>
      <button aria-label="Профиль" onClick={()=>user?r.push('/profile'):setLogin(true)} className={ic+' hidden md:grid'}><User size={18}/></button>
      <button aria-label="Корзина" onClick={()=>setOpen(true)} className={ic}><ShoppingBag size={18}/>{n>0&&<Badge n={n}/>}</button>
      <button aria-label={menu?'Закрыть меню':'Открыть меню'} aria-expanded={menu} aria-controls="mobile-menu" onClick={()=>setMenu(o=>!o)} className={ic+' md:hidden'}><AnimatePresence mode="wait" initial={false}><motion.span key={String(menu)} initial={{rotate:-60,opacity:0}} animate={{rotate:0,opacity:1}} exit={{rotate:60,opacity:0}} transition={{duration:.16}}>{menu?<X size={20}/>:<Menu size={20}/>}</motion.span></AnimatePresence></button>
    </div></div></header>
    <div className="v2" style={{display:'contents'}}><Menu_ open={menu} close={()=>setMenu(false)}/></div></>}

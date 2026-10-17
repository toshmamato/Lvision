'use client';
import Link from 'next/link';import {motion} from 'framer-motion';import {ArrowRight} from 'lucide-react';import Art from './Art';import {DEPTS} from '@/lib/depts';

const ease=[.16,1,.3,1] as const;
const wrap={hidden:{},show:{transition:{staggerChildren:.1,delayChildren:.15}}};
const up={hidden:{opacity:0,y:18},show:{opacity:1,y:0,transition:{duration:.8,ease}}};
const mask={hidden:{y:'110%'},show:{y:0,transition:{duration:1.05,ease}}};

export default function Hero(){
 return <section className="relative isolate overflow-hidden">
  {/* fon: aurora + to'r */}
  <div aria-hidden="true" className="absolute inset-0 -z-10">
   <div className="blob a -left-32 -top-24 h-[480px] w-[480px]"/><div className="blob b right-[-10%] top-[8%] h-[560px] w-[560px]"/><div className="blob c bottom-[-18%] left-[28%] h-[420px] w-[420px]"/><div className="gridbg"/>
  </div>
  <motion.div variants={wrap} initial="hidden" animate="show" className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-14 md:min-h-[82vh] md:grid-cols-[1.45fr_1fr] md:pb-28 md:pt-20">
   <div>
    <motion.p variants={up} className="glass inline-flex items-center gap-2.5 rounded-full py-2 pl-3 pr-4 text-xs text-mute"><span className="dot h-1.5 w-1.5 rounded-full bg-[var(--g3)]"/>2026 · Exclusive collection</motion.p>
    <h1 className="mt-7 text-[clamp(42px,8vw,118px)] font-extralight leading-[.95]">
     <span className="block overflow-hidden pb-[.08em]"><motion.span variants={mask} className="block">DEFINED</motion.span></span>
     <span className="block overflow-hidden pb-[.1em]"><motion.span variants={mask} className="grad-t block font-light">BY VISION.</motion.span></span>
    </h1>
    <motion.p variants={up} className="mt-7 max-w-md text-base text-mute md:text-lg">L Vision by Inoshkins.</motion.p>
    <motion.div variants={up} className="mt-9 flex flex-wrap items-center gap-3">
     <Link href="/catalog" className="btn group !inline-flex items-center gap-3">Explore catalog <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1"/></Link>
    </motion.div>
    <motion.ul variants={up} className="mt-10 flex flex-wrap gap-2">{DEPTS.map(d=><li key={d.id}><Link href={`/catalog?d=${d.id}`} className="glass inline-block rounded-full px-4 py-2 text-xs font-medium transition duration-300 hover:-translate-y-0.5 hover:border-[var(--g2)]">{d.name}</Link></li>)}</motion.ul>
   </div>
   <motion.div variants={{hidden:{opacity:0,y:30,rotate:3},show:{opacity:1,y:0,rotate:-2,transition:{duration:1.2,ease}}}} className="mx-auto w-full max-w-[420px]">
    <div className="grad-ring rounded-[28px] p-2 shadow-[0_40px_120px_-40px_var(--glow)] glass">
     <div className="relative overflow-hidden rounded-[22px]"><Art file="hero" dept="lv" g="#d9d9d9" alt="L Vision — новая коллекция" fix className="aspect-[4/5]"/>
      <span className="glass absolute bottom-3 left-3 rounded-full px-3 py-1.5 text-[10px] font-semibold tracking-[.2em]">NEW 2026</span></div>
    </div>
   </motion.div>
  </motion.div></section>}

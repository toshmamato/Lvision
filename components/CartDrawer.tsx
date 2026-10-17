'use client';
import Link from 'next/link';import {useEffect,useState} from 'react';import {AnimatePresence,motion} from 'framer-motion';import {X} from 'lucide-react';
import {useStore} from '@/lib/store';import {useMounted} from '@/lib/useMounted';import {totals} from '@/lib/totals';import {fmt} from '@/lib/format';
export default function CartDrawer(){
 const m=useMounted(),{cart,open,setOpen,qty,rm,promo,setPromo}=useStore(),[code,setCode]=useState(''),[err,setErr]=useState('');
 const T=totals(cart,promo);
 useEffect(()=>{if(!open)return;const k=(e:KeyboardEvent)=>{if(e.key==='Escape')setOpen(false)};addEventListener('keydown',k);return()=>removeEventListener('keydown',k)},[open,setOpen]);
 async function apply(){setErr('');const c=code.trim().toUpperCase();if(!c){setPromo(null);return}const r=await fetch('/api/promo',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({code:c})}).then(x=>x.json()).catch(()=>null);if(r)setPromo({code:c,pct:r.pct,off:r.off});else setErr('Неверный промокод')}
 return <AnimatePresence>{m&&open&&<>
  <motion.div key="o" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setOpen(false)} className="fixed inset-0 z-[70] bg-black/60"/>
  <motion.aside key="d" role="dialog" aria-modal="true" aria-label="Корзина" initial={{x:'100%'}} animate={{x:0}} exit={{x:'100%'}} transition={{type:'tween',ease:[.16,1,.3,1],duration:.4}} className="fixed inset-y-0 right-0 z-[80] flex w-full max-w-md flex-col border-l border-line bg-bg">
   <div className="flex justify-between border-b border-line p-5"><span className="text-xs uppercase tracking-widest text-mute">Корзина</span><button onClick={()=>setOpen(false)} aria-label="Закрыть"><X size={20}/></button></div>
   <div className="flex-1 overflow-auto px-5">{cart.length?cart.map(c=><div key={c.id+c.size} className="flex gap-3 border-b border-line py-4">
     <div className="flex-1"><p>{c.name}</p><p className="text-xs text-mute">{c.size!=='ONE'&&c.size+' · '}{fmt(c.price)}</p>
      <div className="mt-2 inline-flex items-center border border-line"><button className="h-9 w-9" onClick={()=>qty(c.id,c.size,-1)}>−</button><span className="w-8 text-center">{c.qty}</span><button className="h-9 w-9" onClick={()=>qty(c.id,c.size,1)}>+</button></div></div>
     <div className="text-right"><p>{fmt(c.price*c.qty)}</p><button className="text-xs text-mute underline" onClick={()=>rm(c.id,c.size)}>Удалить</button></div></div>)
    :<div className="py-24 text-center"><p className="mb-5">Корзина пуста</p><button className="btn o" onClick={()=>setOpen(false)}>К покупкам</button></div>}</div>
   {cart.length>0&&<div className="space-y-2 border-t border-line p-5">
    <div className="flex gap-2"><input placeholder="Промокод" value={code} onChange={e=>setCode(e.target.value)}/><button className="btn" onClick={apply}>OK</button></div><p className="text-xs text-red-500">{err}</p>
    <p className="flex justify-between text-sm text-mute"><span>Подытог</span><span>{fmt(T.sub)}</span></p>
    {T.d>0&&<p className="flex justify-between text-sm text-green-500"><span>Промокод {promo?.code}</span><span>−{fmt(T.d)}</span></p>}
    <p className="flex justify-between text-lg"><span>Итого (без доставки)</span><span>{fmt(T.sub-T.d)}</span></p>
    <Link href="/checkout" onClick={()=>setOpen(false)} className="btn block text-center">Оформить заказ</Link></div>}
  </motion.aside></>}</AnimatePresence>}

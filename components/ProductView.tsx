'use client';
import {useState} from 'react';import {Heart} from 'lucide-react';import Art from './Art';import Candles from './Candles';import ProductCard from './ProductCard';
import {useStore} from '@/lib/store';import {useMounted} from '@/lib/useMounted';import {fmt,disc,tot} from '@/lib/format';import type {Product} from '@/lib/types';
export default function ProductView({p,related}:{p:Product;related:Product[]}){
 const sizes=Object.keys(p.stock),one=sizes[0]==='ONE',[size,setSize]=useState(one?'ONE':''),[q,setQ]=useState(1),[err,setErr]=useState(''),{add,fav,toggleFav}=useStore(),m=useMounted();
 const max=size?p.stock[size]||0:0;
 return <div className="mx-auto max-w-7xl px-5 py-8"><div className="grid gap-10 md:grid-cols-2">
  <Art file={`p-${p.id}`} dept={p.dept} g={p.color} alt={p.name} fix className="aspect-[4/5]"/>
  <div><p className="text-xs uppercase tracking-widest text-mute">{p.category}</p><h1 className="my-3 text-4xl font-light">{p.name}</h1>
   <p className="flex items-baseline gap-3 text-2xl">{fmt(p.price)}{p.old_price&&<><s className="text-base text-mute">{fmt(p.old_price)}</s><span className="text-base text-red-500">−{disc(p)}%</span></>}</p>
   {p.old_price&&<div className="my-5 border border-line bg-surf p-4"><p className="text-xs uppercase tracking-widest text-mute">Скидка −{disc(p)}%</p><Candles seed={p.id} from={p.old_price} to={p.price}/><p className="text-[11px] text-mute">Иллюстрация, не реальная история цен</p></div>}
   {p.description&&<p className="my-4 text-mute">{p.description}</p>}
   {!one&&<div className="my-4"><p className="mb-2 text-xs uppercase tracking-widest text-mute">Размер</p><div className="flex flex-wrap gap-2">{sizes.map(s=><button key={s} disabled={!p.stock[s]} onClick={()=>{setSize(s);setQ(1);setErr('')}} className={'border px-4 py-2 text-sm disabled:line-through disabled:opacity-40 '+(size===s?'border-fg bg-fg text-bg':'border-line')}>{s}</button>)}</div></div>}
   <p className="mb-4 text-xs text-mute">{tot(p.stock)?(size?`В наличии: ${max} шт.`:'В наличии'):'Нет в наличии'}</p>
   <div className="flex items-center gap-3"><div className="inline-flex items-center border border-line"><button className="h-11 w-10" onClick={()=>setQ(Math.max(1,q-1))}>−</button><span className="w-8 text-center">{q}</span><button className="h-11 w-10" onClick={()=>setQ(Math.min(max||1,q+1))}>+</button></div>
    <button className="btn flex-1" disabled={!tot(p.stock)} onClick={()=>{if(!size)return setErr('Сначала выберите размер');add({id:p.id,size,qty:q,name:p.name,price:p.price,dept:p.dept,max})}}>В корзину</button>
    <button aria-label="Избранное" className="grid h-11 w-11 place-items-center border border-line" onClick={()=>toggleFav(p.id)}><Heart size={18} fill={m&&fav.includes(p.id)?'currentColor':'none'}/></button></div>
   <p className="mt-2 text-sm text-red-500">{err}</p>
   {p.spec?.length>0&&<ul className="mt-6 list-disc pl-5 text-sm text-mute">{p.spec.map(s=><li key={s}>{s}</li>)}</ul>}</div></div>
  {related.length>0&&<><h2 className="mb-6 mt-16 text-3xl font-light">Похожие товары</h2><div className="grid grid-cols-2 gap-4 md:grid-cols-4">{related.map(r=><ProductCard key={r.id} p={r}/>)}</div></>}</div>}

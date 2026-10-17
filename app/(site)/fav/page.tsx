'use client';
import Link from 'next/link';import {useEffect,useState} from 'react';import ProductCard from '@/components/ProductCard';import {useStore} from '@/lib/store';import {useMounted} from '@/lib/useMounted';import type {Product} from '@/lib/types';
export default function Fav(){
 const m=useMounted(),{fav}=useStore(),[all,setAll]=useState<Product[]>([]);
 useEffect(()=>{fetch('/api/products').then(r=>r.json()).then(d=>setAll(Array.isArray(d)?d:[])).catch(()=>{})},[]);
 const l=all.filter(p=>fav.includes(p.id));
 return <div className="mx-auto max-w-7xl px-5 py-8"><h1 className="mb-6 text-4xl font-light md:text-6xl">Избранное</h1>
 {m&&!fav.length?<div className="border border-line bg-surf p-16 text-center"><p className="mb-5">В избранном пока пусто</p><Link href="/catalog" className="btn">В каталог</Link></div>:<div className="grid grid-cols-2 gap-4 md:grid-cols-4">{l.map(p=><ProductCard key={p.id} p={p}/>)}</div>}</div>}

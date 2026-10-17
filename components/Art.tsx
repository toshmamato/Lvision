'use client';
import {useState} from 'react';
const base=(process.env.NEXT_PUBLIC_SUPABASE_URL||'')+'/storage/v1/object/public/photos/';
const SH:Record<string,(g:string)=>JSX.Element>={
lv:g=><path d="M30 15L10 32l9 13 9-5v65h44V40l9 5 9-13L70 15Q50 30 30 15Z" fill={g} stroke="#fff3"/>,
marry:g=><><circle cx="50" cy="72" r="24" fill="none" stroke={g} strokeWidth="7"/><path d="M40 40l10-14 10 14-10 10z" fill="#fff" opacity=".9"/></>,
flowers:g=><><path d="M50 112V58" stroke="#6a8f5a" strokeWidth="3"/>{[[50,32],[68,46],[32,46],[62,64],[38,64]].map((q,i)=><circle key={i} cx={q[0]} cy={q[1]} r="12" fill={g} opacity=".92"/>)}<circle cx="50" cy="50" r="9" fill="#e9d27a"/></>,
coffee:g=><><path d="M26 52h46v28a23 23 0 01-46 0z" fill={g}/><path d="M72 60h6a9 9 0 010 18h-7" fill="none" stroke={g} strokeWidth="4"/><path d="M38 40q-5-8 0-14M52 40q-5-8 0-14M64 40q-5-8 0-14" fill="none" stroke="#fff6" strokeWidth="2.5"/></>};
/** file: Supabase "photos" bucket'dagi fayl nomi (p-12, dept-marry). Rasm bo'lmasa, siluet ko'rinadi. */
export default function Art({file,dept,g='#d0d0d0',className='',alt='',fix=false}:{file:string;dept:string;g?:string;className?:string;alt?:string;fix?:boolean}){
 const [ok,setOk]=useState(true);
 return <div className={'relative overflow-hidden bg-[radial-gradient(circle_at_50%_30%,#2a2a2a,#0d0d0d_75%)] '+className}>
  <svg viewBox="0 0 100 120" className="absolute inset-x-[10%] inset-y-[8%] h-[84%] w-[80%]">{(SH[dept]??SH.lv)(g)}</svg>
  {ok&&<img src={base+file+'.jpg'} ref={fix?(el=>{if(el&&el.complete&&el.naturalWidth===0)setOk(false)}):undefined} alt={alt} loading="lazy" decoding="async" onError={()=>setOk(false)} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"/>}
 </div>}

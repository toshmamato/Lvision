'use client';
import Link from 'next/link';import {useState} from 'react';import {ChevronDown} from 'lucide-react';

type D={id:string;name:string;sub:string;cats:string[]};
/** Ma'lumot Catalog ishlatadigan DEPTS ro'yxatidan prop sifatida keladi — bu yerda qayta yozilmagan. */
export default function FooterCategories({depts}:{depts:D[]}){
  const [all,setAll]=useState(false);
  return <div>
    <ul className="space-y-3 text-sm text-mute">{depts.map(d=><li key={d.id}><Link href={`/catalog?d=${d.id}`} className="lnk">{d.name}</Link></li>)}</ul>
    {/* Sub-kategoriyalar har doim DOM'da (havolalar mavjud), yopiqda faqat ko'rinmaydi */}
    <div className={'grid transition-[grid-template-rows] duration-500 ease-out '+(all?'grid-rows-[1fr]':'grid-rows-[0fr]')}>
      <div className={'overflow-hidden '+(all?'visible':'invisible [transition:visibility_0s_.5s]')}>
        <div className="space-y-5 pt-5">{depts.map(d=><div key={d.id}><p className="mb-2 text-[11px] font-semibold uppercase tracking-[.16em] text-fg">{d.name}</p>
          <ul className="flex flex-wrap gap-x-4 gap-y-1.5 text-[13px] text-mute">{d.cats.map(c=><li key={c}><Link href={`/catalog?d=${d.id}`} className="lnk" tabIndex={all?0:-1}>{c}</Link></li>)}</ul></div>)}</div>
      </div>
    </div>
    <button type="button" aria-expanded={all} onClick={()=>setAll(a=>!a)} className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-fg transition hover:opacity-80">{all?'Свернуть':'View All'}<ChevronDown size={15} className={'transition-transform duration-300 '+(all?'rotate-180':'')}/></button>
  </div>}

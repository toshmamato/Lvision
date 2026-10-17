'use client';
import {usePathname} from 'next/navigation';
import type {ReactNode} from 'react';
/** /catalog — himoyalangan sahifa: yangi `.v2` dizayn tizimi unga qo'llanmaydi, u asl ko'rinishida qoladi. */
export default function Shell({children}:{children:ReactNode}){
  const legacy=usePathname().startsWith('/catalog');
  return <main id="main" className={legacy?'mb-20':'v2 pb-24'}>{children}</main>}

'use client';
import Link from 'next/link';import {usePathname,useRouter} from 'next/navigation';import {Home,LayoutGrid,Heart,ShoppingBag,User} from 'lucide-react';import {motion} from 'framer-motion';
import {useStore} from '@/lib/store';import {useMounted} from '@/lib/useMounted';
const T:[string,string,any][]=[['/','Главная',Home],['/catalog','Каталог',LayoutGrid],['/fav','Избранное',Heart],['cart','Корзина',ShoppingBag],['/profile','Профиль',User]];
export default function BottomNav(){
 const p=usePathname(),r=useRouter(),m=useMounted(),{cart,fav,user,setOpen,setLogin}=useStore();
 const cnt:Record<string,number>={'/fav':m?fav.length:0,cart:m?cart.reduce((a,c)=>a+c.qty,0):0};
 return <nav aria-label="Нижняя навигация" className="v2 pointer-events-none fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(.6rem,env(safe-area-inset-bottom))] md:hidden"><div className="glass pointer-events-auto mx-auto flex max-w-md rounded-full p-1.5 shadow-[0_18px_50px_-20px_var(--glow)]">{T.map(([h,l,I])=>{
  const on=h==='/'?p==='/':h!=='cart'&&p.startsWith(h);
  const c=<>{on&&<motion.span layoutId="bnpill" transition={{type:'spring',stiffness:420,damping:34}} className="absolute inset-0 -z-10 rounded-full bg-[var(--hair)] ring-1 ring-[var(--line)]"/>}<I size={19} className="mx-auto"/><span className="mt-0.5 block text-[10px] font-medium">{l}</span>{cnt[h]>0&&<i className="absolute right-[calc(50%-20px)] top-1 grid h-4 min-w-4 place-items-center rounded-full bg-gradient-to-br from-[var(--g1)] to-[var(--g2)] px-1 text-[10px] font-semibold not-italic text-white">{cnt[h]}</i>}</>;
  const cls='relative z-0 flex-1 rounded-full py-1.5 text-center transition active:scale-90 '+(on?'text-fg':'text-mute');
  if(h==='cart')return <button key={h} onClick={()=>setOpen(true)} className={cls}>{c}</button>;
  if(h==='/profile')return <button key={h} onClick={()=>user?r.push('/profile'):setLogin(true)} className={cls}>{c}</button>;
  return <Link key={h} href={h} className={cls}>{c}</Link>})}</div></nav>}

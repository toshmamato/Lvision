'use client';
import {useSyncExternalStore} from 'react';

export type Theme='dark'|'light';
const KEY='lv-theme';

/** Yagona manba: <html data-theme>. Boshlang'ich qiymatni app/layout.tsx dagi inline skript qo'yadi (flashsiz). */
const read=():Theme=>document.documentElement.dataset.theme==='light'?'light':'dark';
const subscribe=(cb:()=>void)=>{
  const o=new MutationObserver(cb);
  o.observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
  return()=>o.disconnect();
};

/** Server snapshot doim 'dark' — hydration mosligi bo'lmaydi, klientda to'g'ri qiymatga o'tadi. */
export const useTheme=():Theme=>useSyncExternalStore(subscribe,read,()=>'dark' as Theme);

export function setTheme(t:Theme){
  const el=document.documentElement;
  el.classList.add('theme-anim');
  el.dataset.theme=t;
  try{localStorage.setItem(KEY,t)}catch{}
  window.setTimeout(()=>el.classList.remove('theme-anim'),400);
}
export const toggleTheme=()=>setTheme(read()==='dark'?'light':'dark');

'use client';
import {useEffect,useState} from 'react';import {AnimatePresence,motion} from 'framer-motion';
export default function Intro(){
 const [show,setShow]=useState(false);
 useEffect(()=>{if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;try{if(sessionStorage.getItem('lv-i'))return;sessionStorage.setItem('lv-i','1')}catch{}setShow(true);const t=setTimeout(()=>setShow(false),1900);return()=>clearTimeout(t)},[]);
 return <AnimatePresence>{show&&<motion.div exit={{opacity:0}} transition={{duration:.7}} className="v2 fixed inset-0 z-[200] grid place-items-center overflow-hidden text-center">
  <div aria-hidden="true" className="absolute inset-0"><div className="blob a left-[10%] top-[15%] h-80 w-80"/><div className="blob b bottom-[10%] right-[10%] h-96 w-96"/></div>
  <div className="relative"><motion.p initial={{opacity:0,y:20,filter:'blur(8px)'}} animate={{opacity:1,y:0,filter:'blur(0px)'}} transition={{duration:1.1}} className="wm-wrap"><span className="wm" style={{fontSize:'clamp(44px,13vw,110px)'}}><span className="wm-l">L</span><span className="wm-t">Vision</span></span></motion.p>
  <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.6,duration:1}} className="mt-3 text-[11px] tracking-[.5em] text-mute">BY INOSHKINS</motion.p></div></motion.div>}</AnimatePresence>}

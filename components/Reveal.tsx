'use client';
import {motion} from 'framer-motion';
import type {ReactNode} from 'react';
export default function Reveal({children,className='',delay=0}:{children:ReactNode;className?:string;delay?:number}){
  return <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-8% 0px'}} transition={{duration:.9,delay,ease:[.16,1,.3,1]}} className={className}>{children}</motion.div>}

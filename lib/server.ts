import {createClient} from '@supabase/supabase-js';import crypto from 'crypto';import {cookies} from 'next/headers';
/** Faqat server: service_role kaliti brauzerga chiqmaydi. */
export const admin=()=>createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.SUPABASE_SERVICE_ROLE_KEY!,{auth:{persistSession:false}});
const SEC=()=>process.env.SESSION_SECRET||'';
const mac=(s:string)=>crypto.createHmac('sha256',SEC()).update(s).digest('base64url');
export const hash=(phone:string,code:string)=>crypto.createHmac('sha256',SEC()).update(phone+':'+code).digest('hex');
export function sign(o:object){const p=Buffer.from(JSON.stringify({...o,exp:Date.now()+30*864e5})).toString('base64url');return p+'.'+mac(p)}
export function session():{phone:string}|null{if(!SEC())return null;const t=cookies().get('lv-session')?.value;if(!t)return null;const [p,s]=t.split('.');if(!p||!s)return null;const ok=mac(p);if(s.length!==ok.length||!crypto.timingSafeEqual(Buffer.from(s),Buffer.from(ok)))return null;try{const o=JSON.parse(Buffer.from(p,'base64url').toString());return o.exp>Date.now()?o:null}catch{return null}}

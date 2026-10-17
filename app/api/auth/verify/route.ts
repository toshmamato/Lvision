import {cookies} from 'next/headers';import {admin,hash,sign} from '@/lib/server';import {normPhone} from '@/lib/phone';
export async function POST(req:Request){
 const b=await req.json(),ph=normPhone(b.phone),code=String(b.code||'');if(!ph||!/^\d{6}$/.test(code))return Response.json({error:'bad_input'},{status:400});
 const db=admin(),o=(await db.from('otp_codes').select('*').eq('phone',ph).maybeSingle()).data;
 if(!o||new Date(o.expires_at)<new Date()||o.attempts>=5)return Response.json({error:'expired'},{status:400});
 if(o.code_hash!==hash(ph,code)){await db.from('otp_codes').update({attempts:o.attempts+1}).eq('phone',ph);return Response.json({error:'wrong'},{status:400})}
 await db.from('otp_codes').delete().eq('phone',ph);await db.from('customers').upsert({phone:ph},{onConflict:'phone',ignoreDuplicates:true});
 const c=await db.from('customers').select('name').eq('phone',ph).maybeSingle();
 cookies().set('lv-session',sign({phone:ph}),{httpOnly:true,sameSite:'lax',secure:process.env.NODE_ENV==='production',path:'/',maxAge:30*86400});
 return Response.json({ok:true,user:{phone:ph,name:c.data?.name||''}})}

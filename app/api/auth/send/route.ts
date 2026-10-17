import crypto from 'crypto';import {admin,hash} from '@/lib/server';import {normPhone} from '@/lib/phone';
export async function POST(req:Request){
 const {phone}=await req.json(),ph=normPhone(phone);if(!ph)return Response.json({error:'bad_phone'},{status:400});
 const db=admin(),last=await db.from('otp_codes').select('created_at').eq('phone',ph).maybeSingle();
 if(last.data&&Date.now()-new Date(last.data.created_at).getTime()<30000)return Response.json({error:'wait'},{status:429});
 const code=String(crypto.randomInt(100000,1000000));
 await db.from('otp_codes').upsert({phone:ph,code_hash:hash(ph,code),expires_at:new Date(Date.now()+5*60000).toISOString(),attempts:0,created_at:new Date().toISOString()});
 // SMS-provayder ulanmaguncha: SMS_MODE=alert bo'lsa kod ekranda ko'rsatiladi (bu telefon egasini TASDIQLAMAYDI). Haqiqiy SMS shu joyda yuboriladi.
 return Response.json({ok:true,...(process.env.SMS_MODE==='alert'?{devCode:code}:{})})}

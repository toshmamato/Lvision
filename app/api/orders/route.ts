import {admin,session} from '@/lib/server';
export async function POST(req:Request){
 const s=session();if(!s)return Response.json({error:'login'},{status:401});
 const b=await req.json(),name=String(b.name||'').trim(),address=String(b.address||'').trim();
 if(name.length<3||address.length<6||!Array.isArray(b.items))return Response.json({error:'bad_input'},{status:400});
 const db=admin(),r=await db.rpc('place_order',{p:{name,phone:s.phone,address,delivery:b.delivery==='exp'?'exp':'std',payment:'cod',promo:String(b.promo||''),items:b.items}});
 if(r.error)return Response.json({error:r.error.message},{status:400});
 await db.from('orders').update({customer_phone:s.phone}).eq('no',r.data.no);await db.from('customers').update({name}).eq('phone',s.phone);
 return Response.json(r.data)}

import {admin} from '@/lib/server';
export async function POST(req:Request){const {code}=await req.json();const r=await admin().rpc('check_promo',{c:String(code||'').slice(0,40)});return Response.json(r.data??null)}

import {cookies} from 'next/headers';
export async function POST(){cookies().set('lv-session','',{path:'/',maxAge:0});return Response.json({ok:true})}

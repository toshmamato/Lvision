import {supabase} from '@/lib/supabase';export const dynamic='force-dynamic';
export async function GET(){const {data}=await supabase.from('settings').select('*');const m:any=Object.fromEntries((data??[]).map((x:any)=>[x.key,+x.value]));return Response.json({std:m.delivery_std??30000,exp:m.delivery_exp??60000,free:m.free_from??500000})}

import {supabase} from '@/lib/supabase';export const dynamic='force-dynamic';
export async function GET(){const {data}=await supabase.from('products').select('*').order('id',{ascending:false});return Response.json(data??[])}

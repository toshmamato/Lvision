import {supabase} from './supabase';import type {Product} from './types';
export async function getProducts(dept?:string):Promise<Product[]>{let q=supabase.from('products').select('*').order('id',{ascending:false});if(dept)q=q.eq('dept',dept);const {data}=await q;return (data??[]) as Product[]}
export async function getProduct(id:number){const {data}=await supabase.from('products').select('*').eq('id',id).maybeSingle();return data as Product|null}

import Catalog from '@/components/Catalog';import {getProducts} from '@/lib/products';
export const dynamic='force-dynamic';
export default async function Page({searchParams}:{searchParams:{d?:string}}){return <Catalog products={await getProducts()} dept0={searchParams.d||''}/>}

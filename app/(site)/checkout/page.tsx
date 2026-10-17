'use client';
import Link from 'next/link';import {useEffect,useState} from 'react';import {Phone} from 'lucide-react';import {useStore} from '@/lib/store';import {useMounted} from '@/lib/useMounted';import {totals,DEL0} from '@/lib/totals';import {fmt} from '@/lib/format';
export default function Checkout(){
 const m=useMounted(),{cart,promo,clear,user,setLogin}=useStore(),[f,setF]=useState({name:'',address:''}),[del,setDel]=useState<'std'|'exp'>('std'),[D,setD]=useState(DEL0),[er,setEr]=useState<Record<string,string>>({}),[busy,setBusy]=useState(false),[done,setDone]=useState<string|null>(null),[fail,setFail]=useState('');
 useEffect(()=>{fetch('/api/settings').then(r=>r.json()).then(setD).catch(()=>{})},[]);
 useEffect(()=>{if(user?.name&&!f.name)setF(x=>({...x,name:user.name}))},[user]);
 const T=totals(cart,promo,D,del);
 async function submit(){
  const e:Record<string,string>={};if(f.name.trim().length<3)e.name='Имя минимум 3 символа';if(f.address.trim().length<6)e.address='Введите адрес';setEr(e);if(Object.keys(e).length)return;
  setBusy(true);setFail('');
  const r=await fetch('/api/orders',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...f,delivery:del,promo:promo?.code||'',items:cart.map(c=>({id:c.id,size:c.size,qty:c.qty}))})});const d=await r.json().catch(()=>({}));setBusy(false);
  if(r.status===401){setLogin(true);return setFail('Сначала войдите по номеру телефона.')}
  if(!r.ok)return setFail(/out_of_stock/.test(d.error||'')?'Некоторые товары закончились. Обновите корзину.':'Не удалось отправить заказ, попробуйте ещё раз.');
  clear();setDone(d.no)}
 if(done)return <div className="mx-auto max-w-lg px-5 py-24 text-center"><div className="mx-auto mb-4 grid h-20 w-20 place-items-center rounded-full border border-green-500 text-4xl text-green-500">✓</div><h1 className="my-4 text-3xl font-light">Заказ принят</h1><p className="text-xs uppercase tracking-widest text-mute">{done}</p><p className="my-4 text-mute">Мы свяжемся с вами по номеру {user?.phone} для подтверждения заказа.</p><Link href="/profile" className="btn">Мои заказы</Link></div>;
 if(m&&!cart.length)return <div className="mx-auto max-w-lg px-5 py-24 text-center"><h1 className="mb-6 text-3xl font-light">Корзина пуста</h1><Link href="/catalog" className="btn">В каталог</Link></div>;
 if(m&&!user)return <div className="mx-auto max-w-md px-5 py-24 text-center"><Phone className="mx-auto mb-4 text-ac" size={32}/><h1 className="mb-2 text-3xl font-light">Нужен номер телефона</h1><p className="mb-6 text-mute">Без входа по номеру телефона заказ оформить нельзя.</p><button className="btn" onClick={()=>setLogin(true)}>Войти по номеру</button></div>;
 return <div className="mx-auto max-w-2xl px-5 py-8"><h1 className="mb-6 text-3xl font-light">Оформление заказа</h1>
  <div className="space-y-2"><input readOnly value={user?.phone||''} aria-label="Телефон" className="opacity-60"/><div><input placeholder="Имя и фамилия" value={f.name} onChange={e=>setF({...f,name:e.target.value})}/><p className="min-h-4 text-xs text-red-500">{er.name}</p></div><div><input placeholder="Адрес (город, улица, дом)" value={f.address} onChange={e=>setF({...f,address:e.target.value})}/><p className="min-h-4 text-xs text-red-500">{er.address}</p></div></div>
  <p className="mb-2 mt-4 text-xs uppercase tracking-widest text-mute">Доставка</p>
  {([['std','Стандартная доставка',D.std],['exp','Экспресс-доставка',D.exp]] as const).map(([k,l,v])=><label key={k} className="mb-2 flex gap-3 border border-line p-3"><input type="radio" className="!w-auto" checked={del===k} onChange={()=>setDel(k)}/>{l} · {fmt(v)}{k==='std'&&D.free?` · бесплатно от ${fmt(D.free)}`:''}</label>)}
  <p className="mb-2 mt-4 text-xs uppercase tracking-widest text-mute">Оплата</p><div className="border border-line p-3">Наличными при получении</div>
  <div className="my-6 space-y-1 border border-line bg-surf p-4">{cart.map(c=><p key={c.id+c.size} className="flex justify-between"><span>{c.name} {c.size!=='ONE'&&c.size} × {c.qty}</span><span>{fmt(c.price*c.qty)}</span></p>)}
   <hr className="my-2 border-line"/><p className="flex justify-between text-sm text-mute"><span>Подытог</span><span>{fmt(T.sub)}</span></p>{T.d>0&&<p className="flex justify-between text-sm text-green-500"><span>Промокод</span><span>−{fmt(T.d)}</span></p>}
   <p className="flex justify-between text-sm text-mute"><span>Доставка</span><span>{fmt(T.dl)}</span></p><p className="flex justify-between text-xl"><span>Итого</span><span>{fmt(T.t)}</span></p></div>
  {fail&&<p className="mb-3 text-red-500">{fail}</p>}<button className="btn w-full" disabled={busy} onClick={submit}>{busy?'Отправляем…':'Подтвердить заказ'}</button></div>}

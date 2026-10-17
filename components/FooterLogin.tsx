'use client';
import {useStore} from '@/lib/store';
/** Mavjud login oynasini ochadi (yangi marshrut yaratilmaydi). */
export default function FooterLogin(){const {user,setLogin}=useStore();
  return user?<a href="/profile" className="lnk">Мои заказы</a>:<button type="button" onClick={()=>setLogin(true)} className="lnk text-left">Войти по номеру телефона</button>}

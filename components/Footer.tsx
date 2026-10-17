import Link from 'next/link';
import {DEPTS} from '@/lib/depts';
import Reveal from './Reveal';import Year from './Year';import FooterCategories from './FooterCategories';import FooterLogin from './FooterLogin';

/* Faqat loyihada mavjud sahifalar. About / Services / Contact sahifalari va aloqa ma'lumotlari loyihada yo'q — o'ylab topilmagan. */
const NAV=[{h:'/',l:'Главная'},{h:'/catalog',l:'Каталог'},{h:'/fav',l:'Избранное'},{h:'/profile',l:'Мои заказы'}];
const H=({children}:{children:string})=><h2 className="mb-5 text-xs font-semibold uppercase tracking-[.2em] text-fg">{children}</h2>;

export default function Footer(){
  return <footer className="v2 ft-bg relative overflow-hidden rounded-t-[2rem] border-t border-line max-md:-mb-16 max-md:pb-16 md:rounded-t-[3rem]">
    <div aria-hidden="true" className="gridbg opacity-60"/>
    <div className="relative mx-auto max-w-7xl px-5 pt-16">
      <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1.1fr]">
        {/* L Vision */}
        <div className="max-w-sm">
          <H>L Vision</H>
          <p className="text-sm leading-relaxed text-mute">L Vision by Inoshkins. Четыре направления под одним именем: одежда, кольца и подарки, цветы и кофе. Оформление заказа — по номеру телефона, оплата при получении.</p>
        </div>
        {/* Navigation */}
        <nav aria-label="Навигация">
          <H>Navigation</H>
          <ul className="space-y-3 text-sm text-mute">{NAV.map(n=><li key={n.h}><Link href={n.h} className="lnk">{n.l}</Link></li>)}</ul>
        </nav>
        {/* Categories — Catalog bilan bir xil manba: lib/depts.ts */}
        <nav aria-label="Categories">
          <H>Categories</H>
          <FooterCategories depts={DEPTS}/>
        </nav>
        {/* Contact */}
        <div>
          <H>Contact</H>
          <ul className="space-y-3 text-sm text-mute">
            <li>Заказ по номеру телефона</li>
            <li>Мы свяжемся с вами по номеру для подтверждения заказа</li>
            <li><FooterLogin/></li>
          </ul>
        </div>
      </div>

      {/* Katta L Vision */}
      <Reveal className="wm-wrap mt-16 flex justify-center md:mt-20">
        <p className="wm" aria-label="L Vision"><span className="wm-l" aria-hidden="true">L</span><span className="wm-t" aria-hidden="true">Vision</span></p>
      </Reveal>

      <div className="flex flex-col items-center justify-between gap-2 border-t border-line py-6 text-xs text-mute sm:flex-row">
        <p>© <Year/> L Vision by Inoshkins. Все права защищены.</p>
        <p>Одежда · Кольца · Цветы · Кофе</p>
      </div>
    </div>
  </footer>}

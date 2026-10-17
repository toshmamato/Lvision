import './globals.css';import type {ReactNode} from 'react';
export const metadata={
 title:{default:'L Vision by Inoshkins',template:'%s · L Vision by Inoshkins'},
 description:'L VISION BY INOSHKINS · MARRY ME · LV FLOWERS · COFE BY INOSHKINS',
 openGraph:{title:'L Vision by Inoshkins',description:'L VISION BY INOSHKINS · MARRY ME · LV FLOWERS · COFE BY INOSHKINS',siteName:'L Vision',type:'website' as const}
};
const themeJs=`try{var t=localStorage.getItem('lv-theme');document.documentElement.dataset.theme=t==='light'?'light':'dark'}catch(e){document.documentElement.dataset.theme='dark'}`;
const fonts='https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&family=Unbounded:wght@500;600;700&display=swap';
export default function Root({children}:{children:ReactNode}){
 return <html lang="ru" suppressHydrationWarning><head><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"/><link rel="preconnect" href="https://fonts.googleapis.com"/><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin=""/><link rel="stylesheet" href={fonts}/><script dangerouslySetInnerHTML={{__html:themeJs}}/></head><body className="font-sans antialiased">{children}</body></html>}

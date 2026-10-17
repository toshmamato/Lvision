export const fmt=(n:number)=>Math.round(+n).toLocaleString('ru-RU').replace(/\s/g,' ')+' сум';
export const disc=(p:{price:number;old_price:number|null})=>p.old_price?Math.round((1-p.price/p.old_price)*100):0;
export const tot=(s:Record<string,number>)=>Object.values(s||{}).reduce((a,b)=>a+b,0);

export type Promo={code:string;pct?:number|null;off?:number|null}|null;
export const DEL0={std:30000,exp:60000,free:500000};
export function totals(cart:{price:number;qty:number}[],promo:Promo,del=DEL0,method:'std'|'exp'='std'){const sub=cart.reduce((a,c)=>a+c.price*c.qty,0),d=promo?(promo.pct?Math.round(sub*promo.pct/100):Math.min(promo.off||0,sub)):0,dl=!sub?0:method==='exp'?del.exp:(sub-d>=del.free?0:del.std);return{sub,d,dl,t:sub-d+dl}}

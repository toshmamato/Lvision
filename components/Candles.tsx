/** Иллюстрация: свечи на сайте — оформление скидки, не реальная история цен. */
export default function Candles({seed,from,to}:{seed:number;from:number;to:number}){
 let s=seed*9301+49297;const r=()=>(s=(s*9301+49297)%233280)/233280,n=12,pt:number[]=[];
 for(let i=0;i<=n;i++)pt.push(from+(to-from)*i/n+(r()-.5)*from*.1);pt[0]=from;pt[n]=to;
 const mx=Math.max(...pt)*1.06,mn=Math.min(...pt)*.94,y=(v:number)=>100-(v-mn)/(mx-mn)*90-5;
 return <svg viewBox="0 0 260 110" className="w-full">{pt.slice(1).map((b,k)=>{const a=pt[k],hi=Math.max(a,b)+r()*from*.03,lo=Math.min(a,b)-r()*from*.03,x=(k+1)*19+4,c=b>=a?'#2fa36b':'#d64545';
  return <g key={k}><line x1={x} x2={x} y1={y(hi)} y2={y(lo)} stroke={c}/><rect x={x-5} width="10" y={y(Math.max(a,b))} height={Math.max(2,Math.abs(y(a)-y(b)))} fill={c}/></g>})}</svg>}

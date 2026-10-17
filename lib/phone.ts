export function normPhone(s:string){const d=String(s||'').replace(/\D/g,'');if(d.length===9)return '+998'+d;if(d.length===12&&d.startsWith('998'))return '+'+d;return null}

'use client';
import {create} from 'zustand';import {persist} from 'zustand/middleware';import type {Promo} from './totals';
export type Line={id:number;size:string;qty:number;name:string;price:number;dept:string;max:number};
export type User={phone:string;name:string}|null;
type S={cart:Line[];fav:number[];promo:Promo;open:boolean;user:User;loginOpen:boolean;searchOpen:boolean;add:(l:Line)=>void;qty:(id:number,size:string,d:number)=>void;rm:(id:number,size:string)=>void;clear:()=>void;toggleFav:(id:number)=>void;setPromo:(p:Promo)=>void;setOpen:(o:boolean)=>void;setUser:(u:User)=>void;setLogin:(o:boolean)=>void;setSearch:(o:boolean)=>void};
export const useStore=create<S>()(persist((set)=>({cart:[],fav:[],promo:null,open:false,user:null,loginOpen:false,searchOpen:false,
add:l=>set(s=>{const e=s.cart.find(c=>c.id==l.id&&c.size==l.size);return{open:true,cart:e?s.cart.map(c=>c===e?{...c,max:l.max,qty:Math.min(l.max,c.qty+l.qty)}:c):[...s.cart,{...l,qty:Math.min(l.max,l.qty)}]}}),
qty:(id,size,d)=>set(s=>({cart:s.cart.map(c=>c.id==id&&c.size==size?{...c,qty:Math.max(1,Math.min(c.max,c.qty+d))}:c)})),
rm:(id,size)=>set(s=>({cart:s.cart.filter(c=>!(c.id==id&&c.size==size))})),clear:()=>set({cart:[],promo:null}),
toggleFav:id=>set(s=>({fav:s.fav.includes(id)?s.fav.filter(x=>x!=id):[...s.fav,id]})),
setPromo:promo=>set({promo}),setOpen:open=>set({open}),setUser:user=>set({user}),setLogin:loginOpen=>set({loginOpen}),setSearch:searchOpen=>set({searchOpen})}),{name:'lv-store',partialize:s=>({cart:s.cart,fav:s.fav})}));

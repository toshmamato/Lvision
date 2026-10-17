import {useEffect,useState} from 'react';
export function useMounted(){const [m,s]=useState(false);useEffect(()=>{s(true)},[]);return m}

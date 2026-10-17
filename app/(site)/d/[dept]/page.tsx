import {redirect} from 'next/navigation';
export default function Old({params}:{params:{dept:string}}){redirect('/catalog?d='+params.dept)}

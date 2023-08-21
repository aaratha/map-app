import { FaSearchLocation } from 'react-icons/fa';
import {BiSearch} from 'react-icons/bi';
import {MdFilterNone} from 'react-icons/md';
import Link from 'next/link';

export default function Footer(userId: any) {
    console.log('userId:', userId);
    return (
        <div className="flex absolute bottom-3 flex-row p-3   w-screen justify-center">
            <Link href={{ pathname: '/search', query: { userId: userId } }}><button className='bg-white p-3  hover:scale-105 hover:shadow-md rounded-full border border-green-600 transition-all hover:border-white hover:bg-green-600 hover:text-white mr-[8rem] text-green-900 '><BiSearch className='scale-125' /></button></Link>
            <button className='bg-white p-3  hover:scale-105 hover:shadow-md rounded-full border border-green-600 transition-all hover:border-white hover:bg-green-600 hover:text-white text-green-900'><MdFilterNone className=' scale-125' /></button>
        </div>
    )
}
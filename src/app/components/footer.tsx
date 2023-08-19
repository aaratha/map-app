import { FaSearchLocation } from 'react-icons/fa';
import {BiSearch} from 'react-icons/bi';
import {MdFilterNone} from 'react-icons/md';

export default function Footer() {
    return (
        <div className="flex absolute bottom-3 flex-row p-3 pl-[8.4rem] pr-[8.4rem]  w-screen justify-between">
            <button className='bg-white p-3 hover:border-opacity-100 hover:scale-105 hover:shadow-md rounded-full border border-black border-opacity-25 transition-all'><BiSearch className='scale-125' /></button>
            <button className='bg-white p-3 hover:border-opacity-100 hover:scale-105 hover:shadow-md rounded-full border border-black border-opacity-25 transition-all'><MdFilterNone className=' scale-125' /></button>
        </div>
    )
}
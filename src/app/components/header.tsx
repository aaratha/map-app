import {GiHamburgerMenu} from 'react-icons/gi';
import Image from 'next/image';
import { useState } from 'react';

interface HeaderProps {
    userName: string;
    photo: string;
    handleMenuClick: () => void;
    toggleDropdown: () => void;
    dropdownToggle: boolean;
}

export default function Header({userName, photo, handleMenuClick, toggleDropdown}: HeaderProps) {
    return(
        <div className='w-screen p-2 pl-3 pr-3 flex flex-row justify-between border-b border-black border-opacity-25 items-center shadow-md h-[7vh] z-20'>
            <button className='border border-black border-opacity-0 hover:border-opacity-100 bg-green-600 p-3 pl-4 pr-4 rounded-lg hover:scale-105 hover:shadow-md transition-all ' onClick={handleMenuClick}>
                <GiHamburgerMenu className='scale-125 text-white' />
            </button>
            <h1 className='text-xl'>PinIt!</h1>
            <div onClick={toggleDropdown} className='flex cursor-pointer flex-row items-center border border-black border-opacity-0 rounded-lg p-1 pl-2 pr-2 transition-all hover:border-opacity-100 hover:scale-105 hover:shadow-md bg-green-600 bg-opacity-50'>
                <h2 className='text-md mr-2'>{userName}</h2>
                <Image src={photo} className='rounded-full border border-black' alt='pfp' width='32' height='32' />
            </div>
        </div>
    )
}
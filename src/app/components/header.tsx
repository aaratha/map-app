import {GiHamburgerMenu} from 'react-icons/gi';
import Image from 'next/image';

interface HeaderProps {
    userName: string;
    photo: string;
    handleMenuClick: () => void;
}

export default function Header({userName, photo, handleMenuClick}: HeaderProps) {
    return(
        <div className='w-screen p-2 pl-3 pr-3 flex flex-row justify-between border-b border-black border-opacity-25 items-center'>
            <button className='border border-black border-opacity-25 p-2 pl-3 pr-3 rounded-lg hover:scale-105 hover:shadow-md transition-all hover:border-opacity-100' onClick={handleMenuClick}>
                <GiHamburgerMenu className='scale-125' />
            </button>
            <h1 className='text-xl'>PinIt!</h1>
            <div className='flex flex-row items-center border border-black border-opacity-25 rounded-lg p-1 pl-2 pr-2 inner-shadow transition-all hover:border-opacity-100'>
                <h2 className='text-md mr-2'>{userName}</h2>
                <Image src={photo} className='rounded-full' alt='pfp' width='32' height='32' />
            </div>
        </div>
    )
}
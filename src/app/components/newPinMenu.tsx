'use client'
import {BsFillHouseAddFill} from 'react-icons/bs';
import { MdAddLocationAlt } from 'react-icons/md';
import { useEffect, useRef } from 'react';

export default function NewPinMenu({toggleNewPinMenu, newPinMenuToggle, clickPinToggle, toggleClickPin}: any) {
    const menuRef = useRef<HTMLDivElement>(null);
    function locationToggle() {
        toggleClickPin();
        toggleNewPinMenu();
    }
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (newPinMenuToggle && menuRef.current && !menuRef.current.contains(event.target as Node)) {
                toggleNewPinMenu();
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuRef, toggleNewPinMenu, newPinMenuToggle]);
    return (
        <div ref={menuRef} className={`bg-white justify-center items-center flex flex-col absolute w-[20rem] h-[30vh] bottom-[20rem] overflow-hidden rounded-lg pin-menu ${newPinMenuToggle ? 'pin-menu-open' : ''} ${newPinMenuToggle ? 'border' : ''} shadow-md  border-green-600`}>
            <h1 className='text-center text-green-700 text-xl mb-3'>Add a Pin</h1>
            <div className="text-white flex justify-between items-center w-[14rem] flex-row">
                <button className="items-center justify-center flex flex-col p-4 w-[6rem] flex-wrap rounded-full h-[6rem] bg-green-600 hover:scale-105 hover:shadow-md transition-all">
                    <BsFillHouseAddFill className='text-white' style={{ transform: 'scale(2.0)' }} />
                    <p className='mt-2'>Address</p>
                </button>
                <button onClick={locationToggle} className="items-center justify-center flex flex-col p-4 w-[6rem] flex-wrap rounded-full h-[6rem] bg-green-600 hover:scale-105 hover:shadow-md transition-all">
                    <MdAddLocationAlt className='text-white' style={{ transform: 'scale(2.2)' }} />
                    <p className='mt-2'>Location</p>
                </button>
            </div>
        </div>
    )
}
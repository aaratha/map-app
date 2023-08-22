import React, { useEffect, useRef } from 'react';

export default function PinMenu({ userId, photo, pinData, togglePinMenu, pinMenuToggle }: any ): any {
    const menuRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (pinMenuToggle && menuRef.current && !menuRef.current.contains(event.target as Node)) {
                togglePinMenu();
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuRef, togglePinMenu, pinMenuToggle]);
    const lngLatString = pinData ? `${pinData.lngLat.lng}, ${pinData.lngLat.lat}` : '';
    return(
        <div ref={menuRef} className={`shadow-md flex flex-col flex-wrap w-[20rem] rounded-lg absolute overflow-hidden bg-white top-[20rem] border-green-600 pin-menu ${pinMenuToggle ? 'pin-menu-open' : ''} ${pinMenuToggle ? 'border' : ''}`}>
            <h1 className='text-center mt-5 mb-2 text-xl'>Pin Menu</h1>
            <h2 className='pl-4 pr-4 text-center'>{lngLatString}</h2>
        </div>
    )
}
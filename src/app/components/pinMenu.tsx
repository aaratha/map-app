import React, { useEffect, useRef, useState } from 'react';
import { getDatabase, ref, set, get } from "firebase/database";

export default function PinMenu({ userId, pinData, togglePinMenu, pinMenuToggle, app }: any ): any {
    const db = getDatabase(app);
    const menuRef = useRef<HTMLDivElement>(null);
    const { title, description, latitude, longitude, creator } = pinData || {};
    const lngLatString = latitude && longitude ? `${longitude}, ${latitude}` : '';
    const [creatorData, setCreatorData] = useState<any>({});
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
    const userRef = ref(db, `users/${creator}`);
    get(userRef).then((snapshot) => {
        if (snapshot.exists()) {
            setCreatorData(snapshot.val());
        }
    });
    return(
        <div ref={menuRef} className={`shadow-md  flex-wrap w-[20rem] rounded-lg absolute overflow-hidden bg-white text-black top-[20rem] border-green-600 pin-menu ${pinMenuToggle ? 'pin-menu-open' : ''} ${pinMenuToggle ? 'border' : ''}`}>
            <h1 className='text-green-600 text-center mt-5 mb-2 text-xl'>Pin Menu</h1>
            <div className='flex flex-row justify-center'>
                <img src={creatorData.photo} className='w-[3rem] rounded-full'></img>
                <div className='flex flex-col ml-2'>
                    <h2 className='text-xl text-left'>{title}</h2>
                    <p className=''>{description}</p>
                </div>
            </div>

            <p className='text-center mt-3 text-sm pl-4 pr-4'>{lngLatString}</p>
        </div>
    )
}
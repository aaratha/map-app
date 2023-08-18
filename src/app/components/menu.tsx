import {useEffect, useRef} from 'react';
interface menuProps {
    menuToggle: boolean;
    handleMenuClick: () => void;
}

export default function Menu({menuToggle, handleMenuClick}: menuProps) {
    const menuRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuToggle && menuRef.current && !menuRef.current.contains(event.target as Node)) {
                handleMenuClick();
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuRef, handleMenuClick, menuToggle]);
    return(
        <div ref={menuRef} className={`menu ${menuToggle ? 'menu-open' : ''} bg-white h-screen z-40 overflow-hidden`}>
            <div className="h-full w-full flex flex-col">
                <h1 className="text-2xl m-4">Menu</h1>
                <button className='border-b border-t border-black border-opacity-25 p-2 hover:border-opacity-100 hover:shadow-md transition-all'>Pins</button>
                <button onClick={handleMenuClick} className=" m-4 mt-auto border border-black border-opacity-25 p-2 text-lg hover:scale-105 hover:border-opacity-100 hover:shadow-md rounded-lg transition-all">Close</button>
            </div>
        </div>
    )
}
import { signOut } from "firebase/auth";
import { useEffect, useRef } from "react";

interface AccountMenuProps {
    toggleDropdown: () => void;
    dropdownToggle: boolean;
    handleSignOut: () => void;
}

export default function AccountMenu({ toggleDropdown, dropdownToggle, handleSignOut }: AccountMenuProps) {
    const menuRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownToggle && menuRef.current && !menuRef.current.contains(event.target as Node)) {
                toggleDropdown();
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuRef, toggleDropdown, dropdownToggle]);
    return (
        <div ref={menuRef} className={`flex flex-col bg-white dropdown overflow-hidden w-[12rem] rounded-b-lg shadow-md ${dropdownToggle ? 'dropdown-open' : ''}`}>
            <button onClick={handleSignOut} className="border border-black border-opacity-25 hover:scale-105 hover:border-opacity-100 hover:shadow-md p-2 mt-auto m-4 rounded-lg">Sign Out</button>
        </div>
    )
}
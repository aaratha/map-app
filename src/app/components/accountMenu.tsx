import { signOut } from "firebase/auth";
import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

interface AccountMenuProps {
    toggleDropdown: () => void;
    dropdownToggle: boolean;
    handleSignOut: () => void;
    userId?: string;
    photo?: string;
    userName?: string;
}

export default function AccountMenu({ toggleDropdown, dropdownToggle, handleSignOut, userId, photo, userName }: AccountMenuProps) {
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
        <div ref={menuRef} className={`flex flex-col bg-white dropdown overflow-hidden w-[100vw] rounded-b-lg text-center shadow-md ${dropdownToggle ? 'dropdown-open' : ''}`}>
            <Link href={{ pathname: '/profile', query: { userId: userId, photo: photo, userName: userName } }} className="flex w-full">
                <button className="transition-all border w-full border-black border-opacity-25 hover:border-opacity-100 hover:shadow-md p-3 m-4 mr-10 ml-10 rounded-lg mt-10 hover:bg-gray-100">Profile</button>
            </Link>
            <button onClick={handleSignOut} className="transition-all border border-black border-opacity-25 hover:scale-105 hover:border-opacity-100 hover:shadow-md p-2 mt-auto m-4 mr-20 ml-20 rounded-lg">Sign Out</button>
        </div>
    )
}
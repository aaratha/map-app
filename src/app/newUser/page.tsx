'use client'

import { useSearchParams } from 'next/navigation';
import { AiOutlineUser } from 'react-icons/ai';
import {AiOutlineSend} from 'react-icons/ai';
import { useState } from 'react';
import firebase from 'firebase/compat/app';
import { get, getDatabase, ref, set, update } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAJ13n_qfW5v4ws-keFWrrSdUrmBIHiE3E",
    authDomain: "pinit-395820.firebaseapp.com",
    databaseURL: "https://pinit-395820-default-rtdb.firebaseio.com",
    projectId: "pinit-395820",
    storageBucket: "pinit-395820.appspot.com",
    messagingSenderId: "208054352398",
    appId: "1:208054352398:web:df614c9bfe3db0b2725a5f",
    measurementId: "G-9XEVK3TKWK"
};

const app = firebase.initializeApp(firebaseConfig);

export default function newUser() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const searchParams = useSearchParams()
    const userId = searchParams.get('uid')
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [username, setUsername] = useState('');
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        console.log('submitted')
        e.preventDefault();
        console.log(username)
        const db = getDatabase();
        set(ref(db, `users/${userId}/username`), username.toLowerCase());
        window.location.href = `/`;
    }
    return (
        <div className='text-black flex flex-col bg-white h-[100vh] w-screen items-center justify-center content-center center'>
            <div className='flex flex-col items-center'>
                <h1 className='text-center text-2xl'>Create Username</h1>
                <form className='flex flex-row mt-10' onSubmit={handleSubmit}>
                    <div className='flex flex-row border border-green-600 rounded-lg overflow-hidden w-full'>
                        <AiOutlineUser className='ml-3 m-auto text-green-600' />
                        <input className='p-2 ml-1 w-full focus:outline-none' placeholder='Enter username...' value={username} onChange={(event) => setUsername(event.target.value)} />
                    </div>
                    <button type='submit' className='ml-2 w-[2.9rem] h-[2.5rem] bg-green-600 flex  rounded-full text-white hover:scale-105 hover:shadow-md transition-all'><AiOutlineSend className='m-auto' /></button>
                </form>
            </div>
        </div>
    )
}
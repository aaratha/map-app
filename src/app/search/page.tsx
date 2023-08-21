/* eslint-disable @next/next/no-img-element */
'use client'

import {BiSearch} from 'react-icons/bi';
import {BiArrowBack} from 'react-icons/bi';
import { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import { get, getDatabase, ref, orderByChild, query, equalTo, startAt, set, update } from "firebase/database";
import { useSearchParams } from 'next/navigation';

interface SearchResult {
    id: string;
    username: string;
    photo: string;
    name: string;
}

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
const db = getDatabase();
const usersRef = ref(db, 'users');

export default function Search() {
    const searchParams = useSearchParams()
    const userId = searchParams.get('userId')
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<SearchResult[]>([])
    useEffect(() => {
        const fetchSearchResults = async () => {
            console.log('Fetching search results for query:', searchQuery);
            const usernameQuery = searchQuery ? query(usersRef, orderByChild('username'), startAt(searchQuery)) : query(usersRef, orderByChild('username'));
            console.log('Username query:', usernameQuery);
            const snapshot = await get(usernameQuery);
            console.log('Snapshot:', snapshot);
            const results: SearchResult[] = [];
            snapshot.forEach((childSnapshot) => {
                const user = childSnapshot.val();
                results.push({ id: childSnapshot.key, username: user.username, photo: user.photo, name: user.name });
            });
            console.log('Search results:', results);
            setSearchResults(results);
        };
        if (searchQuery) {
            fetchSearchResults();
        } else {
            setSearchResults([]);
        }
    }, [searchQuery]);

    function handleClick(friendId: string, userId: string) {
        const userRef = ref(db, `users/${userId}`);
        update(userRef, {
            friends: {
                [friendId]: true,
            },
        });
    }
    return (
        <div className='bg-white h-[100vh] w-screen text-black flex flex-col'>
            <div className='flex flex-row w-screen'>
            <a href='/' className='flex w-[3.6rem]'>
                <button className='border border-black border-opacity-0 bg-green-600 text-white m-4 mt-7 mr-0 rounded-full w-[3.2rem] flex content-center items-center justify-center hover:border-opacity-100 hover:scale-105 hover:shadow-md transition-all'>
                <BiArrowBack className='scale-150' />
                </button>
            </a>
            <div className='w-full flex flex-row border border-green-600 rounded-lg p-2 pl-3 m-4 mt-7 items-center hover:border-opacity-100 transition-all'>
                <BiSearch className='scale-125 mr-3' />
                <input
                placeholder='Search'
                className='w-full focus:outline-none'
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                />
            </div>
            </div>
            <div className='flex flex-col text-black'>
            {searchResults.map((result) => (
                <button key={result.id} className='m-2 ml-5 mr-5 border-green-600 border-opacity-50 hover:border-opacity-100 hover:shadow-md transition-all p-3 border-t border-b hover:border hover:rounded-lg flex flex-row pl-8'>
                    <img src={result.photo} alt='pfp' className='w-[3rem] rounded-full' ></img>
                    <div className='flex flex-col ml-3 items-start'>
                        <p className='text-lg'>{result.username}</p>
                        <p className='text-sm text-black text-opacity-50'>{result.name}</p>
                    </div>
                </button>
            ))}
            </div>
        </div>
    );
}
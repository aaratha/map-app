'use client'

import Image from 'next/image'
import SimpleMap from './components/map'

import { v4 as uuidv4 } from 'uuid';

import { useState, useEffect } from 'react';
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
import { StyledFirebaseAuth } from 'react-firebaseui';
require('firebase/auth');
import { get, getDatabase, ref, set, update } from "firebase/database";


function writeUserData(userId: string, name: string, email: string, photo: string) {
  const db = getDatabase();
  set(ref(db, 'users/' + userId), {
    name: name,
    email: email,
    photo: photo,
  });
  console.log('user added: ' + `${userId}`)
}

async function checkUserExists(userId: string): Promise<boolean> {
  const db = getDatabase();
  const userRef = ref(db, `users/${userId}`);
  const snapshot = await get(userRef);
  console.log('snapshot:', snapshot);
  console.log('user exists: ' + snapshot.exists());
  return snapshot.exists();
}

const checkUserAndWriteData = async () => {
  const userExists = await checkUserExists(firebase.auth().currentUser?.uid ?? '');
  if (!userExists) { writeUserData(
    firebase.auth().currentUser?.uid ?? '',
    firebase.auth().currentUser?.displayName ?? '',
    firebase.auth().currentUser?.email ?? '',
    firebase.auth().currentUser?.photoURL ?? '');
  }
};

async function updatePins(userId: string, lngLat: any[]) {
  const db = getDatabase();
  const userRef = ref(db, `users/${userId}`);
  const snapshot = await get(userRef);
  const existingPins = snapshot.val()?.pins || [];
  const existingPinIds = existingPins.map((pin: any) => pin.pinId);
  const newPins = lngLat.map((lngLatItem: any) => {
    const newPinId = uuidv4();
    return { pinId: newPinId, lngLat: lngLatItem, creator: userId };
  }).filter((pin: any) => !existingPinIds.includes(pin.pinId));
  update(userRef, { pins: existingPins.concat(newPins) });
  console.log('pins updated: ' + JSON.stringify(existingPins.concat(newPins)));
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
// const analytics = getAnalytics(app);

const db = getDatabase(app);

export default function Home() {
  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      GoogleAuthProvider.PROVIDER_ID,
      FacebookAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false,
    },
  };

  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      setIsSignedIn(!!user);
    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  const [markers, setMarkers] = useState<mapboxgl.Marker[]>([]);

  const updateMarkers = (newMarker: mapboxgl.Marker) => {
    const markerExists = markers.some((marker) => {
      const lngLat = marker.getLngLat();
      return lngLat.lng === newMarker.getLngLat().lng && lngLat.lat === newMarker.getLngLat().lat;
    });
    if (!markerExists) {
      setMarkers([...markers, newMarker]);
      updatePins(firebase.auth().currentUser?.uid ?? '', [newMarker.getLngLat()]);
    }
  };

  useEffect(() => {
    console.log(markers);
  }, [markers]);

  if (!isSignedIn) {
    const auth = getAuth(app);
    return (
      <main className="flex text-black min-h-screen flex-col items-center bg-gradient-to-b from-gray-200 to-gray-300">
        <div>
          <p>Please sign-in:</p>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
        </div>
      </main>
    );
  }
  const auth = getAuth(app);
  const userId = firebase.auth().currentUser?.uid
  const photo = firebase.auth().currentUser?.photoURL
  checkUserAndWriteData();
  return (
    <main className="flex text-black min-h-screen flex-col items-center bg-white">
      <div className='flex flex-row p-5 pb-0 mb-0 w-full'>
        <p>Welcome {firebase.auth().currentUser?.displayName ?? 'User'}! You are now signed-in!</p>
      </div>
      <div>
        <h1 className='text-4xl mt-5 mb-5 border border-black border-opacity-25 p-1 rounded-lg'>Pin It!</h1>
      </div>
      <SimpleMap updateMarkers={updateMarkers} userId={userId} photo={photo} />
      <a className='border border-black border-opacity-25 p-2 mt-4 hover:bg-black hover:text-white rounded-full transition-all' onClick={() => firebase.auth()?.signOut()}><button>Sign-out</button></a>
    </main>
  );
}

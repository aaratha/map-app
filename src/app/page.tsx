'use client'

import Image from 'next/image'
import SimpleMap from './components/map'
import Header from './components/header'
import Menu from './components/menu'
import AccountMenu from './components/accountMenu'
import PinMenu from './components/pinMenu'
import Profile from './profile/page'
import Footer from './components/footer'
import PlusSign from './components/plusSign'

import { v4 as uuidv4 } from 'uuid';

import { useState, useEffect } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/router'

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

async function checkUserAndWriteData(): Promise<void> {
  const userExists = await checkUserExists(firebase.auth().currentUser?.uid ?? '');
  if (!userExists) { 
    const uid = firebase.auth().currentUser?.uid ?? '';
    writeUserData(
      uid,
      firebase.auth().currentUser?.displayName ?? '',
      firebase.auth().currentUser?.email ?? '',
      firebase.auth().currentUser?.photoURL ?? ''
    );
    window.location.href = `/newUser?uid=${uid}`;
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
  const [exportData, setExportData] = useState<{ id: string, title: string, description: string, latitude: number, longitude: number } | null>(null); 
  const [pinMenuToggle, setPinMenuToggle] = useState(false);

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

  const [menuToggle, setMenuToggle] = useState(false);
  function handleMenuClick() {
    setMenuToggle(!menuToggle);
    console.log(menuToggle)
  }
  const [dropdownToggle, setDropdownToggle] = useState(false);
    function toggleDropdown() {
      setDropdownToggle(!dropdownToggle);
  }
  function handleSignOut() {
    firebase.auth()?.signOut()
  }
  useEffect(() => {
    console.log(markers);
  }, [markers]);

  const [clickPinToggle, setClickPinToggle] = useState(false);
  function toggleClickPin() {
    setClickPinToggle(!clickPinToggle);
  }
  
  if (!isSignedIn) {
    const auth = getAuth(app);
    return (
      <main className="flex text-black h-[100vh] flex-col items-center bg-white">
        <div className='flex flex-col border m-auto p-10 border-green-600 shadow-md rounded-lg'>
          <p className='text-center text-xl'>Please sign-in:</p>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
        </div>
      </main>
    );
  }
  const auth = getAuth(app);
  const userName = firebase.auth().currentUser?.displayName
  const userId = firebase.auth().currentUser?.uid
  const photo = firebase.auth().currentUser?.photoURL
  const handlePinClick = (pinData: any) => {
    // setExportData({
    //   id: pinData.id,
    //   title: pinData.title,
    //   description: pinData.description,
    //   latitude: pinData._lngLat.lat,
    //   longitude: pinData._lngLat.lng
    // });
    setPinMenuToggle(true);
    console.log(pinData._lngLat);
  }
  checkUserAndWriteData();
  return (
    <main className="flex text-black flex-col items-center bg-white transition-all">
      <div className={` absolute origin-left  z-30 left-0  h-full shadow-lg`}>
        <Menu menuToggle={menuToggle} handleMenuClick={handleMenuClick} />
      </div>
      <Header userName={userName ?? ''} photo={photo ?? ''} handleMenuClick={handleMenuClick} toggleDropdown={toggleDropdown} dropdownToggle={dropdownToggle}/>
      <SimpleMap updateMarkers={updateMarkers} userId={userId} photo={photo} handlePinClick={handlePinClick} toggleClickPin={toggleClickPin} clickPinToggle={clickPinToggle} />
      {pinMenuToggle && <PinMenu pinData={exportData} />}
      <div className={`absolute right-0 top-14 z-10`}>
        <AccountMenu toggleDropdown={toggleDropdown} dropdownToggle={dropdownToggle} handleSignOut={handleSignOut} userId={userId} userName={userName ?? ''} photo={photo ?? ''} />
      </div>
      <Footer userId={userId} />
      <PlusSign toggleClickPin={toggleClickPin} clickPinToggle={clickPinToggle} />
    </main>
  );
}

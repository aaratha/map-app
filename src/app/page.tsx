'use client'

import Image from 'next/image'
import SimpleMap from './components/map'

import { useState, useEffect } from 'react';
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
import { StyledFirebaseAuth } from 'react-firebaseui';
require('firebase/auth');

const provider = new GoogleAuthProvider();

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
const analytics = getAnalytics(app);


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
  return (
    <main className="flex text-black min-h-screen flex-col items-center bg-gradient-to-b from-gray-200 to-gray-300">
      <p>Welcome {firebase.auth().currentUser?.displayName ?? 'User'}! You are now signed-in!</p>
      <div>
        <h1 className='text-4xl mt-10 mb-10'>Pin It!</h1>
      </div>
      <SimpleMap />
      <a onClick={() => firebase.auth()?.signOut()}>Sign-out</a>
    </main>
  );
}

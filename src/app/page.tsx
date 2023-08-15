'use client'

import Image from 'next/image'
import SimpleMap from './components/map'

import { useState } from 'react';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, AuthUI } from 'firebase/auth';
import firebase from '@firebase/app';
import firebaseui from 'firebaseui';
require('firebase/auth')

const provider = new GoogleAuthProvider();
var ui = new AuthUI(firebase.auth());

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

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export function SignIn():any {
  ui.start('#firebaseui-auth-container', {
    signInOptions: [
      // List of OAuth providers supported.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult: function(authResult: any, redirectUrl: any) {
        // User successfully signed in.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        return true;
      },
    },
    // Other config options...
  });

  return (
      <div>
          <div id="firebaseui-auth-container"></div>
          <div id="loader">Loading...</div>
      </div>
  )
}

export default function Home() {
  
  const [user] = useState(() => auth.currentUser);

  return (
    <main className="flex text-black min-h-screen flex-col items-center bg-gradient-to-b from-gray-200 to-gray-300">
      <div>
        <h1 className='text-4xl mt-10 mb-10'>Pin It!</h1>
      </div>
      {user ? <SimpleMap /> : <SignIn />}
    </main>
  )
}

import 'firebase/auth'
import { getAuth } from '@firebase/auth'
import { initializeApp } from '@firebase/app'


const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: "mofecoder.appspot.com",
  messagingSenderId: "778668750055",
  appId: "1:778668750055:web:acbd40d09bdefc2c919e42",
  measurementId: "G-0MDYJG5Y6M"
};

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)

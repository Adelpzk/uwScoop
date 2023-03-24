import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN_KEY,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID_KEY,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET_KEY,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID_KEY,
  appId: process.env.REACT_APP_FIREBASE_APP_ID_KEY,
});

export const auth = app.auth();
export default app;

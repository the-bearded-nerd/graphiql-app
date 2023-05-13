import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCaFnbdLBV9uzBcxoJusuQuT_08NEYv17U',
  authDomain: 'graphiql-clone-app-956fe.firebaseapp.com',
  projectId: 'graphiql-clone-app-956fe',
  storageBucket: 'graphiql-clone-app-956fe.appspot.com',
  messagingSenderId: '342771510718',
  appId: '1:342771510718:web:b606dab22cf865c3291def',
  measurementId: 'G-2LCM9GPDXV',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app);

export const registerWithEmailAndPassword = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      name,
      authProvider: 'local',
      email,
    });
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
      alert(err.message);
    }
  }
};

export const logInWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
      alert(err.message);
    }
  }
};

export const sendPasswordReset = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert('Password reset link sent!');
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
      alert(err.message);
    }
  }
};

export const logout = () => {
  signOut(auth);
  console.log('logout complete');
  console.log('Auth', auth);
};

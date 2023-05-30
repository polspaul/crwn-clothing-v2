import { initializeApp } from 'firebase/app';
import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
	createUserWithEmailAndPassword
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyA7XLHbNREl3pDqxVNeLIc7_NCM3vRJnBY',
	authDomain: 'crwn-clothing-db-c8648.firebaseapp.com',
	projectId: 'crwn-clothing-db-c8648',
	storageBucket: 'crwn-clothing-db-c8648.appspot.com',
	messagingSenderId: '923622554435',
	appId: '1:923622554435:web:cd742f01756c27991ecdf6'
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
	prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => {
	return signInWithPopup(auth, provider);
};

export const signInWithGoogleRedirect = () => {
	return signInWithRedirect(auth, provider);
};

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInfo) => {
	const userDocRef = doc(db, 'users', userAuth.uid);

	const userSnapshot = await getDoc(userDocRef);

	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
				...additionalInfo
			});
		} catch (error) {
			console.log('error creating user', error.message);
		}
	}

	return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;

	return await createUserWithEmailAndPassword(auth, email, password);
};

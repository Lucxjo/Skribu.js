/** @format */

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FB_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_FB_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_FB_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_FB_STORAGE,
	messagingSenderId: process.env.NEXT_PUBLIC_FB_SENDER,
	appId: process.env.NEXT_PUBLIC_FB_APP_ID,
};

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const firestore = firebase.firestore();
export const storage = firebase.storage();

// Helper functions

/**
 * Gets a users/{uid} document with username
 * @param {string} username
 */
export async function getUserWithUsername(username: string) {
	const usersRef = firestore.collection('users');
	const query = usersRef.where('username', '==', username).limit(1);
	const userDoc = (await query.get()).docs[0];
	return userDoc;
}

/**
 * Converts a Firestore document to JSON
 * @param {firebase.firestore.DocumentSnapshot} doc Document reference
 */
export function postToJson(doc: firebase.firestore.DocumentSnapshot) {
	const data = doc.data();
	return {
		...data,
		createdAt: data?.createdAt.toMillis(),
		updatedAt: data?.updatedAt.toMillis(),
	};
}

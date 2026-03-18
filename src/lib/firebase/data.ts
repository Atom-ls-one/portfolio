import { db } from './config';
import { doc, getDoc, setDoc, collection, getDocs, deleteDoc } from 'firebase/firestore';
import { i18n } from '../i18n.svelte';

export async function fetchRemoteDict() {
	const docRef = doc(db, 'settings', 'i18n');
	const docSnap = await getDoc(docRef);
	if (docSnap.exists()) {
		return docSnap.data();
	}
	return null;
}

export async function saveRemoteDict(data: any) {
	const docRef = doc(db, 'settings', 'i18n');
	await setDoc(docRef, data);
}

export async function fetchRemoteMatches() {
	const querySnapshot = await getDocs(collection(db, 'matches'));
	return querySnapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function saveMatch(match: any) {
	const docRef = doc(collection(db, 'matches'), match.id || undefined);
	await setDoc(docRef, match);
}

export async function deleteMatch(id: string) {
	await deleteDoc(doc(db, 'matches', id));
}

// Helper to push original local data to Firestore for first time setup
export async function syncLocalToRemote() {
	await saveRemoteDict(i18n.all);
}

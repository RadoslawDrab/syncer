import { FirebaseOptions, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase, ref, get, child, remove, update, set } from 'firebase/database'
const firebaseConfig = require('../../../firebase') as FirebaseOptions

export const config = firebaseConfig
const app = initializeApp(firebaseConfig)
export default app
export const auth = getAuth(app)
export const dbRef = ref(getDatabase(app, 'https://syncer-d8d4f-default-rtdb.europe-west1.firebasedatabase.app'))

export async function removeData(path: string = '/') {
	return await remove(child(dbRef, path))
}
export async function getData(path: string = '/') {
	return await get(child(dbRef, path))
}
export async function updateData<T extends object>(path: string = '/', data: T) {
	return await update(child(dbRef, path), data)
}
export async function setData<T extends object>(path: string = '/', data: T) {
	return await set(child(dbRef, path), data)
}

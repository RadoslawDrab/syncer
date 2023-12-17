import { FirebaseOptions, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase, ref, get, child, remove, update, set } from 'firebase/database'
const firebaseConfig = require('../../../firebase') as FirebaseOptions

export const config = firebaseConfig
const app = initializeApp(firebaseConfig)
export default app
export const auth = getAuth(app)
export const dbRef = ref(getDatabase(app, 'https://syncer-d8d4f-default-rtdb.europe-west1.firebasedatabase.app'))

export function removeData(path: string = '/') {
	return remove(child(dbRef, path))
}
export function getData(path: string = '/') {
	return get(child(dbRef, path))
}
export function updateData<T extends object>(path: string = '/', data: T) {
	return update(child(dbRef, path), data)
}
export function setData<T extends object>(path: string = '/', data: T) {
	return set(child(dbRef, path), data)
}

import { User, getAuth, signInWithCustomToken } from 'firebase/auth'
import 'dotenv/config'

import app from './admin'

import { Status } from 'src/types/server'
import { User as DBUser } from 'src/types/database'

const auth = getAuth()

/**
 * @param {string} idToken idToken from FirebaseSDK
 * @returns {string} JWT custom token for authorization
 */
export function getJwtToken(idToken: string): Promise<string> {
	return new Promise<string>(async (resolve, reject: (status: Status) => void) => {
		try {
			const idTokenResult = await app.auth().verifyIdToken(idToken, true)
			const customToken = app.auth().createCustomToken(idTokenResult.uid)
			resolve(customToken)
		} catch (error) {
			reject({
				code: 400,
				message: error.message || 'Bad request'
			})
		}
	})
}

/**
 * @param {string} token Custom JWT token
 * @returns {User} User from Firebase SDK selected with token
 */
export function getUser(token: string): Promise<User> {
	return new Promise(async (resolve, reject: (status: Status) => void) => {
		try {
			// Gets user's credentials
			const credentials = await signInWithCustomToken(auth, token)
			const user = credentials.user

			const userRef = app.database().ref(`users/${user.uid}`)

			// Creates user in database if they don't exists
			if (!(await userRef.get()).exists()) {
				const dbUser: DBUser = {
					id: user.uid,
					name: user.displayName || 'User',
					songIds: [],
					playlistIds: []
				}
				await userRef.set(dbUser)
			}

			// Resolves user
			resolve(user)
		} catch (error) {
			reject({
				code: 400,
				message: error.message || 'Bad token'
			})
		}
	})
}

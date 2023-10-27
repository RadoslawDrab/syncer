import { User, getAuth, signInWithCustomToken } from 'firebase/auth'
import 'dotenv/config'

import app from './admin'

import { Status } from 'src/types/server'

const auth = getAuth()
export function getJwtToken(idToken: string): Promise<string> {
	return new Promise<string>(async (resolve, reject: (status: Status) => void) => {
		try {
			const idTokenResult = await app.auth().verifyIdToken(idToken, true)
			const customToken = app.auth().createCustomToken(idTokenResult.uid)
			resolve(customToken)
		} catch (error) {
			reject({
				code: error.code || 400,
				message: error.message || 'Bad request'
			})
		}
	})
}

export function getUser(token: string): Promise<User> {
	return new Promise(async (resolve, reject: (status: Status) => void) => {
		// Gets user's credentials
		const credentials = await signInWithCustomToken(auth, token).catch(async () => {
			// If fails it tries to get JWT token and sign in again. Otherwise rejects promise
			try {
				const jwtToken = await getJwtToken(token)
				return await signInWithCustomToken(auth, jwtToken)
			} catch (error) {
				reject({
					code: 400,
					message: 'Bad token',
					...error
				})
			}
		})
		// Resolves user
		if (credentials) {
			resolve(credentials.user)
		}
	})
}

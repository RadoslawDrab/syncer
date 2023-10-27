import admin, { ServiceAccount } from 'firebase-admin'

const serviceAccount: ServiceAccount = JSON.parse(Buffer.from(process.env.SERVICE_ACCOUNT || '', 'base64').toString())

const adminApp = admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: 'https://syncer-d8d4f-default-rtdb.europe-west1.firebasedatabase.app'
})

export default adminApp

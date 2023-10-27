import { FirebaseOptions, initializeApp } from 'firebase/app'
const firebaseConfig = require('../../../firebase') as FirebaseOptions

export const config = firebaseConfig
initializeApp(firebaseConfig)

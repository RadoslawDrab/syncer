import express from 'express'
import { initializeApp } from '@firebase/app'
import cors from 'cors'

import { config } from 'src/auth/firebase'
import userRouter from 'routers/users'
import songsRouter from 'routers/songs'
import playlistsRouter from 'routers/playlists'

const app = express()
const port = process.env['PORT'] || 3000

initializeApp(config)

app.use(cors())
app.use('/users', userRouter)
app.use('/songs', songsRouter)
app.use('/playlists', playlistsRouter)

app.listen(port, () => {
	console.clear()
	console.log(`Listening on http://localhost:${port}`)
})

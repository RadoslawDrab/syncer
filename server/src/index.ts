import express from 'express'

import userRouter from 'routers/users'
import songsRouter from 'routers/songs'
import playlistsRouter from 'routers/playlists'

const app = express()
const port = process.env['PORT'] || 3000

app.use('/users', userRouter)
app.use('/songs', songsRouter)
app.use('/playlists', playlistsRouter)

app.listen(port, () => {
	console.clear()
	console.log(`Listening on http://localhost:${port}`)
})

import express from 'express'

import userRouter from 'routers/users'
import songsRouter from 'routers/songs'

const app = express()
const port = process.env['PORT'] || 3000

app.use('/users', userRouter)
app.use('/songs', songsRouter)

app.listen(port, () => {
	console.clear()
	console.log(`Listening on http://localhost:${port}`)
})

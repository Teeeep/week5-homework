const express = require('express')
const authorizationRouter = require('./src/auth/routes')
const bodyParser = require('body-parser')
const usersRouter = require('./src/users/routes')
const playlistsRouter = require('./src/playlists/routes')
const songsRouter = require('./src/songs/routes')

const app = express()
const port = process.env.PORT || 4001

app
    .use(bodyParser.json())
    .use(authorizationRouter)
    .use(playlistsRouter)
    .use(usersRouter)
    .use(songsRouter)
    .listen(port, () => console.log(`Express API listening on port ${port}`))
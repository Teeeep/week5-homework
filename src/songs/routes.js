const { Router } = require('express')
const Song = require('./model')
const Playlist = require('../playlists/model')

const router = new Router()

router.post('/playlists/:id/songs', (req, res) => {
    const id = req.params.id
        
        Playlist
            .findByPk(id)
        Song
            .create({ 
                ...req.body, 
                playlistId: id })
            .then(song => {
                if (!song) {
                    return res.status(404).send({
                    message: `Not found`
                })
            }
            return res.status(201).send(song)
            })
            .catch(error => next(error))
})

router.delete('/playlists/:playlistId/songs/:songId', (req, res) => {
    const playlistId = req.params.playlistId
    const songId = req.params.songId
        
        Playlist
            .findByPk(playlistId)
        Song
            .findByPk(songId)
            .then(song => {
            if (!song) {
                return res.status(404).send({
                message: `Not found`
                })
            }
            return song.destroy()
            .then(() => res.send({message: `Song deleted`}))
            })
            .catch(error => next(error))
})

router.put('/playlists/:playlistId/songs/:songId', (req, res, next) => {
    const playlistId = req.params.playlistId
    const songId = req.params.songId
    
    Playlist
        .findByPk(playlistId)
    Song
        .findByPk(songId)
        .then(song => { 
            if (!song) {
                return res.status(404).send({
                message: `Not found`
                })
            }
            return song.update(req.body).then(song => res.send(song))
        })
        .catch(error => next(error))
})


module.exports = router
const { Router } = require('express')
const  Playlist = require('./model')
const Song = require('../songs/model')
const auth = require('../auth/middleware')

const router = new Router()

router.get('/playlists', auth, (req, res, next) => {
    const limit = req.query.limit || 5
    const offset = req.query.offset || 0

        Promise.all([
            Playlist.count(),
            Playlist.findAll({ limit, offset })])
                    .then(([total, playlists]) => {
                res.send({
                    playlists, 
                    total
                    })
        })
        .catch(error => next(error))
    })

router.get('/playlists/:id', auth, (req, res, next) => {
    const id = req.params.id 
        
    Playlist
        .findByPk(id, {include: [Song]})     
        .then(playlist => {
            if (!playlist) {
                return res.status(404).send({
                message: `Not found`
                })
            }
            return res.send({ playlist: playlist })
        })
        .catch(error => next(error))
        })

router.post('/playlists', auth , (req, res, next) => {
    Playlist
    .create(req.body)
    .then(playlist => {
        if (!playlist) {
            return res.status(404).send({
            message: `Not found`
            })
            }
            return res.status(201).send(playlist)
    })
    .catch(error => next(error))
})

router.delete('/playlists/:id', //auth, 
(req, res, next) => {
    const id = req.params.id
    Playlist
        .findByPk(id)
        .then(playlist => {
            if (!playlist) {
                return res.status(404).send({
                    message: `Not found`
                })
                }
                return playlist.destroy()
        .then(() => res.status(200).send({
                    message: `Playlist deleted!`
                }))
        })
        .catch(error => next(error))
})

module.exports = router
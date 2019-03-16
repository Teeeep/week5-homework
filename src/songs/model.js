const Sequelize = require('sequelize')
const sequelize = require('../db')
const Playlist = require('../playlists/model')
const User = require('../users/model')

const Song = sequelize.define('songs', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    artist: {
        type: Sequelize.STRING,
        allowNull: false
    },
    album: {
        type: Sequelize.STRING,
        allowNull: false,
    }
}, {
        timestamps: false,
        tableName: 'songs'
    })


Playlist.hasMany(Song)


module.exports = Song
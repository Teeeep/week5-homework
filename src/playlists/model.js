const Sequelize = require('sequelize')
const sequelize = require('../db')
const User = require('../users/model')

const Playlist = sequelize.define('playlists', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    }
}, {
        timestamps: false,
        tableName: 'playlists'
    })





module.exports = Playlist
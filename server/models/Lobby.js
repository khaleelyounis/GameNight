const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Lobby Schema
const LobbySchema = new Schema({
    roomNumber: {
        type: String
    },
    gameType: {
        type: String
    },
    roomKey: {
        type: String
    },
    sessionId: {
        type: String
    },
    activePlayers: {
        type: Array
    },
    finishedPlayers: {
        type: Array
    },
    ids: {
        type: Array
    },
    maxPlayer: {
        type: Number
    },
    deal52Games: {
        type: Array
    },
    date: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('lobby', LobbySchema);
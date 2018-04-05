const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Local Schema
const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false,
        index: { unique: true }
    },
    password: {
        type: String,
        required: true
    },
    gamesPlayed: {
        type: Number,
        default: 0
    },
    identifier: {
        type: Object
    },
    wins: {
        type: Number,
        default: 0
    },
    deal52LowestScore: {
        type: Number,
        default: 50
    },
    date: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('users', UserSchema);
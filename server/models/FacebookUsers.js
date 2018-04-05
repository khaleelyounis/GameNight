const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Facebook Schema
const FacebookUserSchema = new Schema({
    facebookID: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
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
    token: {
        type: String
    }
});

mongoose.model('facebookUsers', FacebookUserSchema);
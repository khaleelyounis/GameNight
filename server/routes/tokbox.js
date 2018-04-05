const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const OpenTok = require('opentok');
const _ = require('lodash');
const path = require('path');
const crypto = require('crypto');
const keys = require('../config/keys');
const apiKey = keys.TOKBOX_API_KEY;
const secret = keys.TOKBOX_SECRET;

//Load Helpers
const {
    ensureAuthenticated,
    ensureGuest
} = require('../helpers/auth');

// Load Lobby model
require('../models/Lobby');
const Lobby = mongoose.model('lobby');

//Load User Models
const GoogleUser = mongoose.model('googleUsers');
const LocalUser = mongoose.model('users');
const FacebookUser = mongoose.model('facebookUsers');

//Initiate new OpenTok instance
const opentok = new OpenTok(apiKey, secret);

//Local global variables needed to create and access lobbies
let roomContainer = [];
let room;
let roomKey;

//Creates a room and checks to see if one has already been used with the same number
function createARoom() {
    room = Math.ceil(Math.random() * (new Date()));
    if (roomContainer.indexOf(room) > 0) {
        createAroom();
    } else {
        roomContainer.push(room);
    }
    return room;
}

//Creates a room key with a crypto hash and is given to the user to allow people to join their room.
function createHash() {
    var current_date = (new Date()).valueOf().toString();
    var random = Math.random().toString();
    roomKey = crypto.createHash('sha1').update(current_date + random).digest('hex');
    roomKey = roomKey.slice(1, 11);
    return roomKey;
}

//This route generates a room/hash and creates the lobby in the database, then sends the information back to the user
router.post('/room', ensureAuthenticated, function (req, res) {
    let { gameType, maxPlayers } = req.body
    createARoom();
    createHash();
    if (gameType === 'deal52') {
        gameType = 'gamepage';
    } else if (gameType === 'webcam') {
        gameType = 'camGame';
    }
    // if the room name is associated with a session ID, fetch that
    Lobby.findOne({ roomNumber: room }, 'players sessionId', (err, lobby) => {
        if (err) return next(err);
        if (!lobby) {
            // if this is the first time the room is being accessed, create a new session ID
            opentok.createSession({ mediaMode: 'routed' }, function (err, session) {
                if (err) {
                    console.log(err);
                    res.status(500).send({ error: 'createSession error:' + err });
                    return;
                }
                req.user.identifier = {
                    'local': req.user._id,
                    'username': req.user.firstName
                };
                if (req.user.googleID) {
                    req.user.identifier = {
                        'google': req.user.googleID,
                        'username': req.user.firstName
                    };
                } else if (req.user.facebookID) {
                    req.user.identifier = {
                        'facebook': req.user.facebookID,
                        'username': req.user.firstName
                    };
                }
                const lobby = new Lobby({
                    roomNumber: room,
                    gameType: gameType,
                    roomKey: roomKey,
                    sessionId: session.sessionId,
                    ids: [req.user.identifier],
                    maxPlayer: maxPlayers
                });
                lobby.save((err) => {
                    if (err) return next(err);
                });
                // generate token
                const token = opentok.generateToken(session.sessionId);
                res.setHeader('Content-Type', 'application/json');
                res.send({
                    apiKey: apiKey,
                    sessionId: session.sessionId,
                    token: token,
                    roomKey: roomKey,
                    pathname: `/${gameType}`
                });
            });
        }
    });
});

//Get User information to display correctly on the Lobby Page
router.get('/lobby', (req, res) => {
    if (req.user) {
        res.json({
            //capitalize first letter in first and last name
            firstName: req.user.firstName.charAt(0).toUpperCase() + req.user.firstName.slice(1),
            lastName: req.user.lastName.charAt(0).toUpperCase() + req.user.lastName.slice(1),
            gamesPlayed: req.user.gamesPlayed,
            lowestScore: req.user.deal52LowestScore,
            totalWins: req.user.wins

        });
    }
});

//Get list of all users and their scores for the leaderboard
router.get('/leaderboard', (req, res) => {
    let userMap = [];
    let finishedCheck = [];
    LocalUser.find({}, function (err, users) {
        for (let playerIndex = 0; playerIndex < users.length; playerIndex++) {
            let userObject = {
                //capitalize first letter in name
                name: users[playerIndex].firstName.charAt(0).toUpperCase() + users[playerIndex].firstName.slice(1),
                lowestScore: users[playerIndex].deal52LowestScore
            }
            userMap.push(userObject);
        }
        //Because of asynch database calls, we need this check in all to make sure that we get the full list of data
        finishedCheck.push('localFinished');
        sortLeaderboard(finishedCheck, userMap, res);
    });
    GoogleUser.find({}, function (err, users) {
        for (let playerIndex = 0; playerIndex < users.length; playerIndex++) {
            let userObject = {
                name: users[playerIndex].firstName,
                lowestScore: users[playerIndex].deal52LowestScore
            }
            userMap.push(userObject);
        }
        //Because of asynch database calls, we need this check in all to make sure that we get the full list of data
        finishedCheck.push('googleFinished');
        sortLeaderboard(finishedCheck, userMap, res);
    });
    FacebookUser.find({}, function (err, users) {
        for (let playerIndex = 0; playerIndex < users.length; playerIndex++) {
            let userObject = {
                name: users[playerIndex].firstName,
                lowestScore: users[playerIndex].deal52LowestScore
            }
            userMap.push(userObject);
        }
        //Because of asynch database calls, we need this check in all to make sure that we get the full list of data
        finishedCheck.push('facebookFinished');
        sortLeaderboard(finishedCheck, userMap, res);
    });
});

//leaderboard helper function (sorts user data list from lowest score to highest)
function sortLeaderboard(finishedCheck, userMap, res) {
    if (finishedCheck.length === 3) {
        userMap.sort((a, b) => (a.lowestScore) - b.lowestScore);
        userMap = userMap.slice(0, 10);
        res.json({
            userMap
        });
    }
}

//Socket.io chat setup with user names and room attached to
//Post route to grab info from gamepages before they load
router.post('/sockets', (req, res, next) => {
    let room = req.body.room;
    let player;
    let maxPlayer;
    Lobby.findOne({ roomKey: room }, (err, lobby) => {
        if (err) return next(err);
        if (lobby) {
            //find user id in lobby then match and send user info to client for the socket
            for (let idIndex = 0; idIndex < lobby.ids.length; idIndex++) {
                if (lobby.ids[idIndex].username === req.user.firstName) {
                    req.user.identifier = lobby.ids[idIndex];
                }
            }
            maxPlayer = lobby.maxPlayer;
            id = req.user.identifier;
        }
        res.json({
            maxPlayer,
            id
        });
    });
});

//Use roomKey to Join a room. Room key is given to the user when they hit the start button
router.post('/join', ensureAuthenticated, (req, res) => {
    let { roomKey } = req.body;
    Lobby.findOne({ roomKey: roomKey }, (err, lobby) => {
        if (err) return next(err);
        if (!lobby) {
            res.json({ messages: 'That lobby does not exist!' });
        } else {
            if (lobby.maxPlayer === lobby.ids.length) {
                return res.json({
                    messages: 'Uh oh, that room is full!'
                });
            };
            //check to see which user method they logged in with, and set correct information in lobby
            req.user.identifier = {
                'local': req.user._id,
                'username': req.user.firstName
            };
            if (req.user.googleID) {
                req.user.identifier = {
                    'google': req.user.googleID,
                    'username': req.user.firstName
                };
            } else if (req.user.facebookID) {
                req.user.identifier = {
                    'facebook': req.user.facebookID,
                    'username': req.user.firstName
                };
            }
            lobby.ids.push(req.user.identifier);
            lobby.save(function (err, updatedLobby) {
                if (err) return next(err);
            });
            // generate token
            const token = opentok.generateToken(lobby.sessionId);
            res.setHeader('Content-Type', 'application/json');
            res.send({
                apiKey: apiKey,
                sessionId: lobby.sessionId,
                token: token,
                roomKey: roomKey,
                pathname: `/${lobby.gameType}`
            });
        }
    })
});

//Use room (roomKey) to delete the user who disconnected from the lobby, and then resave the lobby in the database.
router.post('/delete', ensureAuthenticated, (req, res) => {
    let { room } = req.body;
    Lobby.findOne({ roomKey: room }, (err, lobby) => {
        if (err) return next(err);
        if (lobby) {
            //removes the person from the lobby and then checks to see if that was the last person, and if it was deletes the lobby from the DB.
            for (let idIndex = 0; idIndex < lobby.ids.length; idIndex++) {
                if (lobby.ids[idIndex].username === req.user.firstName) {
                    lobby.ids.splice(idIndex, 1);
                }
            }
            lobby.save(function (err, updatedLobby) {
                if (err) return err.message;
            });
            if (lobby.ids.length === 0) {
                lobby.remove({ roomKey: room }, (err) => {
                    if (err) return err.message;
                });
            }
        };
    })
});

module.exports = router;
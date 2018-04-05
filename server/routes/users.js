const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const router = express.Router();

// Load User Model
require('../models/Users');
const User = mongoose.model('users');

// Login Form POST for local logging in
router.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.json({ messages: 'Invalid email or password, please try a different combination!' });
        }
        if (user) {
            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }
                res.send(user);
            });
        }
    })(req, res, next);
});

// Register Form POST for local signing up
router.post('/register', (req, res) => {
    User.findOne({
        email: req.body.email
    })
        .then(user => {
            if (user) {
                res.json({
                    messages: 'Not a valid email, please try a different one!'
                });
            } else {
                const newUser = new User({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: req.body.password
                });
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        newUser.password = hash;
                        newUser.save()
                            .then(user => {
                                res.json({ pathname: '/login' });
                            })
                            .catch(err => {
                                console.log(err);
                                return;
                            });
                    });
                });
            }
        })
});

module.exports = router;


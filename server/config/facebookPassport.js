const FacebookStrategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');
const keys = require('./keys');

//Load user model
const User = mongoose.model('facebookUsers');

//Facebook Strategy configuration
module.exports = function (passport) {
    passport.use(new FacebookStrategy({
        clientID: keys.facebookClientID,
        clientSecret: keys.facebookClientSecret,
        callbackURL: '/auth/facebook/callback',
        profileFields: ['id', 'displayName', 'name', 'email'],
        proxy: true
    }, function (accessToken, refreshToken, profile, done) {
        //Check for existing user
        process.nextTick(function () {
            User.findOne({ facebookID: profile.id }, (err, user) => {
                if (err) {
                    return done(err);
                }
                if (user) {
                    return done(null, user);
                } else {
                    const newUserConfig = {
                        facebookID: profile.id,
                        firstName: profile.name.givenName,
                        lastName: profile.name.familyName,
                        email: profile.emails[0].value,
                        token: accessToken
                    }
                    var newUser = new User(newUserConfig);
                    newUser.save((err) => {
                        if (err) throw err;
                        return done(null, newUser);
                    });
                }
            });
        });
    })
    );
}

const passport = require('passport');
const mongoose = require('mongoose');

//Creates a user object and allows the serialize and deserialize to work depending on the type of user login.
const User = {
    local: mongoose.model('users'),
    facebook: mongoose.model('facebookUsers'),
    google: mongoose.model('googleUsers')
}

//Used for every method that a user can log in with.
passport.serializeUser((user, done) => {
    let userType = 'local';
    if (user.googleID) {
        userType = 'google';
    } else if (user.facebookID) {
        userType = 'facebook'
    }
    done(null, `${user.id}-${userType}`);
});
passport.deserializeUser((id, done) => {
    const userInfo = id.split('-');
    User[userInfo[1]].findById(userInfo[0]).then(user => {
        done(null, user);
    }).catch(err => {
        console.log('error in .catch: ', err);
    });
});

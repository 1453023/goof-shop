var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    db = require('../models')

// Serialize sessions
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    db.Accounts.find({ where: { id: user.id } }).then(function(user) {
        done(null, user);
    }).error(function(err) {
        done(err, null);
    });
});


passport.use('local.login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, email, password, done) {
    // var models = require('../models/index');
    db.Accounts.find({
        where: { email: email, $and: { email: { $notILike: "admin%" } } }
    }).then(function(user) {
        passwd = user ? user.password : ''
        isMatch = db.Accounts.validPassword(password, passwd, done, user)
    });
}));

module.exports = passport;
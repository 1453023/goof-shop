var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

const user = {
    email: 'test@gmail.com',
    password: '123',
    id: 1
};

// Serialize sessions
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    db.User.find({ where: { id: id } }).success(function(user) {
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
    var models = require('../models/index');
    models.User.findOne({ email: email, password: password }, function(err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            req.flash('error', 'Invalid email or password!');
            return done(null, false);
        } else {
            req.session.email = email;
            return done(null, user);
        }
    });
}));

module.exports = passport;
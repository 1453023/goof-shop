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

passport.use('local.register', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, email, password, done) {
    req.checkBody('email', 'Invalid email').notEmpty().isEmail();
    req.checkBody('password', 'Invalid password').notEmpty().isLength({ min: 8 });
    var errors = req.validationErrors();
    if (errors) {
        var messages = [];
        errors.forEach(function(error) {
            messages.push(error.msg);
        });
        return done(null, false, req.flash('error', messages));
    }
    db.Accounts.find({ email: email }).then(function(err, user) {
        if (err) {
            console.log(err);
            return done(err);
        }
        if (user) {
            return done(null, false, { message: 'Email is already in use.' });
        }
        // var newUser = new db.Accounts();
        // newUser.email = email;
        // newUser.password = req.body.password;
        // newUser.gender = req.body.gender
        // newUser.region = req.body.region;
        // newUser.subscribe = req.body.subscribe
        // newUser.save(function(err, result) {
        //     if (err) {
        //         console.log(err);
        //         return done(err);
        //     }
        //     return done(null, newUser);
        // });
        db.Accounts.create({
            email: req.body.email,
            password: req.body.password,
            gender: req.body.gender,
            region: req.body.region,
            subscribe: req.body.subscribe
        }).error(function(err) {
            console.log(err);
            return done(err);
        })
    });
}));

passport.use('local.login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, email, password, done) {
    // var models = require('../models/index');
    req.checkBody('email', 'Invalid email').notEmpty().isEmail();
    req.checkBody('password', 'Invalid password').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
        var messages = [];
        errors.forEach(function(error) {
            messages.push(error.msg);
        });
        return done(null, false, req.flash('error', messages));
    }
    db.Accounts.find({
        where: { email: email, $and: { email: { $notILike: "admin%" } } }
    }).then(function(user) {
        passwd = user ? user.password : ''
        isMatch = db.Accounts.validPassword(password, passwd, done, user)
    });
}));

passport.use('local.admin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, email, password, done) {
    // var models = require('../models/index');
    req.checkBody('email', 'Invalid email').notEmpty().isEmail();
    req.checkBody('password', 'Invalid password').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
        var messages = [];
        errors.forEach(function(error) {
            messages.push(error.msg);
        });
        return done(null, false, req.flash('error', messages));
    }
    db.Accounts.find({ where: { email: email, $and: { email: { $iLike: "admin%" } } } }).then(function(user) {
        passwd = user ? user.password : ''
        isMatch = db.Accounts.validPassword(password, passwd, done, user)
    });
}));

module.exports = passport;
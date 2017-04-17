var express = require('express'),
    csrf = require('csurf'),
    csrfProtection = csrf(),
    router = express.Router(),
    passport = require('passport'),
    models = require('../models/index');

router.use(csrfProtection);

router.get('/', function(req, res) {
    res.render('pages/index', { title: 'G-O-O-F' });
});
router.get('/shop_men', function(req, res) {
    res.render('pages/shop', { title: 'G-O-O-F / MEN' });
});
router.get('/contacts', function(req, res) {
    res.render('pages/contacts', { title: 'G-O-O-F / CONTACTS' });
});

router.post('/users', function(req, res) {
    models.User.create({
        email: req.body.email,
        password: req.body.password
    }).then(function(user) {
        res.json(user);
    });
});

// login
router.route('/login')
    .get(function(req, res) {
        var error = req.flash('error');
        res.render('pages/login', { title: 'G-O-O-F / LOGIN', error: error, csrfToken: req.csrfToken() });
    })
    .post(passport.authenticate('local.login', {
        successRedirect: '/shop_men',
        failureRedirect: '/login',
        failureFlash: true
    }));


module.exports = router;
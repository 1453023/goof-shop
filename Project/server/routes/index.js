var express = require('express');
var router = express.Router();
var models = require('../models/index');


router.get('/', function(req, res) {
    res.render('pages/index', { title: 'G-O-O-F' });
});
router.get('/shop_men', function(req, res) {
    res.render('pages/shop', { title: 'G-O-O-F / MEN' });
});
router.get('/contacts', function(req, res) {
    res.render('pages/contacts', { title: 'G-O-O-F / CONTACTS' });
});
router.get('/login', function(req, res) {
    res.render('pages/login', { title: 'G-O-O-F / LOGIN' });
});

router.post('/login', function(req, res) {
    var email = req.body.email;
    var password = req.body.password;

    models.Accounts.findOne({ email: email, password: password }, function(err, user) {
        if (err)
            return donr(err);
        if (!user) {
            res.render('pages/login', { title: 'Log in', error: 'Invalid email or password!', csrfToken: req.csrfToken() });
        } else {
            req.session.email = email;
            res.redirect('/');
        }
    })
})
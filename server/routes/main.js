var db = require('../models');

exports.shop_men = function(req, res) {
    if (req.user) {
        res.render("pages/shop", { user: req.user.email, title: 'G-O-O-F / MEN' });
    } else {
        res.render("pages/shop", { user: "", title: 'G-O-O-F / MEN' });
    }
}

exports.contacts = function(req, res) {
    if (req.user) {
        res.render("pages/contacts", { user: req.user.email, title: "G-O-O-F / CONTACTS" });
    } else {
        res.render("pages/contacts", { user: "", title: "G-O-O-F / CONTACTS" });
    }
}

exports.account = function(req, res) {
    res.render('pages/user_account', { title: 'G-O-O-F / ACCOUNT' });
}

// exports.account = function(req, res) {
//     res.render("myAccount.ejs", { username: req.user.username });
// }

exports.search = function(req, res) {
    q = "";
    users = [];
    if (req.query.q) {
        q = req.query.q;
        db.Accounts.findAll({ attributes: ['id', 'username'], where: { username: { like: '%' + req.query.q + '%' } } }).success(function(users) {
            //console.log('Users:', users)
            res.render("search.ejs", { q: q, username: req.user.username, users: users });
        });
    } else {
        db.Accounts.findAll().then(function(users) {
            //console.log('Users:', users)
            res.render("search.ejs", { q: q, username: req.user.username, users: users });
        });
    }
    //res.render("search.ejs", { q: q, username: req.user.username, users: users })
}
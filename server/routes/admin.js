var db = require('../models');

exports.authenticate = function(req, res) {
    res.render('admin/authenticate', { title: "G-O-O-F / Admin" });
}

exports.dashboard = function(req, res) {
    res.render('admin/dashboard', { title: "G-O-O-F / Admin" });
}
var db = require('../models'),
    passport = require('passport');

exports.login = function(req, res) {
    // req.flash('err', 'Invalid username or password.');

    var messages = req.flash('error');
    console.log(messages);
    // if (req.flash())
    res.render('pages/login', { title: 'G-O-O-F / LOGIN', messages: messages, hasErrors: messages.length > 0, csrfToken: req.csrfToken() });
    // else
    //     res.render('pages/login', { title: 'G-O-O-F / LOGIN', error: "", csrfToken: req.csrfToken() });
}

exports.update = function(req, res) {

    if (req.body.new_password = req.body.new_password_confirmation) {
        username = req.body.username;
        current_password = req.body.current_password;
        isMatch = true;

        db.Accounts.find({ where: { username: username } }).success(function(user) {
            hash = user ? user.password : '';
            isMatch = db.Accounts.validPassword(current_password, hash, function() { console.log('check password'); }, user);
        });
        if (isMatch) {
            req.user.username = username;
            req.user.password = req.body.new_password;
            req.user.save();
        } else {
            console.log('Bad Password');
        }
    }

    res.redirect('/account');
};

/*
exports.update = function(req, res) {
	var t = function(cb, user) {
	   if (user) {
		 req.user.password = req.body.new_password
		 req.user.save()
	   }
	}
	if (req.body.new_password = req.body.new_password_confirmation){
		db.Accounts.validPassword(req.body.current_password, req.user.password, t, req.user)
	}
  
    res.redirect('/account')
};*/
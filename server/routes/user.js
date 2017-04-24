var db = require('../models'),
    passport = require('passport');

exports.login = function(req, res) {
    // req.flash('err', 'Invalid username or password.');
    console.log(req.flash());
    // if (req.flash())
    res.render('pages/login', { title: 'G-O-O-F / LOGIN', error: req.flash('error'), csrfToken: req.csrfToken() });
    // else
    //     res.render('pages/login', { title: 'G-O-O-F / LOGIN', error: "", csrfToken: req.csrfToken() });
}

exports.register = function(req, res) {
    db.Accounts.find({ where: { email: req.body.email } }).then(function(user) {
        if (!user) {
            db.Accounts.create({
                email: req.body.email,
                password: req.body.password,
                gender: req.body.gender,
                region: req.body.region,
                subscribe: req.body.subscribe
            }).error(function(err) {
                console.log(err);
            });
        } else {
            req.flash('error', 'Email has already been used');
            res.redirect('/login');
        }
    });
    // return res.render("pages/shop", { user: req.user.email, title: 'G-O-O-F / MEN' })
    return res.render('pages/login', { title: 'G-O-O-F / LOGIN', error: "Your account has been registered! You can access to your account from now on!", csrfToken: req.csrfToken() });
};

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
var express = require('express'),
    session = require('express-session'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    cons = require('consolidate'),
    pug = require('pug'),
    pg = require('pg'),
    sequelize = require('sequelize'),
    flash = require('connect-flash'),
    passport = require('passport'),
    passportConfig = require('./config/passport'),
    helmet = require('helmet'),
    csrf = require('csurf'),
    csrfProtection = csrf({ cookie: true }),

    routes = require('./routes'),
    user = require('./routes/user'),
    main = require('./routes/main'),
    application = require('./routes/application'),

    app = express(),
    db = require('./models');

//assign pug engine to pug files
app.engine('pug', cons.pug);

// set default ext. pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../assets/views'));

// Configuration for BCrypt Salt Work Factor

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

// session
app.use(session({
    secret: 'goatjsformakebettersecurity',
    // resave: false,
    // saveUninitialized: false
}));

app.use(helmet());
app.use(function(req, res, next) {
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    next();
});
// authentication initialize
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// app.use(app.router);

//routes 
app.get('/', routes.index);
app.get('/shop_men', main.shop_men);
app.get('/contacts', main.contacts);
app.get('/login', csrfProtection, user.login);
// app.post('/account/update', application.IsAuthenticated, user.update);
app.post('/authenticate',
    passport.authenticate('local.login', {
        successRedirect: '/shop_men',
        failureFlash: 'Invalid Email or Password',
        failureRedirect: '/login'
    }));
app.get('/logout', application.destroySession);
app.get('/account', application.IsAuthenticated, main.account);
app.post('/register', function(err, res, req) {
    db.Accounts.find({ where: { email: req.body.email } }).then(function(user) {
        if (!user) {
            db.Accounts
                .create({
                    email: req.body.email,
                    password: req.body.password,
                    gender: req.body.gender,
                    region: req.body.region,
                    subscribe: req.body.subscribe
                })
                .error(function(err) {
                    console.log(err);
                });
        } else {
            req.flash('error', 'Email has already been used');
            res.redirect('/login');
        }
    });
    passport.authenticate('local.login', { successRedirect: '/shop_men' });
});
// app.get('/search', application.IsAuthenticated, home.search);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('layouts/error');
});

module.exports = app;
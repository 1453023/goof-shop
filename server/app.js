var express = require('express'),
    session = require('express-session'),
    path = require('path'),
    validator = require('express-validator'),
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
    helmet = require('helmet'),
    csrf = require('csurf'),
    csrfProtection = csrf({ cookie: true }),
    multer = require('multer'),
    cors = require('cors'),
    fs = require('fs'),
    loki = require('lokijs'),
    multer = require('multer'),
    SequelizeStore = require('connect-session-sequelize')(session.Store),
    // uploads = multer({ dest: 'uploads/' }),

    routes = require('./routes'),
    user = require('./routes/user'),
    main = require('./routes/main'),
    application = require('./routes/application'),
    admin = require('./routes/admin'),

    app = express(),
    db = require('./models');

//assign pug engine to pug files
app.engine('pug', cons.pug);

// set default ext. pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../assets/views'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(cors());

// session
app.use(session({
    secret: 'goatjsformakebettersecurity',
    store: new SequelizeStore({
        db: db,
        checkExpirationInterval: 15 * 60 * 1000, // The interval at which to cleanup expired sessions in milliseconds.
        expiration: 180 * 60 * 1000 // The maximum age (in milliseconds) of a valid session.
    }),
    resave: false,
    saveUninitialized: false
}));
// sessionCart.sync()
app.use(function(req, res, next) {
    res.locals.session = req.session;
    next();
});

require('./config/passport');

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
app.get('/shopping_cart', main.cart);
app.get('/product_detail/:id', main.product_detail);
app.get('/add_cart/:id', main.add_cart);

app.get('/login', csrfProtection, user.login);
// app.post('/account/update', application.IsAuthenticated, user.update);
app.post('/authenticate',
    passport.authenticate('local.login', {
        successRedirect: '/shop_men',
        failureFlash: true,
        failureRedirect: '/login'
    }));
app.get('/logout', application.destroySession);
app.get('/account', application.IsAuthenticated, main.account);
app.post('/register',
    passport.authenticate('local.register', {
        successRedirect: '/shop_men',
        failureFlash: true,
        failureRedirect: '/login'
    }));


app.get('/admin', admin.authenticate);
app.post('/admin/login',
    passport.authenticate('local.admin', {
        successRedirect: '/admin/dashboard',
        failureRedirect: '/admin'
    }));
app.get('/admin/dashboard', application.IsAuthenticated, admin.dashboard)
app.post('/search', main.search);

// app.post('/product_img/upload', upload.array('photos'))

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
module.exports = app;
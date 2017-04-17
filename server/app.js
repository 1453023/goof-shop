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

    routes = require('./routes/index'),

    app = express();

var models = require('./models/index')
require('./config/passport');

//assign pug engine to pug files
app.engine('pug', cons.pug);

// set default ext. pug
app.set('view engine', 'pug');
app.set('views', __dirname + '\\..\\assets\\views');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

// session
app.use(session({
    secret: 'superSecret',
    resave: false,
    saveUninitialized: false
}));

// authentication initialize
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


app.use('/', routes);

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
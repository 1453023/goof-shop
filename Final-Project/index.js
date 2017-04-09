var express = require('express'),
    session = require('express-session'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cons = require('consolidate'),
    pug = require('pug'),
    pg = require('pg'),
    Sequelize = require('sequelize'),
    routes = require('./server/routes/index.js'),
    app = express();

var models = require('./server/models/index')

//assign pug engine to pug files
app.engine('pug', cons.pug);

// set default ext. pug
app.set('view engine', 'pug');
app.set('views', __dirname + '\\assets\\views');

//set public folder
app.use(express.static(path.join(__dirname, 'public')));

// body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// session
app.use(session({
    secret: 'superSecret',
    resave: false,
    saveUninitialized: false
}));

// app.use('/', routes);
app.get('/', function(req, res) {
    res.render('pages/index', { title: 'G-O-O-F' });
});
app.get('/shop_men', function(req, res) {
    res.render('pages/shop', { title: 'G-O-O-F / MEN' });
});
app.get('/contacts', function(req, res) {
    res.render('pages/contacts', { title: 'G-O-O-F / CONTACTS' });
});
app.get('/login', function(req, res) {
    res.render('pages/login', { title: 'G-O-O-F / LOGIN' });
});

app.post('/login', function(req, res) {
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

// server
app.listen(4000, function() {
    console.log('Server started on port 4000');
    // console.log();
})
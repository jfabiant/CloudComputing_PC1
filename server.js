const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');

/**
 * INITIALIZE
 */
const app = express();

/** 
 * SETTINGS
 */
app.set('port', process.env.PORT || 3005);
app.set('host', '0.0.0.0');
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

/**
 * MIDDLEWARS
 */
app.use(session({
    secret: 'secret123',
    resave: true,
    saveUninitialized: true
}));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(flash());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * GLOBAL VARIABLES
 */
app.use((req, res, next) => {
    app.locals.message = req.flash('message');
    app.locals.user = req.user;
    next();
});

/**
 * ROUTES
 */
app.use(require('./src/routes/index'));
app.use(require('./src/routes/authentication'));
app.use('/products', require('./src/routes/products'));

/**
 * PUBLICS
 */
app.use(express.static(path.join(__dirname, 'src/public')));

/**
 * SERVER
 */
app.listen(app.get('port'), app.get('host'), () => {
    console.log(`Server listening on http://${app.get('host')}:${app.get('port')}`);
});
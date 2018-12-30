const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const partials = require('express-partials');
const methodOverride = require ('method-override');
const session = require ('express-session');
const flash = require('req-flash');

const routes = require('./routes/index');

//const users = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(partials());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true }));
app.use(cookieParser('appE'));
app.use(session({secret:'AppEscola2016', resave: false, saveUninitialized: true}))
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
/*
//HTTPS
app.all('*', ensureSecure); // at top of routing calls

function ensureSecure(req, res, next){
    if(req.headers['x-forwarded-proto'] === 'https'){ // OK, continue
        return next()
    };
    res.redirect('https://' + req.headers.host)
}
*/
// Helpers Dinámicos:
//hace visible req.session en las vistas
app.use (function(req, res, next){
    res.locals.session = req.session;
    next();
});
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// ERROR HANDLERS
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;

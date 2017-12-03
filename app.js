var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var partials = require('express-partials');
var methodOverride = require ('method-override');
var session = require ('express-session');


var routes = require('./routes/index');

//var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/images/favicon.png'));
app.use(partials());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true }));
app.use(cookieParser('appE'));
app.use(session({secret:'AppEscola2016', resave: false, saveUninitialized: false}))
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
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

// error handlers

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

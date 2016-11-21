var mongoose = require ('mongoose');

var schema = require ('./schema');
var schema_users = require ('./schema_users');
var schemaescoles = require('./schema_escoles');
var schemaesp = require('./schema_usersEsp');
var schemaee = require('./schema_usersEe');

mongoose.connect('mongodb://localhost:27017/test');
//mongoose.connect('mongodb://heroku_g5r9dhbr:8m2i3fvusespuik77q2q5dctj4@ds153785.mlab.com:53785/heroku_g5r9dhbr');


//Els paràmetres són: nom model, esquema, collection
exports.Alumne = mongoose.model('Alumne', schema, 'Alumnes');
exports.User = mongoose.model('User', schema_users, 'Users');
exports.Escola = mongoose.model('Escola',schemaescoles, 'Escoles');
exports.UserEsp = mongoose.model('UserEsp', schemaesp, 'UserEsps');
exports.UserEe = mongoose.model('UserEe', schemaee, 'UserEes');
var mongoose = require ('mongoose');

var schema = require ('./schema');
var schemaUsers = require ('./schema_users');
var schemaCentres = require('./schema_centres');
var schemaEsp = require('./schema_usersEsp');
var schemaEe = require('./schema_usersEe');

var schemaHorari = require('./schema_horari');

mongoose.connect('mongodb://localhost:27017/test');
//mongoose.connect('mongodb://heroku_g5r9dhbr:8m2i3fvusespuik77q2q5dctj4@ds153785.mlab.com:53785/heroku_g5r9dhbr');

//Els paràmetres són: nom model, esquema, collection
exports.Alumne = mongoose.model('Alumne', schema, 'Alumnes');
exports.User = mongoose.model('User', schemaUsers, 'Users');
exports.Centre = mongoose.model('Centre',schemaCentres, 'Centres');
exports.UserEsp = mongoose.model('UserEsp', schemaEsp, 'UserEsps');
exports.UserEe = mongoose.model('UserEe', schemaEe, 'UserEes');

exports.Horari = mongoose.model('Horari', schemaHorari, 'Horaris');
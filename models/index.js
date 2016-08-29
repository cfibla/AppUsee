var mongoose = require ('mongoose');
var schema = require ('./schema');

mongoose.connect('mongodb://localhost:27017/test');
//mongoose.connect('mongodb://heroku_g5r9dhbr:8m2i3fvusespuik77q2q5dctj4@ds153785.mlab.com:53785/heroku_g5r9dhbr');


//Els paràmetres són: nom model, esquema, collection
exports.Alumne = mongoose.model('Alumne', schema, 'Alumnes');
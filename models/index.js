var mongoose = require ('mongoose');
var schema = require ('./schema');

mongoose.connect('mongodb://localhost:27017/test');

//Els paràmetres són: nom model, esquema, collection
exports.Alumne = mongoose.model('Alumne', schema, 'Alumnes');
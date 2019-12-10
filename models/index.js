const mongoose = require ('mongoose');

const schema = require ('./schema');
const schemaUsers = require ('./schema_users');
const schemaCentres = require('./schema_centres');
const schemaEsp = require('./schema_usersEsp');
const schemaEe = require('./schema_usersEe');

const schemaHorari = require('./schema_horari');

//CONNEXIONS
//mongoose.connect('mongodb://localhost:27017/test');
//mongoose.connect('mongodb://cfibla:alternativa-10@appescola-shard-00-00-t7nsq.mongodb.net:27017,appescola-shard-00-01-t7nsq.mongodb.net:27017,appescola-shard-00-02-t7nsq.mongodb.net:27017/test?ssl=true&replicaSet=appescola-shard-0&authSource=admin', { useNewUrlParser: true,  useUnifiedTopology: true, useCreateIndex: true });
mongoose.connect('mongodb://heroku_g5r9dhbr:8m2i3fvusespuik77q2q5dctj4@ds153785.mlab.com:53785/heroku_g5r9dhbr', { useNewUrlParser: true,  useUnifiedTopology: true, useCreateIndex: true });

//Els paràmetres són: nom model, esquema, collection
//ALUMNES
exports.Alumne = mongoose.model('Alumne', schema, 'Alumnes');
//USUARIS
exports.User = mongoose.model('User', schemaUsers, 'Users');
exports.UserEe = mongoose.model('UserEe', schemaEe, 'UserEes');
exports.UserEsp = mongoose.model('UserEsp', schemaEsp, 'UserEsps');
//CENTRES
exports.Centre = mongoose.model('Centre',schemaCentres, 'Centres');
//HORARIS
exports.Horari = mongoose.model('Horari', schemaHorari, 'Horaris');
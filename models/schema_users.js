var mongoose = require ('mongoose');

var schemaEscoles = require('./schema_escoles');
var Escola = mongoose.model('Escola', schemaEscoles, 'Escoles');

var schemaCentres = require('./schema_centres');
var Centre = mongoose.model('Centre',schemaCentres, 'Centres');

var schemaHoraris = require('./schema_horari');
var Horari = mongoose.model('Horari',schemaHoraris, 'Horaris');

module.exports = new mongoose.Schema({
	email:{
		type: String,
		unique: true,
		lowercase: true,
		trim: true
	},
	password:{
		type: String
	},
	nom: String,
	cognom: String,

	codiEscola: Number,
	mestre: String,
	curs: String,
//PROPIETARIS
	centre: {
		type: mongoose.Schema.ObjectId,
		ref: 'Centre'
	},
	horari:[{
			type: mongoose.Schema.ObjectId,
			ref: 'Horari'
		}],
	escola: {
		type: Number,
		ref: 'Escola'
	}


});
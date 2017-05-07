var mongoose = require ('mongoose');
var schemaescoles = require('./schema_escoles');
var Escola = mongoose.model('Escola', schemaescoles, 'Escoles');

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

	escola: {
		type: Number,
		ref: 'Escola'
	}


});
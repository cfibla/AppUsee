var mongoose = require ('mongoose');

var schemacentres = require('./schema_centres');
var Centre = mongoose.model('Centre',schemacentres, 'Centres');

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

//PROPIETARIS
	centre: {
		type: mongoose.Schema.ObjectId,
		ref: 'Centre'
	},
	escola: {
		type: Number,
		ref: 'Escola'
	}


});
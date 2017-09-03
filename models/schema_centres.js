var mongoose = require ('mongoose');

module.exports = new mongoose.Schema({
	codi:{
		type: Number,
		unique: true
	},
	password:{
		type: String
	},
	nom: String,
	telefon: Number,
	email: {
		type: String,
//		unique:true
	},
	adreca: String,
	codiPostal: Number,
	poblacio: String,
	provincia: String

});
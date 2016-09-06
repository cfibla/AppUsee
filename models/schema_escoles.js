var mongoose = require ('mongoose');

module.exports = new mongoose.Schema({
	_id:{
		type: Number,
		unique: true,
		trim: true
	},
	password:{
		type: String
	},
	nom: String,
	telefon: Number,
	email: {
		type: String,
		unique:true
	},
	adreca: String,
	codiPostal: Number,
	poblacio: String,
	provincia: String

});
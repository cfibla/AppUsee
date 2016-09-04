var mongoose = require ('mongoose');

module.exports = new mongoose.Schema({
	email:{
		type: String,
		unique: true
	},
	password:{
		type: String
	},
	nom: String,
	cognom: String,

	escola: Boolean,
	tutor: Boolean,
	especialista: Boolean,
	eeUsee: Boolean

});
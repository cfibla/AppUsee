var mongoose = require ('mongoose');

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

	escola: Boolean,
	tutor: Boolean,
	especialista: Boolean,
	eeUsee: Boolean,

	idEscola: String,
	idTutor: String,
	idEspecialista: String,
	idEeUsee: String

});
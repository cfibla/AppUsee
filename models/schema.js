var mongoose = require ('mongoose');

module.exports = new mongoose.Schema ({
	nomAlumne: {
		type: String,
		required: true
	},
	cognomAlumne1: {
		type: String,
		required: true
	},
	cognomAlumne2: {
		type: String
	},
	dataNaixement: {
		type: Date
	},
	seguretatSoc: {
		type: String,
		uppercase: true
	},


	checks:[Boolean],
	radios:[Boolean],


	altresEsp:{
		type: String
	},
	atServPrivats:{
		type: String
	},
	percentDim:{
		type: String
	},
	motiuDic:{
		type: String
	},
	anyVal:{
		type: String
	},
	derivacio:{
		type: String
	},
	motiuDer:{
		type: String
	},

	//SEGUIMENT
	segActuacions: [{ date: String, body: String }],
	segInformacioCAD: [{ date: String, body: String }],
	segAltresCoord: [{ date: String, body: String }],

	//PROPIETARIS
	userEscola: String,
	userTutor: String,
	userEspecialista: String,
	userEeUsee: String
  	

})
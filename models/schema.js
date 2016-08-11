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
	actuacions: [{ body: String, date: Date }],
	informacioCAD:  [{ body: String, date: Date }],
	altresCoord:  [{ body: String, date: Date }],
  	date: { type: Date, default: Date.now }


})
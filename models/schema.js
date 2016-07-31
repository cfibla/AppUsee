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


// ATENCIÓ EE-USEE	
	checks:[Boolean],
//	atesA:{
		aill: Boolean,
		ee: Boolean,
		usee: Boolean,
//	},
//	segServExt:{
		eap: Boolean,
		tseap: Boolean,
		credag: Boolean,
		credv: Boolean,
		csmij: Boolean,
		sdtic: Boolean,
		cdiap: Boolean,
//	},
//	segMedic:{
		ped: Boolean,
		neuroped: Boolean,
		altres: Boolean,

	
	repeticio: Boolean,
	beca: Boolean,
	certDim: Boolean,
	dictamen: Boolean,
	valEap: Boolean,
//	},

	altresEsp:{
		type: String
	},
	atServPrivats:{
		type: String
	},


})
var mongoose = require ('mongoose');

var schema = require ('./schema');
var schema_users = require ('./schema_users');
var schemaesp = require('./schema_usersEsp');
var schemaee = require('./schema_usersEe');
var schemacentres = require('./schema_centres');

var Centre = mongoose.model('Centre',schemacentres, 'Centres');
var User = mongoose.model('User', schema_users, 'Users');
var UserEsp = mongoose.model('UserEsp', schemaesp,'UserEsps');
var UserEe = mongoose.model('UserEe', schemaee, 'UserEes');

module.exports = new mongoose.Schema ({
	nomAlumne: {
		type: String,
		required: true,
		uppercase: true
	},
	cognomAlumne1: {
		type: String,
		required: true,
		uppercase: true
	},
	cognomAlumne2: {
		type: String,
		uppercase: true
	},
	dataNaixement: {
		type: Date
	},
	seguretatSoc: {
		type: String,
		uppercase: true
	},
	observacions: String,
	mailAlum: String,
	passwordAl: String,
	telefon: String,
	codiEscola: Number,
	eeUsee: Boolean,
	curs: String,
//REUNIONS PARES
	reunionsPares:[{
		curs: String,
		date: String,
		convocada: String,
		assistencia: String,
		body: String,
		conclusions: String,
		composicio: String,
		creat: String,
		userMail: String,
		dataIso: Date
	}],
//ASSISTÈNCIA
	assist: [{
		date: String,
		mati: String,
		tarda: String,
		justificant: String,
		dataIso: Date
	}],
//MENJADOR
	menjador: [{
		menu: String,
		dataMen: String,
		dataIsoMen: Date
	}],
//CHECKS & RADIOS
	checks:[Boolean],
	radios:[Boolean],
//ATENCIÓ DIVERSITAT
	altresEsp: String,
	atServPrivats: String,
	percentDim: String,
	motiuDic: String,
	anyVal: String,
	derivacio: String,
	motiuDer: String,
//SEGUIMENT
	segActuacions: [{ date: String, body: String }],
	segInformacioCAD: [{ date: String, body: String }],
	segAltresCoord: [{ date: String, body: String }],
//PROPIETARIS
	centre: {
		type: mongoose.Schema.ObjectId,
		ref: 'Centre'
	},
/*	escola: {
		type: Number,
		ref: 'Escola'
	},*/
	tutor: {
		type: mongoose.Schema.ObjectId,
		ref: 'User'
	},
	esp: {
		type: mongoose.Schema.ObjectId,
		ref: 'UserEsp'
	},
	ee: {
		type: mongoose.Schema.ObjectId,
		ref: 'UserEe'
	},
//NOTES
	primer:{
		mates:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number
		},

		cat:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number			
		},

		cast:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number					
		},

		medi:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		},

		musica:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		},

		plastica:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		},

		frances:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		},

		angles:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		},

		eValors:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		},

		eFisica:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		},

		proj:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		}
	},

	segon:{
		mates:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number
		},

		cat:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number			
		},

		cast:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number					
		},

		medi:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		},

		musica:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		},

		plastica:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		},

		frances:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		},

		angles:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		},

		eValors:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		},

		eFisica:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		},

		proj:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		}
	},

	tercer:{
		mates:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number
		},

		cat:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number			
		},

		cast:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number					
		},

		medi:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		},

		musica:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		},

		plastica:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		},

		frances:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		},

		angles:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		},

		eValors:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		},

		eFisica:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		},

		proj:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		}
	},

	quart:{
		mates:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number
		},

		cat:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number			
		},

		cast:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number					
		},

		medi:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		},

		musica:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		},

		plastica:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		},

		frances:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		},

		angles:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		},

		eValors:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		},

		eFisica:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		},

		proj:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		}
	},

	cinque:{
		mates:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number
		},

		cat:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number			
		},

		cast:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number					
		},

		medi:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		},

		musica:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		},

		plastica:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		},

		frances:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		},

		angles:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		},

		eValors:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		},

		eFisica:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		},

		proj:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		}
	},

	sise:{
		mates:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number
		},

		cat:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number			
		},

		cast:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number					
		},

		medi:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		},

		musica:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		},

		plastica:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		},

		frances:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		},

		angles:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		},

		eValors:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		},

		eFisica:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		},

		proj:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		}
	}



})
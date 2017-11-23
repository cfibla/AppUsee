var mongoose = require ('mongoose');

module.exports = new mongoose.Schema({
	nom: String,
	areasArray: Array,
	dades:[{
			data: String,
			dia: Number,
			h1: String,
			clase1:  {
				type: String,
				uppercase: true
			},
			prog1: String,
			ref1: String,
			session1: String,
			h2: String,
			clase2:   {
				type: String,
				uppercase: true
			},
			prog2: String,
			ref2: String,
			session2: String,
			h3: String,
			clase3:   {
				type: String,
				uppercase: true
			},
			prog3: String,
			ref3: String,
			session3: String,
			h4: String,
			clase4:   {
				type: String,
				uppercase: true
			},
			prog4: String,
			ref4: String,
			session4: String,
			h5: String,
			clase5:   {
				type: String,
				uppercase: true
			},
			prog5: String,
			ref5: String,
			session5: String,
			h6: String,
			clase6:   {
				type: String,
				uppercase: true
			},
			prog6: String,
			ref6: String,
			session6: String,
		}]
});

/*
module.exports = new mongoose.Schema({
	nom: String,
	areasArray: Array,
	dades:[{
		data: String,
		dia: Number,
		clase1:{
			area: String,
			hinici: String,
			hfinal: String,
			prog: String,
			session: String,
			ref: String
		},
		clase2:{
			area: String,
			hinici: String,
			hfinal: String,
			prog: String,
			session: String,
			ref: String
		},
		clase3:{
			area: String,
			hinici: String,
			hfinal: String,
			prog: String,
			session: String,
			ref: String
		},
		clase4:{
			area: String,
			hinici: String,
			hfinal: String,
			prog: String,
			session: String,
			ref: String
		},
		clase5:{
			area: String,
			hinici: String,
			hfinal: String,
			prog: String,
			session: String,
			ref: String
		},
	}]

*/
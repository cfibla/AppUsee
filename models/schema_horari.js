var mongoose = require ('mongoose');

module.exports = new mongoose.Schema({
	nom: String,
	areasArray: Array,
	dataIni: String,
	dataFi:String,
	dades:[{
		data: String,
		dia: Number,
		hora_1:{
			data: String,
			dia: Number,
			area: {
				type: String,
				uppercase: true
			},
			h_inici: String,
			h_final: String,
			prog: String,
			objectius: String,
			continguts: String,
			sessio: String,
			tema: String,
			color: String,
			hora: String
		},
		hora_2:{
			data: String,
			dia: Number,
			area: {
				type: String,
				uppercase: true
			},
			h_inici: String,
			h_final: String,
			prog: String,
			objectius: String,
			continguts: String,
			sessio: String,
			tema: String,
			color: String,
			hora: String
		},
		hora_3:{
			data: String,
			dia: Number,
			area: {
				type: String,
				uppercase: true
			},
			h_inici: String,
			h_final: String,
			prog: String,
			objectius: String,
			continguts: String,
			sessio: String,
			tema: String,
			color: String,
			hora: String
		},
		hora_4:{
			data: String,
			dia: Number,
			area: {
				type: String,
				uppercase: true
			},
			h_inici: String,
			h_final: String,
			prog: String,
			objectius: String,
			continguts: String,
			sessio: String,
			tema: String,
			color: String,
			hora: String
		},
		hora_5:{
			data: String,
			dia: Number,
			area: {
				type: String,
				uppercase: true
			},
			h_inici: String,
			h_final: String,
			prog: String,
			objectius: String,
			continguts: String,
			sessio: String,
			tema: String,
			color: String,
			hora: String
		}
	}]
});
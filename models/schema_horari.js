var mongoose = require ('mongoose');

module.exports = new mongoose.Schema({
	nom: String,
	dades:[{
			data: String,
			dia: Number,
			h1: String,
			clase1: String,
			prog1: String,
			h2: String,
			clase2: String,
			prog2: String,
			h3: String,
			clase3: String,
			prog3: String,
			h4: String,
			clase4: String,
			prog4: String,
			h5: String,
			clase5: String,
			prog5: String,
			h6: String,
			clase6: String,
			prog6: String
		}]
});
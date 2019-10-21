'use strict';

const models = require('../../../models/index');
const moment = require('moment');
const PDFDocument = require ('pdfkit');
const fs = require('fs');
const _ = require ('lodash');

const tempFile = ('temp/PDFassist.pdf');

moment.locale('ca');

exports.PDF = function (req, res) {

	let alum = req.body;
	let alumneId = alum.alumneId;
	let dt1 = alum.alumneAssistU;
	let dt2 = alum.alumneAssistD;

	let faltesJusti = 0;
	let retardJusti = 0;
	let faltes = 0;
	let retards = 0;

	let writeStream = fs.createWriteStream(tempFile);
	


//BUSCA EL ALUMNO
	models.Alumne.findOne({_id:alumneId},
			function(error, alumne){
		if (error) {
			return res.json(error);
		} else {

			let d1Iso = moment(dt1, 'DD/MM/YYYY').format();
			let d2Iso = moment(dt2, 'DD/MM/YYYY').format();
			let data1IsoL = moment(d1Iso).subtract(1, 'days');
			let data2IsoL = moment(d2Iso).add(1, 'days');
			let alumArray = alumne.assist;
			
			let dataAlumne;

//BORRAR FECHAS ANTERIORES Y POSTERIORES
			for (let i = 0; i < alumArray.length; i++) {

				dataAlumne = moment(alumArray[i].date,'DD/MM/YYYY').format();
				if (!moment(dataAlumne).isBetween(data1IsoL, data2IsoL)){
						alumArray.splice(i,1);
						i = i-1;
					}
			};

        	//NOM ALUMNE
			let nom = alumne.nomAlumne + ' ' + alumne.cognomAlumne1 + ' ' + alumne.cognomAlumne2;
			///PDFkit
			//creating a new PDF object
			let doc = new PDFDocument();
			doc.pipe(writeStream);  //creating a write stream
			doc.pipe(res);			//to write the content on the file system
			
			//PAG. 1
			//TITOL
			doc.text("CONTROL D'ASSISTÈNCIA",{
				align: 'center',
				underline: 1
			});
			doc.text("Escola Montserrat Vayreda",{
				align: 'center'
			});
			doc.moveDown(2.5);

			//DADES ALUMNE
			doc.text('DADES ALUMNE');
			doc.moveDown(0.5);
			doc.text('Nom: '+ nom);
			doc.text('Curs: '+ alumne.curs);
			//doc.text('Tutor: '+ alumne.tutor.nom);
			doc.moveDown(1.5);

			doc.text('Des del ' + dt1 + ' fins el ' + dt2);
			doc.moveDown(1.5);

			//TOTAL FALTES
			doc.text("FALTES D'ASSISTÈNCIA");
			doc.moveDown(0.5);
//SORT BY DATE

			let sorted = _.sortBy(alumArray, ['dataIso']);
			for (let i = 0; i < sorted.length; i++){
				if (sorted[i].mati == 'falta' && sorted[i].tarda == 'falta') {
					if (sorted[i].justiMati == 'justimati' && sorted[i].justiTarda == 'justitarda') {
						faltesJusti += 1;
						doc.text(sorted[i].date + ": falta de dia sencer justificada");
					} else if (sorted[i].justiMati == 'justimati' && sorted[i].justiTarda == undefined) {
						faltesJusti += 0.5;
						doc.text(sorted[i].date + ": falta matí justificada, falta tarda sense justificar");
					} else if (sorted[i].justiMati == undefined && sorted[i].justiTarda == 'justitarda') {
						faltesJusti += 0.5;
						doc.text(sorted[i].date + ": falta matí sense justificar, falta tarda justificada");
					} else {
						faltes += 1;
						doc.text(sorted[i].date + ": falta dia sencer sense justificar");
					}
				} else {

					if (sorted[i].mati == 'falta') {
						if(sorted[i].justiMati == 'justimati') {
							faltesJusti += 0.5;
							doc.text(sorted[i].date + ": falta matí justificada");
						} else {
							faltes += 0.5;
							doc.text(sorted[i].date + ": falta matí sense justificar");
						}
					}

					if (sorted[i].tarda == 'falta') {
						if(sorted[i].justiMati == 'justitarda') {
							faltesJusti += 0.5;
							doc.text(sorted[i].date + ": falta tarda justificada");
						} else {
							faltes += 0.5;
							doc.text(sorted[i].date + ": falta tarda sense justificar");
						}
					}
				}
				
			} 

			doc.moveDown(0.5);
            doc.text('Total faltes justificades: ' + faltesJusti);
            doc.moveDown(0.5);
            doc.text('Total faltes sense justificar: ' + faltes);
            doc.moveDown(3);
	
			//TOTAL RETARDS
			doc.text("RETARDS");
			doc.moveDown(0.5);

			for (let i = 0; i < sorted.length; i++){
				if (sorted[i].mati == 'retard' && sorted[i].tarda == 'retard') {
					if (sorted[i].justiMati == 'justimati' && sorted[i].justiTarda == 'justitarda') {
						retardJusti += 2;
						doc.text(sorted[i].date + ": retard de dia sencer justificat");
					} else if (sorted[i].justiMati == 'justimati' && sorted[i].justiTarda == undefined) {
						retardJusti += 1;
						retards += 1;
						doc.text(sorted[i].date + ": retard matí justificat, retard tarda sense justificar");
					} else if (sorted[i].justiMati == undefined && sorted[i].justiTarda == 'justitarda') {
						retardJusti += 1;
						retards += 1;
						doc.text(sorted[i].date + ": retard matí sense justificar, retard tarda justificat");
					}  


				
				}
				if (sorted[i].mati == 'retard') {
					if(sorted[i].justiMati == 'justimati') {
						retardJusti += 1;
						doc.text(sorted[i].date + ": retard matí justificat");
					} else {
						retards += 1;
						doc.text(sorted[i].date + ": retard matí sense justificar");
					}
				}

				if (sorted[i].tarda == 'retard') {
					if(sorted[i].justiMati == 'justitarda') {
						retardJusti += 1;
						doc.text(sorted[i].date + ": retard tarda justificat");
					} else {
						retards += 1;
						doc.text(sorted[i].date + ": retard tarda sense justificar");
					}
				}
			}

			
			doc.moveDown(0.5);
            doc.text('Total retards justificats: ' + retardJusti);
            doc.moveDown(0.5);
            doc.text('Total retards sense justificar: ' + retards);

			doc.end(); //we end the document writing.
		}
/*
		writeStream.on('finish', function(){                

			let fs = require('fs');
			let tempFile = ('temp/PDFassist.pdf');
			fs.readFile(tempFile, function (error,data){
				res.contentType("application/pdf");
				res.send(data);
			});
		});
		*/
	});
};
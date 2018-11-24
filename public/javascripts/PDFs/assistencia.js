var models = require('../../../models/index');
var moment = require('moment');
var _ = require('lodash');

moment.locale('ca');

exports.PDF = function (req, res) {

	var alum = req.body;
	var alumneId = alum.alumneId;

	var dt1 = alum.alumneAssistU;
	var dt2 = alum.alumneAssistD;


//BUSCA EL ALUMNO
	models.Alumne.findOne({_id:alumneId},
			function(error, alumne){
		if (error) {
			return res.json(error);
		} else {

//BORRAR FECHAS ANTERIORES Y POSTERIORES
		var d1Iso = moment(dt1, 'DD/MM/YYYY').format();
		var d2Iso = moment(dt2, 'DD/MM/YYYY').format();
		var data1IsoL = moment(d1Iso).subtract(1, 'days');
		var data2IsoL = moment(d2Iso).add(1, 'days');

		for (var i =0; i<alumne.assist.length; i ++) {

			var dataAlumne = moment(alumne.assist[i].date,'DD/MM/YYYY').format();
			if (!moment(dataAlumne).isBetween(data1IsoL, data2IsoL)){
					alumne.assist.splice(i,1);
					i = i-1;
				}
		};

			//require dependencies
			var PDFDocument = require ('pdfkit');
			var fs = require('fs');
			var doc = new PDFDocument();
			var tempFile = ('temp/PDFassist.pdf');

            //NOM ALUMNE
			var nom = alumne.nomAlumne + ' ' + alumne.cognomAlumne1 + ' ' + alumne.cognomAlumne2;

				///PDFkit
				//creating a new PDF object
				writeStream = fs.createWriteStream(tempFile);
				doc.pipe(writeStream);  //creating a write stream
										//to write the content on the file system
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

				var faltesJusti = 0;
				var retardJusti = 0;
				var faltes = 0;
				var retards = 0;

				//TOTAL FALTES
				doc.text("FALTES D'ASSISTÈNCIA");
				doc.moveDown(0.5);

				let alumArray = alumne.assist;
				//Sort por date
				let sorted = _.sortBy(alumArray, ['dataIso']);
		
	            for (var i = 0; i < sorted.length; i++) {
	              	if (sorted[i].mati == 'falta' && sorted[i].tarda == 'falta'){
	               		
	                	if (sorted[i].justiMati == 'justimati' && sorted[i].justiTarda == 'justitarda'){
		                	faltesJusti +=1
		                	doc.text(sorted[i].date + ': falta dia sencer justificada');
		                } else if (sorted[i].justiMati == 'justimati' && sorted[i].justiTarda == undefined) {
		                	faltesJusti +=0.5
		                	doc.text(sorted[i].date + ': falta matí justificada, falta tarda sense justificar');
		                } else if (sorted[i].justiMati == undefined && sorted[i].justiTarda == 'justitarda') {
		                	faltesJusti +=0.5
		                	doc.text(sorted[i].date + ': falta matí sense justificar, falta tarda justificada');
		                } else {
		                	faltes += 1;
		                	doc.text(sorted[i].date + ': falta dia sencer');
		                }

	                } else {

	                	if (sorted[i].mati == 'falta'){

	                		if (sorted[i].justiMati == 'justimati'){
			                	faltesJusti +=0.5
			                	doc.text(sorted[i].date + ': falta matí justificada');
			                } else {
		                		faltes += 0.5;
		               		    doc.text(sorted[i].date + ': falta matí');
		               		}
		               	}


	               		if (sorted[i].tarda == 'falta'){

	                		if (sorted[i].justiTarda == 'justitarda'){
			                	faltesJusti +=0.5
			                	doc.text(sorted[i].date + ': falta tarda justificada');
			                } else {
		                		faltes += 0.5;
		               		    doc.text(sorted[i].date + ': falta tarda');
		               		}
		               	}
		            };
		        }
					
				doc.moveDown(0.5);
	            doc.text('Faltes justificades: ' + faltesJusti);
	            doc.moveDown(0.5);
	            doc.text('Faltes sense justificar: ' + faltes);
	            doc.moveDown(3);
		
				//TOTAL RETARDS
				doc.text("RETARDS");
				doc.moveDown(0.5);
		
	            for (var i = 0; i < sorted.length; i++) {

	                	if (sorted[i].mati == 'retard'){

	                		if (sorted[i].justiMati == 'justimati'){
			                	retardJusti += 1;
			                	doc.text(sorted[i].date + ': retard matí justificat');
			                } else {
		                		retards += 1;
		               		    doc.text(sorted[i].date + ': retard matí');
		               		}
		               	}


	               		if (sorted[i].tarda == 'retard'){

	                		if (sorted[i].justiTarda == 'justitarda'){
			                	retardJusti += 1;
			                	doc.text(sorted[i].date + ': retard tarda justificat');
			                } else {
		                		retards += 1;
		               		    doc.text(sorted[i].date + ': retard tarda');
		               		}
		               	}
		            };
					
				doc.moveDown(0.5);
	            doc.text('Retards justificats: ' + retardJusti);
	            doc.moveDown(0.5);
	            doc.text('Retards sense justificar: ' + retards);
	            doc.moveDown(3);
		
				doc.end(); //we end the document writing.
		}

				writeStream.on('finish', function(){                

					var fs = require('fs');
					var tempFile = ('temp/PDFassist.pdf');
					fs.readFile(tempFile, function (error,data){
						res.contentType("application/pdf");
						res.send(data);
					});
				});
	});
};
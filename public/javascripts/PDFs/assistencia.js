var models = require('../../../models/index');
var moment = require('moment');

moment.locale('ca');

exports.PDF = function (req, res) {

	var alum = req.body;
	var alumneId = alum.alumneId;

	var dt1 = alum.alumneAssistU;
	var dt2 = alum.alumneAssistD;

		console.log(alumneId);


//TO ISO DATE 1

	darr1 = dt1.split("/");    // ["29", "1", "2016"]
	var data1 = new Date(parseInt(darr1[2]),parseInt(darr1[1])-1,parseInt(darr1[0]));
	                         // Date {Fri Jan 29 2016 00:00:00 GMT+0530(utopia standard time)
	var data1Iso = data1.toISOString();
	var data1IsoFull = 'ISODate("'+ data1Iso +'")';
	console.log(data1Iso);
	                         //2016-01-28T18:30:00.000Z


//TO ISO DATE 2

	darr2 = dt2.split("/");    // ["29", "1", "2016"]
	var data2 = new Date(parseInt(darr2[2]),parseInt(darr2[1])-1,parseInt(darr2[0]));
	                         // Date {Fri Jan 29 2016 00:00:00 GMT+0530(utopia standard time)
	var data2Iso = data2.toISOString();
	var data2IsoFull = 'ISODate("'+ data2Iso +'")';
	console.log(data2Iso);
	                         //2016-01-28T18:30:00.000Z

//BUSCA EL ALUMNO FILTRANDO FECHAS
	models.Alumne.findOne({_id:alumneId},
			function(error, alumne){
		if (error) {
			return res.json(error);
		} else {

			console.log(alumne.assist);
			console.log(moment());

//BORRAR FECHAS ANTERIORES Y POSTERIORES

			//		moment(alumne.assist[i].dataIso).isBetween(data1Iso, data2Iso);


		var data1IsoL = moment(dt1, 'DD/MM/YYYY').format();
		var data2IsoL = moment(dt2, 'DD/MM/YYYY').format();

		for (var i =0; i<alumne.assist.length; i ++) {

			var dataAlumne = moment(alumne.assist[i].date,'DD/MM/YYYY').format();
			if (moment(dataAlumne).isBetween(data1IsoL, data2IsoL)){

					console.log('SI: ' + dataAlumne);
		
				} else {
					console.log('NO: ' + dataAlumne);

					alumne.assist.splice(i,1);
					i = i-1;

				}
			};

			console.log('FINAL: ' + alumne.assist);
			console.log(dataAlumne);
			console.log(data1IsoL);
			console.log(data2IsoL);

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
				doc.text("ESCOLA MONTSERRAT VAYREDA",{
					align: 'center',
					underline: 1
				});
				doc.text("Control d'assistència",{
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

				//TOTAL FALTES
				doc.text("FALTES D'ASSISTÈNCIA");
				doc.moveDown(0.5);
		
				var faltes = 0;
	            for (var i = 0; i < alumne.assist.length; i++) {
	              	if (alumne.assist[i].mati == 'falta' && alumne.assist[i].tarda == 'falta'){
	               		faltes += 1;
	                	doc.text(alumne.assist[i].date + ': falta tot el dia');

	                } else{

	                	if (alumne.assist[i].mati == 'falta'){
	                		faltes += 0.5;
	               		    doc.text(alumne.assist[i].date + ': falta matí');
	               		}
	               		if (alumne.assist[i].tarda == 'falta') {
	               		    faltes += 0.5;
	               		    doc.text(alumne.assist[i].date + ': falta tarda');
	               		}
	               	}
	            };
					
				doc.moveDown(0.5);
	            doc.text('Total faltes: ' + faltes);
	            doc.moveDown(3);
		
				//TOTAL RETARDS
				doc.text("RETARDS");
				doc.moveDown(0.5);
		
	            var retards = 0;
	            for (var i = 0; i < alumne.assist.length; i++) {
	              	if (alumne.assist[i].mati == 'retard' && alumne.assist[i].tarda == 'retard'){
	                	retards += 2;
	                	doc.text(alumne.assist[i].date + ': retard matí i tarda');

	                } else{
	                	
		                if (alumne.assist[i].mati == 'retard'){
		               		retards += 1;
		               		doc.text(alumne.assist[i].date + ': retard matí');
		               	}
		          		if (alumne.assist[i].tarda == 'retard') {
		               		retards += 1;
		               		doc.text(alumne.assist[i].date + ': retard tarda');
		               	}
		            }
	            };
					
				doc.moveDown(0.5);
	            doc.text('Total retards: ' + retards);

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
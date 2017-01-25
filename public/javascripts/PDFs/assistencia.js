var models = require('../../../models/index');
var moment = require('moment');

moment.locale('ca');

exports.PDF = function (req, res) {

	var alum = req.body;
	var alumneId = alum.alumneId;

	var dt1 = alum.alumneAssistU;
	var dt2 = alum.alumneAssistD;

		console.log(alumneId);



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
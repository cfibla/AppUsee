var models = require('../../../models/index');

exports.PDF = function (req, res) {

	var alum = req.body;
	var alumneId = alum.alumneId;

	var data1 = alum.alumneAssistU;
	var data2 = alum.alumneAssistD;

	//TO ISO DATE
/*
	var str = "29-1-2016";
	darr = str.split("-");    // ["29", "1", "2016"]
	var dobj = new Date(parseInt(darr[2]),parseInt(darr[1])-1,parseInt(darr[0]));
	                         // Date {Fri Jan 29 2016 00:00:00 GMT+0530(utopia standard time)
	console.log(dobj.toISOString());
	                         //2016-01-28T18:30:00.000Z
*/
	console.log(data1);
	console.log(data2);


	console.log(alumneId);
	console.log(alum);

	models.Alumne.findById(alumneId,
		{
			'assist.date':{
				$gte: data1,
				$lt: data2
			}
		},
		function(error, alumne){
		if (error) {
			return res.json(error);
		} else {
			
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
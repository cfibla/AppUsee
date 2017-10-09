var models = require('../../../models/index');

exports.PDF = function (req, res) {
	var alumneId = req.params.id;
	var i = req.params.i;
	models.Alumne.findById(alumneId, function(error, alumne){
		if (error) {
			return res.json(error);
		} else {
			console.log(alumne);
				//require dependencies
				var PDFDocument = require ('pdfkit');

				var fs = require('fs');
				var doc = new PDFDocument();
				var tempFile = ('temp/reunionsPares.pdf');

				//FORMAT DATA NAIXEMENT
				var dataNa = alumne.dataNaixement;
				var dd = dataNa.getDate();
				var mm = dataNa.getMonth()+1; //January is 0!
				var yyyy = dataNa.getFullYear();
				if(dd<10) {
					dd='0'+dd
					}
				if(mm<10) {
					mm='0'+mm
					}
				dataNa = dd+'/'+mm+'/'+yyyy;

				var nom = alumne.nomAlumne + ' ' + alumne.cognomAlumne1 + ' ' + alumne.cognomAlumne2;

					//PDFkit
					//creating a new PDF object
					writeStream = fs.createWriteStream(tempFile);
					doc.pipe(writeStream);  //creating a write stream
								//to write the content on the file system

					//PAG. 1
					//TITOL
					doc.text('REUNIONS AMB PARES',{
						align: 'center',
						underline: 1
					});
					doc.text('Escola Montserrat Vayreda',{
						align: 'center'
					});
					doc.moveDown(2.5);

					//DADES ALUMNE
					doc.text('DADES PERSONALS');
					doc.moveDown(0.5);
					doc.text('Nom: '+ nom);
					doc.text('Data de naixement: '+ dataNa);
					doc.text('Targeta de la Seguretat Social: '+ alumne.seguretatSoc);
					doc.text('Tutor: ' + alumne.reunionsPares[i].creat);
					doc.text('Curs: ' + alumne.reunionsPares[i].curs);
					doc.moveDown(1.5);

					doc.text('DADES DE LA REUNIÓ');
					doc.moveDown(0.5);
					doc.text('Data de la reunió: ' + alumne.reunionsPares[i].date);
					doc.text('Convocada per: ' + alumne.reunionsPares[i].convocada);
					doc.text('Assistents: ' + alumne.reunionsPares[i].assistencia);
					doc.text('Composició familiar: ' + alumne.reunionsPares[i].composicio);
					doc.moveDown(1.5);

					doc.text('TEMES TRACTATS');
					doc.moveDown(0.5);
					var body = alumne.reunionsPares[i].body;
					var bodyOk = body.replace(/\r\n|\r/g, '\n');
					doc.text(bodyOk);
					doc.moveDown(1.5);

					doc.text('CONCLUSIONS');
					doc.moveDown(0.5);
					var concl = alumne.reunionsPares[i].conclusions;
					var conclOk = concl.replace(/\r\n|\r/g, '\n');
					doc.text(conclOk);
					doc.moveDown(0.5);

/*
					doc.text('Altres coordinacions - Coordinacions amb tutors', {underline: 1});
					doc.moveDown(0.5);
					for (i = 0; i < alumne.segAltresCoord.length; i++) {
						var dataCoor = alumne.segAltresCoord[i].date;
						var bodyCoor = alumne.segAltresCoord[i].body;
						var bodyCoorC = bodyCAD.replace(/\r\n|\r/g, '\n');
						doc.text(dataCoor);
						doc.text(bodyCoorC);
						doc.moveDown();
						};

*/
					doc.end(); //we end the document writing.

		}
		writeStream.on('finish', function(){                

					var fs = require('fs');
					var tempFile = ('temp/reunionsPares.pdf');
					fs.readFile(tempFile, function (error,data){
									res.contentType("application/pdf");
									res.send(data);
									});
				});
	});


}
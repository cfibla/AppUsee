var models = require('../../../models/index');

exports.PDF = function (req, res) {
	var alumneId = req.params.id;
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
					doc.text('FITXA SEGUIMENT ALUMNES EE-USEE',{
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
					doc.moveDown(1.5);


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


					doc.end(); //we end the document writing.

		}
		writeStream.on('finish', function(){                

					var fs = require('fs');
					var tempFile = ('temp/PDF_EE_temp.pdf');
					fs.readFile(tempFile, function (error,data){
									res.contentType("application/pdf");
									res.send(data);
									});
				});
	});


}
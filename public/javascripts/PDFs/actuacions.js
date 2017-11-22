var models = require('../../../models/index');

exports.PDF = function (req, res) {
	var alumneId = req.params.id;
	var i = req.params.i;
	models.Alumne.findById(alumneId, function(error, alumne){
		if (error) {
			return res.json(error);
		} else {
				//require dependencies
				var PDFDocument = require ('pdfkit');

				var fs = require('fs');
				var doc = new PDFDocument();
				var tempFile = ('temp/actuacions.pdf');

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
					doc.text('ACTUACIONS AMB ALUMNES',{
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

					doc.text('ACTUACIÓ');
					doc.moveDown(0.5);
					doc.text("Data de l'actuació: " + alumne.segActuacions[i].date);
					doc.moveDown(1.5);

					doc.text('ACTUACIÓ REALITZADA');
					doc.moveDown(0.5);
					var body = alumne.segActuacions[i].body;
					var bodyOk = body.replace(/\r\n|\r/g, '\n');
					doc.text(bodyOk);
					doc.moveDown(1.5);

					doc.end(); //we end the document writing.

		}
		writeStream.on('finish', function(){                

					var fs = require('fs');
					var tempFile = ('temp/actuacions.pdf');
					fs.readFile(tempFile, function (error,data){
									res.contentType("application/pdf");
									res.send(data);
									});
				});
	});


}
var models = require('../models/index');


//Llstat d'alumnes - GET
exports.list = function (req, res) {
	models.Alumne.find({tutor: req.session.user})
	.populate('escola tutor')
	.exec(function(error, docs){
		if (error){
			console.log(error);
		} else {
			res.render('index',{Alumnes: docs});
			}
	});

};

//Altes d'alumnes - GET
exports.alta = function (req, res) {

	res.render('nou_alumne', {errorAlta:''});
};

//Altes d'alumnes - POST
exports.create = function (req, res){

	var alum = req.body;

	if (!alum.nom||!alum.cognom1||!alum.naixement||!alum.sSocial){
		models.Alumne.find(function(error, docs){
		if (error){
			console.log(error);
		} else {
			res.render('nou_alumne', {errorAlta:"Heu d'emplenar apartats"});
			};
		});
	} else {
		models.Escola.find({"_id": 17008237}, function(error, esc){
		if (error){
			console.log(error);
		} else {

	var nouAlumne = new models.Alumne({
		nomAlumne: alum.nom,
		cognomAlumne1: alum.cognom1,
		cognomAlumne2: alum.cognom2,
		dataNaixement: alum.naixement,
		seguretatSoc: alum.sSocial,

		codiEscola: req.session.user.escola,
		curs: alum.curs,
		eeUsee: alum.eeUsee,

		escola: req.session.user.escola,
		tutor: req.session.user

	});
	nouAlumne.save(function(error, alumne){
		if (error) res.json(error);
	});
	res.redirect('/list');
	};
});
}
};

//Modificar dades - GET
exports.mod = function (req, res) {
	var alumneId = req.params.id;
	models.Alumne.findById(alumneId, function(error, alumne){
		if (error) {
			return res.json(error);
		} else {
			res.render('dades_mod', {alumne: alumne});
		}
	});
};

//Modificar dades - PUT
exports.update = function (req, res){

	var alumneId = req.params.id;
	var alum = req.body;

	models.Alumne.findByIdAndUpdate(alumneId,
									{$set:{
										'checks':[],
										'radios':[]},
										altresEsp:'',
										atServPrivats:'',
										percentDim:'',
										motiuDic:'',
										anyVal:'',
										derivacio:'',
										motiuDer:'',


									}, function(error, alumne){
										if (error){
											return res.json(error);
										}
									});

	delete alum.id;
	delete alum._id;



	models.Alumne.findByIdAndUpdate(alumneId, alum, {new: true, safe: true, upsert: true},

		function (error, alumne){
		if (error) res.json(error);
		res.redirect('/list');
	});

	};

//Assistència d'alumnes
exports.assis = function (req, res) {
	models.Alumne.find({tutor: req.session.user})
	.populate('escola tutor')
	.exec(function(error, docs){
		if (error){
			console.log(error);
		} else {
			res.render('assistencia',{Alumnes: docs});
			}
	});

};


//IMPRIMIR PDF
exports.print = function (req, res) {
	var alumneId = req.params.id;
	models.Alumne.findById(alumneId, function(error, alumne){
		if (error) {
			return res.json(error);
		} else {
				//require dependencies
				var PDFDocument = require ('pdfkit');
				var fs = require('fs');
				var doc = new PDFDocument();
				var tempFile = ('temp/PDFtemp.pdf');

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


                //FORMAT CHECKS
                var checksArr = [];
                for (var i = 0; i <= 25; i++) {
                	if (alumne.checks[i] === true){
                		checksArr[i] = 'SI';
                	} else {
                		checksArr[i] = 'no';

                	}
                };

                //FORMAT RADIOS
                var radiosArr = [];
                for (var i = 0; i < alumne.radios.length; i++) {
                	if (alumne.radios[i] === true){
                		radiosArr[i] = 'SI';
                	} else {
                		radiosArr[i] = 'no';

                	}
                };

					var nom = alumne.nomAlumne + ' ' + alumne.cognomAlumne1 + ' ' + alumne.cognomAlumne2;

					//PDFkit
                    //creating a new PDF object
					doc.pipe(fs.createWriteStream(tempFile));  //creating a write stream
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

					//ATENCIÓ EE-USEE
					doc.text('ATENCIÓ EE-USEE');
					doc.moveDown(0.5);

					doc.text('Seguiment atenció a la diversitat', {underline: 1});
					doc.text('   Directe   '+ checksArr[0]);
					doc.text('   Indirecte  '+ checksArr[1]);
					doc.moveDown(0.5);

					doc.text('Atenció', {underline: 1});
					doc.text('   AiLL  '+ checksArr[2]);
					doc.text('   EE    '+ checksArr[3]);
					doc.text('   USEE  '+ checksArr[4]);
					doc.moveDown(0.5);

					doc.text('Seguiment serveis externs', {underline: 1});
					doc.text('   EAP     '+ checksArr[5]);
					doc.text('   TS EAP  '+ checksArr[6]);
					doc.text('   CREDAG  '+ checksArr[7]);
					doc.text('   CREDV   '+ checksArr[8]);
					doc.text('   CSMIJ   '+ checksArr[9]);
					doc.text('   SDTIC   '+ checksArr[10]);
					doc.text('   CDIAP   '+ checksArr[11]);
					doc.moveDown(0.5);

					doc.text('Seguiment mèdic', {underline: 1});
					doc.text('   Pediatria       '+ checksArr[12]);
					doc.text('   Neuropediatria  '+ checksArr[13]);
					if (alumne.checks[14] === true){
						doc.text('   Altres especialitats: ' + alumne.altresEsp);
					};
					doc.text('   Atenció serveis privats:  '+ alumne.atServPrivats);
					doc.moveDown(0.5);

					doc.text('   Repetició  '+ radiosArr[0]);
					doc.text('   Beca       '+ radiosArr[1]);
					if (alumne.radios[2] === true){
						doc.text('   Certificat disminució: ' + alumne.percentDim);
					};
					if (alumne.radios[3] === true){
						doc.text('   Dictamen: ' + alumne.motiuDic);
					};
					if (alumne.radios[4] === true){
						doc.text('   Any valoració EAP: ' + alumne.anyVal);
					};
					doc.addPage();

					//PAG. 2
					//ADAPTACIONS
					doc.text('ADAPTACIONS');
					doc.moveDown(0.5);

					doc.text('Programació individualitzada (P.I.)', {underline: 1});
					if (alumne.checks[15] !== true){
						doc.text('   Curricular:   ' + checksArr[16]);
						doc.text('   Metodològica: ' + checksArr[17]);
						doc.text('   Conductual:   ' + checksArr[18]);
					} else {
						doc.text('   No');
					};
					doc.moveDown(0.5);

					doc.text('Àrees Adaptades', {underline: 1});
					doc.text('   Català           '+ checksArr[19]);
					doc.text('   Castellà         '+ checksArr[20]);
					doc.text('   Matemàtiques     '+ checksArr[21]);
					doc.text('   Medi Natural     '+ checksArr[22]);
					doc.text('   Medi Social      '+ checksArr[23]);
					doc.text('   Educació Física  '+ checksArr[24]);
					doc.text('   Àrea Artística   '+ checksArr[25]);
					doc.moveDown(0.5);

					doc.text('Material diferenciat a les àrees adaptades  '+ radiosArr[5]);
					doc.text('Adequació de continguts                     ' + radiosArr[6]);
					doc.moveDown(0.5);
					if (alumne.radios[7] === true){
						doc.text('Full de derivació:  ' + radiosArr[7]);
						doc.text('  Demanat per ' + alumne.derivacio);
						doc.text('  Motiu: ' + alumne.motiuDer);
					} else {
						doc.text('   Full de derivació:  ' + 'no');
					};
					//doc.addPage();
					doc.moveDown(2);

					//SEGUIMENT ALUMNE
					doc.text('SEGUIMENT ALUMNE');
					doc.moveDown(0.5);

					doc.text('Actuacions', {underline: 1});
					doc.moveDown(0.5);
					for (i = 0; i < alumne.segActuacions.length; i++) {
						doc.text(alumne.segActuacions[i].date);
						doc.text(alumne.segActuacions[i].body);
						doc.moveDown();
                        };

					doc.text('Informació CAD', {underline: 1});
					doc.moveDown(0.5);
					for (i = 0; i < alumne.segInformacioCAD.length; i++) {
						doc.text(alumne.segInformacioCAD[i].date);
						doc.text(alumne.segInformacioCAD[i].body);
						doc.moveDown();
                        };

                    doc.text('Altres coordinacions - Coordinacions amb tutors', {underline: 1});
					doc.moveDown(0.5);
					for (i = 0; i < alumne.segAltresCoord.length; i++) {
						doc.text(alumne.segAltresCoord[i].date);
						doc.text(alumne.segAltresCoord[i].body);
						doc.moveDown();
                        };


					doc.end(); //we end the document writing.

		}
	});
					var fs = require('fs');
					var tempFile = ('temp/PDFtemp.pdf');
					fs.readFile(tempFile, function (err,data){
								    res.contentType("application/pdf");
								    res.send(data);
								    });
};

//Suprimir alumne - VIEW
exports.suprV = function (req, res) {
	var alumneId = req.params.id;
	models.Alumne.findById(alumneId, function(error, alumne){
		if (error) {
			return res.json(error);
		} else {
			res.render('delete_view', {alumne: alumne});

		}
	});
};

//Suprimir alumne - DELETE
exports.suprD = function (req, res) {

	var alumneId = req.params.id;
	models.Alumne.findByIdAndRemove(alumneId, function(error, alumne){
		if (error){
			return res.json(error);
		} else {
			res.redirect('/list');
			}
	});
};

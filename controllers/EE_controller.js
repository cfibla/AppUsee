var models = require('../models/index');

/* GET home page. */
exports.login = function(req, res) {
	res.render('login', { title: 'AppEscola' });
};


//Llstat d'alumnes - GET
exports.list = function (req, res) {
	models.Alumne.find(function(error, docs){
		if (error){
			console.log(error);
		} else {
			res.render('index',{Alumnes: docs});
			}
	});
	
};

//Altes d'alumnes - POST
exports.alta = function (req, res) {
	
	res.render('dades_alta', {errorAlta:''});
};


exports.create = function (req, res){
	var alum = req.body;
	

	if (!alum.nom||!alum.cognom1||!alum.cognom2||!alum.naixement||!alum.sSocial){
		models.Alumne.find(function(error, docs){
		if (error){
			console.log(error);
		} else {
			res.render('dades_alta', {errorAlta:"Heu d'emplenar tots els apartats"});
			};
		});
	} else {


	var nouAlumne = new models.Alumne({
		nomAlumne: alum.nom,
		cognomAlumne1: alum.cognom1,
		cognomAlumne2: alum.cognom2,
		dataNaixement: alum.naixement,
		seguretatSoc: alum.sSocial
	});
	nouAlumne.save(function(error, alumne){
		if (error) res.json(error)
	});
		res.redirect('/list');
	};
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

//SEGUIMENT GET
exports.actuaGet = function (req, res) {
	var alumneId = req.params.id;
	models.Alumne.findById(alumneId, function(error, alumne){
		if (error) {
			return res.json(error);
		} else {
			res.render('seg_act', {alumne: alumne});
			
		}
	});
};


//SEGUIMENT POST
exports.actuaPost = function (req, res) {

		var alumneId = req.params.id;
		var alum = req.body;

		models.Alumne.findByIdAndUpdate(alumneId, alum, {new: true, safe: true, upsert: true},

		function (error, alumne){
		if (error) res.json(error);
		res.redirect('/list');
	});

}

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
                for (var i = 0; i < alumne.checks.length; i++) {
                	if (alumne.checks[i] === true){
                		checksArr[i] = 'X';
                	} else {
                		checksArr[i] = ' ';

                	}
                };
				console.log(checksArr);

					var nom = alumne.nomAlumne + ' ' + alumne.cognomAlumne1 + ' ' + alumne.cognomAlumne2;

                    //creating a new PDF object
					doc.pipe(fs.createWriteStream(tempFile));  //creating a write stream 
					            //to write the content on the file system

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
					doc.text('Dades personals', {underline: 1});

					doc.text('Nom: '+ nom);
					doc.text('Data de naixement: '+ dataNa);
					doc.text('Targeta de la Seguretat Social: '+ alumne.seguretatSoc);
					doc.moveDown(1.5);

					//ATENCIÓ EE-USEE
					doc.text('Atenció EE-USEE', {underline: 1});
					doc.text('Seguiment atenció a la diversitat');
					doc.text('Directe: '+ checksArr[0]);
					doc.text('Indirecte: '+ checksArr[1]);
					doc.text('Atenció');
					doc.text('AiLL: '+ checksArr[2]);
					doc.text('EE: '+ checksArr[3]);
					doc.text('USEE: '+ checksArr[4]);





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
var models = require('../models/index');


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
			res.render('dades_alta', {errorAlta:'Tots els camps són obligatoris'});
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
		res.redirect('/');
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

	delete alum.segActuacions;
	delete alum.segInformacioCAD;
	delete alum.segAltresCoord;

	console.log(alumneId);
	console.log(alum);

	
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


	


	models.Alumne.findByIdAndUpdate(alumneId, {$set:{
										['checks']:['alum.checks.$'],
										['radios']:['alum.radios.$']
										},
										altresEsp:'',
										atServPrivats:'',
										percentDim:'',
										motiuDic:'',
										anyVal:'',
										derivacio:'',
										motiuDer:'',
										
									
									}, {new: true, safe: true, upsert: true},

		function (error, alumne){
		if (error) res.json(error);
		res.redirect('/');
	});

	};


//Suprimir alumne - DELETE
exports.supr = function (req, res) {
	
	var alumneId = req.params.id;
	models.Alumne.findByIdAndRemove(alumneId, function(error, alumne){
		if (error){
			return res.json(error);
		} else {
			res.redirect('/');
			}
	});
};
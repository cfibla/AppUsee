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
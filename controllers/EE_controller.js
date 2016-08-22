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
	console.log(alum);

	//alum.segActuacions = [];
	//alum.segInformacioCAD = [];
	//alum.segAltresCoord = [];
	

	
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
	

	models.Alumne.findByIdAndUpdate(alumneId,
									{
										$set: {
										"checks":[
										'alum.checks[0]',
										'alum.checks[1]',
										'alum.checks[2]',
										'alum.checks[3]',
										'alum.checks[4]',
										'alum.checks[5]',
										'alum.checks[6]',
										'alum.checks[7]',
										'alum.checks[8]',
										'alum.checks[9]',
										'alum.checks[10]',
										'alum.checks[11]',
										'alum.checks[12]',
										'alum.checks[13]',
										'alum.checks[14]',
										'alum.checks[15]',
										'alum.checks[16]',
										'alum.checks[17]',
										'alum.checks[18]',
										'alum.checks[19]',
										'alum.checks[20]',
										'alum.checks[21]',
										'alum.checks[22]',
										'alum.checks[23]',
										'alum.checks[24]',
										'alum.checks[25]',
										],
										"radios":[
										'alum.radios[0]',
										'alum.radios[1]',
										'alum.radios[2]',
										'alum.radios[3]',
										'alum.radios[4]',
										'alum.radios[5]',
										'alum.radios[6]',
										'alum.radios[7]',

										] },
										altresEsp: alum.altresEsp,
										atServPrivats: alum.atServPrivats,
										percentDim: alum.percentDim,
										motiuDic: alum.motiuDic,
										anyVal: alum.anyVal,
										derivacio: alum.derivacio,
										motiuDer: alum.motiuDer,

										
									
									}, {multi:true, new: true, safe: true, upsert: true},

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
var models = require('../models/index');


//Llstat d'alumnes EE- GET
exports.list = function (req, res) {
	models.Alumne.find({'eeUsee': true, 'escola': req.session.user.escola})
	.populate('escola ee')
	.exec(function(error, docs){
		if (error){
			console.log(error);
		} else {
			res.render('index',{Alumnes: docs});
			}
	});

};

//Altes d'alumnes EE- GET
exports.alta = function (req, res) {

	res.render('nou_alumne_EE', {errorAlta:''});
};

//Altes d'alumnes EE- POST
exports.create = function (req, res){

	var alum = req.body;


	if (!alum.nom||!alum.cognom1){
		models.Alumne.find(function(error, docs){
		if (error){
			console.log(error);
		} else {
			res.render('nou_alumne_EE', {errorAlta:"Heu d'introduir nom i cognom com a mínim"});
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
				eeUsee: true,

				escola: req.session.user.escola,
				ee: req.session.user,

				assist: [{
				date: "",
				mati: "",
				tarda: ""

				}],

			});

			nouAlumne.save(function(error, alumne){
				if (error) res.json(error);
			});
			res.redirect('/list_EE');
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
			res.render('dades_mod_EE', {alumne: alumne});

		}
	});
};

//Modificar dades - PUT
exports.update = function (req, res){

	var alumneId = req.params.id;
	var alum = req.body;
	var upp = alum.cognomAlumne2.toUpperCase();


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

	alum.cognomAlumne2 = upp;


	models.Alumne.findByIdAndUpdate(alumneId, alum, {new: true, safe: true, upsert: true},

		function (error, alumne){
		if (error) 
			return res.json(error);
		res.redirect('/list_EE');
	});

	};

//SEGUIMENT GET
exports.actuaGet = function (req, res) {
	var alumneId = req.params.id;
	models.Alumne.findById(alumneId, function(error, alumne){
		if (error) {
			return res.json(error);
		} else {
			res.render('seg_act_EE', {alumne: alumne});

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
		res.render('seg_act_EE', {alumne: alumne});
	});

}

//SEG_ACTUACIONS UPDATE
exports.actuaUpdate = function (req, res) {
	var alumneId = req.params.id;
	var alumneI = req.params.i;
	var alum = req.body;

	models.Alumne.findByIdAndUpdate(alumneId, alum, {multi: true, safe: true, upsert: true},

	function (error, alumne){
		if (error) res.json(error);
		res.render('seg_act_EE', {alumne: alumne});
	});

}

//SEG_ACTUACIONS DELETE
exports.actuaDelete = function (req, res) {
	var alumneId = req.params.id;
	var alumneI = req.params.i;

	models.Alumne.findOne({_id: alumneId}, function (error, alumne){
		if (error) res.json(error);
		alumne.segActuacions.splice(alumneI,1);
		alumne.save(function(error){
			if (error) {res.json(error);
		} else{
			res.render('seg_act_EE', {alumne: alumne});
		};
		});

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
	models.Alumne.findByIdAndUpdate(alumneId, {'eeUsee': false}, {new: true}, function(error, alumne){
		if (error){
			return res.json(error);
		} else {
			res.redirect('/list');
			}
	});
};

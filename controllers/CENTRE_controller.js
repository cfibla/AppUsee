var models = require('../models/index');

// Nova escola GET
exports.nouCentre = function(req, res) {
		res.render('nou_escola', {errorAlta:""});
	};

// Nova escola POST
exports.createCentre = function (req, res){

	var escola = req.body;
	
	if (!escola.codi||!escola.password||!escola.nom||!escola.telefon
		||!escola.email||!escola.adreca||!escola.codiPostal||!escola.poblacio||!escola.provincia){
		models.Centre.find(function(error, docs){
		if (error){
			console.log(error);
		} else {
			res.redirect('/');
			};
		});
	} else {

	var nouEscola = new models.Centre({
		codi: escola.codi,
		password: escola.password,
		nom: escola.nom,
		telefon: escola.telefon,
		email: escola.email,
		adreca: escola.adreca,
		codiPostal: escola.codiPostal,
		poblacio: escola.poblacio,
		provincia: escola.provincia
	});


	nouEscola.save(function(error, scola){
		if (error) {
			res.json(error)
		} else {
			res.redirect('/');
		}
	});
	};
};

exports.centreMain = function(req, res) {
		res.render('centre-main');
	};
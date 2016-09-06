var models = require('../models/index');

// Nova escola GET
exports.nouEscola = function(req, res) {
		res.render('nou_escola', {errorAlta:""});
	};

// Nova escola POST
exports.createEscola = function (req, res){

	var escola = req.body;
	
	if (!escola._id||!escola.password||!escola.nom||!escola.telefon
		||!escola.email||!escola.adreca||!escola.codiPostal||!escola.poblacio||!escola.provincia){
		models.Escola.find(function(error, docs){
		if (error){
			console.log(error);
		} else {
			res.render('nou_escola', {errorAlta:"Heu d'emplenar tots els apartats"});
			};
		});
	} else {

	var nouEscola = new models.Escola({
		_id: escola._id,
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
		if (error) res.json(error)
	});
		res.redirect('/');
	};
};
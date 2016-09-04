var models = require('../models/index');

// Nou user GET
exports.nouUser = function(req, res) {
		res.render('nou_usuari', {errorAlta:""});
	};

// Nou user POST
exports.createUser = function (req, res){

	var user = req.body;
	
	if (!user.email||!user.nom||!user.cognom||!user.password){
		models.User.find(function(error, docs){
		if (error){
			console.log(error);
		} else {
			res.render('nou_usuari', {errorAlta:"Heu d'emplenar tots els apartats"});
			};
		});
	} else {

	var nouUser = new models.User({
		email: user.email,
		nom: user.nom,
		cognom: user.cognom,
		password: user.password,
		escola: user.escola,
		tutor:user.tutor,
		especialista: user.especialista,
		eeUsee: user.eeUsee
	});
		if (nouUser.escola === true) {
			nouUser.idEscola = nouUser.email 
		};

		if (nouUser.tutor === true) {
			nouUser.idTutor = nouUser.email 
		};

		if (nouUser.especialista === true) {
			nouUser.idEspecialista = nouUser.email 
		};

		if (nouUser.eeUsee === true) {
			nouUser.idEeUsee = nouUser.email 
		};

	nouUser.save(function(error, user){
		if (error) res.json(error)
	});
		res.redirect('/list');
	};
};
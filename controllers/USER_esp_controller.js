var models = require('../models/index');

// Nou user GET
exports.nouUser = function(req, res) {
		res.render('nou_usuari', {errorAlta:""});
	};

// Nou user POST
exports.createUser = function (req, res){

	var user_ESP = req.body;
	
	if (!user.email||!user.nom||!user.cognom||!user.password){
		models.User.find(function(error, docs){
		if (error){
			console.log(error);
		} else {
			res.render('nou_usuari', {errorAlta:"Heu d'emplenar tots els apartats"});
			};
		});
	} else {

	var nouUser_ESP = new models.UserEsp({
		email: user_ESP.email,
		nom: user_ESP.nom,
		cognom: user_ESP.cognom,
		password: user_ESP.password,

		mestre: 'esp',

		escola: user_ESP.escola
	});


	nouUser_ESP.save(function(error, user){
		if (error) res.json(error)
	});
		res.redirect('/list');
	};
};
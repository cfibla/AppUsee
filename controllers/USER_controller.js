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
		
		mestre: 'tutor',
		curs: user.curs,

		escola: user.escola
	});


	nouUser.save(function(error, user){
		if (error) res.json(error)
	});
		res.redirect('/list');
	};
};

exports.profile = function (req, res){
	var userId = req.params.id;
	models.User.findById(userId, function(error, usuari){
		if (error) {
			return res.json(error);
		} else {
			res.render('usuari', {usuari: usuari});
		}
	});
};
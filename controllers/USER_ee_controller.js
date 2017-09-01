var models = require('../models/index');

// Nou user GET
exports.nouUser = function(req, res) {
		res.render('nou_usuari_EE', {errorAlta:""});
	};

// Nou user POST
exports.createUser = function (req, res){

	var user_EE = req.body;
	var escolaId = user_EE.escola;
	
	if (!user_EE.email||!user_EE.nom||!user_EE.cognom||!user_EE.password){
		models.UserEe.find(function(error, docs){
		if (error){
			console.log(error);
		} else {
			res.render('nou_usuari_EE', {errorAlta:"Heu d'emplenar tots els apartats"});
			};
		});
	} else {

	var nouUser_EE = new models.UserEe({
		email: user_EE.email,
		nom: user_EE.nom,
		cognom: user_EE.cognom,
		password: user_EE.password,

		mestre: 'ee',		

		escola: user_EE.escola
	});


	nouUser_EE.save(function(error, user){
		if (error){
			res.json(error);
		} else {
//login
			var email = user.email;
			var password = user.password;

			
			models.UserEe.findOne({email: email, password: password}, function(error, user){
				if(error){
					console.log(error);
				}
				if(!user) {
					console.log('NO USER');
				} else {
					req.session.user = user;
					models.Alumne.find(function(error, docs){
					if (error){
						console.log(error);
					} else {
						res.redirect('/list_EE');
						}
					});
				}
			});
		}

	});
//crea escola
	models.Centre.findById(escolaId, function(error, escola){
		if (!escola){
		var nouEscola = new models.Centre({
			_id: user_EE.escola,
			nom: user_EE.escolanom
		});
	
		nouEscola.save(function(error, scola){
			if (error) res.json(error)
		});
		}
	});
}};

//UPDATE user profile
exports.update = function (req, res){

	var userId = req.params.id;
	var usuari = req.body;

	models.UserEe.findByIdAndUpdate(userId, usuari, {new: true, safe: true, upsert: true},
	function (error, usuari){
		if (error) {
			return res.json(error);
		} else {
			res.render('usuari', {usuari: usuari});
		}
	});
};

//DELETE user
exports.delUser = function (req, res) {

	var userId = req.params.id;
	models.UserEe.findByIdAndRemove(userId, function(error, user){
		if (error){
			return res.json(error);
		} else {
			res.redirect('/');
			}
	});
};
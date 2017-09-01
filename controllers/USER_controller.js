var models = require('../models/index');

// Nou user GET
exports.nouUser = function(req, res) {
		res.render('nou_usuari', {errorAlta:""});
	};

// Nou user POST
exports.createUser = function (req, res){
	console.log('rebut req: ' + req.body);
	var user = req.body;
	var escolaId = user.escola;
	console.log('rebut user: ' + user);
	console.log('rebut escolaId: ' + escolaId);
//	if (!user.email||!user.nom||!user.cognom||!user.password){
		console.log('IF USER');
		models.User.find(function(error, docs){
			console.log('USER FIND');
		if (error){
			res.json(error);
			console.log(error);
		} else {
			console.log('DOCS 1: '+ docs);
			var nouUser = new models.User({
				email: user.email,
				nom: user.nom,
				cognom: user.cognom,
				password: user.password,
				
				mestre: 'tutor',
				curs: user.curs,

				escola: user.escola,
//				centre: user.escola
			});
			nouUser.save(function (error, user){
				if (error) {
					res.json(error);
				} else {
					console.log('LOGIN USER: '+ user);
				//login
					var email = user.email;
					var password = user.password;

					models.User.findOne({email: email, password: password}, function(error, user){
						if(error){
							console.log(error);
						} else {
							req.session.user = user;
						}
					})
				}
				
			});
			//crea escola
			models.Centre.findById(escolaId, function(error, escola){
				if (!escola){
				console.log('NO ESCOLA: '+ escola);
				var nouEscola = new models.Centre({
					codi: user.escola,
					nom: user.escolanom
				});
			
				nouEscola.save(function(error, scola){
					if (error) res.json(error)
				});
				} else {
					console.log('SI ESCOLA: '+ scola);
					models.Alumne.find(function(error, docs){
						if (error){
							console.log(error);
						} else {
							res.render('/list',{Alumnes:docs})
						}
					});
				}
			});
		};
		});
//	};
};

//GET USER PROFILE
exports.profile = function (req, res){
	var userId = req.params.id;
	models.User.findById(userId, function(error, usuari){
		if (usuari) {
			res.render('usuari', {usuari: usuari});
		}
		if (!usuari) {
			models.UserEe.findById(userId, function(error, usuari){
			if (error) {
				return res.json(error);
			} else {
				res.render('usuari', {usuari: usuari});
			}
			});
		};
	});
};

//UPDATE user profile
exports.update = function (req, res){

	var userId = req.params.id;
	var usuari = req.body;

	models.User.findByIdAndUpdate(userId, usuari, {new: true, safe: true, upsert: true},
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
	models.User.findByIdAndRemove(userId, function(error, user){
		if (error){
			return res.json(error);
		} else {
			res.redirect('/');
			}
	});
};

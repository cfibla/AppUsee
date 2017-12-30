var models = require('../models/index');

// Nou user GET
exports.nouUser = function(req, res) {
		res.render('nou_usuari_EE', {errorAlta:""});
	};

// Nou user POST
exports.createUser = function (req, res){
	var user = req.body;
	var escolaId = user.escola;
	if (user.email && user.nom && user.cognom && user.password && user.escola){
	//crea escola
		models.Centre.findOne({codi:escolaId}, function(error, eskola){
			if (!eskola){
			var nouEscola = new models.Centre({
				codi: user.escola,
				nom: user.escolanom,
				password: "",
				telefon: 0,
				email:"",
				adreca: "",
				codiPostal: 0,
				poblacio: "",
				provincia: ""
			});
			nouEscola.save(function(error, scl){
				if (error) {
					res.json(error);
				} else {
					models.UserEe.find(function(error, docs){
					if (error){
						res.json(error);
					} else {
						var nouUser = new models.UserEe({
							email: user.email,
							nom: user.nom,
							cognom: user.cognom,
							password: user.password,
							mestre: 'ee',
							curs: user.curs,
							escola: user.escola,
							centre: scl._id
						});
						nouUser.save(function (error, user){
							if (error) {
								res.json(error);
							} else {
							//login
								var email = user.email;
								var password = user.password;

								models.UserEe.findOne({email: email, password: password}, function(error, user){
									if(error){
										res.json(error);
									} else {
										req.session.user = user;
										models.Alumne.find(function(error, docs){
											if (error){
												res.json(error);
											} else {
												res.json(docs)
											}
										});
									}
								})
							}			
						});
					};
				});
				}
			});
			} else {
				models.UserEe.find(function(error, docs){
					if (error){
						res.json(error);
					} else {
						var nouUser = new models.UserEe({
							email: user.email,
							nom: user.nom,
							cognom: user.cognom,
							password: user.password,
							mestre: 'ee',
							curs: user.curs,
							escola: user.escola,
							centre: eskola._id
						});
						nouUser.save(function (error, user){
							if (error) {
								res.json(error);					
							} else {
							//login
								var email = user.email;
								var password = user.password;

								models.UserEe.findOne({email: email, password: password}, function(error, user){
									if(error){
										res.json(error);
									} else {
										req.session.user = user;
										models.Alumne.find(function(error, docs){
											if (error){
												res.json(error);
											} else {
												res.json(docs)
											}
										});
									}
								})
							}			
						});
					};
				});
			}
		});
	};
};

//GET USER-EE PROFILE en userController

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
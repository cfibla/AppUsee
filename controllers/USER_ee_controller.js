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
			console.log('NO ESCOLA');
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
					console.log('ESCOLA ERROR: ' + error);
				} else {
					console.log('ESCOLA CREADA: ' + scl);
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
							console.log('usuari creat: '+user);
							//login
								var email = user.email;
								var password = user.password;

								models.UserEe.findOne({email: email, password: password}, function(error, user){
									if(error){
										console.log(error);
									} else {
										console.log('usuari trobat: '+user);
										req.session.user = user;
										console.log('req.session.user: '+req.session.user);
										models.Alumne.find(function(error, docs){
											console.log('ALUMNE');
											if (error){
												console.log('ALUMNE ERROR');
												console.log(error);
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
				console.log('SI ESCOLA: '+eskola);
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
								console.log('usuari creat: '+user);
							//login
								var email = user.email;
								var password = user.password;

								models.UserEe.findOne({email: email, password: password}, function(error, user){
									if(error){
										console.log(error);
									} else {
										console.log('usuari trobat: '+user);
										req.session.user = user;
										console.log('req.session.user: '+req.session.user);
										models.Alumne.find(function(error, docs){
											console.log('ALUMNE');
											if (error){
												console.log('ALUMNE ERROR');
												console.log(error);
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
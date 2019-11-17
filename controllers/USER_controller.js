const models = require('../models/index');
const bcrypt = require ('bcrypt');

// Nou user GET
exports.nouUser = function(req, res) {
		res.render('nou_usuari', {errorAlta:""});
	};

// Nou user POST
exports.createUser = function (req, res){
	let user = req.body;
	let escolaId = user.escola;
	if (user.email && user.nom && user.cognom && user.password && user.escola){

		console.log('SI USER: '+user.email);
		console.log('SI USER: '+user.password);
		console.log('SI USER: '+user.nom);
		console.log('SI USER: '+user.cognom);
		console.log('SI USER: '+user.escola);
	//crea escola
		models.Centre.findOne({codi:escolaId}, function(error, eskola){
			if (!eskola){
			let nouEscola = new models.Centre({
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
					models.User.find(function(error, docs){
					if (error){
						res.json(error);
					} else {
						let nouUser = new models.User({
							email: user.email,
							nom: user.nom,
							cognom: user.cognom,
							password: user.password,
							mestre: user.mestre,
							curs: user.curs,
							escola: user.escola,
							centre: scl._id
						});
						nouUser.password = bcrypt.hashSync(req.body.password, 10);
						nouUser.save(function (error, user){
							if (error) {
								res.json(error);
							} else {
							//login
								let email = user.email;
								let password = user.password;
								models.User.findOne({email: email, password: password}, function(error, user){
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
				models.User.find(function(error, docs){
					if (error){
						res.json(error);
					} else {
						let nouUser = new models.User({
							email: user.email,
							nom: user.nom,
							cognom: user.cognom,
							password: user.password,
							mestre: user.mestre,
							curs: user.curs,
							escola: user.escola,
							centre: eskola._id
						});
						nouUser.password = bcrypt.hashSync(req.body.password, 10);
						nouUser.save(function (error, user){
							if (error) {
								res.json(error);
								
							} else {
							//login
								let email = user.email;
								let password = user.password;

								models.User.findOne({email: email, password: password}, function(error, user){
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
	}else{
		console.log('NO USER: '+user.email);
		console.log('NO USER: '+user.password);
		console.log('NO USER: '+user.nom);
		console.log('NO USER: '+user.cognom);
		console.log('NO USER: '+user.escola);
	};
};

//GET USER / USER-EE PROFILE 
exports.profile = function (req, res){

	let userId = req.session.user._id;
	let msg =  req.flash('passwordMsg');
	
	models.User.findById(userId, function(error, usuari){
		if (usuari) {
			res.render('usuari', {usuari: usuari, passwordMsg: msg});
		}
		if (!usuari) {
			models.UserEe.findById(userId, function(error, usuari){
			if (error) {
				return res.json(error);
			} else {
				res.render('usuari', {usuari: usuari,  passwordMsg: msg});
			}
			});
		};
	});
};

//UPDATE user profile
exports.update = function (req, res){

	let userId = req.params.id;
	let usuari = req.body;

	models.User.findOne({_id:userId},
		function (error, user){
			if (error) {
				return res.json(error);
			} else {

				console.log ("ESCOLA ENVIADA: ", usuari.codiEscola);
				console.log("ESCOLA DB: ", user.codiEscola);
				console.log ("DADES VISTA: ", usuari);
				console.log ("DADES USUARI: ", user);

				if (usuari.codiEscola == user.codiEscola) {
					user.nom = usuari.nom;
					user.cognom = usuari.cognom;
					user.email = usuari.email;
					user.escola = usuari.escola;
					user.mestre = usuari.mestre;
					user.curs = usuari.curs;
					console.log("NOU USER: ", user);
					user.save(function (error, user){
						if (error) {
							res.json(error);
						} else {
							res.redirect('/usuari');
						}
					});
				} else {
					console.log('canvi escola');
					res.redirect('/usuari');
				}
			}
	});
};

//UPDATE contrasenya - GET
exports.updPwdGet = function (req, res){
	let msg =  req.flash('passwordMsg');
	res.render('contrasenya', {passwordMsg: msg});
}

//UPDATE contrasenya - POST
exports.updPwdPost = function (req, res){
	let pwd = req.body;
	let userId = req.session.user._id;

	if(pwd.password1 != pwd.password2){
		req.flash('passwordMsg', 'Les dues contrasenyes no coincideixen');
		res.redirect('/contrasenya');
	} else {
		models.User.findOne({_id:userId}, function(error, user){
			if (error){
				res.json(error);
			} else {
				user.password = bcrypt.hashSync(pwd.password1, 10);
				user.save(function (error, user){
					if (error) {
						res.json(error);
					} else {
						req.flash('passwordMsg', 'La vostra contrasenya ha estat canviada');
						res.redirect('/usuari');
					}
				});
			}
		});
	}
}

//DELETE user
exports.delUser = function (req, res) {
	let userId = req.params.id;
	models.User.findByIdAndRemove(userId, function(error, user){
		if (error){
			return res.json(error);
		} else {
			res.redirect('/');
		}
	});
};
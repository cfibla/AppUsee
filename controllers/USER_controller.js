var models = require('../models/index');

// Nou user GET
exports.nouUser = function(req, res) {
		res.render('nou_usuari', {errorAlta:""});
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
					models.User.find(function(error, docs){
					if (error){
						res.json(error);
					} else {
						var nouUser = new models.User({
							email: user.email,
							nom: user.nom,
							cognom: user.cognom,
							password: user.password,
							mestre: 'tutor',
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
						var nouUser = new models.User({
							email: user.email,
							nom: user.nom,
							cognom: user.cognom,
							password: user.password,
							mestre: 'tutor',
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
	};
};

//GET USER / USER-EE PROFILE 
exports.profile = function (req, res){
	var userId = req.session.user._id;
	console.log('USERID: '+userId);
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
//UPDATE contrasenya - GET
exports.updPwdGet = function (req, res){
	res.render('contrasenya');
}

//UPDATE contrasenya - POST
exports.updPwdPost = function (req, res){
	var pwd = req.body;
	console.log('CONTRASENYA-UPD-1: '+(pwd.password1));
	console.log('CONTRASENYA-UPD-2: '+(pwd.password2));
	res.redirect('/usuari');
}

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

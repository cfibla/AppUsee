'use strict';
var models = require('../models/index');
var bcrypt = require('bcrypt');
//var jwt = require('jsonwebtoken');

/* GET home page. */
exports.new = function(req, res) {
	if(req.session.user){
		console.log('HOME PAGE NEW');
		if(req.session.user.horari){
			horariId = req.session.user.horari;
			models.Horari.find({_id: horariId}, function(err, horari){
				if(err){
					console.log(err);
				} else {
					console.log('sessionControllerNEW');
					if(req.session.user.mestre === "tutor"){
						res.redirect('/list');
					}
					if(req.session.user.mestre === "ee"){
						res.redirect('/list_EE');
					}
				}
			})
		} else {
			if(req.session.user.mestre === "tutor"){
				res.redirect('/list');
			}
			if(req.session.user.mestre === "ee"){
				res.redirect('/list_EE');
			}	
		}
	} else {
		var msg =  req.flash('loginMsg');
		res.render('home', { loginMsg: msg, title: 'AppEscola',  page_name:'home'});
	}
};

exports.login = function (req, res, next){
	var email = req.body.email;
	var password = req.body.password;
	//var msg =  req.flash('Correu o contrasenya incorrectes');

	models.User.findOne({email: email})
	.populate('horari centre')
	.exec(function(error, user){
		if (error){
			console.log(error);
		}
		if(!user) {
			req.flash('loginMsg', "Usuari desconegut. Registreu-vos abans d'iniciar sessió");
			res.redirect('/');
			//next();
		}
		if(user) {
			if(bcrypt.compareSync(password, user.password)){
				req.session.user = user;
				if(req.session.user.horari){
					var horariId = req.session.user.horari;
					models.Horari.find({_id: horariId}, function(err, horari){
						if(err){
							console.log(err);
						} else {
							if (user.mestre === "tutor"){
								res.redirect('/list');
							}
							if (user.mestre === "ee"){
								res.redirect('/list_EE');
							}
						}
					})
				} else {
					if (user.mestre === "tutor"){
						res.redirect('/list');
					}
					if (user.mestre === "ee"){
						res.redirect('/list_EE');
					}
				}
			} else {
				req.flash('loginMsg', 'Contrasenya incorrecta');
				res.redirect('/');
			}
		}
	});
};

exports.login_EE = function (req, res, next){
	var email = req.body.email;
	var password = req.body.password;

	models.UserEe.findOne({email: email})
	.populate('horari centre')
	.exec(function(error, user){
		if (error){
			console.log(error);
		}
		if(!user) {
			next();
		}
		if(user) {
			if(bcrypt.compareSync(password, user.password)){
				req.session.user = user;
				if(req.session.user.horari){
					horariId = req.session.user.horari;
					models.Horari.find({_id: horariId}, function(err, horari){
						if(err){
							console.log(err);
						} else {
							res.redirect('/list_EE');
						}
					})
				} else {
					res.redirect('/list_EE');
				}
			} else {
				res.redirect('/');
			}
			
		}
	});
};

exports.loginCentre = function(req, res){
	var email = req.body.email;
	var password = req.body.password;

	models.Centre.findOne({email: email})
//	.populate('horari centre')
	.exec(function(error, user){
		if (error){
			console.log(error);
		}
		if(!user) {
			res.redirect('/');
		}
		if(user) {
			if(bcrypt.compareSync(password, user.password)){
				req.session.user = user;
				res.redirect('/centre');
			} else {
				res.redirect('/');
			}
			
		}
	});
}

exports.loginRequired = function(req, res, next){
	if(req.session.user){
		next();
	} else{
		res.redirect('/');
	}
};

exports.destroy = function(req, res){
	delete req.session.user;
	res.redirect('/');
}
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
		res.render('home', { title: 'AppEscola',  page_name:'home'});
	}
};

exports.login = function (req, res, next){
	var email = req.body.email;
	var password = req.body.password;

	models.User.findOne({email: email})
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
							res.redirect('/list');
						}
					})
				} else {
					res.redirect('/list');
				}
			} else {
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
			next();
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
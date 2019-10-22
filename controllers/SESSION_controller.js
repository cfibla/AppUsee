'use strict';

const models = require('../models/index');
const bcrypt = require('bcrypt');
//let jwt = require('jsonwebtoken');

exports.login = function (req, res){
	let email = req.body.email;
	let password = req.body.password;
	console.log('EMAIL: ' + email);
	console.log('PWD: ' + password);

	models.User.findOne({email: email})
	.populate('horari centre')
	.exec(function(error, user){
		if (error){
			console.log(error);
		}
		if(!user) {
			res.send("error login");
			console.log('Usuari inexsistent');
			//QUAN HI HAGI ESCOLES
			//next();
		}
		if(user) {
			//console.log('USER OK');
			if(bcrypt.compareSync(password, user.password)){
				//console.log('PWD OK');
				req.session.user = user;
				if(req.session.user.horari){
					console.log('usuari amb horari');
					let horariId = req.session.user.horari;
					models.Horari.find({_id: horariId}, function(err, horari){
						if(err){
							console.log(err);
						} else {
							if (user.mestre === "tutor"){
								console.log('usuari amb horari TUTOR');
								res.send('/list');
							}
							if (user.mestre === "ee"){
								console.log('usuari amb horari EE');
								res.send('/list_EE');
							}
						}
					})
				} else {
					if (user.mestre === "tutor" && email != "demo@demo.cat"){
						console.log('usuari sense horari TUTOR');
						res.send('/list');
					}
					if (user.mestre === "ee" && email != "demoee@demo.cat"){
						console.log('usuari sense horari EE');
						res.send('/list_EE');
					}
					if (email === "demo@demo.cat"){
						console.log('usuari DEMO TUTOR');
						res.redirect('/list');
					}
					if (email === "demoee@demo.cat"){
						console.log('usuari DEMO EE');
						res.redirect('/list_EE');
					}
				}
			} else {
				res.send("error login");
				console.log('ERROR LOGIN');
			}
		}
	});
};

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
		let msg =  req.flash('loginMsg');
		res.render('home', { loginMsg: msg, title: 'AppEscola',  page_name:'home'});
	}
};


exports.loginCentre = function(req, res){
	let email = req.body.email;
	let password = req.body.password;

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
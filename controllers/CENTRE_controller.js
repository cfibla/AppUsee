'use strict';

const models = require('../models/index');

// Nova escola GET
exports.nouCentre = function(req, res) {
		res.render('nou_escola', {errorAlta:""});
	};

// Nova escola POST
exports.createCentre = function (req, res){

	let escola = req.body;
	
	if (!escola.codi||!escola.password||!escola.nom||!escola.telefon
		||!escola.email||!escola.adreca||!escola.codiPostal||!escola.poblacio||!escola.provincia){
		models.Centre.find(function(error, docs){
		if (error){
			console.log(error);
		} else {
			res.redirect('/');
			};
		});
	} else {

	let nouEscola = new models.Centre({
		codi: escola.codi,
		password: escola.password,
		nom: escola.nom,
		telefon: escola.telefon,
		email: escola.email,
		adreca: escola.adreca,
		codiPostal: escola.codiPostal,
		poblacio: escola.poblacio,
		provincia: escola.provincia
	});


	nouEscola.save(function(error, scola){
		if (error) {
			res.json(error)
		} else {
			res.redirect('/');
		}
	});
	};
};

exports.centreMain = function(req, res) {
	res.render('centre-main');
};

exports.canviEscola = function(req, res) {
	res.render('canvi-escola');
};


exports.updateEscola = function(req, res) {
	
	const dades = req.body;
	const userId = req.session.user._id;
	const escolaId = dades.escola;

	models.Centre.findOne({codi:escolaId}, function(error, escola){

		if (escola) {
			console.log('escola EXISTENT');
			const dadesNoves = {
				mestre: dades.mestre,
				curs: dades.curs,
				codiEscola: escolaId,
				centre: escola._id
			}
			models.User.findByIdAndUpdate(userId, dadesNoves, {new: true}, (err, user) => {
			    if (err){
			    	console.log(err)
			    } else {
			    	req.session.user=user;
        			res.redirect('/usuari');
				}
			})    
		} else {
			console.log('escola NOVA');
			const nouEscola = new models.Centre({
				codi: dades.escola,
				nom: dades.escolanom,
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
					const dadesNoves = {
						mestre: dades.mestre,
						curs: dades.curs,
						codiEscola: escolaId,
						centre: scl._id
					}
					models.User.findByIdAndUpdate(userId, dadesNoves, {new: true}, (err, user) => {
					    if (err){
					    	console.log(err)
					    } else {
					    	req.session.user=user;
        					res.redirect('/usuari');
					    }
					})
				}
			});
		}
	});
}
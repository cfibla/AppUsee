'use strict';
var models = require('../models/index');

exports.main = function (req, res) {
	console.log('admin main');
	models.User.find()
		.populate('centre')
		.exec(function(error, docs){
			if (error){
				console.log(error);
			} else {
				models.Centre.find()
				.exec(function(error, centres){
					if (error){
						console.log(error);
					} else {
						models.Alumne.find()
						.exec(function(error, alumnes){
							if (error){
								console.log(error);
							} else {
								res.render('admin',{Users: docs, Centres: centres, Alumnes: alumnes});
							}
						});
					}
				});
			}
		});
}


exports.users = function (req, res) {
	console.log('admin users');
	models.User.find()
		.populate('centre')
		.exec(function(error, docs){
			if (error){
				console.log(error);
			} else {
				res.render('admin-users',{Users: docs});
			}
		});
}

exports.canviCurs = function (req, res) {
	models.Alumne.find({}, function(error, alumnes){
		if (error){
			console.log(error);
		} else {
			console.log('canvi de curs');
			for(var i=0; i < alumnes.length; i++) {
				console.log(alumnes[i].nomAlumne +' '+ alumnes[i].cognomAlumne1 +': '+ alumnes[i].curs);

				if (alumnes[i].curs=='P3 A'){
					alumnes[i].curs='P4 A'
				} else if (alumnes[i].curs=='P3 B'){
					alumnes[i].curs='P4 B'
				} else if (alumnes[i].curs=='P4 A'){
					alumnes[i].curs='P5 A'
				} else if (alumnes[i].curs=='P4 B'){
					alumnes[i].curs='P5 B'
				} else if (alumnes[i].curs=='P5 A'){
					alumnes[i].curs='1r A'
				} else if (alumnes[i].curs=='P5 B'){
					alumnes[i].curs='1r B'
				} else if (alumnes[i].curs=='1r A'){
					alumnes[i].curs='2n A'
				} else if (alumnes[i].curs=='1r B'){
					alumnes[i].curs='2n B'
				} else if (alumnes[i].curs=='2n A'){
					alumnes[i].curs='3r A'
				} else if (alumnes[i].curs=='2n B'){
					alumnes[i].curs='3r B'
				} else if (alumnes[i].curs=='3r A'){
					alumnes[i].curs='4t A'
				} else if (alumnes[i].curs=='3r B'){
					alumnes[i].curs='4t B'
				} else if (alumnes[i].curs=='4t A'){
					alumnes[i].curs='5è A'
				} else if (alumnes[i].curs=='4t B'){
					alumnes[i].curs='5è B'
				} else if (alumnes[i].curs=='5è A'){
					alumnes[i].curs='6è A'
				} else if (alumnes[i].curs=='5è B'){
					alumnes[i].curs='6è B'
				} else if (alumnes[i].curs=='6è A'){
					alumnes[i].curs=''
				} else if (alumnes[i].curs=='6è B'){
					alumnes[i].curs=''
				};

				console.log(alumnes[i].nomAlumne +' '+ alumnes[i].cognomAlumne1 +': '+ alumnes[i].curs);
				//FALTA EL SAVE
				alumnes[i].save(function(error){
					if (error) {
						res.json(error);
					}
				});
			}
		}
		res.redirect('/admin');
	});
}
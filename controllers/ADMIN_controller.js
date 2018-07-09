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
						res.render('admin',{Users: docs, Centres: centres});
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
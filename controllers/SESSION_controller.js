var models = require('../models/index');

/* GET home page. */
exports.new = function(req, res) {
	if(req.session.user){
		if(req.session.user.mestre === "tutor"){
			res.redirect('/list');
		}
		if(req.session.user.mestre === "ee"){
			res.redirect('/list_EE');
		}
	} else {
		res.render('home', { title: 'AppEscola',  page_name:'home'});
	}
};


exports.login = function (req, res, next){
	var email = req.body.email;
	var password = req.body.password;

	models.User.findOne({email: email, password: password}, function(error, user){
		if(error){
			console.log(error);
		}

		if(!user) {
			next();
		} else {
		
			req.session.user = user;

			models.Alumne.find(function(error, docs){
			if (error){
				console.log(error);
			} else {
				
				res.redirect('/list');
				
				}
		});}

	})
};

exports.login_EE = function (req, res){
	var email = req.body.email;
	var password = req.body.password;

	models.UserEe.findOne({email: email, password: password}, function(error, user){
		if(error){
			console.log(error);
		}

		if(!user) {
			console.log('Usuari inexistent'); //CANVIAR PER MISSATGE - ALERT
			res.redirect('/');
		} else {
		
				req.session.user = user;

				models.Alumne.find(function(error, docs){
				if (error){
					console.log(error);
				} else {
					
					res.redirect('/list_EE');

					}
			});}

	})
};

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
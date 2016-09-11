var models = require('../models/index');

/* GET home page. */
exports.new = function(req, res) {
	res.render('login', { title: 'AppEscola' });
};

exports.try = function(req, res) {
	res.render('try_usuari', { title: 'AppEscola' });
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
					
					//res.render('index',{Alumnes: docs});
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
			console.log('Usuari inexistent');
			res.redirect('/');
		} else {
		
				req.session.user = user;

				models.Alumne.find(function(error, docs){
				if (error){
					console.log(error);
				} else {
					
					res.redirect('/list_EE');
					
					//res.render('index',{Alumnes: docs});
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
		
		//temporal para generar el listado
		//		if(!req.session.user) {
		//			console.log('No heu iniciat sessió');
		//			res.redirect('/');
		//		}
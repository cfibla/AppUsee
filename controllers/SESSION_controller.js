var models = require('../models/index');

/* GET home page. */
exports.new = function(req, res) {
	res.render('login', { title: 'AppEscola' });
};

exports.login = function (req, res){
	var email = req.body.email;
	var password = req.body.password;

	models.User.findOne({email: email, password: password}, function(error, user){
		if(error){
			console.log(error);
		}

		if(!user) {
			console.log('Usuari inexistent');
			res.redirect('/');
		} else {
		
				req.session.user = user;
		
		//temporal para generar el listado
		//		if(!req.session.user) {
		//			console.log('No heu iniciat sessió');
		//			res.redirect('/');
		//		}
				models.Alumne.find(function(error, docs){
				if (error){
					console.log(error);
				} else {
					res.render('index',{Alumnes: docs});
					}
			});}

	})
}
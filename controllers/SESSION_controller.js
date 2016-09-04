/* GET home page. */
exports.new = function(req, res) {
	res.render('login', { title: 'AppEscola' });
};

exports.login = function (req, res){
	var email = req.body.email;
	var password = req.body.password;

	models.User.findOne({email: email, password: password}, function(err, user){
		if(error){
			console.log(error);
		}

		if(!user) {
			console.log('no usuari');
			res.redirect('/');
		}

		req.session.user = user;

		res.render('index');
	})
}
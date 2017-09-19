var models = require('../models/index');
var moment = require('moment');

//CREAR HORARI
exports.create = function (req, res) {
	var horari = req.body;
	var nom = horari.nom;
	var usr=req.session.user;
	var usrId = usr._id;

	var inici = moment(horari.horariInici, 'DD/MM/YYYY');
	var final = moment(horari.horariFinal, 'DD/MM/YYYY');

	var nouHorari = new models.Horari(
		{ nom: nom
		}
	);

	for(i=inici; i<=final; i=moment(i).add(1,'days')){
		nouHorari.dades.push({
			data: moment(i).format('DD/MM/YYYY'),
			dia: i.day(),
			h1: '',
			clase1: '',
			prog1: '',
			h2: '',
			clase2: '',
			prog2: '',
			h3: '',
			clase3: '',
			prog3: '',
			h4: '',
			clase4: '',
			prog4: '',
			h5: '',
			clase5: '',
			prog5: '',
			h6: '',
			clase6: '',
			prog6: ''
		});
	};

	nouHorari.save(function (error, horari){
		if (error) {
			res.json(error);
		} else {
			console.log('DATA: '+moment(i).format('DD/MM/YYYY'));
			//VINCULAR HORARI CON USER
			models.User.findById(usrId, function(error, user){
				if (error){
					res.json(error);
				} else{
					user.horari = horari;
					user.save(function (error, upduser){
						if (error){
							res.json(error);
						} else {
							console.log('UPDUSER: '+upduser);
							res.json(horari);
						}
					})
				}
			})
		}
	})
};

//CONFIGURACIÓ HORARI
exports.config = function (req, res) {
	var usr=req.session.user;
	var usrId = usr._id;

	models.User.findById(usrId, function(error, user){
		if(error){
			console.log(error);
		} else {
			console.log(user);
			req.session.user = user;
			var horariId=user.horari;

			console.log('HORARI ID: '+ horariId);
			models.Horari.findById(horariId, function(error, horari){
				if (error) {
					return res.json(error);
				} else {
					res.render('horari', {horari:horari, page_name:'horari'});
				}
			});
		}

	})
};

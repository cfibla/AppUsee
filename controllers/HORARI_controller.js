var models = require('../models/index');
var moment = require('moment');

//HORARI - CREATE
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
							res.json(horari);
						}
					})
				}
			})
		}
	})
};

//CONF. HORARI - GET
exports.config = function (req, res) {
	var usr=req.session.user;
	var usrId = usr._id;

	models.User.findById(usrId, function(error, user){
		if(error){
			res.json(error);
		} else {
			req.session.user = user;
			var horariId=user.horari;
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

//CONF. HORARI - UPDATE
exports.update = function (req, res){
	var horariReq = req.body;
	var user = req.session.user;
	var horariId = user.horari;
	var iniciReq = moment(horariReq.horariInici, 'DD/MM/YYYY');
	var finalReq = moment(horariReq.horariFinal, 'DD/MM/YYYY');

	models.Horari.findById(horariId, function(error, horari){
		var inici = moment(horari.dades[0].data, 'DD/MM/YYYY');
		var final = moment(horari.dades[3].data, 'DD/MM/YYYY');
		if (error) {
			return res.json(error);
		} else {
			//ARREGLAR ESTO
			if (moment(iniciReq).isSame(inici)||moment(finalReq).isSame(final)) {
				console.log("INICIO Y FINAL OK");
			} else {
				if (moment(iniciReq).isBefore(inici)) {
					console.log("INICIO: HAS INTRODUCIDO UNA FECHA ANTERIOR");
				}
				if (moment(iniciReq).isAfter(inici)) {
					console.log("INICIO: HAS INTRODUCIDO UNA FECHA POSTERIOR");
				}
				if (moment(finalReq).isBefore(final)) {
					console.log("FINAL: HAS INTRODUCIDO UNA FECHA ANTERIOR");
				}
				if (moment(finalReq).isAfter(final)) {
					console.log("FINAL: HAS INTRODUCIDO UNA FECHA POSTERIOR");
				}				
			}
		}
	});

	res.json(horariReq);
};
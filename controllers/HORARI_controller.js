var models = require('../models/index');
var moment = require('moment');

//CONF. HORARI - GET
exports.config = function (req, res) {
	var msg =  req.flash('horariMsg');
	var usr=req.session.user;
	var usrId = usr;

	models.User.findById(usrId)
		.populate('horari centre')
		.exec(function(error, user){
		if(error){
			res.json(error);
		} else {
			req.session.user = user;
			var horariId = user.horari;
			models.Horari.findById(horariId, function(error, horariFind){
				if (error) {
					return res.json(error);
				} else {
					res.render('horari-config', {horari:horariFind});
				}
			});
		}
	})

};

//HORARI - CREATE
exports.create = function (req, res) {
	var horari = req.body;
	var usr=req.session.user;
	var nom = usr.nom + " " + usr.cognom;
	var usrId = usr._id;
	var mestre = req.session.user.mestre;

	var inici = moment(horari.horariInici, 'DD/MM/YYYY');
	var final = moment(horari.horariFinal, 'DD/MM/YYYY');
	var dataI = moment(inici).format('DD/MM/YYYY');
	var dataF = moment(final).format('DD/MM/YYYY');
	//MENOS DE UNA SEMANA
	//console.log(final.diff(inici, 'days'));
	if (final.diff(inici, 'days')<13){
		console.log("ERROR: MENOS DE DOS SEMANAS");
		final = moment(inici).add(14,'days');
	}
	var nouHorari = new models.Horari(
		{ dataIni: dataI,
			dataFi: dataF
		}
	);
	for(i=inici; i<=final; i=moment(i).add(1,'days')){
		var momentData = moment(i).format('DD/MM/YYYY');
		var iDia = i.day();
		nouHorari.dades.push({
			data: momentData,
			dia: iDia,
			hora_1: {
				data: momentData,
				dia: iDia,
				area: '',
				h_inici: '',
				h_final: '',
				prog: '',
				objectius: '',
				sessio: '',
				color: ''
			},
			hora_2: {
				data: momentData,
				dia: iDia,
				area: '',
				h_inici: '',
				h_final: '',
				prog: '',
				objectius: '',
				sessio: '',
				color: ''
			},
			hora_3: {
				data: momentData,
				dia: iDia,
				area: '',
				h_inici: '',
				h_final: '',
				prog: '',
				objectius: '',
				sessio: '',
				color: ''
			},
			hora_4: {
				data: momentData,
				dia: iDia,
				area: '',
				h_inici: '',
				h_final: '',
				prog: '',
				objectius: '',
				sessio: '',
				color: ''
			},
			hora_5: {
				data: momentData,
				dia: iDia,
				area: '',
				h_inici: '',
				h_final: '',
				prog: '',
				objectius: '',
				sessio: '',
				color: ''
			}
		});
	};
	/*ELIMINAR SABADOS Y DOMINGOS*/
	var horariLength = nouHorari.dades.length;
	for (var i = horariLength - 1; i >= 0; i--) {
	    if (nouHorari.dades[i].dia==0 || nouHorari.dades[i].dia==6) {
			nouHorari.dades.splice(i,1);
		}
	}

		nouHorari.save(function (error, horari){
			if (error) {
				res.json(error);
			} else {
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
								res.redirect('/horari-config');
							}
						})
					}
				})
			}
		})

};

//CONF. HORARI - UPDATE
exports.update = function (req, res){
	var horariReq = req.body;
	var usr=req.session.user;
	var nom = usr.nom + " " + usr.cognom;
	var horariId = usr.horari;
	var iniciReq = moment(horariReq.horariInici, 'DD/MM/YYYY');
	var finalReq = moment(horariReq.horariFinal, 'DD/MM/YYYY');

	models.Horari.findById(horariId, function(error, horari){
		var lgt = horari.dades.length-1;
		var inici = moment(horari.dades[0].data, 'DD/MM/YYYY');
		var iniciAnt = moment(inici).subtract(1,'days');
		var final = moment(horari.dades[lgt].data, 'DD/MM/YYYY');
		var finalPost = moment(final).add(1,'days');

		function upd(){
			horari.nom = nom;
			var dataI = moment(iniciReq).format('DD/MM/YYYY');
			var dataF = moment(finalReq).format('DD/MM/YYYY');
			horari.dataIni = dataI;
			horari.dataFi = dataF;
			horari.areasArray = [];
			//console.log(horariReq);
			console.log('INICI: '+ dataI);
			console.log('FINAL: ' + dataF);
			for (var i=0; i < horari.dades.length; i++) {
		        if (horari.dades[i].dia === 1) {
		        	horari.dades[i].hora_1.h_inici = horariReq.horaIni_1dll;
		        	horari.dades[i].hora_1.h_final = horariReq.horaFinal_1dll;
		        	horari.dades[i].hora_2.h_inici = horariReq.horaIni_2dll;
		        	horari.dades[i].hora_2.h_final = horariReq.horaFinal_2dll;
		        	horari.dades[i].hora_3.h_inici = horariReq.horaIni_3dll;
		        	horari.dades[i].hora_3.h_final = horariReq.horaFinal_3dll;
		        	horari.dades[i].hora_4.h_inici = horariReq.horaIni_4dll;
		        	horari.dades[i].hora_4.h_final = horariReq.horaFinal_4dll;
		        	horari.dades[i].hora_5.h_inici = horariReq.horaIni_5dll;
		        	horari.dades[i].hora_5.h_final = horariReq.horaFinal_5dll;

		        	horari.dades[i].hora_1.area = horariReq.classe1dll;
		        	horari.dades[i].hora_2.area = horariReq.classe2dll;
		        	horari.dades[i].hora_3.area = horariReq.classe3dll;
		        	horari.dades[i].hora_4.area = horariReq.classe4dll;
		        	horari.dades[i].hora_5.area = horariReq.classe5dll;

		        	horari.dades[i].hora_1.hora = horariReq.hora_1dll;
		        	horari.dades[i].hora_2.hora = horariReq.hora_2dll;
		        	horari.dades[i].hora_3.hora = horariReq.hora_3dll;
		        	horari.dades[i].hora_4.hora = horariReq.hora_4dll;
		        	horari.dades[i].hora_5.hora = horariReq.hora_5dll;

		        	horari.dades[i].hora_1.prog = '';
		        	horari.dades[i].hora_2.prog = '';
		        	horari.dades[i].hora_3.prog = '';
		        	horari.dades[i].hora_4.prog = '';
		        	horari.dades[i].hora_5.prog = '';

		        	horari.dades[i].hora_1.objectius = '';
		        	horari.dades[i].hora_2.objectius = '';
		        	horari.dades[i].hora_3.objectius = '';
		        	horari.dades[i].hora_4.objectius = '';
		        	horari.dades[i].hora_5.objectius = '';

		        	horari.dades[i].hora_1.sessio = '';
		        	horari.dades[i].hora_2.sessio = '';
		        	horari.dades[i].hora_3.sessio = '';
		        	horari.dades[i].hora_4.sessio = '';
		        	horari.dades[i].hora_5.sessio = '';

		        	horari.dades[i].hora_1.color = '';
		        	horari.dades[i].hora_2.color = '';
		        	horari.dades[i].hora_3.color = '';
		        	horari.dades[i].hora_4.color = '';
		        	horari.dades[i].hora_5.color = '';

		        	horari.dades[i].hora_1.data = horari.dades[i].data;
		        	horari.dades[i].hora_2.data = horari.dades[i].data;
		        	horari.dades[i].hora_3.data = horari.dades[i].data;
		        	horari.dades[i].hora_4.data = horari.dades[i].data;
		        	horari.dades[i].hora_5.data = horari.dades[i].data;

		        	horari.dades[i].hora_1.dia = horari.dades[i].dia;
		        	horari.dades[i].hora_2.dia = horari.dades[i].dia;
		        	horari.dades[i].hora_3.dia = horari.dades[i].dia;
		        	horari.dades[i].hora_4.dia = horari.dades[i].dia;
		        	horari.dades[i].hora_5.dia = horari.dades[i].dia;
		        }
		        if (horari.dades[i].dia === 2) {
		        	horari.dades[i].hora_1.h_inici = horariReq.horaIni_1dm;
		        	horari.dades[i].hora_1.h_final = horariReq.horaFinal_1dm;
		        	horari.dades[i].hora_2.h_inici = horariReq.horaIni_2dm;
		        	horari.dades[i].hora_2.h_final = horariReq.horaFinal_2dm;
		        	horari.dades[i].hora_3.h_inici = horariReq.horaIni_3dm;
		        	horari.dades[i].hora_3.h_final = horariReq.horaFinal_3dm;
		        	horari.dades[i].hora_4.h_inici = horariReq.horaIni_4dm;
		        	horari.dades[i].hora_4.h_final = horariReq.horaFinal_4dm;
		        	horari.dades[i].hora_5.h_inici = horariReq.horaIni_5dm;
		        	horari.dades[i].hora_5.h_final = horariReq.horaFinal_5dm;

		        	horari.dades[i].hora_1.area = horariReq.classe1dm;
		        	horari.dades[i].hora_2.area = horariReq.classe2dm;
		        	horari.dades[i].hora_3.area = horariReq.classe3dm;
		        	horari.dades[i].hora_4.area = horariReq.classe4dm;
		        	horari.dades[i].hora_5.area = horariReq.classe5dm;

		        	horari.dades[i].hora_1.hora = horariReq.hora_1dm;
		        	horari.dades[i].hora_2.hora = horariReq.hora_2dm;
		        	horari.dades[i].hora_3.hora = horariReq.hora_3dm;
		        	horari.dades[i].hora_4.hora = horariReq.hora_4dm;
		        	horari.dades[i].hora_5.hora = horariReq.hora_5dm;

		        	horari.dades[i].hora_1.prog = '';
		        	horari.dades[i].hora_2.prog = '';
		        	horari.dades[i].hora_3.prog = '';
		        	horari.dades[i].hora_4.prog = '';
		        	horari.dades[i].hora_5.prog = '';

		        	horari.dades[i].hora_1.objectius = '';
		        	horari.dades[i].hora_2.objectius = '';
		        	horari.dades[i].hora_3.objectius = '';
		        	horari.dades[i].hora_4.objectius = '';
		        	horari.dades[i].hora_5.objectius = '';

		        	horari.dades[i].hora_1.sessio = '';
		        	horari.dades[i].hora_2.sessio = '';
		        	horari.dades[i].hora_3.sessio = '';
		        	horari.dades[i].hora_4.sessio = '';
		        	horari.dades[i].hora_5.sessio = '';

		        	horari.dades[i].hora_1.color = '';
		        	horari.dades[i].hora_2.color = '';
		        	horari.dades[i].hora_3.color = '';
		        	horari.dades[i].hora_4.color = '';
		        	horari.dades[i].hora_5.color = '';

		        	horari.dades[i].hora_1.data = horari.dades[i].data;
		        	horari.dades[i].hora_2.data = horari.dades[i].data;
		        	horari.dades[i].hora_3.data = horari.dades[i].data;
		        	horari.dades[i].hora_4.data = horari.dades[i].data;
		        	horari.dades[i].hora_5.data = horari.dades[i].data;

		        	horari.dades[i].hora_1.dia = horari.dades[i].dia;
		        	horari.dades[i].hora_2.dia = horari.dades[i].dia;
		        	horari.dades[i].hora_3.dia = horari.dades[i].dia;
		        	horari.dades[i].hora_4.dia = horari.dades[i].dia;
		        	horari.dades[i].hora_5.dia = horari.dades[i].dia;
		        }
		        if (horari.dades[i].dia === 3) {
		        	horari.dades[i].hora_1.h_inici = horariReq.horaIni_1dx;
		        	horari.dades[i].hora_1.h_final = horariReq.horaFinal_1dx;
		        	horari.dades[i].hora_2.h_inici = horariReq.horaIni_2dx;
		        	horari.dades[i].hora_2.h_final = horariReq.horaFinal_2dx;
		        	horari.dades[i].hora_3.h_inici = horariReq.horaIni_3dx;
		        	horari.dades[i].hora_3.h_final = horariReq.horaFinal_3dx;
		        	horari.dades[i].hora_4.h_inici = horariReq.horaIni_4dx;
		        	horari.dades[i].hora_4.h_final = horariReq.horaFinal_4dx;
		        	horari.dades[i].hora_5.h_inici = horariReq.horaIni_5dx;
		        	horari.dades[i].hora_5.h_final = horariReq.horaFinal_5dx;

		        	horari.dades[i].hora_1.area = horariReq.classe1dx;
		        	horari.dades[i].hora_2.area = horariReq.classe2dx;
		        	horari.dades[i].hora_3.area = horariReq.classe3dx;
		        	horari.dades[i].hora_4.area = horariReq.classe4dx;
		        	horari.dades[i].hora_5.area = horariReq.classe5dx;

		        	horari.dades[i].hora_1.hora = horariReq.hora_1dx;
		        	horari.dades[i].hora_2.hora = horariReq.hora_2dx;
		        	horari.dades[i].hora_3.hora = horariReq.hora_3dx;
		        	horari.dades[i].hora_4.hora = horariReq.hora_4dx;
		        	horari.dades[i].hora_5.hora = horariReq.hora_5dx;

		        	horari.dades[i].hora_1.prog = '';
		        	horari.dades[i].hora_2.prog = '';
		        	horari.dades[i].hora_3.prog = '';
		        	horari.dades[i].hora_4.prog = '';
		        	horari.dades[i].hora_5.prog = '';

		        	horari.dades[i].hora_1.objectius = '';
		        	horari.dades[i].hora_2.objectius = '';
		        	horari.dades[i].hora_3.objectius = '';
		        	horari.dades[i].hora_4.objectius = '';
		        	horari.dades[i].hora_5.objectius = '';

		        	horari.dades[i].hora_1.sessio = '';
		        	horari.dades[i].hora_2.sessio = '';
		        	horari.dades[i].hora_3.sessio = '';
		        	horari.dades[i].hora_4.sessio = '';
		        	horari.dades[i].hora_5.sessio = '';

		        	horari.dades[i].hora_1.color = '';
		        	horari.dades[i].hora_2.color = '';
		        	horari.dades[i].hora_3.color = '';
		        	horari.dades[i].hora_4.color = '';
		        	horari.dades[i].hora_5.color = '';

		        	horari.dades[i].hora_1.data = horari.dades[i].data;
		        	horari.dades[i].hora_2.data = horari.dades[i].data;
		        	horari.dades[i].hora_3.data = horari.dades[i].data;
		        	horari.dades[i].hora_4.data = horari.dades[i].data;
		        	horari.dades[i].hora_5.data = horari.dades[i].data;

		        	horari.dades[i].hora_1.dia = horari.dades[i].dia;
		        	horari.dades[i].hora_2.dia = horari.dades[i].dia;
		        	horari.dades[i].hora_3.dia = horari.dades[i].dia;
		        	horari.dades[i].hora_4.dia = horari.dades[i].dia;
		        	horari.dades[i].hora_5.dia = horari.dades[i].dia;
		        }
		        if (horari.dades[i].dia === 4) {
		        	horari.dades[i].hora_1.h_inici = horariReq.horaIni_1dj;
		        	horari.dades[i].hora_1.h_final = horariReq.horaFinal_1dj;
		        	horari.dades[i].hora_2.h_inici = horariReq.horaIni_2dj;
		        	horari.dades[i].hora_2.h_final = horariReq.horaFinal_2dj;
		        	horari.dades[i].hora_3.h_inici = horariReq.horaIni_3dj;
		        	horari.dades[i].hora_3.h_final = horariReq.horaFinal_3dj;
		        	horari.dades[i].hora_4.h_inici = horariReq.horaIni_4dj;
		        	horari.dades[i].hora_4.h_final = horariReq.horaFinal_4dj;
		        	horari.dades[i].hora_5.h_inici = horariReq.horaIni_5dj;
		        	horari.dades[i].hora_5.h_final = horariReq.horaFinal_5dj;

		        	horari.dades[i].hora_1.area = horariReq.classe1dj;
		        	horari.dades[i].hora_2.area = horariReq.classe2dj;
		        	horari.dades[i].hora_3.area = horariReq.classe3dj;
		        	horari.dades[i].hora_4.area = horariReq.classe4dj;
		        	horari.dades[i].hora_5.area = horariReq.classe5dj;

		        	horari.dades[i].hora_1.hora = horariReq.hora_1dj;
		        	horari.dades[i].hora_2.hora = horariReq.hora_2dj;
		        	horari.dades[i].hora_3.hora = horariReq.hora_3dj;
		        	horari.dades[i].hora_4.hora = horariReq.hora_4dj;
		        	horari.dades[i].hora_5.hora = horariReq.hora_5dj;

		        	horari.dades[i].hora_1.prog = '';
		        	horari.dades[i].hora_2.prog = '';
		        	horari.dades[i].hora_3.prog = '';
		        	horari.dades[i].hora_4.prog = '';
		        	horari.dades[i].hora_5.prog = '';

		        	horari.dades[i].hora_1.objectius = '';
		        	horari.dades[i].hora_2.objectius = '';
		        	horari.dades[i].hora_3.objectius = '';
		        	horari.dades[i].hora_4.objectius = '';
		        	horari.dades[i].hora_5.objectius = '';

		        	horari.dades[i].hora_1.sessio = '';
		        	horari.dades[i].hora_2.sessio = '';
		        	horari.dades[i].hora_3.sessio = '';
		        	horari.dades[i].hora_4.sessio = '';
		        	horari.dades[i].hora_5.sessio = '';

		        	horari.dades[i].hora_1.color = '';
		        	horari.dades[i].hora_2.color = '';
		        	horari.dades[i].hora_3.color = '';
		        	horari.dades[i].hora_4.color = '';
		        	horari.dades[i].hora_5.color = '';

		        	horari.dades[i].hora_1.data = horari.dades[i].data;
		        	horari.dades[i].hora_2.data = horari.dades[i].data;
		        	horari.dades[i].hora_3.data = horari.dades[i].data;
		        	horari.dades[i].hora_4.data = horari.dades[i].data;
		        	horari.dades[i].hora_5.data = horari.dades[i].data;

		        	horari.dades[i].hora_1.dia = horari.dades[i].dia;
		        	horari.dades[i].hora_2.dia = horari.dades[i].dia;
		        	horari.dades[i].hora_3.dia = horari.dades[i].dia;
		        	horari.dades[i].hora_4.dia = horari.dades[i].dia;
		        	horari.dades[i].hora_5.dia = horari.dades[i].dia;
		        }
		        if (horari.dades[i].dia === 5) {
		        	horari.dades[i].hora_1.h_inici = horariReq.horaIni_1dv;
		        	horari.dades[i].hora_1.h_final = horariReq.horaFinal_1dv;
		        	horari.dades[i].hora_2.h_inici = horariReq.horaIni_2dv;
		        	horari.dades[i].hora_2.h_final = horariReq.horaFinal_2dv;
		        	horari.dades[i].hora_3.h_inici = horariReq.horaIni_3dv;
		        	horari.dades[i].hora_3.h_final = horariReq.horaFinal_3dv;
		        	horari.dades[i].hora_4.h_inici = horariReq.horaIni_4dv;
		        	horari.dades[i].hora_4.h_final = horariReq.horaFinal_4dv;
		        	horari.dades[i].hora_5.h_inici = horariReq.horaIni_5dv;
		        	horari.dades[i].hora_5.h_final = horariReq.horaFinal_5dv;

		        	horari.dades[i].hora_1.area = horariReq.classe1dv;
		        	horari.dades[i].hora_2.area = horariReq.classe2dv;
		        	horari.dades[i].hora_3.area = horariReq.classe3dv;
		        	horari.dades[i].hora_4.area = horariReq.classe4dv;
		        	horari.dades[i].hora_5.area = horariReq.classe5dv;

		        	horari.dades[i].hora_1.hora = horariReq.hora_1dv;
		        	horari.dades[i].hora_2.hora = horariReq.hora_2dv;
		        	horari.dades[i].hora_3.hora = horariReq.hora_3dv;
		        	horari.dades[i].hora_4.hora = horariReq.hora_4dv;
		        	horari.dades[i].hora_5.hora = horariReq.hora_5dv;

		        	horari.dades[i].hora_1.prog = '';
		        	horari.dades[i].hora_2.prog = '';
		        	horari.dades[i].hora_3.prog = '';
		        	horari.dades[i].hora_4.prog = '';
		        	horari.dades[i].hora_5.prog = '';

		        	horari.dades[i].hora_1.objectius = '';
		        	horari.dades[i].hora_2.objectius = '';
		        	horari.dades[i].hora_3.objectius = '';
		        	horari.dades[i].hora_4.objectius = '';
		        	horari.dades[i].hora_5.objectius = '';

		        	horari.dades[i].hora_1.sessio = '';
		        	horari.dades[i].hora_2.sessio = '';
		        	horari.dades[i].hora_3.sessio = '';
		        	horari.dades[i].hora_4.sessio = '';
		        	horari.dades[i].hora_5.sessio = '';

		        	horari.dades[i].hora_1.color = '';
		        	horari.dades[i].hora_2.color = '';
		        	horari.dades[i].hora_3.color = '';
		        	horari.dades[i].hora_4.color = '';
		        	horari.dades[i].hora_5.color = '';

		        	horari.dades[i].hora_1.data = horari.dades[i].data;
		        	horari.dades[i].hora_2.data = horari.dades[i].data;
		        	horari.dades[i].hora_3.data = horari.dades[i].data;
		        	horari.dades[i].hora_4.data = horari.dades[i].data;
		        	horari.dades[i].hora_5.data = horari.dades[i].data;

		        	horari.dades[i].hora_1.dia = horari.dades[i].dia;
		        	horari.dades[i].hora_2.dia = horari.dades[i].dia;
		        	horari.dades[i].hora_3.dia = horari.dades[i].dia;
		        	horari.dades[i].hora_4.dia = horari.dades[i].dia;
		        	horari.dades[i].hora_5.dia = horari.dades[i].dia;
		        }
		    }
	    	//ELIMINAR SABADOS Y DOMINGOS
			var horariLength = horari.dades.length;
			for (var i = horariLength - 1; i >= 0; i--) {
			    if (horari.dades[i].dia==0 || horari.dades[i].dia==6) {
					horari.dades.splice(i,1);
				}
			}

			//ARRAY DE ÁREAS
			Array.prototype.unique=function(a){
				return function(){return this.filter(a)}}(function(a,b,c){return c.indexOf(a,b+1)<0
				});
			var areasArray = [];
			for (var i=0; i < 8; i++) {
				areasArray.push	(horari.dades[i].hora_1.area);
				areasArray.push	(horari.dades[i].hora_2.area);
				areasArray.push	(horari.dades[i].hora_3.area);
				areasArray.push	(horari.dades[i].hora_4.area);
				areasArray.push	(horari.dades[i].hora_5.area);
			}
			horari.areasArray = areasArray.unique().sort();
			req.session.user.horari.areasArray =  areasArray.unique().sort();
		};
		if (error) {
			return res.json(error);
		} else {
			//ERRORES
			//MENOS DE 2 SEMANAS
			if (finalReq.diff(iniciReq, 'days')<13){
				console.log("ERROR: MENOS DE DOS SEMANAS");
				finalReq = moment(iniciReq).add(14,'days');
				req.flash('horariMsg', "Hi ha un error: La durada de l'horari ha de ser de 2 setmanes com a mínim");
				res.redirect('/horari-config');
			}
			//FINAL ANTES QUE INICIO
			if (moment(finalReq).isBefore(iniciReq)) {
					if (moment(finalReq).isBefore(inici)) {
						iniciReq = inici;
						finalReq = final;
						req.flash('horariMsg', "Hi ha un error: El final no pot ser anterior a l'inici");
						res.redirect('/horari-config');
						console.log("ERROR: FINAL ES ANTERIOR A INICIO");
					}
				}
			//INICIO DESPUÉS DE FINAL
			if (moment(iniciReq).isAfter(finalReq)) {
					if (moment(iniciReq).isAfter(final)) {
						iniciReq = inici;
						finalReq = final;
						req.flash('horariMsg', "Hi ha un error: L'inici no pot ser posterior al final");
						res.redirect('/horari-config');
						console.log("ERROR: INICIO ES POSTERIOR A FINAL");
					}
				}
			if (moment(iniciReq).isBefore(inici) && moment(finalReq).isBefore(inici)) {
				console.log("ERROR: INICIO Y FINAL ANTES");
				iniciReq = inici;
				finalReq = final;
			}
			if (moment(iniciReq).isAfter(final) && moment(finalReq).isAfter(final)) {
				console.log("ERROR: INICIO Y FINAL DESPUÉS");
				iniciReq = inici;
				finalReq = final;
			}
			//OK
			if (moment(iniciReq).isSame(inici) && moment(finalReq).isSame(final)) {
				console.log("INICIO Y FINAL OK");
				upd();
			} else {
				if (moment(iniciReq).isBefore(inici)) {

					console.log("INICIO: HAS INTRODUCIDO UNA FECHA ANTERIOR");

					for(i=iniciAnt; i>=iniciReq; i=moment(i).subtract(1,'days')){
						horari.dades.unshift({
							data: moment(i).format('DD/MM/YYYY'),
							dia: i.day(),
							h1: '',
							clase1: '',
							prog1: '',
							ref1:'',
							h2: '',
							clase2: '',
							prog2: '',
							ref2:'',
							h3: '',
							clase3: '',
							prog3: '',
							ref3:'',
							h4: '',
							clase4: '',
							prog4: '',
							ref4:'',
							h5: '',
							clase5: '',
							prog5: '',
							ref5:'',
							h6: '',
							clase6: '',
							prog6: '',
							ref6:''
						});
					};
					upd();
				}
				if (moment(iniciReq).isAfter(inici)) {
					console.log("INICIO: HAS INTRODUCIDO UNA FECHA POSTERIOR");
					if (final.diff(iniciReq, 'days')<7){
						console.log("ERROR: MENOS DE UNA SEMANA");
						final = moment(inici).add(7,'days');
					}
					iniciDiff = iniciReq.diff(inici, 'days');
					horari.dades.splice(0,iniciDiff);
					upd();
				}
				if (moment(finalReq).isBefore(final)) {
					console.log("FINAL: HAS INTRODUCIDO UNA FECHA ANTERIOR");
					if (finalReq.diff(inici, 'days')<7){
						console.log("ERROR: MENOS DE UNA SEMANA");
						final = moment(inici).add(7,'days');
					}
					finalDiff = final.diff(finalReq, 'days');
					horari.dades.splice(lgt-finalDiff+1,finalDiff);
					upd();
				}
				if (moment(finalReq).isAfter(final)) {
					console.log("FINAL: HAS INTRODUCIDO UNA FECHA POSTERIOR");
						for(i=finalPost; i<=finalReq; i=moment(i).add(1,'days')){
							horari.dades.push({
								data: moment(i).format('DD/MM/YYYY'),
								dia: i.day(),
								h1: '',
								clase1: '',
								prog1: '',
								ref1:'',
								h2: '',
								clase2: '',
								prog2: '',
								ref2:'',
								h3: '',
								clase3: '',
								prog3: '',
								ref3:'',
								h4: '',
								clase4: '',
								prog4: '',
								ref4:'',
								h5: '',
								clase5: '',
								prog5: '',
								ref5:'',
								h6: '',
								clase6: '',
								prog6: '',
								ref6:''
							});
						};
					upd();

				}				
			}
		}
		horari.save(function (err, updatedHorari) {
		    if (err) return res.json(error);
		    res.redirect('/horari-diari');
  		});
	});
};

//DELETE horari
exports.delete = function (req, res) {
	var userHo = req.session.user;
	var userId = req.params.id;
	var horari = userHo.horari._id;

	models.Horari.findByIdAndRemove(horari, function(error, horari){
		if (error){
			return res.json(error);
		} else {
			models.User.findByIdAndUpdate(userId, {$unset:{horari:1}}, function(error, user){
				if (error){
					return res.json(error);
				} else {
					delete userHo.horari;
					res.redirect('/list');
				}		
			})
		}
	});
};

//HORARI DIARI - GET
exports.diariGet = function (req, res) {
	var usr = req.session.user;
	var horariId = usr.horari;
/*
		models.tweets.find({created_at: {$lt: last_displayed_date}}).
          sort({created_at: -1}).limit(20);
*/

	console.log('HORARI-DIARI GET');
	models.Horari.findById(horariId, function(err, horariUser){
		if(err){
			console.log(err);
		} else {
			res.render('horari-diari', {horari: horariUser});
		};
	});
};

//HORARI DIARI - POST
exports.diariPost = function (req, res){
	var horariReq = req.body;
	var user = req.session.user;
	var horariId = user.horari;

	models.Horari.findById(horariId, function(error, horari){
		var lgt = horari.dades.length-1;

		function upd(){
			for (var i=0; i < horari.dades.length; i++) {
		        if (horari.dades[i].data == horariReq.diaData[i]) {
		        	horari.dades[i].hora_1.prog = horariReq.prog1[i];
		        	horari.dades[i].hora_2.prog = horariReq.prog2[i];
		        	horari.dades[i].hora_3.prog = horariReq.prog3[i];
		        	horari.dades[i].hora_4.prog = horariReq.prog4[i];
		        	horari.dades[i].hora_5.prog = horariReq.prog5[i];
		        }
		    }
		};

		if (error) {
			return res.json(error);
		} else {
			upd();
			horari.save(function (err, updatedHorari) {
				req.session.user.horari = updatedHorari;
			    if (err) return res.json(error);
			    	 res.redirect('/horari-diari');
	  		});
		}
	});
};


//HORARI ÀREES - GET
exports.areaGet = function(req,res){
	var user = req.session.user;
	var horariId = user.horari;
	var area = req.params.area;
	models.Horari.findById(horariId, function(err, hores){
		if (err){
			return res.json(err)
		} else {
			//Buscar aquí las clases
			function search(nameKey, myArray){
				var nouArray = [];
			    for (var i=0; i < myArray.length; i++) {
			        if (myArray[i].hora_1.area == nameKey) {
			        	nouArray.push(myArray[i].hora_1);
			        }
			        if (myArray[i].hora_2.area == nameKey) {
			        	nouArray.push(myArray[i].hora_2);
			        }
			        if (myArray[i].hora_3.area == nameKey) {
			        	nouArray.push(myArray[i].hora_3);
			        }
			        if (myArray[i].hora_4.area == nameKey) {
			        	nouArray.push(myArray[i].hora_4);
			        }
			        if (myArray[i].hora_5.area == nameKey) {
			        	nouArray.push(myArray[i].hora_5);
			        }
			    }
			    return nouArray;
			}

			var sessionsArea = search(area, hores.dades);
			//console.log('sessionsArea:' + sessionsArea);
			console.log('area:' + area);
			res.render('horari-arees', {horari:sessionsArea, area:area});
		}
	})

}

//HORARI AREES - UPDATE
exports.areaPost = function (req, res){
	var areaReq = req.body;
	var user = req.session.user;
	var horariId = user.horari;
	var area = areaReq.area;
	var areaJson=[];

	console.log('AREA POST');

	for (var i=0; i < areaReq.data.length; i++){
		var aJson = {};

		aJson.data = areaReq.data[i];
		aJson.tema = areaReq.tema[i];
		aJson.sessio = areaReq.sessio[i];
		aJson.objectius = areaReq.objectius[i];
		aJson.prog = areaReq.prog[i];
		aJson.hora = areaReq.hora[i];
		aJson.area = area;
		
		areaJson.push(aJson);
	}

	models.Horari.findById(horariId, function (error, horari){
		if (error){
			console.log(error);
		} else {
			for(var i=0; i < areaJson.length; i++){
				if(areaJson[i].data){
					for (h=0; h < horari.dades.length; h++) {
						if(areaJson[i].data == horari.dades[h].hora_1.data && areaJson[i].area == horari.dades[h].hora_1.area){
							horari.dades[h].hora_1.tema = areaJson[i].tema;
							horari.dades[h].hora_1.sessio = areaJson[i].sessio;
							horari.dades[h].hora_1.objectius = areaJson[i].objectius;
							horari.dades[h].hora_1.prog = areaJson[i].prog;
						}

						if(areaJson[i].data == horari.dades[h].hora_2.data && areaJson[i].area == horari.dades[h].hora_2.area){
							horari.dades[h].hora_2.tema = areaJson[i].tema;
							horari.dades[h].hora_2.sessio = areaJson[i].sessio;
							horari.dades[h].hora_2.objectius = areaJson[i].objectius;
							horari.dades[h].hora_2.prog = areaJson[i].prog;
						}

						if(areaJson[i].data == horari.dades[h].hora_3.data && areaJson[i].area == horari.dades[h].hora_3.area){
							horari.dades[h].hora_3.tema = areaJson[i].tema;
							horari.dades[h].hora_3.sessio = areaJson[i].sessio;
							horari.dades[h].hora_3.objectius = areaJson[i].objectius;
							horari.dades[h].hora_3.prog = areaJson[i].prog;
						}

						if(areaJson[i].data == horari.dades[h].hora_4.data && areaJson[i].area == horari.dades[h].hora_4.area){
							horari.dades[h].hora_4.tema = areaJson[i].tema;
							horari.dades[h].hora_4.sessio = areaJson[i].sessio;
							horari.dades[h].hora_4.objectius = areaJson[i].objectius;
							horari.dades[h].hora_4.prog = areaJson[i].prog;
						}

						if(areaJson[i].data == horari.dades[h].hora_5.data && areaJson[i].area == horari.dades[h].hora_5.area){
							horari.dades[h].hora_5.tema = areaJson[i].tema;
							horari.dades[h].hora_5.sessio = areaJson[i].sessio;
							horari.dades[h].hora_5.objectius = areaJson[i].objectius;
							horari.dades[h].hora_5.prog = areaJson[i].prog;
						}
					}
				}
			}
			horari.save(function (err, updatedHorari) {
				req.session.user.horari = updatedHorari;
			    if (err) return res.json(error);
			    //console.log ('SESSION BACKEND: ' + JSON.stringify(req.session));
			    res.redirect('/horari-area/'+area);
			});
		}
	})
}

//HORARI EE CURSOS-GET
exports.cursGet = function (req, res){
	var curs = req.params.curs;
	var cursA = curs + ' A';
	var cursB = curs + ' B';
	models.Alumne.find({
		'eeUsee': true,
		centre: req.session.user.centre,
		$or:[{curs: cursA},{curs: cursB}]
	}
		, null, {sort: {cognomAlumne1: 1, cognomAlumne2: 1, nomAlumne: 1}})
	.populate('centre ee')
	.exec(function(error, docs){
		if (error){
			console.log(error);
		} else {
			if(req.session.user.horari){
				console.log('LIST_EE TIENE HORARI');
				horariId = req.session.user.horari;
				models.Horari.find({_id: horariId}, function(err, horariUser){
					if(err){
						console.log(err);
					} else {
						res.render('index',{Alumnes: docs, horari: horariUser});
					}
				});
			} else {
				res.render('index',{Alumnes: docs});
			}
		}
	});

}
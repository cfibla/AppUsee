var models = require('../models/index');
var moment = require('moment');

//CONF. HORARI - GET
exports.config = function (req, res) {
	console.log('CONFIGURACIO-DIARI GET');
	var usr=req.session.user;
	var usrId = usr;
	var mestre = req.session.user.mestre;

	if(mestre === "tutor"){
		models.User.findById(usrId, function(error, user){
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
	}
	if(mestre == "ee"){
		models.UserEe.findById(usrId, function(error, user){
			if(error){
				res.json(error);
			} else {
				req.session.user = user;
				var horariId=user.horari;
				models.Horari.findById(horariId, function(error, horari){
					if (error) {
						return res.json(error);
					} else {
						res.render('horari-config', {horari:horari, page_name:'horari-config'});
					}
				});
			}
		})
	}

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
	console.log(final.diff(inici, 'days'));
	if (final.diff(inici, 'days')<7){
		console.log("ERROR: MENOS DE UNA SEMANA");
		final = moment(inici).add(7,'days');
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
	if (mestre == "tutor"){
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
	}
	if (mestre == "ee"){
		nouHorari.save(function (error, horari){
			if (error) {
				res.json(error);
			} else {
				//VINCULAR HORARI CON USER
				models.UserEe.findById(usrId, function(error, user){
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
	}
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
			horari.areasArray = [];
			console.log(horariReq);
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
				areasArray.push	(horari.dades[i].hora_1);
				areasArray.push	(horari.dades[i].hora_2);
				areasArray.push	(horari.dades[i].hora_3);
				areasArray.push	(horari.dades[i].hora_4);
				areasArray.push	(horari.dades[i].hora_5);
			}
			horari.areasArray = areasArray.unique().sort();
			console.log(horari.areasArray);
		};
		if (error) {
			return res.json(error);
		} else {
			//ERRORES
			//FINAL ANTES QUE INICIO
			if (moment(finalReq).isBefore(iniciReq)) {
					if (moment(finalReq).isBefore(inici)) {
						console.log("ERROR: FINAL ES ANTERIOR A INICIO");
					}
				}
			//INICIO DESPUÉS DE FINAL
			if (moment(iniciReq).isAfter(finalReq)) {
					if (moment(iniciReq).isAfter(final)) {
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
					iniciDiff = iniciReq.diff(inici, 'days');
					horari.dades.splice(0,iniciDiff);
					//upd();
				}
				if (moment(finalReq).isBefore(final)) {
					console.log("FINAL: HAS INTRODUCIDO UNA FECHA ANTERIOR");
					finalDiff = final.diff(finalReq, 'days');
					horari.dades.splice(lgt-finalDiff+1,finalDiff);
					//upd();
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

//HORARI DIARI - GET
exports.diariGet = function (req, res) {
	var usr=req.session.user;
	var usrId = usr._id;
	var mestre = req.session.user.mestre;
	//Fechas
	var hoy = new Date();
	var dataMoment = moment(hoy, 'DD/MM/YYYY');
	//var dataISO = datamoment.toIsoDate
	var month = dataMoment.format('M');
	var day   = dataMoment.format('D');
	var year  = dataMoment.format('YYYY');

	var initDay = moment().subtract(7, 'days');
	var finishDay = moment().add(30, 'days');
	var initMoment = initDay.format('D')+'/'+initDay.format('M')+'/'+initDay.format('YYYY');
	var finishMoment = finishDay.format('D')+'/'+finishDay.format('M')+'/'+finishDay.format('YYYY');

	//???hay que convertir TODAS las fechas a ISO primero para poder operar con ellas
	//	console.log('month: ' + month);
	//	console.log('inici: ' + initMoment);
	//	console.log('finish: ' + finishMoment);
	//	console.log('monthInit: ' + moment(initMoment).format('M'));
	//	console.log('monthFinish: ' + moment(finishMoment).format('M'));


	if(mestre == "tutor"){
/*
		models.tweets.find({created_at: {$lt: last_displayed_date}}).
          sort({created_at: -1}).limit(20);
*/
			if(req.session.user.horari){
				console.log('HORARI-DIARI GET');
				horariId = req.session.user.horari;
				models.Horari.findById(horariId, function(err, horariUser){
					if(err){
						console.log(err);
					} else {
						res.render('horari-diari', {horari: horariUser});
					};
				});
			};

		}

	if(mestre == "ee"){
		models.UserEe.findById(usrId, function(error, user){
			if(error){
				res.json(error);
			} else {
				req.session.user = user;
				var horariId=user.horari;
				models.Horari.findById(horariId, function(error, horari){
					if (error) {
						return res.json(error);
					} else {
						res.render('horari-diari', {horari:horari, page_name:'horari'});
					}
				});
			}

		})
	}


};

//HORARI DIARI - POST
exports.diariPost = function (req, res){
	var horariReq = req.body;
	var user = req.session.user;
	var horariId = user.horari;
	/*console.log(horariReq);*/

	models.Horari.findById(horariId, function(error, horari){
		var lgt = horari.dades.length-1;

		function upd(){
			for (var i=0; i < horari.dades.length; i++) {

		        if (horari.dades[i].data == horariReq.diaData[i]) {

		        	horari.dades[i].prog1 = horariReq.prog1[i];
		        	horari.dades[i].prog2 = horariReq.prog2[i];
		        	horari.dades[i].prog3 = horariReq.prog3[i];
		        	horari.dades[i].prog4 = horariReq.prog4[i];
		        	horari.dades[i].prog5 = horariReq.prog5[i];
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

exports.areaGet = function(req,res){
	var user = req.session.user;
	var horariId = user.horari;
	var area = req.params.area;
	models.Horari.findById(horariId, function(err, hores){
		if (err){
			return res.json(err)
		} else {
			//Buscar aquí las clases
				res.send(hores);
		}
	})

}
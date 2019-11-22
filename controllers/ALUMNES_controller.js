'use strict';

const models = require('../models/index');

//Llistat d'alumnes (General) - GET
exports.list = function (req, res) {
	console.log('LIST');
	models.Alumne.find({
		centre: req.session.user.centre,
		curs: req.session.user.curs}
		, null, {sort: {cognomAlumne1: 1, cognomAlumne2: 1, nomAlumne: 1}})
	.populate('centre tutor')
	.exec(function(error, docs){
		if (error){
			console.log(error);
		} else {
			if(req.session.user.horari){
				console.log(req.session.user.horari);
				console.log('LIST TIENE HORARI');
				let horariId = req.session.user.horari;
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

};

//Llistat d'alumnes (Cerca pel cognom) - GET
exports.cercaList = function (req, res) {

	let alum = req.query;
	let alumCog1 = alum.cognom;
	let alumCog1Up = alumCog1.toUpperCase();

	console.log('LIST - Cerca pel cognom');

	models.Alumne.find({
		centre: req.session.user.centre,
		cognomAlumne1:alumCog1Up
		}, null, {sort: {cognomAlumne1: 1, cognomAlumne2: 1, nomAlumne: 1}
	})
	.populate('centre tutor')
	.exec(function(error, docs){
		if (error){
			console.log(error);
		} else {
			if(req.session.user.horari){
				console.log('LIST TIENE HORARI');
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

};

//Altes d'alumnes - CREATE
exports.create = function (req, res){

	let scola = req.session.user.centre;
	let alum = req.body;
	let alumNom = alum.nom;
	let alumCog1 = alum.cognom1;
	let alumCog2 = alum.cognom2;
	let alumNomUp = alumNom.toUpperCase();
	let alumCog1Up = alumCog1.toUpperCase();
	let alumCog2Up = alumCog2.toUpperCase();
	let rep = alum['radios.0'];
	let aill = alum['checks.2'];
	let sersoc = alum['checks.29'];
	let alumDataNa = alum.dataNaixement;


	if (!alum.nom||!alum.cognom1||!alum.curs){
		res.json('Alguns camps són obligatoris')
	} else {
		models.Alumne.find({
			nomAlumne: alumNomUp,
			cognomAlumne1: alumCog1Up,
			cognomAlumne2: alumCog2Up
		}).exec(function(error, alumne){
			if (error) throw error;

			if (alumne[0] === undefined){
			//Si l'alumne NO existeix	
			//TODAY

				let today = new Date();
				let dd = today.getDate();
				let mm = today.getMonth()+1; //January is 0!
				let yyyy = today.getFullYear();

				if(dd<10) {
					dd='0'+dd
				} 
				if(mm<10) {
					mm='0'+mm
				} 
				today = dd+'/'+mm+'/'+yyyy;

				if(!alum.dataNaixement || alum.dataNaixement == ''){

					alumDataNa = new Date();

				} else {

					//Data Naixement toISOString
					let dateSplit = alumDataNa.split("/");
					let data1 = new Date (parseInt(dateSplit[2]), parseInt(dateSplit[1])-1, parseInt(dateSplit[0]));
					let data1Iso = data1.toISOString();
					alumDataNa = data1Iso;

				};
				//CREATE
				let nouAlumne = new models.Alumne({
					nomAlumne: alumNomUp,
					cognomAlumne1: alumCog1Up,
					cognomAlumne2: alumCog2Up,
					dataNaixement: alumDataNa,
					seguretatSoc: alum.sSocial,

//no sé si serveix	codialumneola: req.session.user.centre._id,
					curs: alum.curs,
					eeUsee: alum.eeUsee,
					valorat: alum.valorat,

					tutor: req.session.user,
					centre:req.session.user.centre,

					assist: [{
						date: today,
						mati: null,
						tarda: null,
						dataIso: new Date()
					}],
					checks: [false, false, aill, false, false, 
					false, false, false, false, false, 
					false, false, false, false, false, 
					false, false, false, false, false, 
					false, false, false, false, false, 
					false, false, false, false, sersoc, 
					false, false, false, false, false],

					radios: [rep, false, false, false, false, 
					false, false, false, false, false, 
					false, false, false, false, false, 
					false, false, false, false, false, 
					false, false, false, false, false, 
					false, false, false, false, false, 
					false, false, false, false, false],

					observacions: "",
					mailAlum: "",
					passwordAl: "",
					telefon: "",
					altresEsp: "",
					atServPrivats: "",
					percentDim: "",
					motiuDic: "",
					anyVal: "",
					derivacio: "",
					motiuDer: ""

				});
				nouAlumne.save(function(error){

					if (error) {
						return res.json(error);

					} else {
						if (req.session.user.mestre === "tutor"){
								res.send('/list');
							}
						if (req.session.user.mestre === "ee"){
								res.send('/list_EE');
							}
						//return res.json(nouAlumne);
					}
				});
			} else {

				//Si l'alumne SI existeix
				console.log('Alumne trobat: ', alumne[0].nomAlumne, alumne[0].cognomAlumne1, alumne[0].cognomAlumne2);
				res.send('existeix');
			}
		});
	}
};


//Modificar dades - PUT
exports.update = function (req, res){

	let alumneId = req.params.id;
	let alum = req.body;

	models.Alumne.findByIdAndUpdate(alumneId,
									{$set:{
										'checks':[],
										'radios':[]},
										altresEsp:'',
										atServPrivats:'',
										percentDim:'',
										motiuDic:'',
										anyVal:'',
										derivacio:'',
										motiuDer:'',


									}, function(error, alumne){
										if (error){
											return res.json(error);
										}
									});

	delete alum.id;
	delete alum._id;

	models.Alumne.findByIdAndUpdate(alumneId, alum, {new: true, safe: true, upsert: true},
	function (error, alumne){
		if (error) {
			return res.json(error);
		} else {
			res.json({type:true, Alumne: JSON.stringify(alumne)});
		}
	});
};

//Suprimir alumne - DELETE
exports.suprD = function (req, res) {

	let alumneId = req.params.id;
	models.Alumne.findByIdAndRemove(alumneId, function(error, alumne){
		if (error){
			return res.json(error);
		} else {
			res.redirect('/list');
			}
	});
};

//Assistència d'alumnes - GET
exports.assisGet = function (req, res) {

	let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1; //January is 0!
    let yyyy = today.getFullYear();

    if(dd<10) {
        dd='0'+dd
    } 
    if(mm<10) {
        mm='0'+mm
    } 
    today = dd+'/'+mm+'/'+yyyy;

	models.Alumne.find({
		centre: req.session.user.centre,
		curs: req.session.user.curs
	} , null, {sort: {cognomAlumne1: 1, cognomAlumne2: 1, nomAlumne: 1}})
	.populate('centre tutor')
	.exec(function(error, alumnes){
		if (error){
			console.log(error);
		} else {
			res.render('assistencia',{Alumnes: alumnes, DataV: today});
			}
	});

};

//Assistència d'alumnes - POST
exports.assisPost = function (req, res) {
	let alum = req.body;
	let alumI = alum.i;

	function queryAssist(index,callback){
		if (index < alumI){
			let alumneId = alum['alumneId.' + index];
			let alumArray = alum['arraylng.' + index];
			let alumDate = alum['assist.date.' + index];
			let alumMati = alum['assist.mati.' + index];
			let alumTarda = alum['assist.tarda.' + index];
			let alumJustiMati = alum['assist.justiMati.' + index];
			let alumJustiTarda = alum['assist.justiTarda.' + index];

			let alumAssist = {};
			alumAssist['date']= alumDate;
			alumAssist['mati']= alumMati;
			alumAssist['tarda'] = alumTarda;
			alumAssist['justiMati'] = alumJustiMati;
			alumAssist['justiTarda'] = alumJustiTarda;

			if (!alumAssist['dataIso']){
				//TO ISODATE
				let darr1 = alumDate.split("/");    // ["29", "1", "2016"]
				let dataI = new Date(parseInt(darr1[2]),parseInt(darr1[1])-1,parseInt(darr1[0]));
				                         // Date {Fri Jan 29 2016 00:00:00 GMT+0530(utopia standard time)
				//let data1Iso = data1.toISOString();
				//let data1IsoFull = 'ISODate("'+ data1Iso +'")';
				                         //2016-01-28T18:30:00.000Z
				alumAssist['dataIso'] = dataI;
			}
			//ELIMINA ASSIST amb mateixa data
			models.Alumne.findByIdAndUpdate(alumneId, {$pull: {assist:{date: alumDate}, $push: {assist: alumAssist}}},{multi: true},
				function (error, pullalumne){
					if (error){
						res.json(error);
					} else {
						console.log('DATA BORRADA '+alumneId+ ": " +alumDate);
						//UPDATE ASSIST
						models.Alumne.findByIdAndUpdate(alumneId, {$push: {assist: alumAssist}},{multi: true},
							function (error, pushalumne){
								if (error) res.json(error);
								/*console.log('ALUMASSIST UPDATE '+alumneId+ ": " + JSON.stringify(alumAssist));*/
						});
					}
				}
			);
			queryAssist(index+1, callback);
		} else {
			callback();
		}
	}
	queryAssist(0, function(){
		setTimeout(function(){ res.redirect('/assistencia'); }, 3000);
	})
};


//Assistència DATA
exports.assisData = function (req, res) {

	let dataA = req.body.dataAssis;

	models.Alumne.find({
		centre: req.session.user.centre,
	/*	tutor: req.session.user, */
		curs: req.session.user.curs}
		, null, {sort: {cognomAlumne1: 1, cognomAlumne2: 1, nomAlumne: 1}})
	.populate('centre tutor')
	.exec(function(error, alumnes){
		if (error){
			console.log(error);
		} else {
			res.render('assistencia',{Alumnes: alumnes, DataV: dataA});

		}
	});
};


//IMPRIMIR ASSISTÈNCIA ENTRE 2 DATES - GET
exports.assisAlumne = function (req, res) {
	let alumneId = req.params.id;
	models.Alumne.findById(alumneId, function(error, alumne){
		if (error) {
			return res.json(error);
		} else {
			res.render('assistAlumne', {alumne: alumne});
		}
	});
};				

//Menjador - GET
exports.menjaGet = function (req, res) {

	let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1; //January is 0!
    let yyyy = today.getFullYear();

    if(dd<10) {
        dd='0'+dd
    } 
    if(mm<10) {
        mm='0'+mm
    } 
    today = dd+'/'+mm+'/'+yyyy;

	models.Alumne.find({
		centre: req.session.user.centre,
	/*	tutor: req.session.user, */
		curs: req.session.user.curs}
		, null, {sort: {cognomAlumne1: 1, cognomAlumne2: 1, nomAlumne: 1}})
	.populate('centre tutor')
	.exec(function(error, alumnes){
		if (error){
			console.log(error);
		} else {
			res.render('menjador',{Alumnes: alumnes, DataVM: today});
			}
	});
};
//Menjador - POST
exports.menjaPost = function (req, res) {

	let alum = req.body;
	let alumI = alum.i;

	for (let i =0; i < alumI; i ++) {
		let alumneId = alum['alumneId.'+i];
		let alumArray = alum['arraylng.'+i];

		let alumDateM = alum['menjador.dataMen.'+i];
		let alumMenu = alum['menjador.menu.'+i];
		

		let alumMenjador = {};

		alumMenjador['dataMen']= alumDateM;
		alumMenjador['menu']= alumMenu;
	
		if (!alumMenjador['dataIsoMen']){

			//TO ISODATE

			darr1 = alumDateM.split("/");    // ["29", "1", "2016"]
			let dataI = new Date(parseInt(darr1[2]),parseInt(darr1[1])-1,parseInt(darr1[0]));
			alumMenjador['dataIsoMen'] = dataI;
		}
		//ELIMINA menjador amb mateixa data
		models.Alumne.findByIdAndUpdate(alumneId, {$pull: {menjador:{dataMen: alumDateM}}},{multi: true},
		function (error, alumne){
		if (error) res.json(error);
		});

		//UPDATE menjador
		models.Alumne.findByIdAndUpdate(alumneId, {$push: {menjador: alumMenjador}},
		function (error, alumne){
			if (error) res.json(error);
		});
	};
		res.redirect('/menjador');
};


//Menjador DATA
exports.menjaData = function (req, res) {

	let dataM = req.body.dataMenja;

	models.Alumne.find({
		centre: req.session.user.centre,
	/*	tutor: req.session.user, */
		curs: req.session.user.curs}
		, null, {sort: {cognomAlumne1: 1, cognomAlumne2: 1, nomAlumne: 1}})
	.populate('centre tutor')
	.exec(function(error, alumnes){
		if (error){
			console.log(error);
		} else {
			res.render('menjador',{Alumnes: alumnes, DataVM: dataM});

		}
	});
};


//Menjador - IMPRIMIR ASSISTÈNCIA ENTRE 2 DATES - GET
exports.menjaAlumne = function (req, res) {
	let alumneId = req.params.id;
	models.Alumne.findById(alumneId, function(error, alumne){
		if (error) {
			return res.json(error);
		} else {
			res.render('assistAlumne', {alumne: alumne});
		}
	});
};

//REUNIONS PARES GET
exports.reunioGet = function (req, res) {
	let alumneId = req.params.id;
	models.Alumne.findById(alumneId)
	.populate('centre')
	.exec(function(error, alumne){
		if (error) {
			return res.json(error);
		} else {
			res.render('reunions_pares', {alumne: alumne, page_name:''});
		}
	});
};

//REUNIONS POST
exports.reunioPost = function (req, res) {
	let alumneId = req.params.id;
	let alum = req.body;
	models.Alumne.findByIdAndUpdate(alumneId, alum, {new: true, safe: true, upsert: true},
	function (error, alumne){
		if (error) res.json(error);
		res.json(alumne);
	});

}

//REUNIONS UPDATE
exports.reunioUpdate = function (req, res) {
	let alumneId = req.params.id;
	let alumneI = req.params.i;
	let alum = req.body;

	models.Alumne.findByIdAndUpdate(alumneId, alum, {multi: true, safe: true, upsert: true},

	function (error, alumne){
		if (error) {
			res.json(error);
		} else{
			res.json(alumne);
		}
	});

}

//REUNIONS DELETE
exports.reunioDel = function (req, res) {
	let alumneId = req.params.id;
	let alumneI = req.params.i;

	models.Alumne.findOne({_id: alumneId}, function (error, alumne){
		if (error) res.json(error);
		alumne.reunionsPares.splice(alumneI,1);
		alumne.save(function(error){
			if (error) {res.json(error);
		} else{
			res.render('reunions_pares', {alumne: alumne, page_name:''});
		};
		});

	});
};
var models = require('../models/index');

//Llstat d'alumnes - GET
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

//Altes d'alumnes - POST
exports.create = function (req, res){

	var scola = req.session.user.centre;

	var alum = req.body;
	var rep = alum['radios.0'];
	var aill = alum['checks.2'];
	var sersoc = alum['checks.29'];

	if (!alum.nom||!alum.cognom1||!alum.curs){
		res.json('Alguns camps són obligatoris')
	} else {
		models.Alumne.find(function(error, alumne){
			if (error){
				console.log('error: '+ error);
			} else {
			//TODAY
				var today = new Date();
				var dd = today.getDate();
				var mm = today.getMonth()+1; //January is 0!
				var yyyy = today.getFullYear();

				if(dd<10) {
					dd='0'+dd
				} 
				if(mm<10) {
					mm='0'+mm
				} 
				today = dd+'/'+mm+'/'+yyyy;

				if(!alum.naixement){
					alum.naixement = new Date();
				};

				var nouAlumne = new models.Alumne({
					nomAlumne: alum.nom,
					cognomAlumne1: alum.cognom1,
					cognomAlumne2: alum.cognom2,
					dataNaixement: alum.naixement,
					seguretatSoc: alum.sSocial,

					codialumneola: req.session.user.centre._id,
					curs: alum.curs,
					eeUsee: alum.eeUsee,

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
					} else{
						return res.json(nouAlumne);
					}
				});
			};
		});
	}
};


//Modificar dades - PUT
exports.update = function (req, res){

	var alumneId = req.params.id;
	var alum = req.body;

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

	var alumneId = req.params.id;
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

	var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

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
			res.render('assistencia',{Alumnes: alumnes, DataV: today});
			}
	});

};

//Assistència d'alumnes - POST
exports.assisPost = function (req, res) {
	var alum = req.body;
	var alumI = alum.i;

	function queryAssist(index,callback){
		if (index < alumI){
			var alumneId = alum['alumneId.'+index];
			var alumArray = alum['arraylng.'+index];
			var alumDate = alum['assist.date.'+index];
			var alumMati = alum['assist.mati.'+index];
			var alumTarda = alum['assist.tarda.'+index];

			var alumAssist = {};
			alumAssist['date']= alumDate;
			alumAssist['mati']= alumMati;
			alumAssist['tarda'] = alumTarda;

			if (!alumAssist['dataIso']){
				//TO ISODATE
				darr1 = alumDate.split("/");    // ["29", "1", "2016"]
				var dataI = new Date(parseInt(darr1[2]),parseInt(darr1[1])-1,parseInt(darr1[0]));
				                         // Date {Fri Jan 29 2016 00:00:00 GMT+0530(utopia standard time)
				//var data1Iso = data1.toISOString();
				//var data1IsoFull = 'ISODate("'+ data1Iso +'")';
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
								console.log('ALUMASSIST UPDATE '+alumneId+ ": " + JSON.stringify(alumAssist));
						});
					}
				}
			);
			console.log('IF '+index);
			queryAssist(index+1, callback);
		} else {
			callback();
			console.log('ELSE');
		}
	}
	queryAssist(0, function(){
		console.log('PRE ASSISTENCIA');
		setTimeout(function(){ res.redirect('/assistencia'); }, 3000);
		
		console.log('POST ASSISTENCIA');
	})
};


//Assistència DATA
exports.assisData = function (req, res) {

	var dataA = req.body.dataAssis;

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
	var alumneId = req.params.id;
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

	var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

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

	var alum = req.body;
	var alumI = alum.i;

	for (var i =0; i < alumI; i ++) {
		var alumneId = alum['alumneId.'+i];
		var alumArray = alum['arraylng.'+i];

		var alumDateM = alum['menjador.dataMen.'+i];
		var alumMenu = alum['menjador.menu.'+i];
		

		var alumMenjador = {};

		alumMenjador['dataMen']= alumDateM;
		alumMenjador['menu']= alumMenu;
	
		if (!alumMenjador['dataIsoMen']){

			//TO ISODATE

			darr1 = alumDateM.split("/");    // ["29", "1", "2016"]
			var dataI = new Date(parseInt(darr1[2]),parseInt(darr1[1])-1,parseInt(darr1[0]));
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

	var dataM = req.body.dataMenja;

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
	var alumneId = req.params.id;
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
	var alumneId = req.params.id;
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
	var alumneId = req.params.id;
	var alum = req.body;
	models.Alumne.findByIdAndUpdate(alumneId, alum, {new: true, safe: true, upsert: true},
	function (error, alumne){
		if (error) res.json(error);
		res.json(alumne);
	});

}

//REUNIONS UPDATE
exports.reunioUpdate = function (req, res) {
	var alumneId = req.params.id;
	var alumneI = req.params.i;
	var alum = req.body;

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
	var alumneId = req.params.id;
	var alumneI = req.params.i;

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
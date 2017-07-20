var models = require('../models/index');

//Llstat d'alumnes - GET
exports.list = function (req, res) {
	models.Alumne.find({tutor: req.session.user, curs: req.session.user.curs}
		, null, {sort: {cognomAlumne1: 1, cognomAlumne2: 1, nomAlumne: 1}})
	.populate('escola tutor')
	.exec(function(error, docs){
		if (error){
			console.log(error);
		} else {
			res.render('index',{Alumnes: docs});
			}
	});

};

//Altes d'alumnes - POST
exports.create = function (req, res){

	var alum = req.body;

	if (!alum.nom||!alum.cognom1||!alum.curs){
		models.Alumne.find(function(error, docs){
		if (error){
			console.log(error);
		} else {
			res.json(alum);
			console.log(alum);
			console.log("curs: " + alum.curs);
			};
		});
	} else {
		models.Escola.find({"_id": 17008237}, function(error, esc){
		if (error){
			console.log(error);
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

				codiEscola: req.session.user.escola,
				curs: alum.curs,
				eeUsee: alum.eeUsee,

				escola: req.session.user.escola,
				tutor: req.session.user,

				assist: [{
					date: today,
					mati: null,
					tarda: null,
					dataIso: new Date()
				}],

			});
			nouAlumne.save(function(error){
				if (error) {
					return res.json(error);}
			});
			var list = "";
			var usr = req.session.user.mestre;
			if (usr === "tutor"){
				list = "/list"
			} else {
				list = "/list_EE"
			}
			res.redirect(list);
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
			res.json(alumne)}
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

	models.Alumne.find({tutor: req.session.user, curs: req.session.user.curs}
		, null, {sort: {cognomAlumne1: 1, cognomAlumne2: 1, nomAlumne: 1}})
	.populate('escola tutor')
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

	for (var i =0; i < alumI; i ++) {
		var alumneId = alum['alumneId.'+i];
		var alumArray = alum['arraylng.'+i];

		var alumDate = alum['assist.date.'+i];
		var alumMati = alum['assist.mati.'+i];
		var alumTarda = alum['assist.tarda.'+i];

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
		models.Alumne.findByIdAndUpdate(alumneId, {$pull: {assist:{date: alumDate}}},{multi: true},

		function (error, alumne){
		if (error) res.json(error);
		});

		//UPDATE ASSIST
		models.Alumne.findByIdAndUpdate(alumneId, {$push: {assist: alumAssist}},

		function (error, alumne){
			if (error) res.json(error);
		});
	};
	
		res.redirect('/assistencia');

};


//Assistència DATA
exports.assisData = function (req, res) {

	var dataA = req.body.dataAssis;

	models.Alumne.find({tutor: req.session.user, curs: req.session.user.curs}
		, null, {sort: {cognomAlumne1: 1, cognomAlumne2: 1, nomAlumne: 1}})
	.populate('escola tutor')
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

	models.Alumne.find({tutor: req.session.user, curs: req.session.user.curs}
		, null, {sort: {cognomAlumne1: 1, cognomAlumne2: 1, nomAlumne: 1}})
	.populate('escola tutor')
	.exec(function(error, alumnes){
		if (error){
			console.log(error);
		} else {
			//console.log(JSON.stringify(alumnes));
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
		var alumMenja = alum['menjador.menja.'+i];
		var alumPaga = alum['menjador.paga.'+i];

		var alumMenjador = {};

		alumMenjador['dataMen']= alumDateM;
		alumMenjador['menja']= alumMenja;
		alumMenjador['paga'] = alumPaga;
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

	models.Alumne.find({tutor: req.session.user, curs: req.session.user.curs}
		, null, {sort: {cognomAlumne1: 1, cognomAlumne2: 1, nomAlumne: 1}})
	.populate('escola tutor')
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

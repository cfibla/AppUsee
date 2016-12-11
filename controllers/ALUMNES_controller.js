var models = require('../models/index');


//Llstat d'alumnes - GET
exports.list = function (req, res) {
	models.Alumne.find({tutor: req.session.user, curs: req.session.user.curs})
	.populate('escola tutor')
	.exec(function(error, docs){
		if (error){
			console.log(error);
		} else {
			res.render('index',{Alumnes: docs});
			}
	});

};

//Altes d'alumnes - GET
exports.alta = function (req, res) {

	res.render('nouAlumne', {errorAlta:'', alumne:{nom:'',cognom1:''}});
};

//Altes d'alumnes - POST
exports.create = function (req, res){

	var alum = req.body;

	if (!alum.nom||!alum.cognom1||!alum.curs){
		models.Alumne.find(function(error, docs){
		if (error){
			console.log(error);
		} else {
			res.render('nouAlumne', {errorAlta:"ATENCIÓ: Heu d'emplenar els camps obligatoris (*)", alumne: alum});
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
			nouAlumne.save(function(error, alumne){
				if (error) res.json(error);
			});
			res.redirect('/list');
			};
		});
	}
};

//Modificar dades - GET
exports.mod = function (req, res) {
	var alumneId = req.params.id;
	models.Alumne.findById(alumneId, function(error, alumne){
		if (error) {
			return res.json(error);
		} else {
			res.render('modDades', {alumne: alumne});
		}
	});
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
		if (error) 
			return res.json(error);
		res.redirect('/list');
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

	models.Alumne.find({tutor: req.session.user, curs: req.session.user.curs})
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
		if (!alumAssist['dataIso'])
		{alumAssist['dataIso'] = new Date();}

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

	models.Alumne.find({tutor: req.session.user, curs: req.session.user.curs})
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

//Suprimir alumne - VIEW
exports.suprV = function (req, res) {
	var alumneId = req.params.id;
	models.Alumne.findById(alumneId, function(error, alumne){
		if (error) {
			return res.json(error);
		} else {
			res.render('delete_view', {alumne: alumne});

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

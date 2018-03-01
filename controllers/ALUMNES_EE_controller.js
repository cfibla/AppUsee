var models = require('../models/index');

//Llstat d'alumnes EE- GET
exports.list = function (req, res) {
	console.log('LIST_EE');
	console.log('CENTRE: ' + req.session.user.centre);
	models.Alumne.find({
		'eeUsee': true,
		centre: req.session.user.centre}
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

};

//SEG_ACTUACIONS GET
exports.actuaGet = function (req, res) {
	var alumneId = req.params.id;
	models.Alumne.findById(alumneId)
	.populate('centre')
	.exec(function(error, alumne){
		if (error) {
			return res.json(error);
		} else {
			res.render('actuacions', {alumne: alumne, page_name:''});

		}
	});
};

//SEG_CAD GET
exports.cadGet = function (req, res) {
	var alumneId = req.params.id;
	models.Alumne.findById(alumneId)
	.populate('centre')
	.exec(function(error, alumne){
		if (error) {
			return res.json(error);
		} else {
			res.render('cad', {alumne: alumne, page_name:''});

		}
	});
};

//SEG_ALTRES-REUNIONS GET
exports.altresGet = function (req, res) {
	var alumneId = req.params.id;
	models.Alumne.findById(alumneId)
	.populate('centre')
	.exec(function(error, alumne){
		if (error) {
			return res.json(error);
		} else {
			res.render('altres-reunions', {alumne: alumne, page_name:''});

		}
	});
};

//SEG_ACTUACIONS POST
exports.actuaPost = function (req, res) {
	var alumneId = req.params.id;
	var alum = req.body;
	models.Alumne.findByIdAndUpdate(alumneId, alum, {new: true, safe: true, upsert: true},
	function (error, alumne){
		if (error) res.json(error);
		res.json(alumne);
	});

}

//SEG_ACTUACIONS UPDATE
exports.actuaUpdate = function (req, res) {
	var alumneId = req.params.id;
	var alumneI = req.params.i;
	var alum = req.body;

	models.Alumne.findByIdAndUpdate(alumneId, alum, {multi: true, safe: true, upsert: true},

	function (error, alumne){
		if (error) res.json(error);
		res.render('seg_act_EE', {alumne: alumne, page_name:''});
	});

}

//SEG_ACTUACIONS DELETE
exports.actuaDelete = function (req, res) {
	var alumneId = req.params.id;
	var alumneI = req.params.i;

	models.Alumne.findOne({_id: alumneId}, function (error, alumne){
		if (error) res.json(error);
		alumne.segActuacions.splice(alumneI,1);
		alumne.save(function(error){
			if (error) {res.json(error);
		} else{
			res.render('seg_act_EE', {alumne: alumne, page_name:''});
		};
		});

	});
};

//CAD DELETE
exports.cadDelete = function (req, res) {
	var alumneId = req.params.id;
	var alumneI = req.params.i;

	models.Alumne.findOne({_id: alumneId}, function (error, alumne){
		if (error) res.json(error);
		alumne.segInformacioCAD.splice(alumneI,1);
		alumne.save(function(error){
			if (error) {res.json(error);
		} else{
			res.render('seg_act_EE', {alumne: alumne, page_name:''});
		};
		});

	});
};

//ALTRES COORDINACIONS DELETE
exports.altresDelete = function (req, res) {
	var alumneId = req.params.id;
	var alumneI = req.params.i;

	models.Alumne.findOne({_id: alumneId}, function (error, alumne){
		if (error) res.json(error);
		alumne.segAltresCoord.splice(alumneI,1);
		alumne.save(function(error){
			if (error) {res.json(error);
		} else{
			res.render('seg_act_EE', {alumne: alumne, page_name:''});
		};
		});

	});
};

//Alta alumne - DELETE
exports.alta = function (req, res) {

	var alumneId = req.params.id;
	models.Alumne.findByIdAndUpdate(alumneId, {'eeUsee': false}, {new: true}, function(error, alumne){
		if (error){
			return res.json(error);
		} else {
			res.json(alumneId);
			}
	});
};

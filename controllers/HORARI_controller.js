var models = require('../models/index');
var moment = require('moment');


//CREAR HORARI
exports.create = function (req, res) {
	var hora = moment().format('DD MM YYYY');
	var horari = req.body;

		console.log('INICI OK');
		console.log(hora);


	res.json(req.body);
};

//SEG_ACTUACIONS GET
exports.actuaGet = function (req, res) {
	var alumneId = req.params.id;
	models.Alumne.findById(alumneId, function(error, alumne){
		if (error) {
			return res.json(error);
		} else {
			res.render('seg_act_EE', {alumne: alumne, page_name:''});

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

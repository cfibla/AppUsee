var models = require('../models/index');
var moment = require('moment');


//CREAR HORARI
exports.create = function (req, res) {
	var horari = req.body;
	var usr=req.session.user;
	var usrId = usr.id

	var inici = moment(horari.horariInici, 'DD/MM/YYYY');
	var final = moment(horari.horariFinal, 'DD/MM/YYYY');

	for(i=inici; i<final; i=moment(i).add(1,'days')){

		var nouHorari = new models.Horari({
			data: [i]
		});

	};

	nouHorari.save(function (error, horari){
		if (error) {
			res.json(error);
		} else {
			console.log('DATA: '+moment(i).format('DD/MM/YYYY'));
			//VINCULAR HORARI CON USER
			models.User.findOne({
			  _id: usrId
			})
			.then((user) => {
			  user.horari = horari;
			  user
			    .save()
			    .then(() => {
			      res.jsonp({ user }); // enviamos user de vuelta
			    });
			});	
		}
	})
	res.json(horari);
}

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

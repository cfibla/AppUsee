var models = require('../models/index');

/* GET home page. */
exports.login = function(req, res) {
	res.render('login', { title: 'AppEscola' });
};


//Llstat d'alumnes - GET
exports.list = function (req, res) {
	models.Alumne.find(function(error, docs){
		if (error){
			console.log(error);
		} else {
			res.render('index',{Alumnes: docs});
			}
	});
	
};

//Altes d'alumnes - POST
exports.alta = function (req, res) {
	
	res.render('dades_alta', {errorAlta:''});
};


exports.create = function (req, res){
	var alum = req.body;
	

	if (!alum.nom||!alum.cognom1||!alum.cognom2||!alum.naixement||!alum.sSocial){
		models.Alumne.find(function(error, docs){
		if (error){
			console.log(error);
		} else {
			res.render('dades_alta', {errorAlta:"Heu d'emplenar tots els apartats"});
			};
		});
	} else {


	var nouAlumne = new models.Alumne({
		nomAlumne: alum.nom,
		cognomAlumne1: alum.cognom1,
		cognomAlumne2: alum.cognom2,
		dataNaixement: alum.naixement,
		seguretatSoc: alum.sSocial
	});
	nouAlumne.save(function(error, alumne){
		if (error) res.json(error)
	});
		res.redirect('/list');
	};
};

//Modificar dades - GET
exports.mod = function (req, res) {
	var alumneId = req.params.id;
	models.Alumne.findById(alumneId, function(error, alumne){
		if (error) {
			return res.json(error);
		} else {
			res.render('dades_mod', {alumne: alumne});
			
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
		if (error) res.json(error);
		res.redirect('/list');
	});

	};

//SEGUIMENT GET
exports.actuaGet = function (req, res) {
	var alumneId = req.params.id;
	models.Alumne.findById(alumneId, function(error, alumne){
		if (error) {
			return res.json(error);
		} else {
			res.render('seg_act', {alumne: alumne});
			
		}
	});
};


//SEGUIMENT POST
exports.actuaPost = function (req, res) {

		var alumneId = req.params.id;
		var alum = req.body;

		models.Alumne.findByIdAndUpdate(alumneId, alum, {new: true, safe: true, upsert: true},

		function (error, alumne){
		if (error) res.json(error);
		res.redirect('/list');
	});

}

//IMPRIMIR
exports.print = function (req, res) {
	var alumneId = req.params.id;
	models.Alumne.findById(alumneId, function(error, alumne){
		if (error) {
			return res.json(error);
		} else {
				//require dependencies
				var PDFDocument = require ('pdfkit');
				var blobStream  = require ('blob-stream');
				var fs = require('fs');

				//create a document the same way as above
				var doc = new PDFDocument();

				//pipe the document to a blob
				var stream = doc.pipe(blobStream());

				//add your content to the document here, as usual
				var lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in suscipit purus.  Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus nec hendrerit felis. Morbi aliquam facilisis risus eu lacinia. Sed eu leo in turpis fringilla hendrerit. Ut nec accumsan nisl.'

				doc.fontSize = 8;
				doc.text ('This text is left aligned. ' + lorem,{
												  width: 410,
												  align: 'left'});

				doc.moveDown();
				doc.text ('This text is centered. ' + lorem,{
												  width: 410,
												  align: 'center'});

				//get a blob when you're done
				doc.end()
				stream.on ('finish'), ->
				  //get a blob you can do whatever you like with
				  var blob = stream.toBlob('application/pdf')

				  //or get a blob URL for display in the browser
				  var url = stream.toBlobURL('application/pdf')
				  iframe.src = url
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
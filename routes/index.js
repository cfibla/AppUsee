var express = require('express');
var router = express.Router();

var alumController = require('../controllers/ALUMNES_controller');
var alumEeController = require('../controllers/ALUMNES_EE_controller');
var escolaController = require('../controllers/ESCOLA_controller');
var userController = require('../controllers/USER_controller');
var userEeController = require('../controllers/USER_ee_controller');
var sessionController = require('../controllers/SESSION_controller');
var assistPDF = require('../public/javascripts/PDFs/assistencia');
var segUseePDF = require('../public/javascripts/PDFs/seguimentUsee');

//rutas SESSION
router.get('/',						sessionController.new);
router.post('/login',				sessionController.login, sessionController.login_EE);
router.get('/logout',				sessionController.loginRequired, sessionController.destroy);

//rutas ESCOLA
router.get('/escola_nou',			escolaController.nouEscola);
router.post('/escola_crear',		escolaController.createEscola);

//rutas USER
router.get('/usuari_nou',			userController.nouUser);
router.post('/usuari_crear',		userController.createUser);
router.get('/usuari/:id',			userController.profile);

//rutas USER_EE
router.get('/usuari_ee_nou',		userEeController.nouUser);
router.post('/usuari_ee_crear',		userEeController.createUser);

//rutas ALUMNE
router.get('/list',					sessionController.loginRequired, alumController.list);
router.post('/alumneNou', 			sessionController.loginRequired, alumController.create);
router.get('/dadesAlumne/:id', 		sessionController.loginRequired, alumController.mod);
router.put('/dadesUpdate/:id', 		sessionController.loginRequired, alumController.update);
router.get('/assistencia',			sessionController.loginRequired, alumController.assisGet);
router.post('/assisData',			sessionController.loginRequired, alumController.assisData);
router.put('/assistenciaN',			sessionController.loginRequired, alumController.assisPost);
router.get('/assistenciaA/:id',		sessionController.loginRequired, alumController.assisAlumne);
router.get('/dades_suprV/:id', 		sessionController.loginRequired, alumController.suprV);
router.put('/dades_suprD/:id', 		sessionController.loginRequired, alumController.suprD);

//rutas ALUMNE EE
router.get('/list_EE',				sessionController.loginRequired, alumEeController.list);
router.get('/seguiment-EE/:id',		sessionController.loginRequired, alumEeController.actuaGet);
router.put('/seguiment-EE/post/:id',	sessionController.loginRequired, alumEeController.actuaPost);
router.put('/seguiment-EE/:id/act/:i',	sessionController.loginRequired, alumEeController.actuaUpdate);
router.put('/seguiment-EE/:id/actDel/:i',	sessionController.loginRequired, alumEeController.actuaDelete);
router.put('/seguiment-EE/:id/cadDel/:i',	sessionController.loginRequired, alumEeController.cadDelete);
router.put('/seguiment-EE/:id/altresDel/:i',	sessionController.loginRequired, alumEeController.altresDelete);


//rutas PDF
router.post('/assistPDF',			sessionController.loginRequired, assistPDF.PDF);
router.get('/print_EE/:id',			sessionController.loginRequired, segUseePDF.PDF);



module.exports = router;

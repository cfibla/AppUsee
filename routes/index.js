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
router.get('/try_nou',				sessionController.try);
router.post('/login',				sessionController.login, sessionController.login_EE);
router.get('/logout',				sessionController.loginRequired, sessionController.destroy);

//rutas ESCOLA
router.get('/escola_nou',			escolaController.nouEscola);
router.post('/escola_crear',		escolaController.createEscola);

//rutas USER
router.get('/usuari_nou',			userController.nouUser);
router.post('/usuari_crear',		userController.createUser);

//rutas USER_EE
router.get('/usuari_ee_nou',		userEeController.nouUser);
router.post('/usuari_ee_crear',		userEeController.createUser);

//rutas ALUMNE
router.get('/list',					sessionController.loginRequired, alumController.list);
router.get('/nouAlumne', 			sessionController.loginRequired, alumController.alta);
router.post('/alumneNou', 			sessionController.loginRequired, alumController.create);
router.get('/dadesAlumne/:id', 		sessionController.loginRequired, alumController.mod);
router.put('/dadesUpdate/:id', 		sessionController.loginRequired, alumController.update);
router.get('/assistencia',			sessionController.loginRequired, alumController.assisGet);
router.post('/assisData',			sessionController.loginRequired, alumController.assisData);
router.put('/assistenciaN',			sessionController.loginRequired, alumController.assisPost);
router.get('/assistenciaA/:id',		sessionController.loginRequired, alumController.assisAlumne);
router.get('/dades_suprV/:id', 		sessionController.loginRequired, alumController.suprV);
router.get('/dades_suprD/:id', 		sessionController.loginRequired, alumController.suprD);

//rutas ALUMNE EE
router.get('/list_EE',				sessionController.loginRequired, alumEeController.list);
router.get('/nou_alumne_EE', 		sessionController.loginRequired, alumEeController.alta);
router.post('/alumne_nou_EE', 		sessionController.loginRequired, alumEeController.create);
router.get('/dades_mod_EE/:id', 	sessionController.loginRequired, alumEeController.mod);
router.put('/dades_update_EE/:id',	sessionController.loginRequired, alumEeController.update);
router.get('/seg_act_EE/:id',		sessionController.loginRequired, alumEeController.actuaGet);
router.put('/seg_act_upd_EE/:id',	sessionController.loginRequired, alumEeController.actuaPost);
router.put('/seg_act_upd_EE/:id/act/:i',	sessionController.loginRequired, alumEeController.actuaUpdate);
router.delete('/seg_act_upd_EE/:id/actDel/:i',	sessionController.loginRequired, alumEeController.actuaDelete);


//rutas PDF
router.post('/assistPDF',			sessionController.loginRequired, assistPDF.PDF);
router.get('/print_EE/:id',			sessionController.loginRequired, segUseePDF.PDF);



module.exports = router;

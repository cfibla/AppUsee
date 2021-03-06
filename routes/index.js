var express = require('express');
var router = express.Router();

var adminController = require('../controllers/ADMIN_controller');

var alumController = require('../controllers/ALUMNES_controller');
var alumEeController = require('../controllers/ALUMNES_EE_controller');
var escolaController = require('../controllers/ESCOLA_controller');
var centreController = require('../controllers/CENTRE_controller');
var userController = require('../controllers/USER_controller');
var userEeController = require('../controllers/USER_ee_controller');
var horariController = require('../controllers/HORARI_controller');
var sessionController = require('../controllers/SESSION_controller');
var introController = require('../controllers/INTRO_controller');
var emailController = require('../controllers/EMAIL_controller');
var assistPDF = require('../public/javascripts/PDFs/assistencia');
var segUseePDF = require('../public/javascripts/PDFs/seguimentUsee');
var reunionsPDF = require('../public/javascripts/PDFs/reunionsPares');
var actuacionsPDF = require('../public/javascripts/PDFs/actuacions');
var infoCadPDF = require('../public/javascripts/PDFs/infocad');
var altresCoordPDF = require('../public/javascripts/PDFs/altresCoord');

//rutas LOGIN
router.get('/home',					introController.inici);
router.get('/bloc',					introController.bloc);

//rutas SESSION
router.get('/',						sessionController.new);
router.post('/login',				sessionController.login,
									//sessionController.login_EE,
									sessionController.loginCentre);
router.get('/logout',				sessionController.loginRequired, sessionController.destroy);

//Rutas ADMIN
router.get('/admin',				sessionController.loginRequired, adminController.main);
router.get('/admin-users',			sessionController.loginRequired, adminController.users);
router.get('/canvi-curs',			sessionController.loginRequired, adminController.canviCurs);

//rutas ESCOLA
//router.get('/escola_nou',			escolaController.nouEscola);
//router.post('/escola_crear',		escolaController.createEscola);

//rutas CENTRE
router.get('/escola_nou',			centreController.nouCentre);
router.post('/escola_crear',		centreController.createCentre);
router.get('/centre',				centreController.centreMain);

//rutas USER
router.get('/usuari_nou',			userController.nouUser);
router.post('/usuari_crear',		userController.createUser);
router.get('/usuari',				sessionController.loginRequired, userController.profile);
router.get('/contrasenya',			sessionController.loginRequired, userController.updPwdGet);
router.put('/contrasenya-upd',		sessionController.loginRequired, userController.updPwdPost);
router.put('/usuari/:id',			sessionController.loginRequired, userController.update);
router.put('/usuariD/:id',			sessionController.loginRequired, userController.delUser);

//rutas USER_EE
router.get('/usuari_ee_nou',		userEeController.nouUser);
router.post('/usuari_ee_crear',		userEeController.createUser);
router.put('/usuari_ee/:id',		sessionController.loginRequired, userEeController.update);
router.put('/usuari_ee_D/:id',		sessionController.loginRequired, userEeController.delUser);

//rutas ALUMNE
router.get('/list',					sessionController.loginRequired, alumController.list);
router.post('/alumneNou', 			sessionController.loginRequired, alumController.create);
router.put('/dadesUpdate/:id', 		sessionController.loginRequired, alumController.update);
router.put('/dades_suprD/:id', 		sessionController.loginRequired, alumController.suprD);

router.get('/reunions-pares/:id', 	sessionController.loginRequired, alumController.reunioGet);
router.put('/reunions-pares/post/:id', 	sessionController.loginRequired, alumController.reunioPost);
router.put('/reunions-pares/upd/:i/:id', 	sessionController.loginRequired, alumController.reunioUpdate);
router.put('/reunions-pares/del/:i/:id', 	sessionController.loginRequired, alumController.reunioDel);

router.get('/assistencia',			sessionController.loginRequired, alumController.assisGet);
router.post('/assisData',			sessionController.loginRequired, alumController.assisData);
router.put('/assistenciaN',			sessionController.loginRequired, alumController.assisPost);
router.get('/assistenciaA/:id',		sessionController.loginRequired, alumController.assisAlumne);

router.get('/menjador',				sessionController.loginRequired, alumController.menjaGet);
router.post('/menjaData',			sessionController.loginRequired, alumController.menjaData);
router.put('/menjadorN',			sessionController.loginRequired, alumController.menjaPost);
router.get('/menjadorA/:id',		sessionController.loginRequired, alumController.menjaAlumne);

//rutas ALUMNE EE
router.get('/list_EE',						sessionController.loginRequired, alumEeController.list);
router.get('/seguiment-EE/actuacions/:id',	sessionController.loginRequired, alumEeController.actuaGet);
router.get('/seguiment-EE/cad/:id',			sessionController.loginRequired, alumEeController.cadGet);
router.get('/seguiment-EE/altres/:id',		sessionController.loginRequired, alumEeController.altresGet);
router.put('/seguiment-EE/post/:id',		sessionController.loginRequired, alumEeController.actuaPost);
router.put('/seguiment-EE/:id/act/:i',		sessionController.loginRequired, alumEeController.actuaUpdate);
router.put('/seguiment-EE/:id/actDel/:i',	sessionController.loginRequired, alumEeController.actuaDelete);
router.put('/seguiment-EE/:id/cadDel/:i',	sessionController.loginRequired, alumEeController.cadDelete);
router.put('/seguiment-EE/:id/altresDel/:i',sessionController.loginRequired, alumEeController.altresDelete);
router.put('/dades_alta/:id', 				sessionController.loginRequired, alumEeController.alta);

//rutas HORARI
router.post('/horari-crear',				sessionController.loginRequired, horariController.create);
router.get('/horari-config',				sessionController.loginRequired, horariController.config);
router.put('/horari-post',					sessionController.loginRequired, horariController.update);
router.put('/horari-delete/:id',			sessionController.loginRequired, horariController.delete);
router.get('/horari-diari',					sessionController.loginRequired, horariController.diariGet);
router.put('/horari-diari-post',			sessionController.loginRequired, horariController.diariPost);
router.get('/horari-area/:area',			sessionController.loginRequired, horariController.areaGet);
router.put('/horari-area-post',				sessionController.loginRequired, horariController.areaPost);
router.get('/list_EE/:curs',				sessionController.loginRequired, horariController.cursGet);

//rutas MAIL
router.post('/send-email',					emailController.sendEmail);

//rutas PDF
router.post('/assistPDF',			sessionController.loginRequired, assistPDF.PDF);
router.get('/print_EE/:id',			sessionController.loginRequired, segUseePDF.PDF);
router.get('/reunioPares/:i/:id',		sessionController.loginRequired, reunionsPDF.PDF);
router.get('/actuacions/:i/:id',		sessionController.loginRequired, actuacionsPDF.PDF);
router.get('/infoCAD/:i/:id',		sessionController.loginRequired, infoCadPDF.PDF);
router.get('/altresCoord/:i/:id',		sessionController.loginRequired, altresCoordPDF.PDF);


module.exports = router;

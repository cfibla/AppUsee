var   express = require('express');
var router = express.Router();

var eeController = require('../controllers/EE_controller');
var userController = require('../controllers/USER_controller');
var sessionController = require('../controllers/SESSION_controller');

/* GET home page. */
//router.get('/', function(req, res) {
//  res.render('index', { title: 'AppEscola' });
//});

//rutas session
router.get('/',						sessionController.new);
router.get('/login',				sessionController.login);

//rutas user
router.get('/usuari_nou',			userController.nouUser);
router.post('/usuari_crear',		userController.createUser);

//rutas EE
router.get('/list',					eeController.list);
router.get('/dades_alta', 			eeController.alta);
router.post('/dades_crear', 		eeController.create);
router.get('/dades_mod/:id', 		eeController.mod);
router.put('/dades_update/:id',		eeController.update);
router.get('/seg_act/:id',			eeController.actuaGet);
router.get('/print/:id',			eeController.print);
router.put('/seg_act_upd/:id',		eeController.actuaPost);
router.get('/dades_suprV/:id', 		eeController.suprV);
router.get('/dades_suprD/:id', 		eeController.suprD);



module.exports = router;

var express = require('express');
var router = express.Router();

var eeController = require('../controllers/EE_controller');

/* GET home page. */
//router.get('/', function(req, res) {
//  res.render('index', { title: 'AppEscola' });
//});

router.get('/',						eeController.login);
router.get('/list',					eeController.list);
router.get('/dades_alta', 			eeController.alta);
router.post('/dades_crear', 		eeController.create);
router.get('/dades_mod/:id', 		eeController.mod);
router.put('/dades_update/:id',		eeController.update);
router.get('/seg_act/:id',			eeController.actuaGet);
router.post('/print/:id',			eeController.print);
router.put('/seg_act_upd/:id',		eeController.actuaPost);
router.get('/dades_suprV/:id', 		eeController.suprV);
router.get('/dades_suprD/:id', 		eeController.suprD);

module.exports = router;

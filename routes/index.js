var express = require('express');
var router = express.Router();

var eeController = require('../controllers/EE_controller');

/* GET home page. */
//router.get('/', function(req, res) {
//  res.render('index', { title: 'AppEscola' });
//});

router.get('/',						eeController.list);
router.get('/dades_alta', 			eeController.alta);
router.post('/dades_crear', 		eeController.create);
router.get('/dades_mod/:id', 		eeController.mod);
router.put('/dades_update/:id',		eeController.update);
router.get('/dades_supr/:id', 		eeController.supr);

module.exports = router;

var express = require('express');
var router = express.Router();

let dash = require('../controllers/dashboard');

/* GET home page. */
router.get('/', dash.get_dashboard);
router.post('/verifyuser', dash.verify_user);
router.post('/joinroom', dash.join_room);


module.exports = router;
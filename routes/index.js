var express = require('express');
var router = express.Router();

let home = require('../controllers/home');

/* GET home page. */
router.get('/', home.get_landing);
router.post('/', home.submit_user);


module.exports = router;
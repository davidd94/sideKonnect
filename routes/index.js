var express = require('express');
var router = express.Router();

let home = require('../controllers/home');

/* GET home page. */
router.get('/', home.get_landing);
router.post('/register', home.submit_user);
router.post('/login', home.login_user);


module.exports = router;
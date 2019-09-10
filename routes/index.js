var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');

let home = require('../controllers/home');

/* GET home page. */
router.get('/', home.get_landing);
router.post('/register', home.submit_user);
router.post('/login', home.login_user);
router.post('/verifytoken', home.verify_token);

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


module.exports = router;
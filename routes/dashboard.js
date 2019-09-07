var express = require('express');
var router = express.Router();

let dash = require('../controllers/dashboard');

/* GET home page. */
router.get('/', dash.get_dashboard);


module.exports = router;
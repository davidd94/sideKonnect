var express = require('express');
var router = express.Router();

let dash = require('../controllers/dashboard');

/* GET home page. */
router.get('/', dash.get_dashboard);
router.post('/friendslist', dash.get_friendslist);
router.post('/joinroom', dash.join_room);
router.post('/addfriend', dash.add_friend);
router.post('/removefriend', dash.remove_friend);


module.exports = router;
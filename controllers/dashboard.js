const models = require('../models');
var path = require('path');


exports.get_dashboard = (req, res, next) => {
    console.log('rendering dash html');
    res.sendFile(path.join(__dirname, "../src/index.html"));
};
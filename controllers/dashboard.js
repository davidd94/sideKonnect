//const models = require('../models');
var path = require('path');
const jwt = require('jsonwebtoken');


exports.get_dashboard = (req, res, next) => {
    res.sendFile(path.join(__dirname, "../src/index.html"));
};

exports.verify_user = (req, res, next) => {
    let userToken = req.body.token;
    const secretKey = process.env.SECRET_KEY;
    try {
        let data = jwt.verify(userToken, secretKey);
        res.send({'response': 'valid token!', 'firstname': data.firstname, 'email': data.email});
    } catch (err) {
        res.send({'response': 'invalid token!!'});
    };
};
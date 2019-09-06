const models = require('../models');
var express = require('express');
var app = express();

var path = require('path');

exports.get_landing = (req, res, next) => {
    console.log('rendering index html');
    res.sendFile(path.join(__dirname, "../src/index.html"));
}

exports.submit_user = (req, res, next) => {
    console.log("first name: ", req.body.firstname);
    console.log("last name: ", req.body.lastname);
    console.log("password: ", req.body.password);
    console.log("email:", req.body.email);
    /*
    return models.users.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: req.body.password,
        email: req.body.email
    }).then(user => {
        res.redirect('/');
    });
    */
   
   res.json({'results': 'submitted'});
}
const models = require('../models');
const bcrypt = require('bcrypt');
var path = require('path');


exports.get_landing = (req, res, next) => {
    console.log('rendering index html');
    res.sendFile(path.join(__dirname, "../src/index.html"));
};

exports.submit_user = (req, res, next) => {
    let firstName = req.body.firstname;
    let lastName = req.body.lastname;
    let userEmail = req.body.email;
    let password = req.body.password;
    
    models.users.findOne({
        where : {
            email : userEmail
        }
    }).then(user => {
        if (user === null) {
            bcrypt.hash(password, 10, (err, hash) => {
                models.users.create({
                    first_name: firstName,
                    last_name: lastName,
                    password: hash,
                    email: userEmail
                }).then(user => {
                    res.json({'results': 'User Created Successfully'});
                });
            });
        } else if (user !== null) {
            res.json({'results': 'That email already exists. Please try another one.'});
        } else {
            res.json({'results': 'An error has occurred while creating an account. Please send us an email.'});
        };
    });
};

exports.login_user = (req, res, next) => {
    let userEmail = req.body.email;
    let password = req.body.password;
    console.log("email:", userEmail);
    console.log("password: ", password);
    
    models.users.findOne({
        where : {
            email : userEmail
        }
    }).then(user => {
        if (user === null) {
            res.json({'results': 'Invalid User/Password combination!'});
        } else if (user !== null) {
            bcrypt.compare(password, user.password, (err, response) => {
                if (response) {
                    res.json({'results': 'Success'});
                } else {
                    res.json({'results': 'Failed'});
                };
            });
        } else {
            res.json({'results': 'Login error has occurred. Please contact us immediately.'});
        };
    });
};
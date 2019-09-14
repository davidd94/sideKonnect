const models = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var path = require('path');


exports.get_landing = (req, res, next) => {
    console.log('rendering index html');
    res.sendFile(path.join(__dirname, "../src/index.html"));
};

exports.submit_user = (req, res, next) => {
    let firstName = (req.body.firstname).toLowerCase();
    let lastName = (req.body.lastname).toLowerCase();
    let userEmail = (req.body.email).toLowerCase();
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
                }).then(newUser => {
                    /*
                    newUser.createBuddy({
                        friend_id: 5,
                        first_name: 'Allen',
                        last_name: 'Hoe',
                        email: 'allen2@gg.com',
                        picture: 'www.mofo.com'
                    }).then(() => console.log('ASSOCIATION TABLE WORKS !!!!!!'));
                    */
                    res.send({'results': 'User Created Successfully'});
                });
            });
        } else if (user !== null) {
            res.send({'results': 'That email already exists. Please try another one.'});
        } else {
            res.send({'results': 'An error has occurred while creating an account. Please send us an email.'});
        };
    });
};

exports.login_user = (req, res, next) => {
    let userEmail = (req.body.email).toLowerCase();
    let password = req.body.password;
    
    models.users.findOne({
        where : {
            email : userEmail
        }
    }).then(user => {
        if (user === null) {
            res.send({'results': 'Invalid User/Password combination!'});
        } else if (user !== null) {
            bcrypt.compare(password, user.password, (err, response) => {
                if (response) {
                    const expirationTimer = 3 * 60 * 60;
                    const secretKey = process.env.SECRET_KEY;
                    const accessToken = jwt.sign({ id:user.id, firstname : user.first_name, email: user.email }, secretKey, { expiresIn : expirationTimer });
                    
                    models.users.update({'token': accessToken}, {
                        where : {
                            email : userEmail
                        }
                    }).then(updated => {

                        res.send({'results': 'Success', 'first_name': user.first_name, 'email': user.email, 'access_token': accessToken }); 
                    });
                } else {
                    res.send({'results': 'Failed'});
                };
            });
        } else {
            res.send({'results': 'Login error has occurred. Please contact us immediately.'});
        };
    });
};

exports.verify_token = (req, res, next) => {
    let token = req.body.token;
    const secretKey = process.env.SECRET_KEY;

    try {
        jwt.verify(token, secretKey);
        res.send({'response': 'valid token!'});
    } catch (err) {
        res.send({'response': 'invalid token!!'});
    };
};
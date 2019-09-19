const models = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var path = require('path');
const nodeMailer = require('nodemailer');


exports.get_landing = (req, res, next) => {
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
                    const accessToken = jwt.sign({
                                                id: user.id,
                                                firstname : user.first_name,
                                                lastname: user.last_name,
                                                email: user.email
                                            }, secretKey, { expiresIn : expirationTimer });
                    
                    models.users.update({'token': accessToken}, {
                        where : {
                            email : userEmail
                        }
                    }).then(updated => {

                        res.send({'results': 'Success', 'first_name': user.first_name, 'email': user.email, 'access_token': accessToken }); 
                    });
                } else {
                    res.send({'results': 'Incorrect Email/Password Combination!'});
                };
            });
        } else {
            res.send({'results': 'Login error has occurred. Please contact us immediately.'});
        };
    });
};

exports.acct_recovery = (req, res, next) => {
    let userEmail = req.body.email;
    
    models.users.findOne({
        where : {
            email: userEmail
        }
    })
    .then(user => {
        if (user !== null) {
            const expirationTimer = 0.25 * 60 * 60;
            const secretKey = process.env.SECRET_KEY;
            const accessToken = jwt.sign({
                                        firstname : user.first_name,
                                        lastname: user.last_name,
                                        email: user.email
                                    }, secretKey, { expiresIn : expirationTimer });
            
            let transporter = nodeMailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    // SENDER'S ACCT INFO
                    user: process.env.EMAIL,
                    pass: process.env.EMAIL_PASS
                }
            });

            let mailOptions = {
                // RECIPIENT'S ACCT INFO
                to: user.email,
                subject: 'sideKonnect - Account Recovery',
                html: `<p>Hello ${user.first_name}!</p><br/>
                        <p>It seems that you may have forgotten your password and requested to reset it. If you have NOT requested to reset your password, please disregard this email !</p>
                        <p>Otherwise, please click this <a href='https://sidekonnect.cc/passreset/${accessToken}'>link</a> to reset your password</p><br />
                        <p>OR</p>
                        <p>You could also click this full link here: https://sidekonnect.cc/passreset/${accessToken}</p>`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(`An error has occurred... ${error}`);
                };
                console.log(`Message ${info.messageId} sent: ${info.response}`);
            });
        };
        res.send({'response': 'An email has been sent to reset your password'});
    });
};

exports.reset_pass = (req, res, next) => {
    let token = req.params.token;
    const secretKey = process.env.SECRET_KEY;
    
    try {
        jwt.verify(token, secretKey);
        res.sendFile(path.join(__dirname, "../src/index.html"));
    } catch (err) {
        res.sendFile(path.join(__dirname, "../src/index.html"));
    }
};

exports.change_pass = (req, res, next) => {
    let token = req.body.token;
    let password = req.body.pass;
    const secretKey = process.env.SECRET_KEY;

    try {
        let userInfo = jwt.verify(token, secretKey);
        let userEmail = userInfo.email;
        
        bcrypt.hash(password, 10, (err, hash) => {
            models.users.update({password: hash}, {
                where: {
                    email: userEmail
                }
            })
            .then(results => {
                res.send({'response': 'Your password has successfully changed'});
            })
        });
    } catch (err) {
        res.send({'response': 'Unable to change password'});
    };
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
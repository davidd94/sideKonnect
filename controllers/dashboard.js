const models = require('../models');
var path = require('path');
const jwt = require('jsonwebtoken');
const base64url = require('base64url');


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

exports.join_room = (req, res, next) => {
    const caller = req.body.caller;
    const receiver = req.body.receiver;
    if (caller && receiver) {
        models.users.findOne({
            where : {
                email : receiver
            }
        }).then(user => {
            if (user) {
                let expirationTimer = 1 * 60 * 60;
                let secretKey = process.env.SECRET_KEY;
                let secretRoom = jwt.sign({ user: caller }, secretKey, { expiresIn : expirationTimer });
                let secretRoomEncoded = base64url(secretRoom);
                let roomID = "https://tokbox.com/embed/embed/ot-embed.js?embedId=853df113-5f97-4ed9-9d0d-06ccae7a92a2&room=" + secretRoomEncoded + "&iframe=true"
                console.log(roomID);
                res.send({'response': 'Room joined!', 'roomID': roomID});
            } else {
                res.send({'response': 'An error has occurred while making the phone call.', 'roomID': ''});
            };
        });
    } else {
        res.send({'response': 'An error has occurred while making the phone call.'});
    };
};
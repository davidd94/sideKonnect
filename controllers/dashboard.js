const models = require('../models');
var path = require('path');
const jwt = require('jsonwebtoken');
const base64url = require('base64url');


exports.get_dashboard = (req, res, next) => {
    res.sendFile(path.join(__dirname, "../src/index.html"));
};

exports.get_friendslist = (req, res, next) => {
    let userToken = req.body.token;
    const secretKey = process.env.SECRET_KEY;
    try {
        let userInfo = jwt.verify(userToken, secretKey);
        let newFriendInfo = [];

        models.buddy.findAll({
        where : {
            userId: userInfo.id
        },
        raw: true,
        }).map(user => {
            let friend = {
                'firstname': user.first_name,
                'lastname': user.last_name,
                'id': user.friend_id,
                'picture': user.picture,
                'email': user.email
            };
            newFriendInfo.push(friend);
        }).then(() => {
            res.send({'response': 'valid token!', 'friendslist': newFriendInfo});
        });
    } catch (err) {
        res.send({'response': 'invalid token!!'});
    };
};

exports.add_friend = (req, res, next) => {
    let userToken = req.body.token;
    const secretKey = process.env.SECRET_KEY;
    const addUser = req.body.addUser;
    
    try {
      let currentUserInfo = jwt.verify(userToken, secretKey);
      // FIND CURRENT USER'S INFO
      models.users.findOne({
        where : {
          email: currentUserInfo.email
        }
      }).then(currentUser => {
        if (currentUser) {
          // IF CURRENT USER FOUND, FIND THE REQUESTED FRIEND TO BE ADDED
          models.users.findOne({
            where : {
              email: addUser.toLowerCase()
            }
          }).then(friend => {
            // IF REQUESTED FRIEND FOUND, ADD IF IT'S NOT THE CURRENT USER'S SELF
            if (friend === null) {
                res.send({'response': 'Add fail', 'data': 'That user does not exists'});
            } else if (friend && (friend.email !== currentUser.email)) {
                let addedUser = {
                    friend_id: friend.id,
                    first_name: friend.first_name,
                    last_name: friend.last_name,
                    email: friend.email,
                    picture: friend.picture
                };
                currentUser.createBuddy(addedUser).then(response => {
                    let reformatAddedUser = {
                        'email': friend.email,
                        'id': friend.id,
                        'firstname': friend.first_name,
                        'lastname': friend.last_name,
                        'picture': friend.picture
                    };
                    res.send({'response': 'Add success', 'data': reformatAddedUser });
                });
            } else if (friend.email === currentUser.email) {
                res.send({'response': 'Add fail', 'data': 'You cannot add yourself' });
            } else {
                res.send({'response': 'Add fail', 'data': 'There was an error adding someone' });
            };
          });
        } else {
            res.send({'response': 'Add fail', 'msg': 'A fatal error has occurred...' });
        };
      });
    } catch (err) {
        res.send({'response': 'Add fail', 'msg': 'Unauthorized to do that...' });
    };
};

exports.remove_friend = (req, res, next) => {
    let userToken = req.body.token;
    const secretKey = process.env.SECRET_KEY;
    const removeUser = req.body.removeUser;
    
    try {
      let currentUserInfo = jwt.verify(userToken, secretKey);
      // FIND CURRENT USER'S INFO
      models.users.findOne({
        where : {
          email: currentUserInfo.email
        }
      }).then(currentUser => {
        if (currentUser) {
          // IF CURRENT USER FOUND, FIND THE REQUESTED FRIEND TO BE ADDED
          models.buddy.findOne({
            where : {
              email: removeUser.toLowerCase(),
              userId: currentUser.id
            }
          }).then(friend => {
            if (friend === null) {
                res.send({'response': 'Remove fail', 'data': 'That user does not exists'});
            } else if (friend && (friend.email !== currentUser.email)) {
                let destroyedEmail = friend.email;
                friend.destroy();
                res.send({'response': 'Remove success', 'data': destroyedEmail });
            } else if (friend.email === currentUser.email) {
                res.send({'response': 'Remove fail', 'data': 'You cannot remove yourself' });
            } else {
                res.send({'response': 'Remove fail', 'data': 'There was an error removing someone' });
            };
          });
        } else {
            res.send({'response': 'Remove fail', 'msg': 'A fatal error has occurred...' });
        };
      });
    } catch (err) {
        res.send({'response': 'Remove fail', 'msg': 'Unauthorized to do that...' });
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
                
                res.send({'response': 'Room joined!', 'roomID': roomID});
            } else {
                res.send({'response': 'An error has occurred while making the phone call.', 'roomID': ''});
            };
        });
    } else {
        res.send({'response': 'An error has occurred while making the phone call.'});
    };
};
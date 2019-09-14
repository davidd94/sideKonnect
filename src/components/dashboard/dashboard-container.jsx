import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import socket from '../../socketio';

import DashboardPresent from './dashboard-present';
import { setUserFirstname, setUserToken, setUserEmail } from '../../actions/userActions';


const DashboardContainer = () => {
    const userInfo = useSelector(state => (state.user));
    const dispatch = useDispatch();

    const [videoStatus, setVideoStatus] = useState(false);
    const [roomID, setRoomID] = useState(false);
    const [friendslist, setFriendslist] = useState([
        {'firstname': 'allen', 'lastname': 'kolakian', 'email': 'allen@gg.com', 'picture': 'https://en.gravatar.com/userimage/147142567/42d4c6928e4f936f32cd89731c57c694.jpeg'},
        {'firstname': 'david', 'lastname': 'duong', 'email': 'test@gg.com', 'picture': 'https://en.gravatar.com/userimage/147142567/42d4c6928e4f936f32cd89731c57c694.jpeg'},
        {'firstname': 'jin', 'lastname': 'kim', 'email': 'jin@gg.com', 'picture': 'https://en.gravatar.com/userimage/147142567/42d4c6928e4f936f32cd89731c57c694.jpeg'},
        {'firstname': 'will', 'lastname': 'lingamen', 'email': 'will@gg.com', 'picture': 'https://en.gravatar.com/userimage/147142567/42d4c6928e4f936f32cd89731c57c694.jpeg'},
        {'firstname': 'booki', 'lastname': 'Dalhmer', 'email': 'booki@gg.com', 'picture': 'https://en.gravatar.com/userimage/147142567/42d4c6928e4f936f32cd89731c57c694.jpeg'},
    ]);

    socket.on('friendslist', (data) => {
        setFriendslist(data);
    });

    useEffect(() => {
        if (userInfo.token !== undefined) {
            let data = {'token': userInfo.token}
            fetch('/dashboard/verifyuser', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(res => {
                res.json().then(res2 => {
                    if (res2.response !== 'valid token!') {
                        dispatch(setUserFirstname(undefined));
                        dispatch(setUserToken(undefined));
                        dispatch(setUserEmail(undefined));

                        localStorage.clear();
                    };
                });
            });
        };

        socket.on('test', (data) => {
            console.log(data);
        });
        
        socket.on('join_room', (data) => {
            console.log(data);
        });

        return () => {
            socket.removeAllListeners();  
        };
    }, []);

    const handleCall = (userID) => {
        const data = {'receiver': userID};
        setVideoStatus('Calling...');
        console.log(data);
        socket.emit('join_room', data);
    };

    const handleHangup = () => {
        setVideoStatus(false);
    };

    const handleLogout = () => {
        dispatch(setUserFirstname(undefined));
        dispatch(setUserToken(undefined));
        dispatch(setUserEmail(undefined));

        localStorage.clear();
    }

    if (userInfo.token !== undefined) {
        return <DashboardPresent
                    videoStatus={videoStatus}
                    handleCall={handleCall}
                    handleHangup={handleHangup}
                    roomID={roomID}
                    handleLogout={handleLogout}
                        friendslist={friendslist} />
    } else {
        return <Redirect to='/' />
    };
};


export default DashboardContainer;
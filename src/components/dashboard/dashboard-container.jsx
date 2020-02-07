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
    const [friendslist, setFriendslist] = useState([]);
    const [currentCall, setCurrentCall] = useState('');
    const [currentCallName, setCurrentCallName] = useState(false);
    
    useEffect(() => {
        if (userInfo.token !== undefined) {
            let data = {'token': userInfo.token}
            fetch('/dashboard/friendslist', {
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
                        localStorage.clear();
                        dispatch(setUserFirstname(undefined));
                        dispatch(setUserToken(undefined));
                        dispatch(setUserEmail(undefined));
                    } else {
                        const friends = res2.friendslist;
                        setFriendslist(friends);

                        // JOIN ROOMS WITH ADDED FRIENDS
                        if (Array.isArray(friends)) {
                            friends.map((user) => {
                                socket.emit('join_room', user.id);
                            });
                        };
                    };
                });
            });
        };
        
        socket.on('join_room', (data) => {
            if (data.action === 'joining') {
            } else if (data.action === 'calling' && data.msg === 'success') {
                setRoomID(data.tokbox);
                if (data.callerEmail !== userInfo.email) {
                    setVideoStatus('Receiving...');
                    setCurrentCall(data.callerID);
                    setCurrentCallName(data.caller);
                } else if (data.callerEmail === userInfo.email) {
                    setVideoStatus('Calling...');
                    setCurrentCall(data.receiverID);
                    setCurrentCallName('Calling...');
                } else {
                    setVideoStatus(false);
                    setRoomID('');
                    setCurrentCall('');
                    setCurrentCallName(false);
                };
            } else if (data.action === 'accepting') {
                setVideoStatus(true);
            } else if (data.action === 'disconnecting') {
                setRoomID('');
                setVideoStatus(false);
                setCurrentCall('');
                setCurrentCallName(false);
            } else {
                setVideoStatus(false);
                setRoomID('');
                setCurrentCall('');
                setCurrentCallName(false);
            };
        });

        return () => {
            socket.removeAllListeners();  
        };
    }, []);
    
    const handleCall = (receiverID) => {
        let data = {
            'receiverID': receiverID,
            'status': 'calling'
        };
        setVideoStatus('Calling...');
        socket.emit('join_call', data);
    };

    const handleAccept = () => {
        socket.emit('accept_call', {'receiverID': currentCall});
        setVideoStatus(true);
    };

    const handleHangup = () => {
        socket.emit('disconnect_call', {'receiverID': currentCall});
        setVideoStatus(false);
        setRoomID('');
        setCurrentCall('');
    };

    const handleLogout = () => {
	if (currentCall) {
		socket.emit('disconnect_call', {'receiverID': currentCall});
	};
        localStorage.clear();
        dispatch(setUserFirstname(undefined));
        dispatch(setUserToken(undefined));
        dispatch(setUserEmail(undefined));
    };

    const addFriend = (userEmail) => {
        let data = { 'addUser': userEmail, 'token': userInfo.token };
        fetch('/dashboard/addfriend', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json()
        .then(response => {
            if (response.response === 'Add success') {
                let newlist = [...friendslist, response.data];
                setFriendslist(newlist);
            } else if (response.response === 'Add fail') {
                console.log('Failed to add user...');
            } else {
                console.log('A fatal error has occurred somewhere...');
            };
        }));
    };

    const removeFriend = (userEmail) => {
        let data = { 'removeUser': userEmail, 'token': userInfo.token };
        fetch('/dashboard/removefriend', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json()
        .then(response => {
            if (response.response === 'Remove success') {
                let newlist = (friendslist).filter((user, index, arr) => {
                    return user.email !== response.data;
                });
                setFriendslist(newlist);
            } else if (response.response === 'Remove fail') {
                console.log('Failed to remove user...');
            } else {
                console.log('A fatal error has occurred somewhere...');
            };
        }));
    };

    if (userInfo.token !== undefined) {
        return <DashboardPresent
                    videoStatus={videoStatus}
                    handleCall={handleCall}
                    handleAccept={handleAccept}
                    handleHangup={handleHangup}
                    roomID={roomID}
                    handleLogout={handleLogout}
                    currentCallName={currentCallName}
                    videoStatus={videoStatus}
                    currentCall={currentCall}
                        friendslist={friendslist}
                        addFriend={addFriend}
                        removeFriend={removeFriend} />
    } else {
        return <Redirect to='/' />
    };
};


export default DashboardContainer;
import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import DashboardPresent from './dashboard-present';
import { setUserFirstname, setUserToken, setUserEmail } from '../../actions/userActions';

const DashboardContainer = () => {
    const userInfo = useSelector(state => (state.user));
    const dispatch = useDispatch();

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

            const script = document.createElement("script");
            script.src = "https://tokbox.com/embed/embed/ot-embed.js?embedId=853df113-5f97-4ed9-9d0d-06ccae7a92a2&room=DEFAULT_ROOM";
            //script.async = true;

            document.body.appendChild(script);
        };
    }, []);
    console.log(userInfo);
    const handleLogout = () => {
        dispatch(setUserFirstname(undefined));
        dispatch(setUserToken(undefined));
        dispatch(setUserEmail(undefined));

        localStorage.clear();
    }

    if (userInfo.token !== undefined) {
        return <DashboardPresent
                    handleLogout={handleLogout} />
    } else {
        return <Redirect to='/' />
    };
};


export default DashboardContainer;
import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import AcctResetPresent from './accountreset-present';


const AcctResetContainer = (props) => {
    const [token, setToken] = useState(props.match.params.token ? props.match.params.token : false);
    const [status, setStatus] = useState('loading');
    const [pass, setPass] = useState('');
    const [pass2, setPass2] = useState('');
    const [inputStatus, setInputStatus] = useState('');
    const [submitStatus, setSubmitStatus] = useState(false);

    useEffect(() => {
        let data = {'token': token};
        if (token) {
            fetch('/verifytoken', {
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
                if (response.response === 'valid token!') {
                    setStatus('access');
                } else {
                    setStatus(false);
                };
            }))
        } else {
            setStatus(false);
        };
    }, []);

    useEffect(() => {
        if (pass !== pass2 && pass.length > 4) {
            setInputStatus('Your passwords do not match');
            setSubmitStatus(false);
        } else if (pass === pass2 && pass.length > 4) {
            setInputStatus('');
            setSubmitStatus(true);
        } else if (pass === pass2 && pass.length < 5 && pass.length > 0) {
            setInputStatus('Your password must be a minimum of 5 characters long');
            setSubmitStatus(false);
        };
    }, [pass, pass2]);

    const handleSubmit = () => {
        if (submitStatus) {
            let data = {'token': token, 'pass': pass}
            fetch('/passchange', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(res => res.json()
            .then(response => {
                if (response.response === 'Your password has successfully changed') {
                    setInputStatus(`${response.response}.. You will be redirected momentarily...`);
                    setToken('');
                    setTimeout(() => {
                        window.location.href = '/';
                    }, 7000);
                } else {
                    setInputStatus(response.response);
                };
            }));
        };
    };

    if (status === 'access') {
        return <AcctResetPresent 
                        setPass={setPass}
                        setPass2={setPass2}
                        inputStatus={inputStatus}
                        submitStatus={submitStatus}
                        handleSubmit={handleSubmit} />
    } else if (status === 'loading') {
        return <p>Loading....</p>
    } else {
        return <Redirect to='/' />
    };
};


export default AcctResetContainer;
import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';

import styles from '../_styles/homepageStyles.module.scss';
import { setUserFirstname, setUserToken, setUserEmail } from '../../../actions/userActions';


const LoginForm = () => {
    const dispatch = useDispatch();
    const userInfo = useSelector(state => (state.user));

    const [tab, setTab] = useState('signup');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [inputfocus, setInputfocus] = useState('');
    const [signupStatus, setSignupStatus] = useState('');

    const FNref = useRef();
    const LNref = useRef();
    const Eref = useRef();
    const Pref = useRef();

    const [loginStatus, setLoginStatus] = useState(userInfo.token ? 'Success' : '');
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPass, setLoginPass] = useState('');

    const loginEmailRef = useRef();
    const loginPassRef = useRef();

    const [recoveryStatus, setRecoveryStatus] = useState('');
    const [recoveryEmail, setRecoveryEmail] = useState('');

    const recoveryEmailRef = useRef();
    
    const handleLabelStyles = (inputType) => {
        if (inputType === 'firstname') {
            if (firstname.length > 0 && inputfocus === 'firstname') {
                return ([styles.active, styles.highlight]).join(' ');
            } else if (firstname.length > 0 && inputfocus !== 'firstname') {
                return styles.active;
            } else {
                return {};
            }
        } else if (inputType === 'lastname') {
            if (lastname.length > 0 && inputfocus === 'lastname') {
                return ([styles.active, styles.highlight]).join(' ');
            } else if (lastname.length > 0 && inputfocus !== 'lastname') {
                return styles.active;
            } else {
                return {};
            }
        } else if (inputType === 'email') {
            if (email.length > 0 && inputfocus === 'email') {
                return ([styles.active, styles.highlight]).join(' ');
            } else if (email.length > 0 && inputfocus !== 'email') {
                return styles.active;
            } else {
                return {};
            }
        } else if (inputType === 'password') {
            if (password.length > 0 && inputfocus === 'password') {
                return ([styles.active, styles.highlight]).join(' ');
            } else if (password.length > 0 && inputfocus !== 'password') {
                return styles.active;
            } else {
                return {};
            }
        } else if (inputType === 'loginEmail') {
            if (loginEmail.length > 0 && inputfocus === 'loginEmail') {
                return ([styles.active, styles.highlight]).join(' ');
            } else if (loginEmail.length > 0 && inputfocus !== 'loginEmail') {
                return styles.active;
            } else {
                return {};
            }
        } else if (inputType === 'loginPass') {
            if (loginPass.length > 0 && inputfocus === 'loginPass') {
                return ([styles.active, styles.highlight]).join(' ');
            } else if (loginPass.length > 0 && inputfocus !== 'loginPass') {
                return styles.active;
            } else {
                return {};
            }
        } else if (inputType === 'recoveryEmail') {
            if (recoveryEmail.length > 0 && inputfocus === 'recoveryEmail') {
                return ([styles.active, styles.highlight]).join(' ');
            } else if (recoveryEmail.length > 0 && inputfocus !== 'recoveryEmail') {
                return styles.active;
            } else {
                return {};
            }
        } else {
            return {}
        }
    };

    const handleRegistration = () => {
        if (firstname.length < 3) {
            setSignupStatus('First name must be a minimum of 3 characters.');
        } else if (lastname.length < 3) {
            setSignupStatus('Last name must be a minimum of 3 characters.');
        } else if (!(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) || email.length < 3) {
            setSignupStatus('You must enter a valid email address.');
        } else if (password.length < 5) {
            setSignupStatus('Your password must be a minimum of 5 characters.');
        } else {
            let data = {
                'firstname': firstname,
                'lastname': lastname,
                'email': email,
                'password': password
            };
            
            fetch('/register', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(res => res.json().then(response => {
                if (response.results === 'User Created Successfully') {
                    setSignupStatus(response.results);
                    setFirstname('');
                    setLastname('');
                    setEmail('');
                    setPassword('');
    
                    FNref.current.value = '';
                    LNref.current.value = '';
                    Eref.current.value = '';
                    Pref.current.value = '';
                } else if (response.results === 'That email already exists. Please try another one.') {
                    setSignupStatus(response.results);
                    setEmail('');
                    setPassword('');

                    Eref.current.value = '';
                    Pref.current.value = '';
                } else {
                    setSignupStatus('Failed to create an account. Please send us an email.');
                };
            }));
        };
    };

    const handleLogin = () => {
        let data = {
            email: loginEmail,
            password: loginPass
        };

        fetch('/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json().then(response => {
            if (response.results === 'Success') {
                dispatch(setUserFirstname(response.first_name));
                dispatch(setUserEmail(response.email));
                dispatch(setUserToken(response.access_token));

                localStorage.setItem('firstname', response.first_name);
                localStorage.setItem('email', response.email);
                localStorage.setItem('token', response.access_token);

                window.location.href = '/dashboard';
                //setLoginStatus(response.results);
            } else {
                setLoginStatus(response.results);
                loginPassRef.current.value = '';
            };
        }));
    };

    const handleRecovery = () => {
        if (!(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(recoveryEmail)) || recoveryEmail.length < 3) {
            setRecoveryStatus('You must enter a valid email address.');
        } else {
            let data = {'email': recoveryEmail};
            fetch('/acctrecovery', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(res => res.json()
            .then(response => {
                recoveryEmailRef.current.value = '';
                setRecoveryEmail('');
                setRecoveryStatus(response.response);
            }));
        };
    };

    if (loginStatus === 'Success') {
        return <Redirect to='/dashboard' />
    } else {
        return (
            <div className={styles.formContainer}>
                <ul className={styles.tabGroup}>
                    <li className={tab === 'signup' ? styles.active : ''} onClick={() => setTab('signup')}><a>Sign Up</a></li>
                    <li className={tab === 'login' ? styles.active : ''} onClick={() => {setTab('login'); setSignupStatus('');}}><a>Log In</a></li>
                </ul>

                <div className={styles.tabContent}>
                    <div className={tab === 'signup' ? ([styles.signup, styles.tabActive]).join(' ') : styles.signup}>
                        <h1>Sign Up For Free</h1>
                        <p className={styles.loginAlerts}>{signupStatus}</p>
                        <div className={styles.topRow}>
                            <div className={styles.fieldWrap}>
                                <label className={handleLabelStyles('firstname')}>
                                    First Name<span className={styles.req}>*</span>
                                </label>
                                <input ref={FNref} name="firstname" type="text" required autoComplete="off" onChange={(e) => {setFirstname(e.currentTarget.value)}} onFocus={() => setInputfocus('firstname')} onBlur={() => setInputfocus('')} />
                            </div>

                            <div className={styles.fieldWrap}>
                                <label className={handleLabelStyles('lastname')}>
                                    Last Name<span className={styles.req}>*</span>
                                </label>
                                <input ref={LNref} name="lastname" type="text" required autoComplete="off" onChange={(e) => {setLastname(e.currentTarget.value)}} onFocus={() => setInputfocus('lastname')} onBlur={() => setInputfocus('')} />
                            </div>

                            <div className={([styles.fieldWrap, styles.inputW100]).join(' ')}>
                                <label className={handleLabelStyles('email')}>
                                    Email Address<span className={styles.req}>*</span>
                                </label>
                                <input ref={Eref} name="email" type="text" required autoComplete="off" onChange={(e) => {setEmail(e.currentTarget.value)}} onFocus={() => setInputfocus('email')} onBlur={() => setInputfocus('')} />
                            </div>

                            <div className={([styles.fieldWrap, styles.inputW100]).join(' ')}>
                                <label className={handleLabelStyles('password')}>
                                    Set A Password<span className={styles.req}>*</span>
                                </label>
                                <input ref={Pref} name="password" type="password" required autoComplete="off"
                                            onChange={(e) => {setPassword(e.currentTarget.value)}}
                                            onFocus={() => setInputfocus('password')}
                                            onBlur={() => setInputfocus('')}
                                            onKeyUp={(e) => {if (e.which === 13) {handleRegistration()}}} />
                            </div>

                            <button type="submit" className={([styles.button, styles.buttonBlock]).join(' ')} onClick={handleRegistration}>Get Started</button>
                        </div>
                        
                    </div>
                    
                    <div className={tab === 'login' ? ([styles.login, styles.tabActive]).join(' ') : styles.login}>
                        <h1 className={styles.loginHeader}>Welcome Back !</h1>
                        <p className={styles.loginAlerts}>{loginStatus}</p>
                        <div className={styles.topRow}>
                            <div className={([styles.fieldWrap, styles.inputW100]).join(' ')}>
                                <label className={handleLabelStyles('loginEmail')}>
                                    Email Address<span className={styles.req}>*</span>
                                </label>
                                <input ref={loginEmailRef} type="text" required autoComplete="off" onChange={(e) => {setLoginEmail(e.currentTarget.value)}} onFocus={() => setInputfocus('loginEmail')} onBlur={() => setInputfocus('')} />
                            </div>

                            <div className={([styles.fieldWrap, styles.inputW100]).join(' ')}>
                                <label className={handleLabelStyles('loginPass')}>
                                    Password<span className={styles.req}>*</span>
                                </label>
                                <input ref={loginPassRef} type="password" required autoComplete="off"
                                                onChange={(e) => {setLoginPass(e.currentTarget.value)}}
                                                onFocus={() => setInputfocus('loginPass')}
                                                onBlur={() => setInputfocus('')}
                                                onKeyUp={(e) => {if (e.which === 13) {handleLogin()}}} />
                            </div>

                            <p className={styles.forgot}><span onClick={() => setTab('acctrecovery')}>Forgot Password ?</span></p>

                            <button type="submit" className={([styles.button, styles.buttonBlock]).join(' ')} onClick={handleLogin}>Log In</button>
                            
                        </div>
                    </div>

                    <div className={tab === 'acctrecovery' ? ([styles.login, styles.tabActive]).join(' ') : styles.login}>
                        <p className={styles.forgot} style={{textAlign: 'left'}}><span onClick={() => {setTab('login'); setRecoveryEmail(''); setRecoveryStatus(''); recoveryEmailRef.current.value = '';}}>Back to Login</span></p>
                        <h1 className={styles.loginHeader}>Account Recovery</h1>
                        <p className={styles.loginAlerts}>{recoveryStatus}</p>
                        <div className={styles.topRow}>
                            <div className={([styles.fieldWrap, styles.inputW100]).join(' ')}>
                                <label className={handleLabelStyles('recoveryEmail')}>
                                    Email Address<span className={styles.req}>*</span>
                                </label>
                                <input ref={recoveryEmailRef} type="text" required autoComplete="off"
                                            onChange={(e) => {setRecoveryEmail(e.currentTarget.value)}}
                                            onFocus={() => setInputfocus('recoveryEmail')}
                                            onBlur={() => setInputfocus('')}
                                            onKeyUp={(e) => {if (e.which === 13) {handleRecovery()}}} />
                            </div>

                            <button type="submit" className={([styles.button, styles.buttonBlock]).join(' ')} onClick={handleRecovery}>Submit</button>
                            
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};


export default LoginForm;
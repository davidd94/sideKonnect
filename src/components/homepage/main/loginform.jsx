import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import styles from '../_styles/homepageStyles.module.scss';


const LoginForm = () => {
    const [tab, setTab] = useState('signup');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [inputfocus, setInputfocus] = useState('');

    const userName = useSelector(state => console.log(state.user.user));

    console.log(userName);

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
        } else {
            return {}
        }
    };

    const handleRegistration = () => {
        let data = {
            'firstname': firstname,
            'lastname': lastname,
            'email': email,
            'password': password
        };

        fetch('/', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json().then(response => {
            console.log(response);
            if (response.results === 'submitted') {
                window.location.href = '/';
            }
        }));
    };
    
    return (
        <div className={styles.formContainer}>
            <ul className={styles.tabGroup}>
                <li className={tab === 'signup' ? styles.active : ''} onClick={() => setTab('signup')}><a>Sign Up</a></li>
                <li className={tab === 'login' ? styles.active : ''} onClick={() => setTab('login')}><a>Log In</a></li>
            </ul>

            <div className={styles.tabContent}>
                <div className={tab === 'signup' ? ([styles.signup, styles.tabActive, 'wow fadeIn']).join(' ') : ([styles.signup, 'wow fadeOut']).join(' ')}>
                    <h1>Sign Up For Free</h1>
                    <p>test submit value: {}</p>
                    <div className={styles.topRow}>
                        <div className={styles.fieldWrap}>
                            <label className={handleLabelStyles('firstname')}>
                                First Name<span className={styles.req}>*</span>
                            </label>
                            <input name="firstname" type="text" required autoComplete="off" onChange={(e) => {setFirstname(e.currentTarget.value)}} onFocus={() => setInputfocus('firstname')} onBlur={() => setInputfocus('')} />
                        </div>

                        <div className={styles.fieldWrap}>
                            <label className={handleLabelStyles('lastname')}>
                                Last Name<span className={styles.req}>*</span>
                            </label>
                            <input name="lastname" type="text" required autoComplete="off" onChange={(e) => {setLastname(e.currentTarget.value)}} onFocus={() => setInputfocus('lastname')} onBlur={() => setInputfocus('')} />
                        </div>

                        <div className={([styles.fieldWrap, styles.inputW100]).join(' ')}>
                            <label className={handleLabelStyles('email')}>
                                Email Address<span className={styles.req}>*</span>
                            </label>
                            <input name="email" type="text" required autoComplete="off" onChange={(e) => {setEmail(e.currentTarget.value)}} onFocus={() => setInputfocus('email')} onBlur={() => setInputfocus('')}  />
                        </div>

                        <div className={([styles.fieldWrap, styles.inputW100]).join(' ')}>
                            <label className={handleLabelStyles('password')}>
                                Set A Password<span className={styles.req}>*</span>
                            </label>
                            <input name="password" type="text" required autoComplete="off" onChange={(e) => {setPassword(e.currentTarget.value)}} onFocus={() => setInputfocus('password')} onBlur={() => setInputfocus('')}  />
                        </div>

                        <button type="submit" className={([styles.button, styles.buttonBlock]).join(' ')} onClick={handleRegistration}>Get Started</button>
                    </div>
                    
                </div>
                
                <div className={tab === 'login' ? ([styles.login, styles.tabActive, 'wow fadeIn']).join(' ') : styles.login}>
                    <h1>Welcome Back !</h1>

                    <div className={styles.topRow}>
                        <div className={([styles.fieldWrap, styles.inputW100]).join(' ')}>
                            <label>
                                Email Address<span className={styles.req}>*</span>
                            </label>
                            <input type="text" required autoComplete="off" />
                        </div>

                        <div className={([styles.fieldWrap, styles.inputW100]).join(' ')}>
                            <label>
                                Password<span className={styles.req}>*</span>
                            </label>
                            <input type="text" required autoComplete="off" />
                        </div>

                        <p className={styles.forgot}><a href="">Forgot Password ?</a></p>

                        <button type="submit">Log In</button>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};


export default LoginForm;
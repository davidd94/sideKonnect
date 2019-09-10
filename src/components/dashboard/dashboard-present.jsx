import React from 'react';
import { NavLink } from 'react-router-dom';


const DashboardPresent = () => {

    const handleLiveVideoAPI = () => {
        let data = {"apiKey": "gDKNI1nqo0kiHwzttS0PlZb8fsc6OQqiYSgCdTACxP5"};

        fetch('https://ws.api.video/auth/api-key', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => {
            res.json().then(response => {
                console.log(response);
            })
        })
    }

    return (
        <div style={{width: '100%', height: '100vh', position: 'relative'}}>
            <p>DASH BOARD TEMP</p>
            <NavLink to='/'>BACK TO HOMEPAGE</NavLink>
            <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
            <iframe src="https://tokbox.com/embed/embed/ot-embed.js?embedId=853df113-5f97-4ed9-9d0d-06ccae7a92a2&room=DEFAULT_ROOM&iframe=true" width={800} height={640} scrolling="auto" allow="microphone; camera" ></iframe>
                <p onClick={handleLiveVideoAPI}>TEST LIVE VIDEO API</p>
            </div>
        </div>
    );
};


export default DashboardPresent;
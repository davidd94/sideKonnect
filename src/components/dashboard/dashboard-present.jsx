import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

import styles from './_styles/dashboardStyles.module.scss';
import SearchInput from './searchinput/searchinput';


const DashboardPresent = (props) => {
    const Friends = (props) => {
        console.log(props.friendslist);
        if (props.friendslist !== undefined && props.friendslist !== 'Unable to retreive friends list') {
            return props.friendslist.map((user, index) => {
                return (
                    <li key={`key-${index}`}>
                        <img width="50" height="50" src={user.picture ? user.picture : 'https://i.imgur.com/DG9UZrS.png'} />
                        <div className={styles.info}>
                            <div className={styles.user}>{user.firstname} {user.lastname}<i className="fas fa-user-minus" /></div>
                            <div className={styles.comms}>
                                <i className="fas fa-phone" onClick={() => {props.handleCall(user.id)}}/>
                                <i className="far fa-comments" style={{color: 'darkgrey'}} />
                            </div>
                        </div>
                    </li>
                );
            });
        } else {
            return <></>
        };
    };

    return (
        <Container fluid className={styles.dashContainer}>
            <Row className={styles.dashRow}>
                <Col md={12} lg={3} className={([styles.dashCol, "my-2"]).join(' ')}>
                    <div className={styles.friendsList}>
                        <SearchInput />
                        <menu className={styles.innerList}>
                            <Friends handleCall={props.handleCall} friendslist={props.friendslist} />
                        </menu>
                    </div>
                </Col>
                <Col md={12} lg={9} className={([styles.dashCol, "my-2"]).join(' ')}>
                    <div className={styles.videoBox}>
                        <iframe style={props.videoStatus === true ? {} : {display: 'none'}} className={styles.videoBoxActive} src={props.roomID ? props.roomID : ''} scrolling="auto" allow="microphone; camera" ></iframe>
                        <div style={props.videoStatus === false ? {} : {display: 'none'}} className={styles.videoBoxInactive}><p>Make a phone call to a friend !</p></div>
                        <div style={props.videoStatus === 'Calling...' ? {} : {display: 'none'}} className={styles.videoBoxInactive}><img src="https://i.imgur.com/nUozYS5.gif" /><i className="fas fa-phone-slash" onClick={props.handleHangup} /></div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};


export default DashboardPresent;
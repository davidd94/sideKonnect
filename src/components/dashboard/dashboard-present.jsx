import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

import styles from './_styles/dashboardStyles.module.scss';
import SearchInput from './searchinput/searchinput';


const DashboardPresent = (props) => {
    const Friends = (props) => {
        if (props.friendslist !== undefined && props.friendslist !== 'Unable to retreive friends list') {
            return props.friendslist.map((user, index) => {
                return (
                    <li key={`key-${index}`}>
                        <img width="50" height="50" src={user.picture ? user.picture : 'https://i.imgur.com/DG9UZrS.png'} />
                        <div className={styles.info}>
                            <div className={styles.user}>{user.firstname} {user.lastname}
                                <i className="fas fa-user-minus" onClick={() => {props.removeFriend(user.email)}} />
                            </div>
                            <div className={styles.comms}>
                                <i className="fas fa-phone" onClick={() => {props.handleCall(user.id)}} style={(props.videoStatus && props.currentCall === user.id) ? {display: 'none'} : {} }/>
                                <i className="fas fa-phone-slash" onClick={props.handleHangup} style={(props.videoStatus && props.currentCall === user.id) ? {color: '#bb1414'} : {display: 'none'}} />
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
        <div style={{width: '100%', height: '100%'}}>
            <Container fluid className={styles.dashContainer}>
                <Row className={styles.dashRow}>
                    <Col md={12} lg={12} className="my-2">
                        <a onClick={props.handleLogout} className={styles.logoutBtn}><span>Logout</span></a> 
                    </Col>
                    <Col md={12} lg={3} className={([styles.dashCol, "my-4"]).join(' ')}>
                        <div className={styles.friendsList}>
                            <SearchInput addFriend={props.addFriend} />
                            <menu className={styles.innerList}>
                                <Friends handleCall={props.handleCall}
                                        handleHangup={props.handleHangup}
                                        removeFriend={props.removeFriend}
                                        friendslist={props.friendslist}
                                        videoStatus={props.videoStatus}
                                        currentCall={props.currentCall} />
                            </menu>
                        </div>
                    </Col>
                    <Col md={12} lg={9} className={([styles.dashCol, "my-4"]).join(' ')}>
                        <div className={styles.videoBox}>
                            <iframe style={props.videoStatus === true ? {} : {display: 'none'}} className={styles.videoBoxActive} src={props.roomID && props.videoStatus ? props.roomID : ''} scrolling="auto" allow="microphone; camera" ></iframe>
                            
                            <div style={props.videoStatus === false ? {} : {display: 'none'}} className={styles.videoBoxInactive}>
                                <div className={styles.callingGIF}>
                                    <p>Make a phone call to a friend !</p>
                                </div>
                            </div>
                            
                            <div style={props.videoStatus === 'Calling...' ? {} : {display: 'none'}} className={styles.videoBoxInactive}>
                                <div className={styles.callingGIF}>
                                    <div className={styles.imgWrapper}><img src="https://i.imgur.com/nUozYS5.gif" /></div>
                                </div>
                                <div className={styles.callingIcons}>
                                    <i className={(["fas fa-phone-slash", styles.callIcon]).join(' ')} onClick={props.handleHangup} />
                                </div>
                            </div>
                            
                            <div style={props.videoStatus === 'Receiving...' ? {} : {display: 'none'}} className={styles.videoBoxInactive}>
                                <div className={styles.callingGIF}>
                                    <div className={styles.imgWrapper}><img src="https://i.imgur.com/nUozYS5.gif" /></div>
                                    <p style={props.currentCallName ? {} : {display: 'none'}}>{props.currentCallName} is calling you...</p>
                                </div>
                                <div className={styles.callingIcons}>
                                    <i className={(["fas fa-phone", styles.callIcon1]).join(' ')} onClick={props.handleAccept} />
                                    <i className={(["fas fa-phone-slash", styles.callIcon2]).join(' ')} onClick={props.handleHangup} />
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};


export default DashboardPresent;
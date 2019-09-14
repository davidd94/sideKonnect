import React from 'react';
import { Container, Row, Col } from 'reactstrap';

import styles from '../_styles/homepageStyles.module.scss';
import footerLogo from '../_images/home-footer/logo2.png';


const FooterIndex = () => {
    return (
        <footer className={styles.footerSection}>
            <div className={styles.footerWidget}>
                <Container fluid style={{padding: '0 50px'}}>
                    <Row className={styles.footerInnerWidget}>
                        <Col sm={5} lg={4}>
                            <aside className={styles.fwidget}>
                                <img src={footerLogo} alt="" />
                                <p>Providing people the best quality live video calling services for free!</p>
                            </aside>
                        </Col>
                        <Col sm={1} lg={1}></Col>
                        <Col sm={6} lg={7} className={styles.footerIcons}>
                            <h5>Core Features</h5>
                            <p>Build rich and meaningful experiences through the combination of:</p>
                            <Row className={styles.featuresChart}>
                                <Col md={12} lg={3} className={styles.chart}><img src="./images/video.png" alt="" style={{top: '10%'}}/><p>Video</p></Col>
                                <Col md={12} lg={1} className={styles.iconplus} style={{padding: '0 20px'}}><img src="./images/plus.png" alt="" /></Col>
                                <Col md={12} lg={3} className={styles.chart}><img src="./images/voice.png" alt="" /><p>Voice</p></Col>
                                <Col md={12} lg={1} className={styles.iconplus} style={{padding: '0 20px'}}><img src="./images/plus.png" alt="" /></Col>
                                <Col md={12} lg={3} className={styles.chart}><img src="./images/hd.jpg" alt="" style={{width: '80px'}} /><p style={{color: '#616161', fontWeight: 600}}>HD</p></Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className={styles.footerCopyright}>
                <Container>
                    <div className={(["float-sm-left", styles.footerCopyLeft]).join(' ')}>
                        <h5>sideKonnect&copy;2019 | All rights reserved</h5>
                    </div>
                    <div className={(["float-sm-right", styles.footerCopyRight]).join(' ')}>
                        <ul>
                            <li><a href=""><i className="fab fa-facebook-square"/></a></li>
                            <li><a href=""><i className="fab fa-twitter-square"/></a></li>
                            <li><a href="https://www.linkedin.com/in/duong-david-3b451aa2/"><i className="fab fa-linkedin"/></a></li>
                            <li><a href="https://github.com/davidd94/sideKonnect"><i className="fab fa-github-square"/></a></li>
                        </ul>
                    </div>
                </Container>
            </div>
        </footer>
    );
};


export default FooterIndex;
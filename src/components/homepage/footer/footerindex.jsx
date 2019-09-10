import React from 'react';
import { Container, Row, Col } from 'reactstrap';

import styles from '../_styles/homepageStyles.module.scss';
import footerLogo from '../_images/home-footer/logo2.png';


const FooterIndex = () => {
    return (
        <footer className={styles.footerSection}>
            <div className={styles.footerWidget}>
                <Container>
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
                            <ul className={styles.featuresChart}>
                                <li className={([styles.chart, styles.chartVideo]).join(' ')}><span>Video</span></li>
                                <li className={([styles.chart, styles.chartPlus]).join(' ')}></li>
                                <li className={([styles.chart, styles.chartVoice]).join(' ')}><span>Voice</span></li>
                                <li className={([styles.chart, styles.chartPlus]).join(' ')}></li>
                                <li className={([styles.chart, styles.chartHD]).join(' ')} style={{backgroundSize: '80px'}}><span style={{color: '#616161', fontWeight: 600}}>HD</span></li>
                            </ul>
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
                            <li><a href=""><i className="fab fa-linkedin"/></a></li>
                            <li><a href=""><i className="fab fa-github-square"/></a></li>
                        </ul>
                    </div>
                </Container>
            </div>
        </footer>
    );
};


export default FooterIndex;
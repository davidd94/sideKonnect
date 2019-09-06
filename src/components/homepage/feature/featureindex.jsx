import React from 'react';
import { Container, Row, Col } from 'reactstrap';

import styles from '../_styles/homepageStyles.module.scss';
import titleIcon from '../_images/home-feature/title-icon.png';
import simplisticIcon from '../_images/home-feature/f-icon-1.png';
import connectedIcon from '../_images/home-feature/f-icon-2.png';
import videoIcon from '../_images/home-feature/f-icon-4.png';


const FeatureIndex = () => {
    return (
        <section className={styles.featureSection}>
            <Container>
                <div className={styles.featureTitle}>
                    <img src={titleIcon} alt="" />
                    <h6>Discover the features</h6>
                    <h2>Stay connected with loved ones</h2>
                </div>
                <Row className={styles.featureInner}>
                    <Col sm={6} lg={4}>
                        <div className={styles.featureItem}>
                            <div className={styles.featureIcon}>
                                <img src={simplisticIcon} alt="" />
                            </div>
                            <h4>Simplicity</h4>
                            <p>Signing up in a few steps and making a video call in just seconds, creates a user-friendly communication platform.</p>
                            <a className={styles.moreBtn} href="">Example</a>
                        </div>
                    </Col>
                    <Col sm={6} lg={4}>
                        <div className={styles.featureItem}>
                            <div className={styles.featureIcon}>
                                <img src={connectedIcon} alt="" />
                            </div>
                            <h4>Stay Connected</h4>
                            <p>The ability to make video calls to your family and friends at anytime will ensure you stay updated and interconnected in their lives.</p>
                            <a className={styles.moreBtn} href="">Example</a>
                        </div>
                    </Col>
                    <Col sm={6} lg={4}>
                        <div className={styles.featureItem}>
                            <div className={styles.featureIcon}>
                                <img src={videoIcon} alt="" />
                            </div>
                            <h4>HD Video Calls</h4>
                            <p>Live video calls are using Tokbox API services which offers high uptime, high quality performance, and seamless upgrades.</p>
                            <a className={styles.moreBtn} href="">Example</a>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};


export default FeatureIndex;
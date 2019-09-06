import React from 'react';
import { Container, Row, Col, UncontrolledCarousel } from 'reactstrap';

import styles from '../_styles/homepageStyles.module.scss';
import LoginForm from './loginform';
import BG1 from '../_images/home-main/bg-home-main1.png';
import BG2 from '../_images/home-main/bg-home-main2.png';
import BG3 from '../_images/home-main/bg-home-main3.png';


const items = [
    {
        src: BG1,
        altText: '',
        caption: '',
        header: ''
    },
    {
        src: BG2,
        altText: '',
        caption: '',
        header: ''
    },
    {
        src: BG3,
        altText: '',
        caption: '',
        header: ''
    }
]

const MainIndex = () => {
    return (
        <section className={styles.mainSection}>
            <Container fluid className={styles.mainContainer}>
                <Row className={styles.mainRow}>
                    <Col lg={6} className={styles.mainLogin}>
                        <LoginForm />
                    </Col>
                    <Col lg={6} className={styles.carousel}>
                        <UncontrolledCarousel items={items}
                                                indicators={false}
                                                controls={false} />
                    </Col>
                </Row>
            </Container>
        </section>
    );
};


export default MainIndex;
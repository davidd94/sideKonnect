import React from 'react';
import { 
    Container, Row, Col,
    Label, Input, Button
} from 'reactstrap';

import styles from '../homepage/_styles/homepageStyles.module.scss';

const basicStyles = {
    header: {
        marginBottom: '2rem',
        textAlign: 'center'
    },
    label: {
        marginBottom: 0
    },
    column: {
        justifyContent: 'right',
        alignItems: 'center',
        display: 'flex'
    },
    row: {
        marginBottom: '3rem'
    },
    buttons: {
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex'
    },
    statusMsg: {
        textAlign: 'center',
        color: 'red',
        marginBottom: '2rem'
    }
};

const AcctResetPresent = (props) => {
    return (
        <section className={styles.mainSection} style={{height: '100vh'}}>
            <Container className={styles.mainContainer}>
                <Row className={styles.mainRow}>
                    <Col sm={12} lg={12}>
                        <h2 style={basicStyles.header}>Account Recovery</h2>
                    </Col>
                </Row>
                <Row className={styles.mainRow}>
                    <Col sm={12} lg={12}>
                        <p style={basicStyles.statusMsg}>{props.inputStatus}</p>
                    </Col>
                </Row>
                <Row className={styles.mainRow} style={basicStyles.row}>
                    <Col sm={3} lg={3} style={basicStyles.column}>
                        <Label style={basicStyles.label} for="examplePassword">New Password</Label>
                    </Col>
                    <Col sm={5} lg={5} offset={{sm : 4, lg : 4}}>
                        <Input type="password" name="password" id="examplePassword" placeholder="Enter new password"
                                        onChange={(e) => {props.setPass(e.currentTarget.value)}} />
                    </Col>
                </Row>
                <Row className={styles.mainRow} style={basicStyles.row}>
                    <Col sm={3} lg={3} style={basicStyles.column}>
                        <Label style={basicStyles.label} for="examplePassword2">Confirm New Password</Label>
                    </Col>
                    <Col sm={5} lg={5} offset={{sm : 4, lg : 4}}>
                        <Input type="password" name="password2" id="examplePassword2" placeholder="Confirm new password"
                                        onChange={(e) => {props.setPass2(e.currentTarget.value)}} />
                    </Col>
                </Row>
                <Row className={styles.mainRow}>
                    <Col sm={6} lg={6} style={basicStyles.buttons}>
                        <Button outline color="secondary" style={props.submitStatus ? {display: 'none'} : {}}>Submit</Button>
                        <Button color="success" style={props.submitStatus ? {} : {display: 'none'}} onClick={props.handleSubmit}>Submit</Button>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};


export default AcctResetPresent;
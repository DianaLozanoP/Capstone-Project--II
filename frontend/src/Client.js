import React from 'react';
import { Row, Col, Card, CardTitle, CardText } from 'reactstrap';

const Client = ({ clientId, clientName, email, contactInfo, handleClientClick }) => {
    return (
        <div className="sample d-flex justify-content-center align-items-center" onClick={() => handleClientClick(clientId)}>
            <Row>
                <Col sm="8">
                    <Card style={{ width: '45rem' }} className="cards" body>
                        <CardTitle tag="h5">
                            {clientName}
                        </CardTitle>
                        <CardText>
                            Email: {email}
                            <br></br>
                            Contact Information: {contactInfo}
                        </CardText>
                    </Card>
                </Col>

            </Row>
        </div>
    );
}

export default Client;
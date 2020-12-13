import React from 'react'
import { Container, Row, Col, ListGroup, ListGroupItem, Card, CardHeader, CardBody, Form,  } from 'shards-react'
import Header from '../../components/header'
import InputField from './formFields/InputField'


export default props => {
    const { name, phone, physical_business_address, applicant_type } = props.location.state?.record
    return (
        <>
        <Header history={props.history}/>
        <Container style={{ paddingTop: '5rem'}}>
            <Col lg="12" md="12">
                <Card className="mb-4">
                    <CardHeader>
                        <h6>View Application</h6>
                    </CardHeader>
                    <CardBody>
                    <Row form>
                        <InputField md={3} value={name?.toUpperCase()} label='Name' />
                        <InputField md={3} value={applicant_type.toUpperCase()} label='Applicant Type' />
                        <InputField md={3} value={phone} label='Primary Contact' />
                        <InputField md={3} value={physical_business_address} label='Business Address' />
                    </Row>
                    </CardBody>
                    {/* <ListGroup flush> */}
                        {/* <ListGroupItem className="p-3"> */}
                            
                        {/* </ListGroupItem> */}
                    {/* </ListGroup> */}
                </Card>
            </Col>
        </Container>
        </>
    )
}
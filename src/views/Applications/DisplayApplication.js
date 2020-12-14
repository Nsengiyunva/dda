import React, { useState } from 'react'
import { Container, Row, Col, Button, Modal, ModalHeader, ModalBody, Card, CardHeader, CardBody, Form,  } from 'shards-react'
import Header from '../../components/header'
import InputField from './formFields/InputField'
import Axios from 'axios'


export default props => {
    const { id, name, phone, physical_business_address, applicant_type } = props.location.state?.record
    const [ displayModal, setModalOpen ] = useState( false )
    const [ nextAction, setAction ] = useState( null )
    const [ comment, setComments ] = useState( null )
    const role = localStorage.getItem('role').toUpperCase()
    //create different cards for different sections
    const handleModal = ( action ) => {
        setModalOpen( true )
        setAction( action )
    }
    const toggleModal = () => setModalOpen( displayModal ? false : true )
    const handleConfirm = () => {
        let action
        if( nextAction === "forward"  ){
            if( role === "IS_INSPECTOR" ){
                action = 'inspect_application'
            }
            if( role === "IS_MANAGER" ){
                action = 'approve_application'
            }
            if( role === "IS_DIRECTOR" ){
                action = 'verify_license'
            }
        }
        if( nextAction === "reject"  ){
            action = 'rejected'
        }

            Axios.post(`http://154.72.194.247/dda/api/view_application/${id}/`, {
                application_id: id,
                action: action, 
                comment: "NA"
            }, {
                headers: {
                    'Authorization': `Token ${localStorage.getItem('token')}`
                }
            }).then( response => {
                if( response.data ){
                    props.history.push('/applications')
                } else {
                    alert('Something sent wrong with approvals.')
                }
            }).catch( err => { throw err })
    }
    return (
        <>
        <Header history={props.history}/>
        <Container style={{ paddingTop: '5rem'}}>
            <Col lg="12" md="12">
                <Card className="mb-4">
                    <CardHeader style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <span>
                             <a href="javascript:void(0)" onClick={() => props.history.push('/applications')}> {`>> Applications`}</a>/
                             <a href="javascript:void(0)">{ `View Application Details/${id}`}</a>/
                        </span>
                        
                        {role === "IS_INSPECTOR" && ( 
                            <span>
                            <Button className="mr-2" theme="primary" onClick={() => handleModal('forward')}> Foward to Next </Button>
                            <Button className="ml-2" theme="danger" onClick={() => handleModal('reject')}> Reject </Button>
                            </span>
                        ) }
                    </CardHeader>
                    <CardBody>
                    <Row form>
                        <InputField md={3} value={name?.toUpperCase()} label='Name' />
                        <InputField md={3} value={applicant_type.toUpperCase()} label='Applicant Type' />
                        <InputField md={3} value={phone} label='Primary Contact' />
                        <InputField md={3} value={physical_business_address} label='Business Address' />
                    </Row>
                    </CardBody>
                </Card>
            </Col>
        </Container>
        <Modal open={displayModal} toggle={toggleModal} >
            <ModalHeader>

            </ModalHeader>
            <ModalBody>
                <Container>
                    <>
                    <Row>
                      <strong>{ role === "IS_INSPECTOR" && `Foward this application to the Manager` }</strong>
                      <strong>{ role === "IS_MANAGER" && `Approve this application and send to director for verifcation` }</strong>
                      <strong>{ role === "IS_DIRECTOR" && `Verify this license` }</strong>
                      <InputField label="Remarks" name="remarks" disabled={false} />
                    </Row>
                    <Row form>
                      <Button theme="success" onClick={() =>handleConfirm()}>OK</Button>
                      <Button theme="danger" onClick={() =>toggleModal()}>Cancel</Button>
                    </Row>
                    </>
                </Container>
            </ModalBody>
        </Modal>
        </>
    )
}
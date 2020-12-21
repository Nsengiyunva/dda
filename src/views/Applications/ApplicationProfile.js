import React, { useEffect, useState } from "react"
import { Container, Row, Col, Modal, ModalHeader, ModalBody, Button } from "shards-react"

import PageTitle from "../../components/common/PageTitle"
import UserDetails from "../../components/user-profile-lite/UserDetails"
import UserAccountDetails from "../../components/user-profile-lite/UserAccountDetails"
import Header from '../../components/header'
import Axios from "axios"
import InputField from './formFields/InputField'


const ApplicationProfile = props => {
    const { match: { params } } = props
    const role = localStorage.getItem('role').toUpperCase()
    const [ profile, setProfile ] = useState({})
    const [ loading, setLoading ] = useState( true ) 
    const [ displayModal, setModalOpen ] = useState( false )
    const [ nextAction, setAction ] = useState( null )
    const [ comment, setComments ] = useState( null )
    const [ modalType, setModalType ] = useState()

    useEffect( () => {
        
        Axios.get(`http://154.72.194.247/dda/api/view_application/${params.id}`, {
            headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`
            }
        }).then( response => {
            setLoading( false )
            if(response.data){
                setProfile( response.data.application )
            }
            else {
                alert('Server could not obtain the application details')
            }
        }).catch( error => {
            // console.log( 'error', error )
        })
    },[])

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

            Axios.post(`http://154.72.194.247/dda/api/view_application/${params.id}/`, {
                application_id: params.id,
                action: action, 
                comment: comment
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
    const handleUploadModal = () => {
        setModalOpen( true ) 
        setModalType( 'payment' )
    }
    
    if( loading ){
        return (
            <div>Loading..</div>
        )
    }
    return (
    <>
    <Header history={props.history}/>
     <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
        <PageTitle title="View Application Details" 
            subtitle="Overview" md="12" 
            className="ml-sm-auto mr-sm-auto" />
        </Row>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <span className="mb-3">
                    <a href="javascript:void(0)" onClick={() => props.history.push('/applications')}> {`>> Applications`}</a>/
                    <a href="javascript:void(0)">{ `View Application Details/${params.id}`}</a>/
            </span>
            
            {!( role.toUpperCase() === "CLIENT" ) && ( 
                <span>
                <Button className="mr-2 mb-3" theme="primary" onClick={() => handleModal('forward')}> Foward to Next </Button>
                <Button className="ml-2 mb-3" theme="danger" onClick={() => handleModal('reject')}> Reject </Button>
                </span>
            ) }
            { ( role.toUpperCase() === "CLIENT" && profile?.status?.toUpperCase() === "VERIFIED") && (
                <Button theme="success" className="mb-3" onClick={() => handleUploadModal()}>Upload a Payment Slip</Button>
            ) }
        </div>
        <Row>
        <Col lg="8">
            <UserAccountDetails data={profile}/>
        </Col>
        <Col lg="4">
            <UserDetails data={profile}/>
        </Col>
        </Row>
        <Modal open={displayModal} toggle={toggleModal} >
            <ModalHeader>
                Administrator Actions
            </ModalHeader>
            <ModalBody>
                {!(modalType === "payment") && (
                    <Container>
                        <>
                        <Row>
                        <strong>{ role === "IS_INSPECTOR" && `Foward this application to the Manager` }</strong>
                        <strong>{ role === "IS_MANAGER" && `Approve this application and send to director for verifcation` }</strong>
                        <strong>{ role === "IS_DIRECTOR" && `Verify this license` }</strong>
                        
                        </Row>
                        <Row form>
                        <Button theme="success" onClick={() =>handleConfirm()}>OK</Button>
                        <Button theme="danger" onClick={() =>toggleModal()}>Cancel</Button>
                        </Row>
                        </>
                    </Container>
                )}

                {( modalType === "payment" ) && (
                    <>
                    <h6>Attach the payment slip to the application</h6>
                    <input type="file" onChange={()=>{}}/>
                    </>
                )}
                
            </ModalBody>
        </Modal>
    </Container>
    </>
    ) 
}

export default ApplicationProfile;

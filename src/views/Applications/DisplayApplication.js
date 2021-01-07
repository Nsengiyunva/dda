import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button, Modal, ModalHeader, ModalBody, Card, CardHeader, CardBody, Form,  } from 'shards-react'
import Header from '../../components/header'
import InputField from './formFields/InputField'
import Axios from 'axios'


export default props => {
    let { record: { any_other_relevant, completed_list, compliant_constitution, composition,
          date, email_address, name, payment_receipt, signed_resolution,
          status, type  }
        } = props.location.state


    const role = localStorage.getItem('role').toUpperCase()
     
    const [ displayModal, setModalOpen ] = useState( false )
    const [ nextAction, setAction ] = useState( null )
    const [ comment, setComments ] = useState( null )

    
    const handleModal = ( action ) => {
        setModalOpen( true )
        setAction( action )
    }
    const toggleModal = () => setModalOpen( displayModal ? false : true )
    const handleConfirm = () => {
        // let action
        // if( nextAction === "forward"  ){
        //     if( role === "IS_INSPECTOR" ){
        //         action = 'inspect_application'
        //     }
        //     if( role === "IS_MANAGER" ){
        //         action = 'approve_application'
        //     }
        //     if( role === "IS_DIRECTOR" ){
        //         action = 'verify_license'
        //     }
        // }
        // if( nextAction === "reject"  ){
        //     action = 'rejected'
        // }

        //     Axios.post(`http://154.72.194.247/dda/api/view_application/${id}/`, {
        //         application_id: id,
        //         action: action, 
        //         comment: "NA"
        //     }, {
        //         headers: {
        //             'Authorization': `Token ${localStorage.getItem('token')}`
        //         }
        //     }).then( response => {
        //         if( response.data ){
        //             props.history.push('/applications')
        //         } else {
        //             alert('Something sent wrong with approvals.')
        //         }
        //     }).catch( err => { throw err })
    }
    return (
        <>
        <Header history={props.history}/>
        <Container style={{ paddingTop: '5rem'}}>
            <Col lg="12" md="12">
                <Card className="mb-4">
                    <CardHeader style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <span>
                             <a href="javascript:void(0)" onClick={() => props.history.push('/applications')}> {`>>> Applications`}</a>/
                             <a href="javascript:void(0)">{ `View Application Details`}</a>/
                        </span>
                        
                        {!( role === "USER" ) && ( 
                          <span>
                            <Button className="mr-2" theme="primary" onClick={() => handleModal('forward')}> 
                              Forward to Next 
                            </Button>
                            <Button className="ml-2" theme="danger" onClick={() => handleModal('reject')}> 
                              Reject 
                            </Button>
                          </span>
                         ) }
                    </CardHeader>
                    <CardBody>
                      <Row form>
                          <InputField md={4} value={name?.toUpperCase()} label='Entity Name' />
                          <InputField md={4} value={type.toUpperCase()} label='Entity Type' />
                          <InputField md={4} value={email_address.toLowerCase()} label='Created By' />
                          <InputField md={4} value={status.toUpperCase()} label='Current Status' />
                      </Row>
                      
                      {/* {(userFiles?.length > 0)  && ( */}
                      <Row>
                        <Col small>
                          <Card small>
                            <CardHeader className="border-bottom">
                              <h6 className="m-0">Attached Documents:</h6>
                            </CardHeader>
                            <CardBody>
                            <table className="table mb-0">
                              <thead className="bg-light">
                                <tr>
                                  <th scope="col" className="border-0">
                                    Download
                                  </th>
                                  <th scope="col" className="border-0">
                                    #
                                  </th>
                                  <th scope="col" className="border-0">
                                    Name
                                  </th>
                                  <th scope="col" className="border-0">
                                    File Size(KB)
                                  </th>
                                  <th scope="col" className="border-0">
                                    Details
                                  </th>
                                  <th scope="col" className="border-0">
                                    Created Date
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {[{ name: 'xx', file: 'xxx', size: '25', details: 'xxxx', created_at: '25-05-2020' }].map( ( value ) => {
                                  return (
                                    <tr key={1}>
                                      <td>
                                        <Button theme="danger" onClick={()=> {} }>
                                        <a style={{ color: 'white' }} download={value.name} href={value.file} title='Download'>
                                          Download
                                        </a>
                                        </Button>
                                      </td>
                                      <td>{value.id}</td>
                                      <td>{value.name}</td>
                                      <td>{value.size}</td>
                                      <td>{value.details}</td>
                                      <td></td>
                                      {/* <td>{ moment( value.created_at ).format('DD-MM-YYYY')}</td> */}
                                    </tr>
                                  ) 
                                }) }
                              </tbody>
                            </table>
                            </CardBody>
                          </Card>
                        </Col>
                    </Row>
                    {/* ) } */}
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
                      {/* <strong>{ role === "IS_INSPECTOR" && `Foward this application to the Manager` }</strong>
                      <strong>{ role === "IS_MANAGER" && `Approve this application and send to director for verifcation` }</strong>
                      <strong>{ role === "IS_DIRECTOR" && `Verify this license` }</strong> */}
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
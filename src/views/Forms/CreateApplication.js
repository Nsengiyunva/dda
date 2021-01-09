import React, { useState } from 'react'
import Header from '../../components/header'
import { Container, Button, Row, Col, Form, FormInput, FormSelect, Modal, ModalBody, ModalHeader } from 'shards-react'
import { Formik, ErrorMessage } from 'formik'
import * as Yup from "yup"
import "./Application.css"
import Axios from "axios"
import moment from "moment"
import CustomFileUpload from "../../components/components-overview/CustomFileUpload"


export default props => {
    const [ modal, setModal ] = useState( false )
    const [ document, setDocument ] = useState({})
    const _handleSubmit = fields => {
        let documents = Object.values( document )
        
        Axios.post("http://localhost:4000/application/", {
            date: moment( new Date() ).format( "DD-MM-YYYY" ),
            completed_list: fields.completed_list,
            composition: fields.composition,
            compliant_constitution: fields.constitution,
            completed_list: fields.information,
            name: fields.name,
            any_other_relevant: fields.other_type,
            payment_receipt: fields.receipt,
            signed_resolution: fields.resolution,
            type: fields.type,
            email_address: localStorage.getItem("email_address"),
            status: "PENDING_SG"
        } ).then( response => {
            if( response.data.status === "success"){
                documents.forEach( document => {
                    Axios.post("http://localhost:4000/document", {
                        reference_id: response.data.id,
                        added_by: localStorage.getItem("email_address"),
                        file: document.file,
                        title: document.title,
                        type: document.type,
                        details: document.details,
                        size: document.size
                    } )
                } )
                alert("application saved")
                props.history.push("/applications")
            }
        } ).catch( error => {
            console.log( error )
        } )
    }
    const toggleModal = () => {
        setModal( modal ? false : true )
    }
    const fileHandlerChange = (e, tag) => {
        e.persist()
        if( e.target.files && e.target.files.length > 0 &&  e.target.files[ 0 ].type === 'application/pdf'  ){
        let attachment = e.target.files[ 0 ]
        convertFileToBase(  e.target.files, response => {
            setDocument( { ...document, 
                [tag]: {
                file: response,
                title: attachment.name,
                size: attachment.size,
                details: tag,
                type: attachment.type
            } } )
            // if( tag === 'delivery') {
                // setDelivery( { 
                //     file: response, 
                //     title: attachment.name, 
                //     size: attachment.size, 
                //     details: tag,
                //     type: attachment.type,
                // } )
            // }
        })
        }
        else {
        alert('File may not be attached correctly or of the correct format. Only pdf files are allowed to be attached')
        }
    }
    const convertFileToBase = (selectedFile, successCallback) => {
        if(selectedFile.length > 0){
          let fileToLoad = selectedFile[0]
          let fileReader = new FileReader()
          let base64
          fileReader.onload = function(fileLoadedEvt){
            base64 = fileLoadedEvt.target.result
            successCallback( base64 )
          }
          fileReader.readAsDataURL( fileToLoad )
        }
    }

    return (
        <div style={{ backgroundColor: "white"}}>
            <Header history={props.history}/>
            <Container style={{  width: "100vw", height: "auto", paddingTop: "15vh", 
                display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div style={{
                        width: "100%", 
                        height: "auto",
                        display: "flex",
                        flexDirection: "column",
                    }}>
                    <h5 style={{ alignSelf: "center", textTransform: "uppercase" }}>
                       Application for USF Membership and Affliation
                    </h5>
                    <Formik 
                        enableReinitialize
                        initialValues={{
                            type: "",
                            other_type:"",
                            name: "",
                            resolution: "",
                            constitution: "",
                            completed_list: "",
                            composition: "",
                            calendar: "",
                            receipt: "",
                            information: ""
                        
                        }}
                        validationSchema={
                            Yup.object().shape({
                                type: Yup.string().required(`Entity Type is required`),
                                other_type: Yup.string().min( 2, "Entity type cannot be less than 2 characters"),
                                name: Yup.string().required(`Entity Name is required`).min( 4, 'Name should be at least 4 characters long'),
                            })
                        }
                        onSubmit={ values => {
                            _handleSubmit( values )
                        } }
                        render={ ({ values, errors, isSubmitting, handleSubmit, handleChange, handleBlur, touched }) => {
                            return (
                            <Form onSubmit={handleSubmit}>       
                                <Row form>
                                <Col md="4" className="form-group">
                                    <label htmlFor={"type"}>Type of Entity:</label>
                                    <FormSelect name="type" 
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={'form-control' + (errors["type"] ? ' is-invalid' : '')}
                                        value={values.type}>
                                        <option value="">Choose...</option>
                                        <option>School</option>
                                        <option>University</option>
                                        <option>Club</option>
                                        <option>Other Entity</option>
                                    </FormSelect>
                                    <ErrorMessage name={"type"} component="div" className="invalid-feedback"/>
                                </Col>

                                {values.type === "Other Entity" && (
                                    <Col md="4" className="form-group">
                                    <label htmlFor={"type"}>Entity Type:</label>
                                    <FormInput
                                        id={"other_type"}
                                        name={"other_type"}
                                        onChange={handleChange}
                                        className={'form-control' + (errors["other_type"] ? ' is-invalid' : '')}
                                        onBlur={handleBlur}
                                        value={values.other_type}
                                        autoComplete="off"
                                    />
                                    <ErrorMessage name={"other_type"} component="div" className="invalid-feedback"/>
                                </Col>
                                )}
                                <Col md="4" className="form-group">
                                    <label htmlFor={"name"}>Entity Name:</label>
                                    <FormInput
                                        id={"name"}
                                        name={"name"}
                                        onChange={handleChange}
                                        className={'form-control' + (errors["name"] ? ' is-invalid' : '')}
                                        onBlur={handleBlur}
                                        value={values.name}
                                        autoComplete="off"
                                    />
                                    <ErrorMessage name={"name"} component="div" className="invalid-feedback"/>
                                </Col>
                                </Row>

                                    <table id="files">
                                        <thead>
                                            <th>Document to be Added</th>
                                            <th>Attach File</th>
                                        </thead>
                                        <tbody>
                                            {[
                                                { 
                                                    id: 1,
                                                    name: "Signed Resolution of Applicant for Affiliation with the USF",
                                                    tag: "resolution"

                                                },
                                                { 
                                                    id: 2,
                                                    name: "Compliant Constitution or Statutes of the Applicant",
                                                    tag: "constitution"
                                                },
                                                { 
                                                    id: 3,
                                                    name: "Completed List for Athletes, Coaches/Support Personnel",
                                                    tag: "completed_list"
                                                },
                                                {
                                                    id: 4,
                                                    name: "Composition and Full Addresses for Applicant’s Executive/Directors",
                                                    tag: "composition"
                                                },
                                                {
                                                    id: 5,
                                                    name: "Calendar of Events/Work Plan/Activity Schedule for the Applicant",
                                                    tag: "calendar"
                                                },
                                                {
                                                    id: 6,
                                                    name: "Payment of Non-Refundable Process Fee (Attach Receipt)",
                                                    tag: "payment"
                                                },
                                                {
                                                    id: 7,
                                                    name: "Any Other Relevant Information",
                                                    tag: "relevant_information"
                                                },
                                            ].map( value => (
                                                <tr key={value.id}>
                                                    <td>{`${value.id}: ${value.name}`}</td>
                                                    <td>
                                                        <Row>
                                                            <Col md="12" sm="12" className="form-group">
                                                                {/* <span>{console.log( document[value.tag]?.title )}</span> */}
                                                                <CustomFileUpload 
                                                                    onChange={ event => fileHandlerChange(event, value.tag  )} 
                                                                    name={document[value.tag]?.title}
                                                                />
                                                            </Col>
                                                        </Row>
                                                    </td>
                                                </tr>
                                            ) )}
                                            
                                        </tbody>
                                    </table>
                                    <Button theme="primary" type="submit" className={"my-3"}>
                                        Submit
                                    </Button>
                                </Form>
                            
                            )
                        } }
                    />
                </div>
                <Modal open={modal} toggle={toggleModal}>
                    <ModalHeader>Submitting Application</ModalHeader>
                    <ModalBody>
                        <Container>
                            <Form>
                                <Row form>
                                <Col md="6" className="form-group">
                                    <label htmlFor={"name"}>Email Address:</label>
                                    <FormInput
                                        id={"email_address"}
                                        name={"email_address"}
                                        // onChange={handleChange}
                                        // className={'form-control' + (errors["email_address"] ? ' is-invalid' : '')}
                                        // onBlur={handleBlur}
                                        // value={values.email_address}
                                        autoComplete="off"
                                    />
                                    {/* <ErrorMessage name={"email_address"} component="div" className="invalid-feedback"/> */}
                                </Col>

                                <Col md="6" className="form-group">
                                    <label htmlFor={"name"}>Phone Number:</label>
                                    <FormInput
                                        type="number"
                                        id={"phone_number"}
                                        name={"phone_number"}
                                        // onChange={handleChange}
                                        // className={'form-control' + (errors["phone_number"] ? ' is-invalid' : '')}
                                        // onBlur={handleBlur}
                                        // value={values.phone_number}
                                        autoComplete="off"
                                    />
                                    {/* <ErrorMessage name={"phone_number"} component="div" className="invalid-feedback"/> */}
                                </Col>
                                </Row>
                                <Row form>
                                    <Button theme="success">
                                        Submit Application
                                    </Button>
                                    <Button theme="danger">
                                        Cancel
                                    </Button>
                                </Row>
                            </Form>
                        </Container>
                    </ModalBody>
                </Modal>
            </Container>
        </div>
    )
}

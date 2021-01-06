import React, { useState } from 'react'
import Header from '../../components/header'
import { Container, Button, Row, Col, Form, FormInput, FormSelect, Modal, ModalBody, ModalHeader } from 'shards-react'
import { Formik, ErrorMessage } from 'formik'
import * as Yup from "yup"
import "./Application.css"
import Axios from "axios"
import moment from "moment"


export default props => {
    const [ modal, setModal ] = useState( false )
    const _handleSubmit = fields => {
        // console.log( fields )
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
            // console.log( response )
            if( response.data.status === "success"){
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
    return (
        <div style={{ backgroundColor: "white"}}>
            <Header history={props.history}/>
            <Container style={{  width: "100vw", 
                height: "auto", 
                paddingTop: "15vh", 
                display: "flex",
                justifyContent: "center",
                alignItems: "center" }}>
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
                                type: Yup.string().required(`Type is required`),
                                name: Yup.string().required(`Name is required`).min( 4, 'Name should be at least 4 characters long'),
                            })
                        }
                        onSubmit={ values => {
                            _handleSubmit( values )
                            // setModal( true )
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

                                    <Col md="4" className="form-group">
                                    <label htmlFor={"name"}>Name:</label>
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

                                {/* <Row form style={{ border: "1px solid" }}> */}
                                    {/* <Col md="12" className="form-group"> */}
                                    <table id="files">
                                        <thead>
                                            <th>Document to be Added</th>
                                            <th>Attach File</th>
                                        </thead>
                                        <tbody>
                                            {[
                                                { 
                                                    id: 1,
                                                    name: "Signed Resolution of Applicant for Affiliation with the USF"
                                                },
                                                { 
                                                    id: 2,
                                                    name: "Compliant Constitution or Statutes of the Applicant"
                                                },
                                                { 
                                                    id: 3,
                                                    name: "Completed List for Athletes, Coaches/Support Personnel"
                                                },
                                                {
                                                    id: 4,
                                                    name: "Composition and Full Addresses for Applicant’s Executive/Directors "
                                                },
                                                {
                                                    id: 5,
                                                    name: "Calendar of Events/Work Plan/Activity Schedule for the Applicant"
                                                },
                                                {
                                                    id: 6,
                                                    name: "Payment of Non-Refundable Process Fee (Attach Receipt)"
                                                },
                                                {
                                                    id: 7,
                                                    name: "Any Other Relevant Information"
                                                },
                                            ].map( row => (
                                                <tr key={row.id}>
                                                    <td>{`${row.id}: ${row.name}`}</td>
                                                    <td>
                                                        <input type="file" onChange={() => {} }/>
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

import React, { useState } from 'react'
// import logo from '../../images/dda_logo.png'
import { Container, Button, Modal, ModalHeader, ModalBody } from 'shards-react'
import Axios from 'axios'
import { Formik, Form, ErrorMessage } from 'formik'
import { CircularProgress } from '@material-ui/core'
import Header from '../../components/header'

import applicationModel from '../Applications/FormModel/applicationModel'
import formInitialValues from '../Applications/FormModel/formInitialValues'
import validation from '../Applications/FormModel/validationSchema'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

// import Register from '../Register'
import './SignIn.css'



export default props => {
    const eye = <FontAwesomeIcon icon={faEye} />
    const[ isLoading, setLoading ] = useState( false )
    const[ displayModal, setDisplayModal ] = useState( false )
    const[ passwordShown, setPasswordShown] = useState()
    const { formField: { username, password }, registerField: { firstname, lastname, register_password, phonenumber, emailaddress } } = applicationModel
    const[ showRegister, setShowRegister ] = useState( false )

    const { loginInitials, registerInitials } = formInitialValues[0]

    const togglePasswordVisibility= () => {
        setPasswordShown( true )
    }
    const _handleSubmit = fields => {
        setLoading( true )
        Axios.post("http://localhost:4000/users/authenticate", 
            {
                email_address: fields.username,
                password: fields.password
            }
        ).then( response => {
            let { status, data: { user: { role, email_address } } }  = response.data 
            if( response.data.status === "success" ){
                setLoading( false )
                localStorage.setItem("email_address", email_address)
                localStorage.setItem("role", role )
                props.history.push("/")
            }
            else {
                alert('Error occured on login - could not log you in')
            }
        }).catch( error => {
            throw error
        })
        
    }
    const toggleModal = () => setDisplayModal( displayModal ? false : true )

    return (
        <>
        <Header history={props.history} />
        <div className="container" style={{ paddingTop: "25vh" }}>
            {/* <div className="row" style={{ justifyContent: 'flex-end', paddingTop: '20px' }}>
                <Button type="button" theme="warning" onClick={ () => setShowRegister( true )} style={{ backgroundColor: '#358832', outline: 'none', border: 0, fontSize: '.75rem', color: '#DDD' }}>
                    Do not have an Account ? Register Here
                </Button>
            </div> */}
            <div className="registration-form" style={{ border: '0px solid red' }}>
                <Formik 
                    enableReinitialize
                    initialValues={loginInitials}
                    onSubmit={(fields) => _handleSubmit(fields)}
                    validationSchema={validation[0]}
                    render={({ errors, handleSubmit, values,handleBlur, handleChange }) => {
    
                        return (
                            <Form onSubmit={handleSubmit}>
                                <input type="hidden" />
                                {/* <div className="form-icon" > 
                                    <img src={logo} style={{ width: '100%'}} alt="logo"/>
                                    <h6 style={{ textAlign: "center", color: '#000'}}>LICENSING SYSTEM</h6>
                                </div> */}
                    
                                <div className="form-group">
                                    <input type="text" className="form-control item" 
                                        id={username.name} 
                                        placeholder={username.label} 
                                        name={username.name} 
                                        autoComplete="off"
                                        className={'form-control' + (errors[username.name] ? ' is-invalid' : '')}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.username}
                                        required />
                                    <ErrorMessage name={username.name} component="div" className="invalid-feedback"/>
                                </div>
                                <div className="password-container form-group">
                                    <input 
                                        name={password.name} 
                                        type={passwordShown ? "text" : "password"}
                                        className="form-control item" 
                                        className={'mb-3 form-control' + (errors[password.name] ? ' is-invalid' : '')}
                                        id="password" 
                                        placeholder={password.label} name={password.name}
                                        onChange={handleChange} 
                                        onBlur={handleBlur} 
                                    />
                                    <i onClick={() => togglePasswordVisibility()}>{eye}</i>
                                    <ErrorMessage name={password.name} component="div" className="invalid-feedback"/>
                                    <a className="pull-right" href="#" style={{ fontSize: '14px', color: "#0F0D08", textDecoration: "underline"}}>
                                        Forgotten password or Username ?
                                    </a>
                                </div>

                                <div className="form-group">
                                    <Button theme="success" className="btn btn-block create-account" type="submit">
                                        {isLoading ? ( <CircularProgress size={24} />) : `Sign In` }
                                    </Button>
                                </div>

                                <div className="row" style={{ justifyContent: "center" }}>
                                    <div>
                                        <div className="loader center" id="loading" />
                                    </div>
                                </div>
                            </Form> 
                        )
                    } }
                />
                
            </div>
            {/* <Modal open={displayModal} toggle={toggleModal}>
                <ModalHeader>Registration of new account</ModalHeader>
                <ModalBody>
                    <Register />
                </ModalBody>
            </Modal> */}
        </div>
        </>
    )
    
}
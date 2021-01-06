import React, { useState } from 'react'
import { Modal, ModalHeader, ModalBody, Container, Row, Col, Button } from 'shards-react'
import { Formik, Form, ErrorMessage, Field  } from "formik";


const ModalComponent = props => {
    let { displayModal, toggleModal, locationValue, initialValues, validationSchema, handleSubmit } = props

    const [ formInputs, setFormInputs ] = useState({

    })
    const handleChangeField = event => {
      event.persist()
      setFormInputs( state => {
        return {
          ...state,
          ...formInputs,
          [ event.target.name ]: event.target.value
        }
      })
    }
    
    const submitHandler = () => {
      if( Object.values( formInputs ).length > 0 ){
        let key = Object.keys(formInputs)?.[0]
        console.log( key )
        // dispatch( saveLocationValue({ key: formInputs[ key ] }))
      } else {
        alert('Fill in the values in the form')
      }
    }
    return (
        <Modal open={displayModal} toggle={toggleModal}> 
          <ModalHeader>{`Add a new ${locationValue?.label.toUpperCase()}`}</ModalHeader>
          <ModalBody>
            <Container>
                <Formik 
                    initialValues={initialValues}
                    validationSchema={validationSchema}>
                      { ( formik ) => {

                          const { errors, handleChange, handleBlur, values, touched, handleSubmit } = formik
                          // console.log( values )
                          return (
                              <Form onSubmit={handleSubmit}>
                                <Row form>
                                    <Col md="12" sm="12" className="form-group">
                                    <label htmlFor={locationValue?.key}>
                                        {`${locationValue?.label}:`}<span style={{ color: 'red'}}>*</span>
                                    </label>
                                    <Field 
                                        name={locationValue?.key} 
                                        type="text" 
                                        onChange={handleChangeField}
                                        placeholder={locationValue?.label}
                                        className={'form-control' + (errors[locationValue?.key] && touched[locationValue?.key] ? ' is-invalid' : '')} 
                                        value={formInputs?.[locationValue?.key]} 
                                        onBlur={handleBlur} 
                                        />
                                    <ErrorMessage name={locationValue?.key} component="div" className="invalid-feedback" />
                                    </Col>
                                    <Button onClick={submitHandler}> Submit </Button>
                                </Row>
                              </Form>
                          )
                          
                      } }
                </Formik>
              
            </Container>
          </ModalBody>
      </Modal> 
    )
}
export default ModalComponent
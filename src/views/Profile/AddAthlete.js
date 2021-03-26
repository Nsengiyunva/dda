import React, { useState } from 'react'
import {  Container, Row, Col, Card, CardHeader, Button,ListGroup, ListGroupItem } from 'shards-react'
// import Axios from 'axios'
import { Formik, Form } from 'formik'
import { Stepper, Step, StepLabel,CircularProgress } from '@material-ui/core'
import Header from '../../components/header'
import BioDetails from './BioDetails'
import Medals from './Medals'
import Stats from './Stats'
import * as Yup from 'yup'
import moment from 'moment'
import useStyles from '../styles'





const _renderStepContent = ( step, handleChange, handleBlur, values, errors, touched ) => {
    switch( step ){
        case 0:
            return <BioDetails
                handleChange={handleChange} 
                values={values} 
                handleBlur={handleBlur}
                errors={errors} 
                touched={touched}
            />
        case 1:
            return <Medals
                handleChange={handleChange} 
                values={values} 
                handleBlur={handleBlur}
                errors={errors} 
                touched={touched}
            />
        case 2:
            return <Stats
                handleChange={handleChange} 
                values={values} 
                handleBlur={handleBlur}
                errors={errors} 
                touched={touched}
            />
        default:
            break;
    }
}


export default props => {
    const classes = useStyles()
    
    const steps = [ 'BioDetails', 'Medals','Stats' ]

    const [ activeStep, setActiveStep ] = useState( 0 )

    const isLastStep = activeStep === steps.length - 1


    const _handleBack = () => {
        setActiveStep( activeStep - 1)
    }
    const uploadFileServer = ( id ) => {
        // if( state?.files?.length > 0 ){
        //     let attached = Object.values( state.files )
        //     attached.forEach( document => {
        //         let key = Object.keys( document )
        //         Axios.post("https://licensing.nfa.go.ug/api/auth/saveUserFile", {
        //             name: document[key].title,
        //             file: document[key].file,
        //             userid: localStorage.getItem("user_id"),
        //             type: document[key].type,
        //             size: document[key].size,
        //             description: document[key].details,
        //             details: document[key].details,
        //             application_id: id
        //         } ).then( response => {
        //             // console.log( 'files',response )
        //         })
        //         .catch( error => { 
        //             throw error 
        //         })
        //     } )
        // }
    }
    const _handleSubmit = async ( fields, actions ) => {
        if( isLastStep ) {
            actions.setSubmitting( false )
            actions.setTouched({})

            console.log( fields )
        } 
        else {
            if( fields.category === "Company" && activeStep === 0 ) {
                setActiveStep( activeStep + 2 )
            }
            else {
                setActiveStep( activeStep + 1 )
            }
            actions.setSubmitting( false )
            actions.setTouched({})
        }
        
    }

    return (
        <>
            <Header history={props.history}/>
            <Container style={{ paddingTop: '5rem'}}>
                <Stepper activeStep={activeStep} className={classes.stepper}>
                    {steps.map(label => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                    ))}
                </Stepper>
                <Row>
                    <Col lg="12" md="12">
                    <Card small className="mb-4">
                    <CardHeader className="border-bottom">
                        <h6 className="m-0">
                            FILL IN ATHLETE DETAILS:
                        </h6>
                    </CardHeader>
                    <ListGroup flush>
                        <ListGroupItem className="p-3">
                        <Formik 
                            enableReinitialize
                            initialValues={{
                                "date": moment( new Date() ).format('DD-MM-YYYY'),
                            }}

                            validationSchema={Yup.object().shape({
                                // [category.name]: Yup.string().required(""),
                            })}
                            onSubmit={_handleSubmit}
                            render={ ({ values, errors, isSubmitting, handleSubmit, handleChange, handleBlur, touched }) => {
                                return (
                                    <Form onSubmit={handleSubmit}>
                                        {_renderStepContent(activeStep, handleChange, handleBlur, values, errors, touched )}
                                        { activeStep !== 0 && (
                                            <Button theme="success" onClick={_handleBack}>
                                                Previous
                                            </Button>
                                        )}
                                        <Button theme="danger" type="submit" disabled={isSubmitting} className="my-2">
                                            { isLastStep ? 'Submit Application Details' : 'Proceed to Next Form' }
                                        </Button>
                                        {isSubmitting && ( <CircularProgress size={24} />) }
                                    </Form>
                                
                                )
                            } }
                        />
                        </ListGroupItem>
                    </ListGroup>
                    </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
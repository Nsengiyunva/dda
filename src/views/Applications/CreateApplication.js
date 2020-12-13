import React, { useEffect, useState } from 'react'

import { Button, Container, Row, ListGroup, ListGroupItem, 
    Card, CardHeader,Col } from 'shards-react'
import { Stepper, Step, StepLabel,CircularProgress } from '@material-ui/core'

import { Form, Formik } from 'formik'
import Header from '../../components/header'
import useStyles from './styles'

import General from './Forms/General'
import Categories from './Forms/Categories'
import Attachments from './Forms/Attachments'

import formInitialValues from './FormModel/formInitialValues'
import validationSchema from './FormModel/formValidationSchema'

import Axios from 'axios'
import data from './fixtures'



const _renderStepContent = ( step, handleChange, handleBlur, values, errors, touched ) => {
    switch( step ){
        case 0:
            return <General
                handleChange={handleChange} 
                values={values} 
                handleBlur={handleBlur}
                errors={errors} touched={touched}/>
        case 1:
            return <Categories handleChange={handleChange} 
                values={values} 
                handleBlur={handleBlur} 
                errors={errors} touched={touched}/>
        case 2:
            return <Attachments handleChange={handleChange} 
            values={values} 
            handleBlur={handleBlur} 
            errors={errors} touched={touched}/>
        default:
            break;
    }
}

const CreateApplication = props => {
    const [ activeStep, setActiveStep ] = useState( 0 )
    const steps = [ 'General Information', 'Category Types Information', 'Add Attachments' ]

    const currentValidationSchema = validationSchema[ activeStep ]

    const isLastStep = activeStep === steps.length - 1

    const classes = useStyles()
    const[ view, setView ] = useState( false )
    
    useEffect( () => {
        if( props.location.state?.flag === "view") {
            setView( true )
        }
    }, [])
    
    const _handleBack = () => {
        setActiveStep( activeStep - 1)
    }
    const _handleSubmit = ( fields, actions ) => {
        if( isLastStep ) {
        Axios.post("http://154.72.194.247/dda/api/application/", {
                applicant_type: fields.applicant_type.toLowerCase(),
                company_name: fields.company_name.trim(),
                physical_business_address: fields.physical_business_address.trim(),
                name: fields.first_name?.toUpperCase() + ' ' + fields.last_name?.toUpperCase(),
                gender: fields.gender?.toUpperCase(),
                national_id: fields.nin,
                district: fields.district?.toUpperCase(),
                subcounty: fields.subcounty?.toUpperCase(),
                village: fields.village?.toUpperCase(),
                country: fields.country?.toUpperCase(),
                phone: fields.phone,
                comment: "",
                country_of_origin: fields.country_of_origin?.toUpperCase(),
                country_of_destination : fields.country_of_destination?.toUpperCase(),
                website_url: fields.website_url,
                type_of_license: ( fields.category === "processors" ) ? fields.category_of_processors.trim() : ( fields.category === "importers" ? fields.category_importers.trim() : fields.category),
                product_description: fields?.product_exported?.toUpperCase(),
                source_of_product: fields.source_of_product?.toUpperCase(),
                total_tonnage: fields.total_tonnage_importers,
                equipment_description: fields.type_of_equipment?.toUpperCase(), 
                source_of_equipment: fields.source_of_equipment?.toUpperCase(),
                installed_capacity: fields.installed_capacity,
                average_buying_price: fields.average_buying_price,
                average_selling_price : fields.average_selling_price,
                bank_prn : "",
                business_reg_number : fields.business_registration_number.toUpperCase(),
                business_reg_cert: "",
                certificate_of_origin: "",
                certificate_of_analysis: "",
                distribution_plan: "",
                monthly_returns: "",
                product_recall_plan: "",
                certificate_of_registration: "",
                veterinary_certificate: "",
                company_profile: "",
                payment_slip: ""
            }, {
                headers: {
                    'Authorization': `Token ${localStorage.getItem('token')}`
                }
            } ).then( response => {
                console.log( 'response', response )
                actions.setSubmitting( false )
                actions.setTouched({})
            }).catch( error => {
                console.log( error )
            })
            alert('submit this form')
            props.history.push('/applications')
        } 
        else {
            setActiveStep( activeStep + 1 )
            actions.setSubmitting( false )
            actions.setTouched({})
        }
        //rome@#2020ADMIN
        
    }
    return (
        <>
        <Header />
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
                        Application for a License
                    </h6>
                </CardHeader>
                <ListGroup flush>
                    <ListGroupItem className="p-3">
                    <Formik 
                        enableReinitialize
                        initialValues={formInitialValues[0].application}
                        validationSchema={currentValidationSchema}
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
                                    <Button theme="danger" type="submit" disabled={isSubmitting}>
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
export default CreateApplication
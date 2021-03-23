import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Container, FormSelect, Row, Col, Button, Card, CardHeader, CardBody } from 'shards-react'

import initialValues from './initials'
import validationSchema from './validationSchema'
import registrationFields  from './formModel'
import InputField from './formFields/InputField'

import CustomFileUpload from "../../components/components-overview/CustomFileUpload"
import Axios from 'axios'

const { date, type, category, first_name, last_name, others, company_name, gender,
        country, district, subcounty, village, physical_address, telephone,
        type_of_license, expected_volumes, types, website } = registrationFields

//  

const Registration = props => {
    const steps = [ "BioData", "Locations" ]

    const[ Individual, setIndividual ] = useState( false )
    const[ Company, setCompany ] = useState( false )
    const[ activeStep, setActiveStep ] = useState( 0 )
    const isLastStep =  activeStep === steps.length - 1



    const [ business_reg_cert, setBizCert ] = useState({ response: '', file: null })
    const [ certificate_of_origin, sertOriginCert ] = useState({ response: '', file: null })
    const [ certificate_of_analysis, setAnalysisCert ] = useState({ response: '', file: null })
    const [ distribution_plan, setDistribution ] = useState({ response: '', file: null })
    const [ monthly_returns, setMonthly ] = useState({ response: '', file: null })
    const [ annual_returns, setAnnual ] = useState({ response: '', file: null })
    const [ product_report_plan, setProductPlan ] = useState({ response: '', file: null })

    const handleFields = values => {
        if( values.category === "individual" ){
            setIndividual( true )
            setCompany( false )
        }
        if( values.category === "company" ){
            setCompany( true )
            setIndividual( false )
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
    const fileHandlerChange = (e, tag) => {
        e.persist()
        if( e.target.files && e.target.files.length > 0 &&  e.target.files[ 0 ].type === 'application/pdf'  ){
          let attachment = e.target.files[ 0 ]
          convertFileToBase(  e.target.files, response => {
            if( tag === 'business_reg_cert'){
              setBizCert( 
                { 
                  file: response, 
                  title: attachment.name, 
                  size: attachment.size, 
                  details: tag,
                  type: attachment.type,
                //   userid: state.id
                } )
            }
            if( tag === 'certificate_of_origin'){
              sertOriginCert( { 
                  file: response, 
                  title: attachment.name, 
                  size: attachment.size, 
                  details: tag,
                  type: attachment.type,
                //   userid: state.id
               } )
            }
            if( tag === 'certificate_of_analysis'){
              setAnalysisCert( { 
                  file: response, 
                  title: attachment.name, 
                  size: attachment.size, 
                  details: tag,
                  type: attachment.type,
                //   userid: state.id
               } )
            }
            if( tag === 'distribution_plan'){
              setDistribution( { 
                  file: response, 
                  title: attachment.name, 
                  size: attachment.size, 
                  details: tag,
                  type: attachment.type,
                //   userid: state.id
               } )
            }
            if( tag === 'monthly_returns'){
                setMonthly( { 
                    file: response, 
                    title: attachment.name, 
                    size: attachment.size, 
                    details: tag,
                    type: attachment.type,
                  //   userid: state.id
                 } )
              }
              if( tag === 'annual_returns'){
                setAnnual( { 
                    file: response, 
                    title: attachment.name, 
                    size: attachment.size, 
                    details: tag,
                    type: attachment.type,
                  //   userid: state.id
                 } )
              } 
              if( tag === 'product_report_plan'){
                setProductPlan( { 
                    file: response, 
                    title: attachment.name, 
                    size: attachment.size, 
                    details: tag,
                    type: attachment.type,
                  //   userid: state.id
                 } )
              }
          })
        }
        else {
          alert('File may not be attached correctly or of the correct format. Only pdf files are allowed to be attached')
        }
    }

    const handleSubmit = fields => {
        // console.log( localStorage.getItem('token') )
        Axios.post("http://154.72.194.247/dda/api/application/", {
            "company_name": fields.category === "company" ? fields.company_name : 'na',
            "physical_business_address": fields.physical_business_address,
            "name": fields.category === "individual" ? fields.first_name?.toUpperCase() + ' ' +  fields.others?.toUpperCase() + ' ' + fields.last_name?.toUpperCase() : 'na',
            "district": fields.district?.toUpperCase(),
            "subcounty": fields.subcounty?.toUpperCase(),
            "village": fields.village.toUpperCase(),
            "country": fields.country?.toUpperCase() || "UGANDA",
            "phone": fields.telephone,
            "country_of_origin": fields.country?.toUpperCase() || "UGANDA",
            "website_url": fields.website || "",
            "expected_volumes": fields.expected_volumes,
            "types": fields.types || "",
            "type_of_license": fields.type_of_license,
            "business_reg_cert": business_reg_cert?.file  || "",
            "certificate_of_origin" : certificate_of_origin?.file  || "",
            "certificate_of_analysis": certificate_of_analysis?.file  || "",
            "distribution_plan": distribution_plan?.file  || "",
            "annual_returns" : annual_returns?.file  || "",
            "monthly_returns": monthly_returns?.file  || "",
            "product_report_plan": product_report_plan?.file || ""
            },
            {
                headers: {
                    'Authorization': `Token ${localStorage.getItem('token')}`
                  }
            }
        ).then ( response => {
            if( response.data ){
            props.history.push('/all-applications')
            }
            
        }).catch( error => {
            console.log('error', error )
        })
    }
    const renderFormsComponent = ( values, handleChange, handleBlur, handleSubmit, errors ) => {
        switch( step ){
            case 0:
                return <BioData />
            case 1:
                return <div>Locations</div>
            default:
                return <div>xx</div>
        }
    }


    return (
        <Formik 
            initialValues={initialValues}
            validationSchema={validationSchema['registration']}
            onSubmit={ ( fields ) => {
                handleSubmit( fields )
            }}
            render={ ( { errors, values, handleChange, handleBlur, handleSubmit, dirty, isValid } ) => {
                handleFields( values )
                return (
                    <Container>
                        <Form id="registration_form">
                            {renderFormsComponent(values,handleChange, handleBlur, handleSubmit, errors)}
                            <>
                                {activeStep !== 0 && (
                                    <Button theme="warning" onClick={() => alert('previous')}>
                                        Previous
                                    </Button>
                                )}
                                <Button>
                                    { !isLastStep ? 'Next': 'Submit'}
                                </Button>
                            </>
                        </Form>
                    </Container>
                )
            } }
        />
    )
}
export default Registration

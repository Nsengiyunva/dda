import React, { useState, useEffect } from 'react'
import { Row, Col, FormInput, FormSelect } from 'shards-react'
import model from '../FormModel/applicationModel'
import { useDispatch, useSelector } from 'react-redux'
import { savePDFile } from '../../../_actions'
import CustomFileUpload from '../../../components/components-overview/CustomFileUpload'

export default props => {
    const { formField: { 
            certificate_of_registration, certificate_of_origin, veterinary_certificate, 
            product_recall_plan, distribution_plan, monthly_returns, certificate_of_analysis } } = model

    const { handleBlur, handleChange, values } = props
    const dispatch = useDispatch()
    const state = useSelector( state => {
        return {
            registration: state.form?.file?.registration
        }
    })

    const [ documentFile, setFiles ] = useState( {
        registration: null,
        returns: null,
        recall: null,
        analysis: null,
        veterinary: null,
        origin: null,
        distribution: null
    } )

    useEffect( () => {
        console.log('here')
        // if( ( Object.values( state?.registration ).length > 0 ) ){
        //     dispatch( savePDFile( documentFile )  )
        // } 
    },[ documentFile ])
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
    const fileHandlerChange = async (e, tag) => {
        e.persist()
        if( e.target?.files.length > 0 &&  e.target.files[ 0 ].type === 'application/pdf'  ){
          let attachment = e.target.files[ 0 ]
           convertFileToBase(  e.target.files, response => {
              setFiles( {
                registration: { 
                        file: response, 
                        title: attachment.name, 
                        size: attachment.size, 
                        details: tag,
                        type: attachment.type,
                        // userid: state.id
                }
            } )
          })
        }
        else {
          alert('File may not be attached correctly or of the correct format. Only pdf files are allowed to be attached')
        }
    }
    return (
        <>
        <hr style={{ width: '100%', border: "2px solid #c99211" }} className="mt-5"/>
        <h6>Attachments</h6>
        <Row form className="mt-3">
            {/* {( values.category_importers === '1' || values.category_importers === '3' || 
               values.category === '4' || values.category === '5' || values.category === '6'  ) && ( */}
                <Col md="6">
                    <label htmlFor={"work_plan"}>{"Work Plan"}:</label>
                    <CustomFileUpload onChange={(e) => fileHandlerChange(e, 'work_plan')} name={"Attachment"} />
                </Col>
            {/* ) } */}
            
            {( values.category_importers === '1'  ) && (
                <Col md="6">
                    <label htmlFor={certificate_of_analysis.name}>{certificate_of_analysis.label}:</label>
                    <CustomFileUpload onChange={(e) => fileHandlerChange(e, 'analysis')} name={documentFile.analysis?.title} />
                </Col>
            ) }
        </Row>
        
        <Row form className="mt-5">
            {( values.category_importers === '1'  ) && (
            <Col md="6">
                <label htmlFor={veterinary_certificate.name}>{veterinary_certificate.label}:</label>
                <CustomFileUpload onChange={(e) => fileHandlerChange(e, 'veterinary')} name={documentFile.veterinary?.title} />
            </Col>
            ) } 
            {( values.category === '2' ||  values.category === '3' || values.category === '4' || values.category === '5' || values.category === '6' || values.category === '9'  ) && (
            <Col md="6">
                <label htmlFor={monthly_returns.name}>{monthly_returns.label}:</label>
                <CustomFileUpload onChange={(e) => fileHandlerChange(e, 'returns')} name={documentFile.returns?.title} />
            </Col>
            ) }
        </Row>

        <Row form className="mt-5">
        {( values.category_importers === '1' || values.category_importers === '3'  ) && (
            <Col md="6">
                <label htmlFor={certificate_of_origin.name}>{certificate_of_origin.label}:</label>
                <CustomFileUpload onChange={(e) => fileHandlerChange(e, 'analysis')} name={documentFile.origin?.title} />
            </Col>
        ) }

        {( values.category_importers === '1'   ) && (
            <Col md="6">
                <label htmlFor={distribution_plan.name}>{distribution_plan.label}:</label>
                <CustomFileUpload onChange={(e) => fileHandlerChange(e, 'distribution')} name={documentFile.distribution?.title} />
            </Col>
            ) }
        </Row>
    
        {( values.category_importers === '1'  ) && (
        <Row form className="mt-3">
            <Col md="6">
                <label htmlFor={product_recall_plan.name}>{product_recall_plan.label}:</label>
                <CustomFileUpload onChange={(e) => fileHandlerChange(e, 'recall')} name={documentFile.recall?.title} />
            </Col>
        </Row>
        )}
        </>
    )
}




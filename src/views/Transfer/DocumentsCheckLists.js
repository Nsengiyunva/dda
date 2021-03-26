import React, { useEffect, useState } from 'react'
import { Container, Button, Row, Col, Form, FormInput, FormSelect, Modal, ModalBody, ModalHeader } from 'shards-react'
// import { Formik, ErrorMessage } from 'formik'
// import * as Yup from "yup"
import "../Forms/Application.css"
// import Axios from "axios"
// import moment from "moment"
import CustomFileUpload from "../../components/components-overview/CustomFileUpload"
// ./../..components/components-overview/CustomFileUpload


export default props => {
    const { handleChange, handleBlur, values, errors, touched } = props
    const[ loading, setLoading ] = useState( false )

    const [ document, setDocument ] = useState()


    useEffect( () => {
    },[])

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

    if( loading ) {
        return <div>Loading Locations...</div>
    }
    return (
        <>
            <Row form>
            <table id="files">
                <thead>
                    <th>Document to be Added</th>
                    <th>Attach File</th>
                </thead>
                <tbody>
                    {[
                        { 
                            id: 1,
                            name: "Passport data page and or National ID of the Applicant for Transfer",
                            tag: "passport"

                        },
                        { 
                            id: 2,
                            name: "Photocopy of USF identity card (if issued)",
                            tag: "usf_identity"
                        },
                        { 
                            id: 3,
                            name: "Contract/Agreement with Current USF Member",
                            tag: "contract"
                        },
                        { 
                            id: 4,
                            name: "Proposed Contract Agreement With USF Member for ProposedTransfer",
                            tag: "proposed_contract"
                        },
                        { 
                            id: 5,
                            name: "Any Other Relevant Information",
                            tag: "any_relevant_information"
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
                                            // name={document[value.tag]?.title}
                                        />
                                    </Col>
                                </Row>
                            </td>
                        </tr>
                    ) )}
                    
                </tbody>
            </table>
            </Row>
        </>

    )
}
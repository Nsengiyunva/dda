import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Row, Col, FormInput, Button,FormSelect, FormTextarea } from 'shards-react'
// import { ErrorMessage } from 'formik'
import InputField from './InputField'
import { useDispatch } from 'react-redux'
import { saveActivity } from '../../_actions'


export default props => {
    const dispatch = useDispatch()

    const { handleChange, handleBlur, values, errors, touched } = props
    const[ loading, setLoading ] = useState( false )

    const [ fields, setFields ] = useState( [
        { 
            description: "", 
            activity_date: "",
            objectives: "",
            tasks: "",
            internal_participants: 0,
            external_participants: 0,
            remarks: ""
        }
    ] )
    const [ formValues, setFormValues ] = useState([])

   
    useEffect( () => {
        dispatch( saveActivity( formValues ) )
    },[formValues])

    const handleAddRow = () => {
        setFields( previous => {
            return [ ...previous,  { 
                description: "", 
                activity_date: "",
                objectives: "",
                tasks: "",
                internal_participants: 0,
                external_participants: 0,
                remarks: ""
            } ]
        })
    }

    const handleFieldChange = index => evt => {
        const _tempValues = [ ...formValues ]
        _tempValues[ index ] = {
            [ evt.target.name ]: evt.target.value
        }
        setFormValues( _tempValues )
        // dispatch( saveActivity( formValues ) )
    }

    const removeFields = () => {
       if( fields.length > 1 ) {
        const _tempFields =  fields.slice( 0, -1 )
        setFields( _tempFields ) 
       }
    }

    if( loading ) {
        return <div>Loading Locations...</div>
    }
    return (
        <>
            <Row form>
                <Col md="6" className="form-group">
                    <label htmlFor="date">Date:</label>
                    <FormInput
                        id="date"
                        type="text"
                        name="date"
                        placeholder="Date"
                        value={values.date}
                        autoComplete="off"
                        required
                        disabled
                    />
                </Col>
                <Col md="6" className="form-group">
                    <label htmlFor="date">Name:</label>
                    <FormInput
                        id="name"
                        type="name"
                        name="name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Name of USF Member"
                        value={values.name}
                        autoComplete="off"
                        required
                    />
                </Col>
            </Row>

            <Row form className="mt-3">
                <>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <h5>Activities Report</h5>
                    <Button theme="primary" className="ml-3" onClick={() =>handleAddRow()}>+</Button>
                    <Button theme="danger" className="ml-3" onClick={() => removeFields()}>-</Button>
                </div>
                <table className="table mb-0">
                    <thead className="bg-light">
                      <tr>
                        <th scope="col" className="border-0">
                          Description
                        </th>
                        <th scope="col" className="border-0">
                          Date of Activity
                        </th>
                        <th scope="col" className="border-0">
                          Objectives
                        </th>
                        <th scope="col" className="border-0">
                         Tasks Carried out
                        </th>
                        <th scope="col" className="border-0">
                          Internal Participants
                        </th>
                        <th scope="col" className="border-0">
                          External Participants
                        </th>
                        <th scope="col" className="border-0">
                         Remarks
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                        {fields.map( ( field, index ) => {
                            return (
                                <tr key={`field_${index}`}>
                                    <td>
                                        <InputField 
                                            name="description" 
                                            id="description"
                                            customAttr={`field_${index}`}
                                            value={formValues[index]?.description}
                                            handleChange={handleFieldChange(index)}
                                        />
                                    </td>
                                    <td>
                                        <InputField
                                            type="date" 
                                            name="activity_date" 
                                            id="activity_date"
                                            value={formValues[index]?.activity_date}
                                            handleChange={handleFieldChange(index)}
                                        />
                                    </td>
                                    <td>
                                        <InputField
                                            name="objectives" 
                                            id="objectives"
                                            value={formValues[index]?.objectives}
                                            handleChange={handleFieldChange(index)}
                                        />
                                    </td>
                                    <td>
                                        <InputField
                                            name="tasks" 
                                            id="tasks"
                                            value={formValues[index]?.tasks}
                                            handleChange={handleFieldChange(index)}
                                        />
                                    </td>
                                    <td>
                                        <InputField
                                            type="number"
                                            name="internal_participants" 
                                            id="internal_participants"
                                            value={formValues[index]?.internal_participants}
                                            handleChange={handleFieldChange(index)}
                                        />
                                    </td>
                                    <td>
                                        <InputField
                                            type="number"
                                            name="external_participants" 
                                            id="external_participants"
                                            value={formValues[index]?.external_participants}
                                            handleChange={handleFieldChange(index)}
                                        />
                                    </td>
                                    <td>
                                        <InputField
                                            name="remarks" 
                                            id="remarks"
                                            value={formValues[index]?.remarks}
                                            handleChange={handleFieldChange(index)}
                                        />
                                    </td>
                                </tr>
                            )
                        } )}
                    </tbody>
                </table> 
                </>
            </Row>
        </>
    )
}
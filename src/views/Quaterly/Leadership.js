import React, { useEffect, useState } from 'react'
import { Row, Col, FormInput, FormSelect, FormTextarea } from 'shards-react'
// import { ErrorMessage } from 'formik'
import InputField from './InputField'
import { useDispatch } from 'react-redux'
import { saveLeadership } from '../../_actions'


export default props => {
    const dispatch = useDispatch()

    const { handleChange, handleBlur, values, errors, touched } = props
    const[ loading, setLoading ] = useState( false )

    const [ fields, setFields ] = useState( [
        { 
            item: "Names of Executive Members ",
            females: 0,
            males: 0,
            position: ""
        },
        { 
            item: "Names of Administrative/Support Staff",
            females: 0,
            males: 0,
            position: ""
        },
    ] )

    const [ formValues, setFormValues ]= useState([])

   
    useEffect( () => {
        // dispatch( saveLeadership( formValues ) )
    },[formValues])

    const handleFieldChange = index => evt => {
        const _tempValues = [ ...formValues ]
        _tempValues[ index ] = {
            [ evt.target.name ]: evt.target.value
        }
        setFormValues( _tempValues )
        dispatch( saveLeadership( formValues ) )
    }
    

    if( loading ) {
        return <div>Loading Locations...</div>
    }
    return (
        <>
            {/* {<h5>{values.name}</h5>} */}
            <Row form>
            <table className="table mb-0">
                    <thead className="bg-light">
                      <tr>
                        <th scope="col" className="border-0">
                          #
                        </th>
                        <th scope="col" className="border-0">
                         Females
                        </th>
                        <th scope="col" className="border-0">
                          Males
                        </th>
                        <th scope="col" className="border-0">
                         Position
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                        {fields.map( ( field, index ) => {
                            return (
                                <tr key={`field_${index}`}>
                                    <td>
                                        <InputField 
                                            name="item" 
                                            id="item"
                                            customAttr={`field_${index}`}
                                            value={field.item}
                                            disabled
                                        />
                                    </td>
                                    <td>
                                        <InputField
                                            type="number" 
                                            name="females" 
                                            id="females"
                                            value={formValues[index]?.females}
                                            handleChange={handleFieldChange(index)}
                                        />
                                    </td>
                                    <td>
                                        <InputField
                                            type="number"
                                            name="males" 
                                            id="males"
                                            value={formValues[index]?.males}
                                            handleChange={handleFieldChange(index)}
                                        />
                                    </td>
                                    <td>
                                        <InputField
                                            type="text"
                                            name="position" 
                                            id="position"
                                            value={formValues[index]?.position}
                                            handleChange={handleFieldChange(index)}
                                        />
                                    </td>
                                </tr>
                            )
                        } )}
                    </tbody>
                </table> 
            </Row>
                
        </>
    )
}
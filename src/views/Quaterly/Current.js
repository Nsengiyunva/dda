import React, { useEffect, useState } from 'react'
import { Row, Col, FormInput, FormSelect, FormTextarea } from 'shards-react'
// import { ErrorMessage } from 'formik'
import InputField from './InputField'
import { useDispatch } from 'react-redux'
import { saveCurrent } from '../../_actions'


export default props => {
    const dispatch = useDispatch()

    const { handleChange, handleBlur, values, errors, touched } = props
    const[ loading, setLoading ] = useState( false )

    const [ fields, setFields ] = useState( [
        { 
            item: "# Swimmers",
            junior_females: 0,
            junior_males: 0,
            senior_females: 0,
            senior_males: 0,
            comments: ""
        },
        { 
            item: "# Water Polo Players",
            junior_females: 0,
            junior_males: 0,
            senior_females: 0,
            senior_males: 0,
            comments: ""
        },
        { 
            item: "# Masters Swimmers",
            junior_females: 0,
            junior_males: 0,
            senior_females: 0,
            senior_males: 0,
            comments: ""
        },
        { 
            item: "# Coaches",
            junior_females: 0,
            junior_males: 0,
            senior_females: 0,
            senior_males: 0,
            comments: ""
        }
    ] )

    const [ formValues, setFormValues ]= useState([])

   
    useEffect( () => {
        dispatch( saveCurrent( [ ...formValues ] ) )
    },[formValues])

    const handleFieldChange = index => evt => {
        const _tempValues = [ ...formValues ]
        _tempValues[ index ] = {
            [ evt.target.name ]: evt.target.value
        }
        setFormValues( _tempValues )
        dispatch( saveCurrent( formValues ) )
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
                         Junior Females
                        </th>
                        <th scope="col" className="border-0">
                          Junior Males
                        </th>
                        <th scope="col" className="border-0">
                         Senior Females
                        </th>
                        <th scope="col" className="border-0">
                          Senior Males
                        </th>
                        <th scope="col" className="border-0">
                          Comments
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
                                            name="junior_females" 
                                            id="junior_females"
                                            value={formValues[index]?.junior_females}
                                            handleChange={handleFieldChange(index)}
                                        />
                                    </td>
                                    <td>
                                        <InputField
                                            type="number"
                                            name="junior_males" 
                                            id="junior_males"
                                            value={formValues[index]?.junior_males}
                                            handleChange={handleFieldChange(index)}
                                        />
                                    </td>
                                    <td>
                                        <InputField
                                            type="number"
                                            name="senior_females" 
                                            id="senior_females"
                                            value={formValues[index]?.senior_females}
                                            handleChange={handleFieldChange(index)}
                                        />
                                    </td>
                                    <td>
                                        <InputField
                                            type="number"
                                            name="senior_males" 
                                            id="senior_males"
                                            value={formValues[index]?.senior_males}
                                            handleChange={handleFieldChange(index)}
                                        />
                                    </td>
                                    <td>
                                        <InputField
                                            name="comments" 
                                            id="comments"
                                            value={formValues[index]?.comments}
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
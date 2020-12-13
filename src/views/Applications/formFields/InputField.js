import React from 'react'
import { at } from 'lodash'
import { Col, FormInput } from 'shards-react'
// import { useField, Field, ErrorMessage } from 'formik'

const InputField = ( props ) => {
    const { errorText, ...rest } = props 
    // const[ field, meta ] = useField( props )

    const _renderHelperText = () => {
        // const[ touched, error ] = at( meta, 'touched', '.error' )
        // if( touched && error ){
        //     return error
        // }
    }

    return (
    <Col md={props.md || '6'} className="form-group">
        <label htmlFor={props.name}>{props.label}:</label>
        <FormInput
            id={props.name}
            type={props.type || 'text'}
            name={props.name}
            className={'form-control'}
            value={props.value}
            autoComplete="off"
            disabled={true}
        />
    </Col>
    )
}
export default InputField




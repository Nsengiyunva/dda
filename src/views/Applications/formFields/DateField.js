import React from 'react'
import { at } from 'lodash'
import { Col } from 'shards-react'
import { useField, Field, ErrorMessage } from 'formik'

const DateField = ( props ) => {
    const { errorText, ...rest } = props 
    const[ field, meta ] = useField( props )

    const _renderHelperText = () => {
        const[ touched, error ] = at( meta, 'touched', '.error' )
        if( touched && error ){
            return error
        }
    }


    return (
    <Col md={props.md} className="form-group">
        <label htmlFor={props.name}>{props.label}:<span style={{ color: 'red'}}>*</span></label>
        <Field 
            type="date"
            className={'form-control' + (meta.touched && meta.error && true ? ' is-invalid' : '')}
            // error={meta.touched && meta.error && true }
            helperText={_renderHelperText()}
            value={meta.value}
            disabled={props.disabled}
            placeholder={props.label}
            {...field}
            {...rest}
        />
        <ErrorMessage name={props.name} component="div" className="invalid-feedback" />
    </Col>
    )
}
export default DateField

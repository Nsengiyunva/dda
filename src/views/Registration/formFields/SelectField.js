import React from 'react'
import { at } from 'lodash'
import { Col, FormSelect } from 'shards-react'
import { useField, ErrorMessage } from 'formik'
import { IoIosAddCircleOutline } from 'react-icons/io'

const SelectField = ( props ) => {
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
        <label htmlFor={props.name}>{props.label}:
            <span style={{ color: 'red'}}>*</span>
            { props.addModal && ( <span style={{ fontSize: '1.5rem', color: 'red'}}>
                <IoIosAddCircleOutline onClick={() => props.handleDisplayModal({ key: props.modal_key, label: props.modal_label })}/>
            </span> )}        
        </label>
        <FormSelect
            id={props.name}
            name={props.name}
            placeholder={props.label}
            helperText={_renderHelperText()}
            value={meta.value} 
            onChange={props.handleChange}
            onBlur={props.onBlur}
            className={props.className}
            disabled={props.disabled}>
            <option value="">Choose...</option>
            {props.options?.map( option => {
                return (<option key={option.key} value={option.value}>{option.name}</option>)
            })}
        </FormSelect>
        <ErrorMessage name={props.name} component="div" className="invalid-feedback" />
    </Col>
    )
}
export default SelectField

import React from 'react'
import { FormGroup, FormInput, Row, Col } from 'shards-react'

export default ({ label, value, name, md }) => {
    return (
        // <FormGroup>
            <Col md={ md || `6` } className="form-group my-3">
                <label htmlFor={name}>{label}</label>
                <FormInput
                    type="text"
                    name={name}
                    id={name}
                    value={value}
                    disabled
                />
            </Col>
        // </FormGroup>
    )
}
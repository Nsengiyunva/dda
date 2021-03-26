import React from 'react'
import { Row, Col } from 'shards-react'
import { Field, ErrorMessage } from 'formik'

export default props => {
    return (
        <Row form>
            <Col md={12} sm={12}>
                <Field 
                    type={props.type || `text`}
                    name={props.name}
                    id={props.name}
                    placeholder={props.label}
                    value={props.value}
                    className="form-control"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    autoComplete="off"
                    data-id={props.customAttr}
                />
            </Col>
        </Row>
    )
}
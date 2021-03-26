import React, { useEffect, useState } from 'react'
import { Row, Col, FormInput, FormSelect, FormTextarea,
Card, CardHeader, CardBody } from 'shards-react'
// import { ErrorMessage } from 'formik'
import moment from 'moment'


export default props => {
    const { handleChange, handleBlur, values, errors, touched } = props
    const[ loading, setLoading ] = useState( false )


    useEffect( () => {
    },[])

    if( loading ) {
        return <div>Loading Locations...</div>
    }
    return (
        <Card>
            <CardHeader>Medals</CardHeader>
            <CardBody>
            <Row form>
                <Col md="6" className="form-group my-2">
                    <label>Event:</label>
                    <FormSelect name="event_medal" id="event_medal">
                        <option>National Olympics</option>
                        <option>World Championships</option>
                        <option>Domestic Championships</option>
                    </FormSelect>
                </Col>
                <Col md="4" className="form-group my-2">
                    <label>Award:</label>
                    <FormSelect name="event_medal" id="event_medal">
                        <option>Gold</option>
                        <option>Silver</option>
                        <option>Bronze</option>
                    </FormSelect>
                </Col>
                <Col md="4" className="form-group my-2">
                    <label>Position[Award]:</label>
                    <FormInput
                        type="number"
                        id="position"
                        name="position"
                        placeholder="Position"
                        autoComplete="off"
                    />
                </Col>
            </Row>
            </CardBody>
        </Card>
    )
}
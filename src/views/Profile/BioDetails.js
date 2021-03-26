import React, { useEffect, useState } from 'react'
import { Row, Col, FormInput, FormSelect, FormTextarea, CardImg } from 'shards-react'
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
        <>
            <Row form>
                <Col md="4" className="form-group my-2">
                    <label>First Name:</label>
                    <FormInput
                        id="firstname"
                        name="firstname"
                        placeholder="FirstName"
                        autoComplete="off"
                        value={values.firstname}
                    />
                </Col>
                <Col md="4" className="form-group my-2">
                    <label>Last Name:</label>
                    <FormInput
                        id="lastname"
                        name="lastname"
                        placeholder="Last Name"
                        autoComplete="off"
                    />
                </Col>
                <Col md="4" className="form-group my-2">
                    <label>Other Name:</label>
                    <FormInput
                        id="middlename"
                        name="middlename"
                        placeholder="Middle Name"
                        autoComplete="off"
                    />
                </Col>
            </Row>

            <Row form>
                <Col md="4" className="form-group my-2">
                    <label>Category:</label>
                    <FormSelect
                        id="category"
                        name="category"
                    >
                        <option>Coach</option>
                        <option>Athlete</option>
                    </FormSelect>
                </Col>
                <Col md="4" className="form-group my-2">
                    <label>Gender:</label>
                    <FormSelect
                        id="gender"
                        name="gender"
                    >
                        <option>Male</option>
                        <option>Female</option>
                    </FormSelect>
                </Col>
                <Col md="4" className="form-group my-2">
                    <label>Date of Birth:</label>
                    <FormInput
                        id="dob"
                        type="date"
                        name="dob"
                        placeholder="Date of Birth"
                        autoComplete="off"
                    />
                </Col>
            </Row>

            <Row form>
                <Col md="6" className="form-group my-2">
                    <label>Coach:</label>
                    <FormSelect
                        id="coach"
                        name="coach"
                    >
                        <option>Coach A</option>
                        <option>Coach B</option>
                    </FormSelect>
                </Col>
                <Col md="6" className="form-group my-2">
                    <label>Club /Institution:</label>
                    <FormSelect
                        id="club"
                        name="club"
                    >
                        <option>Club A</option>
                        <option>Club B</option>
                    </FormSelect>
                </Col>
            </Row>
            <Row form>
                <Col md="6" className="form-group my-2">
                    <label>Main Event:</label>
                    <FormSelect
                        id="mainevent"
                        name="mainevent"
                    >
                        <option>Marathon</option>
                        <option>High Jump</option>
                    </FormSelect>
                </Col>
                <Col md="6" className="form-group my-2">
                    <label>Best Result:</label>
                    <FormSelect
                        id="bestresult"
                        name="bestresult"
                    >
                        <option>World Junior Champion</option>
                        <option>Senior Champion</option>
                    </FormSelect>
                </Col>
            </Row>
        </>

    )
}
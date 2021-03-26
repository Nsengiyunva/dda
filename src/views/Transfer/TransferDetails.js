import React, { useEffect, useState } from 'react'
import { Row, Col, FormInput, FormSelect, FormTextarea } from 'shards-react'
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
                <Col md="6" className="form-group my-2">
                    <label>Date:</label>
                    <FormInput
                        id="date"
                        name="date"
                        placeholder="Date"
                        autoComplete="off"
                        value={moment( new Date() ).format('DD-MM-YYYY')}
                        disabled={true}
                    />
                </Col>
                <Col md="6" className="form-group my-2">
                    <label>Name of Transferee:</label>
                    <FormInput
                        id="name"
                        name="transferee_name"
                        placeholder="Name of Transferee( First/Family Name)"
                        autoComplete="off"
                    />
                </Col>
            </Row>

            <Row form>
                <Col md="6" className="form-group my-2">
                    <label>Current Role or Position of Applicant for Transfer:</label>
                    <FormInput
                        id="date"
                        name="current_role"
                        placeholder="Current Role or Position of Applicant for Transfer"
                        autoComplete="off"
                    />
                </Col>
                <Col md="6" className="form-group my-2">
                    <label>Current Membership of Applicant for Transfer:</label>
                    <FormInput
                        id="date"
                        name="current_membership"
                        placeholder="Current Membership of Applicant for Transfer"
                        autoComplete="off"
                    />
                </Col>
            </Row>

            <Row form>
                <Col md="6" className="form-group my-2">
                    <label>Duration of Current Membership of Applicant for Transfer:</label>
                    <FormInput
                        id="date"
                        name="duration_current"
                        placeholder="Duration of Current Membership of Applicant for Transfer"
                        autoComplete="off"
                    />
                </Col>
                <Col md="6" className="form-group my-2">
                    <label>Name of USF Member Where Applicant is Transferring:</label>
                    <FormInput
                        id="date"
                        name="name_of_usf"
                        placeholder="Name of USF Member Where Applicant is Transferring"
                        autoComplete="off"
                    />
                </Col>
            </Row>

            <Row form>
                <Col md="6" className="form-group my-2">
                    <label>Effective Date of Transfer:</label>
                    <FormInput
                        id="date"
                        type="date"
                        name="effective_date"
                        placeholder="Effective Date of Transfer"
                        autoComplete="off"
                    />
                </Col>
                <Col md="6" className="form-group my-2">
                    <label>Role of Position at Proposed Membership:</label>
                    <FormInput
                        id="date"
                        name="role_of_position"
                        placeholder="Role of Position at Proposed Membership"
                        autoComplete="off"
                    />
                </Col>
            </Row>
        </>

    )
}
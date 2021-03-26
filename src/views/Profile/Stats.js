import React, { useEffect, useState } from 'react'
import { Row, Col, FormInput, FormSelect, FormTextarea, 
    Card, CardHeader, CardBody } from 'shards-react'
// import { ErrorMessage } from 'formik'
// import moment from 'moment'

const TableInput = props => {
    return (
        <Row form>
            <Col md="12" className="form-group my-2">
                <FormInput
                    id={props.name}
                    name={props.name}
                    placeholder={props.label}
                    autoComplete="off"
                    onChange={props.handleChange}
                    value={props.value}
                />
            </Col>
        </Row>
    )
}

export default props => {
    const { handleChange, handleBlur, values, errors, touched } = props
    const[ loading, setLoading ] = useState( false )

    const [ shortCourses, setShortCourse ] = useState([
        { event: "", year: "", time: "", record: "" }
    ])
    const [ longCourses, setLongCourses ] = useState([
        { event: "", year: "", time: "", record: "" }
    ])
    const [ world, setWorld ] = useState([
        { event: "", year: "", time: "", record: "" }
    ])
    const [ european, setEuropean ] = useState([
        { event: "", year: "", time: "", record: "" }
    ])


    useEffect( () => {
    },[])

    const handleChangeField = evt => {
        console.log( evt.target.value )
    }

    if( loading ) {
        return <div>Loading Locations...</div>
    }
    return (
        <>
        <Card>
            <CardHeader>Personal Best</CardHeader>
                <CardBody>
                    <Row form>
                        {/* <Col md="6" className="form-group my-2">
                            <label>Event:</label>
                            <FormSelect name="event_medal" id="event_medal">
                                <option>National Olympics</option>
                                <option>National Olympics</option>
                                <option>National Olympics</option>
                            </FormSelect>
                        </Col> */}
                        <label name="short_course">SHORT COURSE:</label>
                        <Col md="12" className="form-group my-2">
                        <table className="table mb-0">
                            <thead className="bg-light">
                            <tr>
                                <th scope="col" className="border-0">
                                Event
                                </th>
                                <th scope="col" className="border-0">
                                Year
                                </th>
                                <th scope="col" className="border-0">
                                Time Score
                                </th>
                                <th scope="col" className="border-0">
                                Record
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                                {shortCourses.map( ( course, index ) => {
                                    return (
                                        <tr key={`${course.event}_${index}`}>
                                            <td><TableInput name={`event_${index}`} label="Event" value={course.event} handleChange={handleChangeField}/></td>
                                            <td><TableInput name={`year_${index}`} label="Year" value={course.year} handleChange={handleChangeField}/></td>
                                            <td><TableInput name={`score_${index}`} label="Time /Score" value={course.time} handleChange={handleChangeField}/></td>
                                            <td><TableInput name={`record_${index}`} label="Record" value={course.record} handleChange={handleChangeField}/></td>
                                        </tr>
                                    )
                                } )}
                            </tbody>
                            </table>
                        </Col>
                    </Row>

                    <Row form>
                        {/* <Col md="6" className="form-group my-2">
                            <label>Event:</label>
                            <FormSelect name="event_medal" id="event_medal">
                                <option>National Olympics</option>
                                <option>National Olympics</option>
                                <option>National Olympics</option>
                            </FormSelect>
                        </Col> */}
                        <label name="short_course">LONG COURSE:</label>
                        <Col md="12" className="form-group my-2">
                        <table className="table mb-0">
                            <thead className="bg-light">
                            <tr>
                                <th scope="col" className="border-0">
                                Event
                                </th>
                                <th scope="col" className="border-0">
                                Year
                                </th>
                                <th scope="col" className="border-0">
                                Time Score
                                </th>
                                <th scope="col" className="border-0">
                                Record
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                                {longCourses.map( ( course, index ) => {
                                    return (
                                        <tr key={`${course.event}_${index}`}>
                                            <td><TableInput name={`event_${index}`} label="Event" value={course.event} handleChange={handleChangeField}/></td>
                                            <td><TableInput name={`year_${index}`} label="Year" value={course.year} handleChange={handleChangeField}/></td>
                                            <td><TableInput name={`score_${index}`} label="Time /Score" value={course.time} handleChange={handleChangeField}/></td>
                                            <td><TableInput name={`record_${index}`} label="Record" value={course.record} handleChange={handleChangeField}/></td>
                                        </tr>
                                    )
                                } )}
                            </tbody>
                            </table>
                        </Col>
                    </Row>
                </CardBody>
        </Card>

        <Card>
            <CardHeader>International Records</CardHeader>
                <CardBody>
                    <Row form>
                        <label name="short_course">WORLD CHAMPIONSHIPS:</label>
                        <Col md="12" className="form-group my-2">
                        <table className="table mb-0">
                            <thead className="bg-light">
                            <tr>
                                <th scope="col" className="border-0">
                                Event
                                </th>
                                <th scope="col" className="border-0">
                                Year
                                </th>
                                <th scope="col" className="border-0">
                                Time Score
                                </th>
                                <th scope="col" className="border-0">
                                Record
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                                {world.map( ( course, index ) => {
                                    return (
                                        <tr key={`${course.event}_${index}`}>
                                            <td><TableInput name={`event_${index}`} label="Event" value={course.event} handleChange={handleChangeField}/></td>
                                            <td><TableInput name={`year_${index}`} label="Year" value={course.year} handleChange={handleChangeField}/></td>
                                            <td><TableInput name={`score_${index}`} label="Time /Score" value={course.time} handleChange={handleChangeField}/></td>
                                            <td><TableInput name={`record_${index}`} label="Record" value={course.record} handleChange={handleChangeField}/></td>
                                        </tr>
                                    )
                                } )}
                            </tbody>
                            </table>
                        </Col>
                    </Row>

                    <Row form>
                        {/* <Col md="6" className="form-group my-2">
                            <label>Event:</label>
                            <FormSelect name="event_medal" id="event_medal">
                                <option>National Olympics</option>
                                <option>National Olympics</option>
                                <option>National Olympics</option>
                            </FormSelect>
                        </Col> */}
                        <label name="short_course">LONG COURSE:</label>
                        <Col md="12" className="form-group my-2">
                        <table className="table mb-0">
                            <thead className="bg-light">
                            <tr>
                                <th scope="col" className="border-0">
                                Event
                                </th>
                                <th scope="col" className="border-0">
                                Year
                                </th>
                                <th scope="col" className="border-0">
                                Time Score
                                </th>
                                <th scope="col" className="border-0">
                                Record
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                                {longCourses.map( ( course, index ) => {
                                    return (
                                        <tr key={`${course.event}_${index}`}>
                                            <td><TableInput name={`event_${index}`} label="Event" value={course.event} handleChange={handleChangeField}/></td>
                                            <td><TableInput name={`year_${index}`} label="Year" value={course.year} handleChange={handleChangeField}/></td>
                                            <td><TableInput name={`score_${index}`} label="Time /Score" value={course.time} handleChange={handleChangeField}/></td>
                                            <td><TableInput name={`record_${index}`} label="Record" value={course.record} handleChange={handleChangeField}/></td>
                                        </tr>
                                    )
                                } )}
                            </tbody>
                            </table>
                        </Col>
                    </Row>
                </CardBody>
        </Card>
        </>

    )
}
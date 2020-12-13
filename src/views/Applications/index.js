import React, { useEffect, useState } from "react"
import {
  Container,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  // Form,
  FormInput,
  FormSelect,
  Button
} from "shards-react"
import Axios from "axios"
import PageTitle from "../../components/common/PageTitle" 
import moment from "moment"
import { Formik, Form,ErrorMessage, Field } from 'formik'
import * as Yup from 'yup'

import StaffNameField  from "./ComputedFields/StaffNameField"
import TitleField  from "./ComputedFields/TitleField"
import  SalaryScaleField  from "./ComputedFields/SalaryScaleField"
import EndDateField from "./ComputedFields/EndDateField"

const LeaveForm = props => {
    let leaveTypes = [ "Annual" , "Maternity", "Sick", "Study" ]
    const [ staff, setStaffNames] = useState([])
    // const[ person, setPerson ] = useState({ 
    //   name: '', 
    //   id: null, 
    //   staff_id: '', 
    //   designation: '',
    //   scale: '' })
    const[ endDate, setEndDate ]= useState({ noDays: 0, end_date: null })

      const [ formInputs, setFormInput ] = useState({
        isValid: false,
        values: {},
        errors: {},
        touched: {}
      })
      useEffect( () => {
        Axios.get("http://154.72.194.247/mis/api/employee/").then( response => {
        if( response.data ){
            setStaffNames( response.data.employees )
        }
        else {
            alert('No records with employees was obtained from the server')
        }
        }).catch( error => {})
      },[])
      const handleChangeFields = event => {
            event.persist()
            setFormInput( state => ({
                ...state,
                values: {
                    ...state.values,
                    [ event.target.name ] : [ event.target.value ]
                },
                touched: {
                    ...state.touched,
                    [ event.target.name ]: true
                }
            }))

            // if( event.target.name === 'staff_id' ){
            //     let employee = staff.filter( value => value.staff_id === event.target.value )
        
            //     if( employee ){
            //       setPerson( { 
            //         name: employee[0].first_name + ' '  + employee[0].last_name + ' ' + employee[0].others,
            //         id: employee[0].id,
            //         staff_id: employee[0].staff_id,
            //         designation: employee[0].designation,
            //         scale: employee[0].salary_scale
            //        } )
            //     } 
            //   }
              // if( event.target.name === 'number_of_days'){
              //   setEndDate( { noDays: event.target.value }  )
              // }
              // if( event.target.name === 'fromdate'){
              //   let calc_date = moment( event.target.value ).add( endDate.noDays, 'd')
              //   let end = moment( calc_date ).format('YYYY-MM-DD')
              //   setEndDate({ end_date: end })
              // }
      }
      const onSubmitHandler = event => {
        // event.preventDefault()
        // const payload = {
        //     date: moment( new Date() ).format('YYYY-MM-DD'),
        //     staff_id: formInputs.values.staff_id ? formInputs.values.staff_id[0]: null,
        //     staff_name: person.name,
        //     designation: person.designation,
        //     salary_grade: person.sclae,
        //     leave_type: formInputs.values.leave_type ? formInputs.values.leave_type[0]: null,
        //     leave_rate: formInputs.values.leave_rate ? formInputs.values.leave_rate[0]: null,
        //     number_of_days: formInputs.values.number_of_days ? formInputs.values.number_of_days[0]: null,
        //     fromdate: formInputs.values.fromdate ? formInputs.values.fromdate[0]: null,
        //     todate: formInputs.values.todate ? formInputs.values.todate[0]: endDate.end_date,
        //     address_leave: formInputs.values.address_leave ? formInputs.values.address_leave[0]: null,
        //     status: "PENDING_HOD"
        // }

          // Axios.post("http://154.72.194.247/api/auth/submitLeaveApplication", payload ).then( response => {
          //   if( response ){
          //       alert('Application was submitted successfully')
          //       props.history.push('/all-leave-applications')
          //   }
          //   else {
          //     alert("Leave Application could not be added")
          //   }
          // }).catch( err => {
          //   // console.log( err )
          //   alert('Something went wrong on the server. Leave Application could not be added')
          // })
      }
      const handleSubmitRequest = fields => {
        const payload = {
            date: moment( new Date() ).format('YYYY-MM-DD'),
            staff_id: fields.staff_id,
            staff_name: fields.name,
            designation: fields.title,
            salary_grade: fields.salary_scale,
            leave_type: fields.leave_type,
            leave_rate: "",
            number_of_days: fields.number_of_days,
            fromdate: fields.fromdate,
            todate: fields.end_date,
            address_leave: fields.address_leave,
            status: "PENDING_HOD",
            email_address: localStorage.getItem('username'),
            organisation: localStorage.getItem('organisation')
        }
         Axios.post("http://154.72.194.247/api/auth/submitLeaveApplication", 
            payload ).then( response => {
            if( response ){
                alert('Leave Application was submitted successfully')
                props.history.push('/all-leave-applications')
            }
            else {
              alert("Leave Application could not be added")
            }
          }).catch( err => {
            alert('Something went wrong on the server. Leave Application could not be added')
          })
      }

      return (
        <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="8"
            title={"Fill in the Staff Leave Application Form"}
            subtitle="Staff"
            className="text-sm-left"
          />
        </Row>
        <ListGroup flush>
        <ListGroupItem className="p-3">
          <Row>
            <Col>
            <Formik
              initialValues={{
                  staff_id: "",
                  name: "",
                  salary_scale: "",
                  leave_type: "",
                  number_of_days: "",
                  fromdate: "",
                  address_leave: ""
              }}
              validationSchema={Yup.object().shape({
                  staff_id: Yup.string()
                      .required('Staff ID is required'),
                  name: Yup.string()
                      .min(4, 'Staff Name should be at least 4 characters')
                      .required('Staff Name is required'),
                  salary_scale: Yup.string()
                      .required('Salary Scale is required'),
                  leave_type: Yup.string()
                      .required('Leave Type is required'),
                  number_of_days: Yup.string().min(1, "Number of Days cannot be 0 or less").required('Number of Days Required'),
                  fromdate: Yup.date().required('From Date Is Required'),
                  // end_date: Yup.date().required('End Date Is Required'),
                  address_leave: Yup.string().required('Phone Contact is Required')
              })}
              onSubmit={fields => {
                handleSubmitRequest( fields )
              }}
              render={({ errors, status, touched, handleBlur, handleChange, 
                         setFieldValue, values }) => 
              {
                // console.log('e', errors )
                return (
              <Form>
                <Row form>
                    <Col md="4" sm="12" className="form-group">
                    <label htmlFor="date">Date: <span style={{ color: 'red'}}>*</span></label>
                        <FormInput
                          id="Date"
                          placeholder="Date"
                          type="date"
                          name="date"
                          onChange={handleChange}
                          value={moment( new Date() ).format('YYYY-MM-DD')}
                          disabled
                        />
                    </Col>
                    <Col md="4" className="form-group">
                      <label htmlFor="name">Organisation <span style={{ color: 'red'}}>*</span></label>
                      <FormInput
                        id="organisation"
                        name="organisation"
                        placeholder="Organisation"
                        value={localStorage.getItem('organisation')}
                        onChange={handleChange}
                        disabled
                        />
                    </Col>
                    <Col md="4" sm="12" className="form-group">
                        <label htmlFor="staff_id">Staff ID: <span style={{ color: 'red'}}>*</span></label>
                            <FormSelect id="staff_id" name="staff_id" 
                              onChange={handleChange} 
                              onBlur={handleBlur}
                              value={values.staff_id}
                              className={'form-control' + (errors.staff_id && touched.staff_id ? ' is-invalid' : '')}>
                              <option selected>Choose...</option>
                              {staff.map( value => {
                                  return <option>{`${value.staff_id}`}</option>
                              })}
                            </FormSelect>
                            <ErrorMessage name="staff_id" component="div" className="invalid-feedback" />
                    </Col> 

                    <Col md="4" className="form-group">
                      <label htmlFor="name">Staff Name: <span style={{ color: 'red'}}>*</span></label>
                      <StaffNameField
                        id="name"
                        data={staff}
                        type="text"
                        name="name"
                        value={values.name}
                        values={values}
                        setFieldValue={setFieldValue}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')}
                      />
                      <ErrorMessage name="name" component="div" className="invalid-feedback" />
                    </Col> 
                  </Row>

                  <Row form>
                    <Col md="4" className="form-group">
                      <label htmlFor="name">Designation: <span style={{ color: 'red'}}>*</span></label>
                      <TitleField
                        id="title"
                        data={staff}
                        type="text"
                        name="title"
                        value={values.title}
                        values={values}
                        setFieldValue={setFieldValue}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={'form-control' + (errors.title && touched.title ? ' is-invalid' : '')}
                      />
                      <ErrorMessage name="title" component="div" className="invalid-feedback" />
                    </Col>

                    <Col md="4" className="form-group">
                      <label htmlFor="name">Salary Scale: <span style={{ color: 'red'}}>*</span></label>
                      <SalaryScaleField
                        id="salary_scale"
                        data={staff}
                        type="text"
                        name="salary_scale"
                        value={values.salary_scale}
                        values={values}
                        setFieldValue={setFieldValue}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={'form-control' + (errors.salary_scale && touched.salary_scale ? ' is-invalid' : '')}
                      />
                      <ErrorMessage name="salary_scale" component="div" className="invalid-feedback" />
                    </Col>

                    <Col md="4" sm="12" className="form-group">
                        <label htmlFor="leave_type">Type of Leave Required: <span style={{ color: 'red'}}>*</span></label>
                        <FormSelect id="leave_type" name="leave_type" onChange={handleChange} 
                          onBlur={handleBlur}
                          className={'form-control' + (errors.leave_type && touched.leave_type ? ' is-invalid' : '')}
                          value={values.leave_type}>
                          <option selected>Choose...</option>
                            {leaveTypes.map( value => {
                              return <option>{`${value}`}</option>
                          })}
                        </FormSelect>
                        <ErrorMessage name="leave_type" component="div" className="invalid-feedback" />
                    </Col>
                </Row>
                <Row form>
                    <Col md="4" sm="12" className="form-group">
                        <label htmlFor="leave_rate">Rate of Leave Entitlement:</label>
                        <Field
                            id="leave_rate"
                            name="leave_rate"
                            placeholder="Rate of Leave Entitlement"
                            value={values.leave_rate}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            autoComplete="off"
                            className={'form-control' + (errors.leave_rate && touched.leave_rate ? ' is-invalid' : '')}
                        />
                        <ErrorMessage name="leave_rate" component="div" className="invalid-feedback" />
                    </Col>
                    <Col md="4" sm="12" className="form-group">
                        <label htmlFor="number_of_days">Number of Days Required: <span style={{ color: 'red'}}>*</span></label>
                        <Field
                          id="number_of_days"
                          name="number_of_days"
                          placeholder="Number of Days Required"
                          value={values.number_of_days}
                          onChange={handleChange}
                          value={values.number_of_days}
                          className={'form-control' + (errors.number_of_days && touched.number_of_days ? ' is-invalid' : '')}
                          type="number"
                        />
                        <ErrorMessage name="number_of_days" component="div" className="invalid-feedback" />
                    </Col>
                    
                    </Row>
                    <Row form>
                      <Col md="4" sm="12" className="form-group">
                          <label htmlFor="fromdate">From Date: <span style={{ color: 'red'}}>*</span></label>
                          <Field
                              id="fromdate"
                              placeholder="Date"
                              type="date"
                              name="fromdate"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.fromDate}
                              className={'form-control' + (errors.fromdate && touched.fromdate ? ' is-invalid' : '')}
                          />
                          <ErrorMessage name="fromdate" component="div" className="invalid-feedback" />
                      </Col>
                        <Col md="4" sm="12" className="form-group">
                            <label htmlFor="todate">To Date: <span style={{ color: 'red'}}>*</span> </label>
                            <EndDateField
                              id="end_date"
                              type="text"
                              name="end_date"
                              value={values.end_date}
                              values={values}
                              setFieldValue={setFieldValue}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={'form-control' + (errors.end_date && touched.end_date ? ' is-invalid' : '')}
                            />
                            <ErrorMessage name="end_date" component="div" className="invalid-feedback" />
                        </Col>
                        <Col md="4" sm="12" className="form-group">
                            <label htmlFor="address_leave">Phone Number While On Leave: <span style={{ color: 'red'}}>*</span></label>
                            <Field
                                id="address_leave"
                                name="address_leave"
                                placeholder="Phone Number While On Leave"
                                value={values.address_leave}
                                onChange={handleChange}
                                type="text"
                                autoComplete="off"
                                onBlur={handleBlur}
                                className={'form-control' + (errors.address_leave && touched.address_leave ? ' is-invalid' : '')}
                            />
                            <ErrorMessage name="address_leave" component="div" className="invalid-feedback" />
                        </Col>
                    </Row>
                    <Button type="submit">{`Submit Leave Application`}</Button>
                </Form>
                )
              }
            }
            />
            </Col>
           </Row>
          </ListGroupItem>
        </ListGroup>
      </Container>
    ) 
}

export default LeaveForm;

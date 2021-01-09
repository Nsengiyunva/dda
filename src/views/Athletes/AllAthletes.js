import React from "react";
import { Container, Row, Col, Card, CardHeader, CardBody, Button,
Modal, ModalBody, ModalHeader, 
FormSelect,FormInput } from "shards-react";

import PageTitle from "../../components/common/PageTitle"
import Axios from 'axios'
import moment from 'moment'

import ReactExport from "react-export-excel"

import { connect } from 'react-redux'
import { fetchApplications, prepareFormEdit } from '../../_actions'
import * as Yup from 'yup'
import Pagination from '../../components/pagination'
import Header from '../../components/header'

import { Formik, Form, ErrorMessage , Field } from 'formik'
import '../Table.css'

const ExcelFile = ReactExport.ExcelFile
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn

class AllAthletes extends React.Component {
  state = {
    approved: [],
    openModal: false,
    Id: null,
    tableData: [],
    currentRequistions: [], 
    allRecords: [],
    currentPage: null, 
    totalPages: null,
    loading: true,
    column: "",
    searchterm: "",
    loading: true,
    id: null
  }
    componentDidMount() {
      if( this.state.loading  ){
        Axios.get("http://localhost:4000/athlete/").then( response => {
          if( response.data.status === "success"){
            console.log( response.data.athletes )
            this.setState({ currentRequistions: response.data.athletes })
          }
          else {
            console.log('no data records')
          }
        })
      }  
    }
    onPageChanged = data => {
      const { applications } = this.props
      const { currentPage, totalPages, pageLimit } = data
  
      const offset = (currentPage - 1) * pageLimit
      const currentRecords = applications?.slice(offset, offset + pageLimit)
  
      this.setState({ currentPage, currentRecords, totalPages });
    }

    handleApprove = value => {
      let role = localStorage.getItem('role')

      if( role === 'HOD'){
        this.updateServer( value.id, 'PENDING_HR')
      }
      if( role === 'HR'){
        this.setState({ openModal: true, Id: value.id })
        // setOpenModal( { open: true, id: value.id } )
      }
      if( role === 'DIRECTOR'){
        this.updateServer( value.id, 'APPROVED')
      }
    }
    handleToggle = () => { 
      this.setState({ openModal: this.state.openModal ? false : true  })
      // setOpenModal( openModal ? false : true )
    }
    updateServer = (id, status) => {
      Axios.post("http://154.72.194.247/api/auth/updateLeave", 
        { id, status } )
      .then( response => {
        if( response ){
          this.props.fetchLeaves( { 
              username: localStorage.getItem('username'), 
              role: localStorage.getItem('role') 
          } )
          // this.setState( { approved: [ ...this.state.approved, id ] } )
          // setApproved([ ...approved, id ])
        }
        else {
          alert('The Leave application could not be updated')
        }
        
      }).catch( err => {} )
    }
    valueExists = arg => {
      if( arg && this.state.approved.length > 0 ){
         return this.state.approved.includes( arg )
      }
      return false
    }
    
    display = record => {
      this.props.prepareFormEdit( record )
      this.props.history.push('/', {} )
    }

    handleChange = event => { 
     if( event.target.name === 'column' ){
       this.setState({ column: event.target.value })
     }
     if( event.target.name === 'searchterm' ){
      this.setState({ searchterm: event.target.value })
     }
    }
    
    submitSearch = event => {
      event.preventDefault()
      this.props.fetchLicensees ( { 
        column: this.state.column, 
        searchterm: this.state.searchterm
      } )
    }

    handleReset = () => {
      this.props.fetchLicensees ()
    }
    handleConfirm = () => {
      let action
      switch( localStorage.getItem('role') ){
        case "is_inspector":
          action = "inspect_application"
          break;
        
        case "is_manager":
          action = "approve_application"
          break;
        
        case "is_director":
          action = "verify_license"
          break;

          default:
            break;
      }
      Axios.post("http://154.72.194.247/dda/api/view_application/", {
        application_id: this.state.id,
        action: action
      }, 
      {
        headers: {
            'Authorization': `Token ${localStorage.getItem('token')}`
        }
      }).then( response => {
        alert('The Application has been updated and moved to the next stage')
        if( response.data ) {
          this.setState({ 
            openModal: false, 
            loading: true 
          })
          
          window.location.reload()
        }
      })
    }
    deleteRecord = id => {
      // Axios.delete(`http://localhost:4000/application/${id}`, {
      //   data: {}
      // } ).then( response => {
      //   console.log( 'response',response )
      //   window.location.reload()
      // } ).catch( error => {
      //   throw error
      // } )
    }
    handleAdd = () => {
        this.setState( { openModal: true } )
    }
    render() {
  
    const { applications } = this.props
    const totalRequsitions = this.props.applications?.length


      return (
        <>
        <Header history={this.props.history}/>
        <div style={{ marginTop: '7rem'}} />
        <Container fluid className="main-content-container px-4">
          
          <h5> Athletes List </h5>
          <hr style={{ border: "2px solid #369898",  }} />
          <Row>
          <Col>
            <Card small className="mb-4 overflow-hidden">
              <CardHeader>
                  <Button theme="success" onClick={() => this.handleAdd()}>
                        Add a New Athlete
                  </Button>
              </CardHeader>
              <CardBody className="bg-dark p-0 pb-3">
                <table className="table table-dark mb-0" style={{ fontSize: '0.75rem'}}>
                  <thead className="thead-dark">
                    <tr>
                      {/* <th> Actions </th> */}
                      <th scope="col" className="border-0">Name</th>
                      <th scope="col" className="border-0">Gender</th>
                      <th scope="col" className="border-0">Club</th>
                      <th scope="col" className="border-0">Coach</th>
                      {/* <th scope="col" className="border-0">Email Address</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.currentRequistions?.map( value => {
                      return (
                        <tr style={{ textAlign: 'center', fontSize: '0.85rem', color: value.status === "APPROVED" && 'yellow' }} key={value._id}>
                          {/* <td>
                            <Button theme="success" onClick={ () => this.props.history.push("/display-application", { record: value } )}> 
                              View 
                            </Button>
                          </td> */}
                          <td>{`${value.first_name} ${value.last_name}`}</td>
                          <td>{value.gender}</td>
                          <td>{value.club?.toUpperCase() }</td>
                          <td>{value.coach?.toUpperCase()}</td>
                          {/* <td>{value.email_address }</td> */}
                        </tr>
                      )
                    } ) }
                  </tbody>
                </table>
              </CardBody>
              <div className="d-flex flex-row py-4 align-items-center">
                <Pagination 
                  totalRecords={totalRequsitions} 
                  pageLimit={8} 
                  pageNeighbours={1} 
                  onPageChanged={this.onPageChanged} />
                </div>
            </Card>
          </Col>
        </Row>
          <Modal open={this.state.openModal} toggle={this.handleToggle}> 
            <ModalHeader>Add a New Athlete</ModalHeader>
            <ModalBody>
              <Container>
              <Formik 
                enableReinitialize
                initialValues={{
                    date: "",
                    first_name: "",
                    last_name: "",
                    coach: "",
                    category: "",
                    dob: ""

                }}
                // validationSchema={currentValidationSchema}
                onSubmit={ (values) => {
                    Axios.post("http://localhost:4000/athlete/", {
                        category: values.category,
                        coach: values.coach,
                        date: moment( new Date() ).format("DD-MM-YYYY"),
                        date_of_birth: values.dob,
                        first_name: values.first_name,
                        gender: values.gender,
                        last_name: values.last_name,
                        club: values.club
                    }).then( response => {
                        // console.log( response )
                        window.location.reload()
                    } ).catch( error => {
                        // console.log( error )
                    } )
                } }
                render={ ({ values, errors, isSubmitting, handleSubmit, handleChange, handleBlur, touched }) => {
                    return (
                        <Form onSubmit={handleSubmit}>
                            <Row form>
                                <Col md="6" className="form-group">
                                    <label htmlFor={"first_name"}>First Name:</label>
                                    <FormInput
                                        id={"first_name"}
                                        name={"first_name"}
                                        onChange={handleChange}
                                        className={'form-control' + (errors["first_name"] ? ' is-invalid' : '')}
                                        onBlur={handleBlur}
                                        value={values.first_name}
                                        autoComplete="Off"
                                    />
                                    <ErrorMessage name={"first_name"} component="div" className="invalid-feedback"/>
                                </Col>

                                <Col md="6" className="form-group">
                                    <label htmlFor={"last_name"}>Last Name:</label>
                                    <FormInput
                                        id={"last_name"}
                                        name={"last_name"}
                                        onChange={handleChange}
                                        className={'form-control' + (errors["last_name"] ? ' is-invalid' : '')}
                                        onBlur={handleBlur}
                                        value={values.last_name}
                                        autoComplete="Off"
                                    />
                                    <ErrorMessage name={"last_name"} component="div" className="invalid-feedback"/>
                                </Col>

                                <Col md="6" className="form-group">
                                    <label htmlFor={"dob"}>Date of Birth:</label>
                                    <FormInput
                                        id={"dob"}
                                        name={"dob"}
                                        type="date"
                                        onChange={handleChange}
                                        className={'form-control' + (errors["dob"] ? ' is-invalid' : '')}
                                        onBlur={handleBlur}
                                        value={values.dob}
                                        autoComplete="Off"
                                    />
                                    <ErrorMessage name={"dob"} component="div" className="invalid-feedback"/>
                                </Col>
                            </Row>
                            <Row form>
                                <Col md="6" className="form-group">
                                    <label htmlFor={"gender"}>Gender</label>
                                    <FormSelect name={"gender"} 
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={'form-control' + (errors["gender"] ? ' is-invalid' : '')}
                                        value={values.gender}>
                                        <option value="">Choose...</option>
                                        <option>MALE</option>
                                        <option>FEMALE</option>
                                    </FormSelect>
                                </Col>
                                <Col md="6" className="form-group">
                                    <label htmlFor={"coach"}>Coach:</label>
                                    <FormInput
                                        id={"coach"}
                                        name={"coach"}
                                        onChange={handleChange}
                                        className={'form-control' + (errors["coach"] ? ' is-invalid' : '')}
                                        onBlur={handleBlur}
                                        value={values.coach}
                                        autoComplete="Off"
                                    />
                                    <ErrorMessage name={"coach"} component="div" className="invalid-feedback"/>
                                </Col>
                                <Col md="6" className="form-group">
                                    <label htmlFor={"club"}>Club/ Institution:</label>
                                    <FormInput
                                        id={"club"}
                                        name={"club"}
                                        onChange={handleChange}
                                        className={'form-control' + (errors["club"] ? ' is-invalid' : '')}
                                        onBlur={handleBlur}
                                        value={values.club}
                                        autoComplete="Off"
                                    />
                                    <ErrorMessage name={"coach"} component="div" className="invalid-feedback"/>
                                </Col>
                                <Col md="6" className="form-group">
                                    <label htmlFor={"category"}>Category /Discpline</label>
                                    <FormSelect name={"category"} 
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={'form-control' + (errors["category"] ? ' is-invalid' : '')}
                                        value={values.category}>
                                        <option value="">Choose...</option>
                                        <option>Swimming</option>
                                        <option>Water Polo</option>
                                        <option>Masters</option>
                                        <option>Para Swimming</option>
                                        <option>Open Water Swimming</option>
                                    </FormSelect>
                                </Col>
                            </Row>
                            <Row form>
                                <Button type="submit" theme="primary"> Submit </Button>
                                <Button theme="danger" onClick={this.handleToggle}> Cancel </Button>
                            </Row>
                        </Form>
                    
                    )
                } }
                    />
                
              </Container>
            </ModalBody>
        </Modal>
        </Container>
      </>
     )
    }
}

const mapDispatchToProps = ( dispatch ) => {
  return {
    fetchApplications: ( param ) => dispatch( fetchApplications( param ) ),
    prepareFormEdit: ( param ) => dispatch( prepareFormEdit( param ) )
  }
}

const mapStateToProps = state => {
  return {
    applications: state.application?.applications,
    loading: state.application.loading
  }
}

export default connect( mapStateToProps, mapDispatchToProps )( AllAthletes )
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
import './Table.css'

const ExcelFile = ReactExport.ExcelFile
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn

class AllApplications extends React.Component {
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
        Axios.get("http://localhost:4000/application/").then( response => {
          if( response.data.status === "success"){
            this.setState({ currentRequistions: response.data.applications })
          }
          else {
            console.log('no data records')
          }
        })
      }  
    }
    componentDidUpdate(){
      if( this.state.loading  ){
        // this.setState({
        //   allRecords: this.props.applications,
        //   loading: false
        // })
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
    render() {
  
    const { applications } = this.props
    const totalRequsitions = this.props.applications?.length


      return (
        <>
        <Header history={this.props.history}/>
        <div style={{ marginTop: '7rem'}} />
        <Container fluid className="main-content-container px-4">
          {/* <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <h6>{localStorage.getItem( 'role' ).toUpperCase() === 'MEMBER'  ? `My Applications` : `Applications`}</h6>
            {localStorage.getItem( 'role' ).toUpperCase() === 'MEMBER'  &&
              <Button theme="success" style={{ backgroundColor: "#faf502", outline:"none", border: "none", color: "black" }} onClick={() => this.props.history.push('/create-application')}>Make a New Application</Button>
            }
          </div> */}
          <h5> Submitted Applications </h5>
          <hr style={{ border: "2px solid #369898",  }} />
          <Row>
          <Col>
            <Card small className="mb-4 overflow-hidden">
              <CardBody className="bg-dark p-0 pb-3">
                <table className="table table-dark mb-0" style={{ fontSize: '0.75rem'}}>
                  <thead className="thead-dark">
                    <tr>
                      <th> Actions </th>
                      <th scope="col" className="border-0" style={{ textAlign: 'center' }}>Status</th>
                      <th scope="col" className="border-0" style={{ textAlign: 'center' }}>Date</th>
                      <th scope="col" className="border-0" style={{ textAlign: 'center' }}>Type</th>
                      <th scope="col" className="border-0" style={{ textAlign: 'center' }}>Name of Institution</th>
                      <th scope="col" className="border-0" style={{ textAlign: 'center' }}>Email Address</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.currentRequistions?.filter( val => 
                      typeof val.status !== "undefined"  ).map( value => {
                      return (
                        <tr style={{ textAlign: 'center'}} key={value._id}>
                          <td>
                            <Button theme="success" onClick={ () => this.props.history.push("/display-application", { record: value } )}> 
                              View 
                            </Button>
                            {/* <Button theme="danger" onClick={ () => alert('Delete a record') }> Delete </Button> */}
                          </td>
                          <td>{value.status}</td>
                          <td>{value.date}</td>
                          <td>{value.type?.toUpperCase() }</td>
                          <td>{value.name?.toUpperCase()}</td>
                          <td>{value.email_address }</td>
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
            <ModalHeader>Administrator Form</ModalHeader>
            <ModalBody>
              <Container>
                Recommend this Applicant to go to the next stage?
                <Button theme="success" onClick={this.handleConfirm} className="mr-2">
                  Ok
                </Button>
                <Button theme="danger" onClick={this.handleToggle} className="ml-2">
                  Cancel
                </Button>
                
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

export default connect( mapStateToProps, mapDispatchToProps )( AllApplications )
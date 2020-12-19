import React from "react";
import { Container, Row, Col, Card, CardHeader, CardBody, Button,
Modal, ModalBody, ModalHeader, 
FormSelect,FormInput } from "shards-react";

import PageTitle from "../../components/common/PageTitle"
import Axios from 'axios'
// import moment from 'moment'

import ReactExport from "react-export-excel"

import { connect } from 'react-redux'
import { fetchApplications, prepareFormEdit } from '../../_actions'
// import * as Yup from 'yup'
import Pagination from '../../components/pagination'
import Header from '../../components/header'

// import { Formik, Form, ErrorMessage , Field } from 'formik'
import './Table.css'

const ExcelFile = ReactExport.ExcelFile
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn

// const licenses =  [
//   {
//       "id": 0,
//       "name": "",
//       "description": "Choose..."
//   },
//   {
//       "id": 1,
//       "name": "milk collection",
//       "description": "milk collecting centre using coolers"
//   },
//   {
//       "id": 2,
//       "name": "milk bulking",
//       "description": "milk bulking centers using coolers"
//   },
//   {
//       "id": 3,
//       "name": "milk sales",
//       "description": "milk sales outlets using freezers and coolers"
//   },
//   {
//       "id": 4,
//       "name": "milk tankers and transporters",
//       "description": "stakeholders using milk tankers (transporters)"
//   },
//   {
//       "id": 5,
//       "name": "processors",
//       "description": "Processors (large, medium scale, cottage and small scale)"
//   },
//   {
//       "id": 6,
//       "name": "exporters",
//       "description": "exporters"
//   },
//   {
//       "id": 7,
//       "name": "importers",
//       "description": "(additives, equipment, milk products etc)"
//   },
//   {
//       "id": 8,
//       "name": "ATM",
//       "description": "ATM (dispensing milk using ATM)"
//   },
//   {
//       "id": 9,
//       "name": "stores",
//       "description": "milk or milk products)"
//   }
// ]
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
    columns: [
      { key: "licenseID", value: "License ID" },
      { key: "name", value: "Licensee" },
      { key: "contactAddress", value: "Address" },
      { key: "applicantCategory", value: "Category" },
      { key: "hectares_assigned", value: "Area Allocated" },
      { key: "period", value: "Period" },
      { key: "managementarea", value: "Range" },
      { key: "blocknumber", value: "Block No" },
      { key: "forest_reserve", value: "Forest Reserve" },
      { key: "sector", value: "Sector" },
      { key: "district", value: "District" },
      { key: "amount_paid", value: "Amount Paid" },
      { key: "amount_due", value: "Amount Due" },
      { key: "date_of_issue", value: "Start Date" },
      { key: "date_of_expiry", value: "Expiry Date" }
    ],
    column: "",
    searchterm: "",
    loading: true,
    id: null
  }
    componentDidMount() {
      if( this.state.loading  ){
        this.props.fetchApplications()
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
    render() {
      if( this.props.loading ){
        return (
          <div className="container mb-5">
            <div className="row d-flex flex-row py-1">
              Loading Records...
            </div>
          </div>
        )
      }

    const { applications } = this.props
    const totalRequsitions = this.props.applications?.length


      return (
        <>
        <Header history={this.props.history}/>
        <div style={{ marginTop: '7rem'}} />
        <Container fluid className="main-content-container px-4">
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <h6>{localStorage.getItem( 'role' ).toUpperCase() === 'MEMBER'  ? `My Applications` : `Applications`}</h6>
            {localStorage.getItem( 'role' ).toUpperCase() === 'MEMBER'  &&
              <Button theme="success" style={{ backgroundColor: "#faf502", outline:"none", border: "none", color: "black" }} onClick={() => this.props.history.push('/create-application')}>Make a New Application</Button>
            }
          </div>
          <hr style={{ border: "2px solid #369898",  }} />
          <Row>
          <Col>
            <Card small className="mb-4 overflow-hidden">
              <CardBody className="bg-dark p-0 pb-3">
                <table className="table table-dark mb-0" style={{ fontSize: '0.9rem'}}>
                  <thead className="thead-dark">
                    <tr>
                      <th> View </th>
                      <th scope="col" className="border-0">Status</th>
                      <th scope="col" className="border-0">Date</th>
                      <th scope="col" className="border-0">ReferenceID</th>
                      <th scope="col" className="border-0">Institution</th>
                      <th scope="col" className="border-0">Institution Type</th>
                      <th scope="col" className="border-0">Name of Institution</th>
                      <th scope="col" className="border-0">Physical Address</th>
                      <th scope="col" className="border-0">Telephone</th>
                      <th scope="col" className="border-0">Email Address</th>
                      <th scope="col" className="border-0">Residential Address</th>

                      <th scope="col" className="border-0">Home District</th>
                      <th scope="col" className="border-0">Executive Director</th>
                      <th scope="col" className="border-0">Name</th>
                      <th scope="col" className="border-0">NIN</th>
                      <th scope="col" className="border-0">Address</th>
                      <th scope="col" className="border-0">Athletes Coach Personnel</th>
                      <th scope="col" className="border-0">Position</th>
                      <th scope="col" className="border-0">Work Plan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* {applications?.map( record => {
                      return (
                        <tr key={record.id} style={{ textAlign: 'center'}}>
                          <td style={{ padding: '0.75rem', textAlign: 'center' }}>
                            <a href="javascript:void(0)" onClick={() => this.props.history.push('/display-application', { record } )}>
                              View
                            </a>
                          </td>
                          <td>
                            <h6>
                              <span class="badge badge-danger" style={{ background: 'green'}}>
                                {record.status.toUpperCase()}
                              </span>
                            </h6>
                          </td>
                          <td>
                              <span class="badge badge-danger">
                              {record.applicant_type.toUpperCase()}
                              </span>
                          </td>
                          <td>{record.name?.toUpperCase()}</td>
                          <td>{record.gender}</td>
                          <td>{record.national_id}</td>
                          <td>{record.phone}</td>
                          <td>{record.type_of_license}</td>

                          <td>{record.district.toUpperCase()}</td>
                          <td>{record.subcounty.toUpperCase()}</td>
                          <td>{record.village.toUpperCase()}</td>
                          
                          <td>{record.inspected_by}</td>
                          <td>{record?.approved_by}</td>
                          <td>{record.rejected_by}</td>
                          <td>{record.reject_on}</td>
                        </tr>
                      )
                    })} */}
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

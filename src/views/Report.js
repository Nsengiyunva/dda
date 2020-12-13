import React, { Component } from 'react';
import { Container, Row, Col, Button, Modal, ModalBody, ModalHeader, FormInput, FormSelect } from "shards-react";
import '../App.scss';
import Pagination from '../components/pagination';
import "bootstrap/dist/css/bootstrap.min.css"

import { connect } from 'react-redux'

import { fetchLicensees } from '../_actions'

import jsPDF from 'jspdf'
import 'jspdf-autotable'
import ReactExport from 'react-export-excel'
import moment from 'moment'
import Axios from 'axios'

// import CsvDownloader from 'react-csv-downloader'
const ExcelFile = ReactExport.ExcelFile
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn



class Report extends Component {
  state = { 
    allEmployees: [],
    currentEmployees: [],
    currentPage: null,
    totalPages: null,
    modalSetting: false,
    selectedStaff: [],
    formInputs: {},
    inputFields: [
      { 
        itemDescription: '',
        itemCost: 0
      }
    ],
    deductionFields: [
      { 
        deductionSubject: '',
        deductionCost: 0
      }
    ],
    error: null,
    itemsOpenModal: false,
    current: { value: null, title: '', id: '', staff_id: '' },
    deleteModal: { open: false, staff_id: '', id: '' },
    loading: true,
    refreshData: false
  }

  componentDidMount() {
    // this.props.getApplications({ 
    //   username: localStorage.getItem('username'),
    //   role: localStorage.getItem('role')})
  }
  componentDidUpdate() {
    // if(this.state.refreshData ){
    //   this.fetchData()
    //   this.setState({ refreshData: false })
    // }
  }
  fetchData = () => {
    // Axios.get("http://154.72.194.247/mis/api/employee/").then( response => {
    //   if( response.data ){
    //     let results = response.data.employees.sort( function(a,b){
    //       return new Date( b.created ) - new Date( a.created )
    //     } )
    //     this.setState({ allEmployees: results, loading: false })
    //   }
    // }).catch( error => {})
  }
  downloadPayroll = () => {
  //  let records = this.state.selectedStaff.map( (value) => {
  //      return this.state.allEmployees.filter( record => {
  //       return record.id === value.id  ? record : null
  //     })[0]
  //   })
    
  //   let formatted = records.map( value => {
  //     return Object.values( {  
  //       name: value.staff_id,
  //       salary_scale: value.salary_scale,
  //       gross_pay: value.gross_pay,
  //       designation: value.designation,
  //       gender: value.gender,
  //       national_id: value.national_id,
  //       nationality: value.nationality,
  //     } )
  //   })
    
    // const doc = new jsPDF()
    // doc.setFontSize(12)
    // doc.text('NATIONAL ENTERPRISE CORPORATION STAFF PAYROLL LIST Prepared on ' + moment( new Date() ).format('YYYY-MM-DD'), 14, 22)
    // doc.autoTable({
    //   startY: 25,
    //   head: [['Name', 'Grade', 'Consolidated', 'Designation', 'Gender', 'NationalID', 'Nationality' ]],
    //   body: formatted
    // })
    // doc.save('PAYROLL_STAFF_LIST.pdf')
  }
  handleFormInput = event => {
     this.setState( { formInputs: { ...this.state.formInputs, [event.target.name]: event.target.value } } )
  }

  onPageChanged = data => {
    const { allEmployees } = this.state
    const { currentPage, totalPages, pageLimit } = data

    const offset = (currentPage - 1) * pageLimit;
    const currentEmployees = allEmployees.slice(offset, offset + pageLimit);

    this.setState({ currentPage, currentEmployees, totalPages });
  }
  addToList = record => {
    let records = [ ...this.state.selectedStaff, record ]
    if( this.userExists( record.id ) ){
      alert('Employee has already been added to the payroll list')
    } else {
      this.setState({ selectedStaff: records }) 
    }
    
  }
  toggle = () => this.setState({ modalSetting: this.state.modalSetting ? false : true })
  toggleItemModal = () => this.setState({ itemsOpenModal: this.state.itemsOpenModal ? false : true })

  userExists = id => {
    return this.state.selectedStaff.some(function( value ) {
      return value.id === id
    })
  }
  onSubmitModalForm = e => {
    e.preventDefault()
    let formattedObject = { id: this.state.current.id, staff_id: this.state.current.staff_id }

    let allowances = this.state.inputFields.filter( value => value.itemDescription !== "" && value.itemCost > 0 )
    let deductions = this.state.deductionFields.filter( value => value.deductionSubject !== "" && value.deductionCost > 0 )

    if( allowances.length > 0){
      formattedObject = { 
         ...formattedObject, 
         allowances: this.state.inputFields.map( value => {
           return { [value.itemDescription]: value.itemCost }
         })
        }
    }
    if( deductions.length > 0){
      formattedObject = { 
         ...formattedObject, 
         deductions: this.state.deductionFields.map( value => {
           return { [value.deductionSubject]: value.deductionCost }
         })
        }
    }
    this.addToList( formattedObject )
    this.setState({ itemsOpenModal: false })
  }
  handleAddFields = () => {
    if(this.state.inputFields.length > 4 ){
      this.setState({ error: 'Item limit has been reached'})
    }
    else {
      const values = [ ...this.state.inputFields ]
      values.push({  
        itemDescription: '',
        itemCost: 0
      })
      this.setState({ inputFields: values } )
    }
    
  }
  handleRemoveFields = index => {
    const values = [ ...this.state.inputFields ]
    values.splice( index, 1 )
    this.setState({ inputFields: values } )
  }
  handleAddDeductionFields = () => {
    if(this.state.deductionFields.length > 4 ){
      this.setState({ error: 'Item limit has been reached'})
    }
    else {
      const values = [ ...this.state.deductionFields ]
      values.push({  
        deductionSubject: '',
        deductionCost: 0
      })
      this.setState({ deductionFields: values } )
    }
  }
  handleRemoveDeductionFields = index => {
    let values = [ ...this.state.deductionFields ]
    values.splice( index, 1 )
    this.setState({ deductionFields: values } )
  }
  handleAdditions = value => {
    this.setState({ current: 
      { 
      value, 
      title: 'Additions and Deductions', 
      id: value.id, 
      staff_id: value.staff_id 
    }, itemsOpenModal: true })
  }
  handleDeductions = () => {}
  handleChangeInputs = (event,index) => {
    //additions
    let inputs = [ ...this.state.inputFields ]
      if( event.target.name  === 'itemDescription'){
        inputs[ index ].itemDescription = event.target.value
      }
      if( event.target.name  === 'itemCost'){
        inputs[ index ].itemCost = event.target.value
      }
      this.setState({ inputFields: inputs })

    //deductions
    let deductions = [ ...this.state.deductionFields ]
      if( event.target.name  === 'deductionSubject'){
        deductions[ index ].deductionSubject = event.target.value
      }
      if( event.target.name  === 'deductionCost'){
        deductions[ index ].deductionCost = event.target.value
      }
      this.setState({ deductionFields: deductions })
  }
  submitPayRoll = e => {
    e.preventDefault()
    Axios.post("http://154.72.194.247/mis/api/create_payroll/", {
      name: this.state.formInputs.title,
      description: this.state.formInputs.payroll_description,
      employees: this.state.selectedStaff
    }, { headers: {
      'Authorization': 'Token ' + localStorage.getItem('token')
    } } ).then( response => {
      if( response.data ){
        alert('payroll successfully created')
        this.downloadPayroll()
        this.setState({ modalSetting: false })
        this.props.history.push('/payroll-list')
      }
      else {
        alert('There was an error submitting to create a payroll')
      }
    }).catch( error => {
      alert('There was an error creating a payroll')
    } )
  }
  handleRemoveStaff = record => {
    this.setState({ deleteModal: { open: true, id: record.id, staff_id: record.staff_id } })
  }
  // confirmDelete =  id => {
  //   Axios.post( "http://154.72.194.247/mis/api/del_employee/", 
  //   { id: id } ).then( response => {
  //     console.log( response )
  //     if( response ){
  //       this.setState({ refreshData: true, deleteModal: { open: false } })
  //     }
  //   })
  // }
  // toggleDeleteModal = () => this.setState({ deleteModal: { open: this.state.deleteModal['open'] === true ? false : true }  })
  // hideDeleteModal = () => this.setState({ deleteModal: { open: false } })
  
  render() {
    return (
      <div>We are so here please</div>
    )

    // const { allEmployees, currentEmployees, currentPage, totalPages } = this.state
    // const totalEmployees = allEmployees.length

    // // if (totalEmployees === 0) return null

    // if( this.state.loading ){
    //   return (
    //     <Container>
    //       <Row>
    //         Loading records...
    //       </Row>
    //     </Container>
    //   )
    // }

  //   return (
  //     <div className="container mb-5">
  //       <div className="row d-flex flex-row py-1">
  //         <div className="w-100 px-4 py-2 d-flex flex-row flex-wrap align-items-center justify-content-between">
  //           <div className="d-flex flex-row align-items-center">
  //             <Button theme="primary" onClick={() => this.state.selectedStaff.length > 0 ? this.setState({ modalSetting: true }) : alert('No staff in payroll list yet')}>
  //               {`Generate Payroll List ( ${this.state.selectedStaff.length} )`}
  //             </Button>
  //           </div>
  //           <div className="d-flex flex-row align-items-center">
  //             <ExcelFile element={<button>Download Staff</button>}>
  //                 <ExcelSheet data={this.state.allEmployees} name="Employees">
  //                     <ExcelColumn label="Date Created" value="created"/>
  //                     <ExcelColumn label="FirstName" value="first_name"/>
  //                     <ExcelColumn label="Last Name" value="last_name"/>
  //                     <ExcelColumn label="Others" value="others"/>
  //                     <ExcelColumn label="Gender" value="gender"/>
  //                     <ExcelColumn label="Staff ID" value="staff_id"/>
  //                     <ExcelColumn label="Bank Name" value="bank_name"/>
  //                     <ExcelColumn label="Account Number" value="bank_account_num"/>
  //                     <ExcelColumn label="Email" value="email"/>
  //                     <ExcelColumn label="National ID" value="national_id"/>
  //                     <ExcelColumn label="Nationality" value="nationality"/>
  //                     <ExcelColumn label="Organisation" value="organisation"/>
  //                     <ExcelColumn label="Employment Start Date" value="employment_start"/>
  //                     <ExcelColumn label="Employment Expiry" value="employment_expiry"/>
  //                     <ExcelColumn label="Primary Contact" value="primary_contact"/>
  //                     <ExcelColumn label="Secondary Contact" value="secondary_contact"/>
  //                     <ExcelColumn label="Terms of Employment" value="terms_of_employment"/>
  //                     <ExcelColumn label="Is Taxable" value="taxable"/>
  //                     <ExcelColumn label="Gross Pay" value="gross_pay"/>
  //                     {/* <ExcelColumn label="Marital Status"
  //                                 value={(col) => col.is_married ? "Married" : "Single"}/> */}
  //                 </ExcelSheet>
  //                 {/* <ExcelSheet data={this.state.dataSet2} name="Leaves">
  //                     <ExcelColumn label="Name" value="name"/>
  //                     <ExcelColumn label="Total Leaves" value="total"/>
  //                     <ExcelColumn label="Remaining Leaves" value="remaining"/>
  //                 </ExcelSheet> */}
  //             </ExcelFile>
  //           </div>
  //           <div className="d-flex flex-row py-4 align-items-center">
  //             <Pagination 
  //               totalRecords={totalEmployees} 
  //               pageLimit={8} 
  //               pageNeighbours={1} 
  //               onPageChanged={this.onPageChanged} />
  //           </div>
  //         </div>
  //         <table className="table table-dark mb-0">
  //             <thead className="thead-dark">
  //               <tr>
  //                 <th scope="col" className="border-0">
  //                   Payment History
  //                 </th>
  //                 <th scope="col" className="border-0">
  //                   Edit | Deactivate
  //                 </th>
  //                 <th scope="col" className="border-0">
  //                   Staff Name
  //                 </th>
  //                 <th scope="col" className="border-0">
  //                   Staff ID
  //                 </th>
  //                 <th scope="col" className="border-0">
  //                   Designation
  //                 </th>
  //                 <th scope="col" className="border-0">
  //                   Terms of Employment
  //                 </th>
  //                 <th scope="col" className="border-0">
  //                   Actions
  //                 </th>
  //                 <th scope="col" className="border-0">
  //                   Created Date
  //                 </th>
  //               </tr>
  //             </thead>
  //                <tbody>
  //                  {currentEmployees.map( row => {
  //                   return (
  //                     <tr>
  //                       <td>
  //                         <Button size="sm" theme="success" className="mb-2 mr-1" onClick={() => { this.props.history.push('/employee-salary', { row })} }>
  //                           View
  //                         </Button>
  //                       </td>
  //                       <td style={{ display: 'flex', flexDirection: 'row'}}>
  //                         <Button size="sm" theme="info" className="mb-2 mr-1" onClick={() => { this.props.history.push('/edit-employee', { row } )} }>
  //                           Edit
  //                         </Button>
  //                         <Button size="sm" theme="danger" className="mb-2 mr-1" onClick={()=> this.handleRemoveStaff( row )}>
  //                           Delete
  //                         </Button>
  //                       </td>
  //                       <td>{`${row.first_name.toUpperCase()} ${row.last_name.toUpperCase() }`}</td>
  //                       <td>{`${row.staff_id}`}</td>
  //                       <td>{`${row.designation}`}</td>
  //                       <td>{`${row.terms_of_employment}`}</td>
  //                       <td>
  //                         <div style={{ display: 'flex', flexDirection: 'row'}}>
  //                           {!(this.userExists( row.id ) ) ? <Button size="sm" theme="warning" className="mb-2 mr-1" onClick={() => this.handleAdditions( row ) }>
  //                             Add to Payroll
  //                           </Button>: null }
  //                         </div>
  //                       </td>
  //                       <td>{moment(row.created).format('DD-MM-YYYY HH:mm:ss')}</td>
  //                     </tr>
  //                   )
  //                 })}
  //               </tbody>
  //             </table>
  //         </div>

  //         <Modal open={this.state.deleteModal['open']} toggle={this.toggleDeleteModal}> 
  //           <ModalHeader>DEACTIVATE AN EMPLOYEE</ModalHeader>
  //           <ModalBody className="delete-modal">
  //             <Container>
  //               <p>{`Are you sure you want to deactivate this Staff Member ${this.state.deleteModal['staff_id']} ?`}</p>
  //               <Col md="2" style={{ display: 'flex',justifyContent: 'flex-start', alignItems: 'center' }}>
  //                   <Button className="mr-2" onClick={() => this.confirmDelete( this.state.deleteModal['id'] )} theme="danger">Confirm Deactivation</Button>
  //                   <Button className="ml-2" onClick={() => this.hideDeleteModal()} theme="danger">Cancel</Button>
  //               </Col>
  //             </Container>
  //           </ModalBody>
  //         </Modal>
          
  //         <Modal open={this.state.modalSetting} toggle={this.toggle}> 
  //           <ModalHeader>CREATING A PAYROLL</ModalHeader>
  //           <ModalBody>
  //             <Container>
  //               <form onSubmit={this.submitPayRoll}>
  //                 <Row form>
  //                   <Col md="12" sm="12" className="form-group">
  //                     <label htmlFor="title">Payroll Title:</label>
  //                     <FormInput
  //                       id="title"
  //                       name="title"
  //                       onChange={(e) => this.handleFormInput(e)}
  //                       placeholder="Title"
  //                       autoComplete="off"
  //                     />
  //                   </Col>
  //                 </Row>

  //                 <Row form>
  //                   <Col md="12" sm="12" className="form-group">
  //                     <label htmlFor="payroll_description">Description:</label>
  //                     <FormInput
  //                       id="payroll_description"
  //                       name="payroll_description"
  //                       onChange={(e) => this.handleFormInput(e)}
  //                       placeholder="Payroll Description"
  //                       autoComplete="off"
  //                     />
  //                   </Col>
  //                 </Row>

  //                 <Row form>
  //                   <Col md="12" sm="12" className="form-group">
  //                     <label htmlFor="source">(NEC)Source to Debit from:</label>
  //                     <FormInput
  //                       id="source"
  //                       name="source"
  //                       onChange={(e) => this.handleFormInput(e)}
  //                       placeholder="Source of funds"
  //                       autoComplete="off"
  //                     />
  //                   </Col>
  //                 </Row>
  //                 <Row form>
  //                 <Col md="12" sm="12" className="form-group">
  //                   <label htmlFor="staff">Staff in Current Payroll:</label>
  //                   {this.state.selectedStaff && this.state.selectedStaff.map( val => {
  //                     return (
  //                      <li key={val.staff_id}>{`Staff ID: ${val.staff_id}`}</li>
  //                     )
  //                   })}
  //                 </Col>
  //                 </Row>
  //                 <Row form>
  //                   <Col md="12" sm="12" className="form-group">
  //                     <label htmlFor="payment_mode">Payment Method for Selected Staff:</label>
  //                     <FormSelect id="payment_mode" name="payment_mode" 
  //                       onChange={(e) => this.handleFormInput(e)}>
  //                       <option>Choose...</option>
  //                       <option value="BANK_TO_BANK">Bank</option>
  //                       <option value="BANK_TO_BANK">Internet Banking</option>
  //                       <option value="BANK_TO_MOBILE">Mobile Account</option>
  //                     </FormSelect>
  //                   </Col>
  //                 </Row>
  //                 <Row>
  //                   <Button primary>Submit</Button>
  //                 </Row>
  //                 </form>
  //             </Container>
  //           </ModalBody>
  //         </Modal>

  //         <Modal open={this.state.itemsOpenModal} toggle={this.toggleItemModal}> 
  //               <ModalHeader>{`Additions and Deductions STAFFID: ${this.state.current.staff_id}`}</ModalHeader>
  //           <ModalBody>
  //             <Container style={{ overflowY: 'scroll'}}>
  //               <form onSubmit={this.onSubmitModalForm}>
  //               <h6>Additions</h6>
  //               {this.state.inputFields.map( ( inputField, index ) => {
  //                 return (
  //                   <Row form key={`${inputField}~${index}`}>
  //                       <Col md="4" sm="12" className="form-group">
  //                         <label htmlFor="itemDescription">Description: <span style={{ color: 'red'}}>*</span></label>
  //                         <FormInput
  //                             id="itemDescription"
  //                             name="itemDescription"
  //                             placeholder="Item Description"
  //                             value={inputField.itemDescription}
  //                             onChange={e => this.handleChangeInputs(e,index)}
  //                             autoComplete="off"
  //                         />
  //                       </Col>
  //                       <Col md="4" sm="12" className="form-group">
  //                       <label htmlFor="itemCost">Item Cost: <span style={{ color: 'red'}}>*</span></label>
  //                             <FormInput
  //                                 id="itemCost"
  //                                 name="itemCost"
  //                                 type="number"
  //                                 placeholder="Item Cost"
  //                                 onChange={e => this.handleChangeInputs(e,index)}
  //                                 value={inputField.itemCost}
  //                                 autoComplete="off"
  //                             />
  //                       </Col>
  //                       <Col md="2" style={{ display: 'flex',justifyContent: 'flex-start', alignItems: 'center' }}>
  //                           <Button className="mr-2" onClick={() => this.handleAddFields()} primary>Add</Button>
  //                           <Button className="ml-2" onClick={() => this.handleRemoveFields(index)} primary>Remove</Button>
  //                       </Col>
  //                   </Row>
  //                   )
  //                   })}
  //                   <div style={{ border: '1px solid red'}}></div>   
  //                    <h6>Deductions</h6>
  //                {this.state.deductionFields.map( ( deductionField, index ) => {
  //                 return (
  //                   <Row form key={`${deductionField}~${index}`}>
  //                       <Col md="4" sm="12" className="form-group">
  //                         <label htmlFor="itemDescription">Description: <span style={{ color: 'red'}}>*</span></label>
  //                         <FormInput
  //                             id="deductionSubject"
  //                             name="deductionSubject"
  //                             placeholder="Deduction Item"
  //                             value={deductionField.deductionSubject}
  //                             onChange={e => this.handleChangeInputs(e,index)}
  //                             autoComplete="off"
  //                         />
  //                       </Col>
  //                       <Col md="4" sm="12" className="form-group">
  //                       <label htmlFor="itemCost">Deduction Cost: <span style={{ color: 'red'}}>*</span></label>
  //                             <FormInput
  //                                 id="deductionCost"
  //                                 name="deductionCost"
  //                                 placeholder="Deduction Cost"
  //                                 onChange={e => this.handleChangeInputs(e,index)}
  //                                 value={deductionField.deductionCost}
  //                                 autoComplete="off"
  //                                 type="number"
  //                             />
  //                       </Col>
  //                       <Col md="2" style={{ display: 'flex',justifyContent: 'flex-start', alignItems: 'center' }}>
  //                           <Button className="mr-2" onClick={() => this.handleAddDeductionFields()} theme="danger">Add</Button>
  //                           <Button className="ml-2" onClick={() => this.handleRemoveDeductionFields(index)} theme="danger">Remove</Button>
  //                       </Col>
  //                   </Row>
  //                   )
  //                   })}
  //                   <Button theme="success" type="submit">Submit to Payroll List</Button>
  //                   </form>
  //             </Container>
  //           </ModalBody>
  //         </Modal>
  //     </div>
  //   );
  }
}
const mapStateToProps = state => {
  return {
    state: state.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getApplications: ( params ) => dispatch( fetchLicensees( params) )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)( connect );

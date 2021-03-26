import React from "react";
import PropTypes from "prop-types";
import {
  Container,
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormGroup,
  FormInput,
  FormSelect,
  FormTextarea,
  Button
} from "shards-react";
import TextField from '../../views/Applications/formFields/TextField'

const UserAccountDetails = (props) => {

  if( Object.values( props.data ).length === 0 ){
    return (
      <div>Loading profile</div>
    )
  }
  return (
    <>
    <Card className="mb-4">
      <CardHeader className="border-bottom">
        <h6 className="m-0">General Information</h6>
      </CardHeader>
      <ListGroup flush>
        <ListGroupItem className="p-3">
          <Row>
            <Col>
            <Row form>
              <TextField 
                label="Applicant Type"
                name="applicant_type" 
                value={props.data.applicant_type.toUpperCase()}/>
              { props.data.applicant_type === "company" && (
                <>
                  <TextField 
                  label="Company Name"
                  name="company_name" 
                  value={props.data.company_name.toUpperCase()}/>

                  <TextField 
                  label="Business Registration Number"
                  name="business_reg_number" 
                  value={props.data.business_reg_number}/>
                </>
              )}
              { props.data.applicant_type === "individual" && (
                <>
                  <TextField 
                  label="Name"
                  name="name" 
                  value={props.data.name.toUpperCase()}/>

                  <TextField 
                  label="Gender"
                  name="gender" 
                  value={props.data.gender}/>

                  <TextField 
                  label="National ID Number"
                  name="national_id" 
                  value={props.data.national_id}/>
                </>
              )}
              {props.data.approved_by && (
                <>
                <TextField 
                  label="Approved By"
                  name="approved_by" 
                  value={props.data.approved_by}/>
                <TextField 
                  label="Approved On"
                  name="approved_on" 
                  value={props.data.approved_on}/>
                </>
              ) }
              <TextField 
                label="TIN[Tax Indentification Number]"
                name="tin" 
                value={props.data.tin}/>
              <TextField 
                label="Phone Number"
                name="phone" 
                value={props.data.phone}/>
              <TextField 
                label="Email Address"
                name="email_address" 
                value={props.data.email_address}/>
              <TextField 
                label="Website URL"
                name="website_url" 
                value={props.data.website_url}/> 
              
              <TextField 
                label="Physical Business Address"
                name="physical_business_address" 
                value={props.data.physical_business_address}/>
              
            </Row>
            </Col>
          </Row>
        </ListGroupItem>
      </ListGroup>
    </Card>

    <Card className="mb-4">
      <CardHeader className="border-bottom">
        <h6 className="m-0">Location Information</h6>
      </CardHeader>
      <ListGroup flush>
        <ListGroupItem className="p-3">
          <Row>
            <Col>
            <Row form>
              <TextField 
                label="Country"
                name="country" 
                value={props.data.country.toUpperCase()}/>
                <>
                  <TextField 
                    label="District"
                    name="district" 
                    value={props.data.district.toUpperCase()}/>

                  <TextField 
                    label="Subcounty"
                    name="subcounty" 
                    value={props.data.subcounty.toUpperCase()}/>
                  <TextField 
                    label="Village"
                    name="village" 
                    value={props.data.village.toUpperCase()}/>
                </>
              
              
              
            </Row>
            </Col>
          </Row>
        </ListGroupItem>
      </ListGroup>
    </Card>

    <Card className="mb-4">
      <CardHeader className="border-bottom">
        <h6 className="m-0">Category Information</h6>
      </CardHeader>
      <ListGroup flush>
        <ListGroupItem className="p-3">
          <Row>
            <Col>
            <Row form>
              <TextField 
                label="Type of License"
                name="type_of_license" 
                value={props.data.type_of_license}/>
                <>
                  {props.data.average_buying_price && (
                    <TextField 
                    label="Average Buying Price"
                    name="average_buying_price" 
                    value={props.data.average_buying_price.toLocaleString()}/>
                  )}
                  {props.data.average_buying_price && (
                    <TextField 
                    label="Average Selling Price"
                    name="average_selling_price" 
                    value={props.data.average_selling_price.toLocaleString()}/>
                  )}
                  {props.data.country_of_origin && (
                    <TextField 
                    label="Country of Origin"
                    name="country_of_origin" 
                    value={props.data.country_of_origin.toUpperCase()}/>
                  )}
                  {props.data.country_of_destination && (
                    <TextField 
                    label="Country of Destination"
                    name="country_of_destination" 
                    value={props.data.country_of_destination.toUpperCase()}/>
                  )}
                  {props.data.equipment_description && (
                    <TextField 
                    label="Description of Equipment"
                    name="equipment_description" 
                    value={props.data.equipment_description.toUpperCase()}/>
                  )}
                  {props.data.source_of_equipment && (
                    <TextField 
                    label="Source of Equipment"
                    name="source_of_equipment" 
                    value={props.data.source_of_equipment.toUpperCase()}/>
                  )}
                  {props.data.installed_capacity && (
                    <TextField 
                    label="Installed Capacity"
                    name="installed_capacity" 
                    value={props.data.installed_capacity}/>
                  )}
                  {props.data.total_tonnage && (
                    <TextField 
                    label="Total Tonnage"
                    name="total_tonnage" 
                    value={props.data.total_tonnage}/>
                  )}
                  {props.data.source_of_product && (
                    <TextField 
                    label="Source of Product"
                    name="source_of_product" 
                    value={props.data.source_of_product}/>
                  )}
                </>
            </Row>
            </Col>
          </Row>
        </ListGroupItem>
      </ListGroup>
    </Card>


    <Card className="mb-4">
      <CardHeader className="border-bottom">
        <h6 className="m-0">Payment Information</h6>
      </CardHeader>
      <ListGroup flush>
        <ListGroupItem className="p-3">
          <Row>
            <Col>
            <Row form>
            {props.data.bank_prn && (
              <TextField 
              label="PRN"
              name="bank_prn" 
              value={props.data.bank_prn}/>
            )}
            <>
              {props.data.amount && (
                <TextField 
                label="Amount"
                name="amount" 
                value={props.data.amount.toLocaleString()}/>
              )}
              {props.data.receipt_no && (
                <TextField 
                label="Receipt No."
                name="receipt_no" 
                value={props.data.receipt_no.toLocaleString()}/>
              )}
            </>
            </Row>
            </Col>
          </Row>
        </ListGroupItem>
      </ListGroup>
    </Card>
    </>
  )
}
export default UserAccountDetails;

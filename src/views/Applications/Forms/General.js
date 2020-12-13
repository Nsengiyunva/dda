import React from 'react'
import { Row, Col, FormInput, FormSelect } from 'shards-react'
import { ErrorMessage } from 'formik'
import applicationModel from '../FormModel/applicationModel'
import moment from 'moment'


export default props => {
    const { formField : { 
            applicant_type,company_name, first_name, last_name, 
            gender, physical_business_address, nin,
            country,district, subcounty, village, 
            country_of_origin, phone, website_url, email_address,
            business_registration_number
           } } = applicationModel
    const { handleChange, handleBlur, values, errors } = props
    return (
        <>
        <Row form>
            <Col md="6" className="form-group">
                <label htmlFor={applicant_type.name}>Date:</label>
                <FormInput
                    id={"date"}
                    name={"date"}
                    className={'form-control'}
                    placeholder={"Date"}
                    value={moment( new Date()).format('DD-MM-YYYY')}
                    autoComplete="off"
                    disabled={true}
                />
            </Col>
            <Col md="6" className="form-group">
                <label htmlFor={applicant_type.name}>Select Applicant Type:</label>
                <FormSelect name={applicant_type.name} 
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={'form-control' + (errors[applicant_type.name] ? ' is-invalid' : '')}
                    value={values.applicant_type}>
                    <option value="">Choose...</option>
                    <option value="INDIVIDUAL">INDIVIDUAL</option>
                    <option value="COMPANY">COMPANY</option>
                </FormSelect>
                <ErrorMessage name={applicant_type.name} component="div" className="invalid-feedback"/>
            </Col>
        </Row>
        <Row form className="mt-2">
            {values.applicant_type === "INDIVIDUAL" && (
                <>
                <Col md="4" className="form-group">
                    <label htmlFor={first_name.name}>{first_name.label}:</label>
                    <FormInput
                        id={first_name.name}
                        name={first_name.name}
                        placeholder={first_name.label}
                        onChange={handleChange}
                        className={'form-control' + (errors[first_name.name] ? ' is-invalid' : '')}
                        onBlur={handleBlur}
                        value={values.first_name}
                        autoComplete="Off"
                    />
                    <ErrorMessage name={first_name.name} component="div" className="invalid-feedback"/>
                </Col>
                <Col md="4" className="form-group">
                    <label htmlFor={last_name.name}>{last_name.label}</label>
                    <FormInput
                        id={last_name.name}
                        name={last_name.name}
                        placeholder={last_name.label}
                        onChange={handleChange}
                        className={'form-control' + (errors[last_name.name] ? ' is-invalid' : '')}
                        onBlur={handleBlur}
                        value={values.last_name}
                        autoComplete="off"
                    />
                    <ErrorMessage name={last_name.name} component="div" className="invalid-feedback"/>
                </Col>
                <Col md="4" className="form-group">
                    <label htmlFor={gender.name}>{gender.label}</label>
                    <FormSelect name={gender.name} 
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={'form-control' + (errors[gender.name] ? ' is-invalid' : '')}
                        value={values.gender}>
                    <option value="">Choose...</option>
                    <option>MALE</option>
                    <option>FEMALE</option>
                </FormSelect>
                <ErrorMessage name={gender.name} component="div" className="invalid-feedback"/>
                </Col>
                </>
            )}

            {values.applicant_type === "COMPANY" && (
                <>
                <Col md="6" className="form-group">
                    <label htmlFor={company_name.name}>{company_name.label}</label>
                    <FormInput
                        name={company_name.name}
                        id={company_name.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={'form-control' + (errors[company_name.name] ? ' is-invalid' : '')}
                        value={values.company_name}
                        placeholder={company_name.label}
                        autoComplete="off"
                    />
                    <ErrorMessage name={company_name.name} component="div" className="invalid-feedback"/>
                </Col>
                <Col md="6" className="form-group">
                <label htmlFor={business_registration_number.name}>{business_registration_number.label}</label>
                <FormInput
                    name={business_registration_number.name}
                    id={business_registration_number.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={'form-control' + (errors[business_registration_number.name] ? ' is-invalid' : '')}
                    value={values.business_registration_number}
                    placeholder={business_registration_number.label}
                    autoComplete="off"
                />
                <ErrorMessage name={business_registration_number.name} component="div" className="invalid-feedback"/>
                </Col>
                </>
            )}
            
        </Row>
        <Row form className="mt-3">
            <Col md="6" className="form-group">
                <label htmlFor={country.name}>{country.label}</label>
                <FormSelect name={country.name} 
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={'form-control' + (errors[country.name] ? ' is-invalid' : '')}
                    value={values.country}>
                <option selected>Choose..</option>
                <option>UGANDA</option>
            </FormSelect>
            <ErrorMessage name={country.name} component="div" className="invalid-feedback"/>
            </Col>
            <Col md="6" className="form-group">
                <label htmlFor={physical_business_address.name}>{physical_business_address.label}</label>
                <FormInput
                    name={physical_business_address.name}
                    id={physical_business_address.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={'form-control' + (errors[physical_business_address.name] ? ' is-invalid' : '')}
                    value={values.physical_business_address}
                    placeholder={physical_business_address.label}
                    autoComplete="off"
                />
                <ErrorMessage name={physical_business_address.name} component="div" className="invalid-feedback"/>
            </Col>
        </Row>
        <Row form className="mt-3">
            <Col md="4" className="form-group">
                <label htmlFor={district.name}>{district.label}</label>
                <FormSelect name={district.name} 
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={'form-control' + (errors[district.name] ? ' is-invalid' : '')}
                    value={values.district}>
                <option selected value="">Choose..</option>
                <option>DISTI 1</option>
            </FormSelect>
            <ErrorMessage name={district.name} component="div" className="invalid-feedback"/>
            </Col>

            <Col md="4" className="form-group">
                <label htmlFor={subcounty.name}>{subcounty.label}</label>
                <FormSelect name={subcounty.name} 
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={'form-control' + (errors[subcounty.name] ? ' is-invalid' : '')}
                    value={values.subcounty}>
                <option selected value="">Choose..</option>
                <option>SUBCOUNTY 1</option>
            </FormSelect>
            <ErrorMessage name={subcounty.name} component="div" className="invalid-feedback"/>
            </Col>

            <Col md="4" className="form-group">
                <label htmlFor={village.name}>{village.label}</label>
                <FormSelect name={village.name} 
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={'form-control' + (errors[village.name] ? ' is-invalid' : '')}
                    value={values.village}>
                <option selected value="">Choose..</option>
                <option>VILLA 1</option>
                </FormSelect>
                <ErrorMessage name={village.name} component="div" className="invalid-feedback"/>
            </Col>
        </Row>
        <Row form className="mt-3">
            <Col md="4" className="form-group">
                <label htmlFor={country_of_origin.name}>{country_of_origin.label}</label>
                <FormSelect name={country_of_origin.name} 
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={'form-control' + (errors[country_of_origin.name] ? ' is-invalid' : '')}
                    value={values.country_of_origin}>
                <option selected value="">Choose..</option>
                <option>UGANDA</option>
            </FormSelect>
            <ErrorMessage name={country_of_origin.name} component="div" className="invalid-feedback"/>
            </Col>

            <Col md="4" className="form-group">
                <label htmlFor={phone.name}>{phone.label}</label>
                <FormInput
                    name={phone.name}
                    id={phone.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={'form-control' + (errors[phone.name] ? ' is-invalid' : '')}
                    value={values.phone}
                    placeholder={phone.label}
                    autoComplete="off"
                />
                <ErrorMessage name={phone.name} component="div" className="invalid-feedback"/>
            </Col>

                { values.applicant_type === "INDIVIDUAL" && (
                <Col md="4" className="form-group">
                    <label htmlFor={nin.name}>{nin.label}</label>
                    <FormInput
                        name={nin.name}
                        id={nin.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.nin}
                        className={'form-control' + (errors[nin.name] ? ' is-invalid' : '')}
                        placeholder={nin.label}
                        autoComplete="off"
                    />
                    <ErrorMessage name={nin.name} component="div" className="invalid-feedback"/>
                </Col>
                )}
        </Row>
        <Row form className="mt-3">
            <Col md="6" className="form-group">
                <label htmlFor={email_address.name}>{email_address.label}</label>
                <FormInput
                    name={email_address.name}
                    id={email_address.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={'form-control' + (errors[email_address.name] ? ' is-invalid' : '')}
                    value={values.email_address}
                    placeholder={email_address.label}
                    autoComplete="off"
                    disabled
                />
                <ErrorMessage name={email_address.name} component="div" className="invalid-feedback"/>
            </Col>
            <Col md="4" className="form-group">
                <label htmlFor={website_url.name}>{website_url.label}</label>
                <FormInput
                    name={website_url.name}
                    id={website_url.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.website_url}
                    placeholder={website_url.label}
                    autoComplete="off"
                />
                <ErrorMessage name={website_url.name} component="div" className="invalid-feedback"/>
            </Col>
        </Row>
      </>
    )
}
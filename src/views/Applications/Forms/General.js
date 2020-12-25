import React from 'react'
import { Row, Col, FormInput, FormSelect } from 'shards-react'
import { ErrorMessage } from 'formik'
import applicationModel from '../FormModel/applicationModel'
import moment from 'moment'

const SelectField = ({ md, fieldname, label, required, handleChange, handleBlur, val, errors, options }) => {
    return (
    <Col md={md || "6"} className="form-group">
        <label htmlFor={fieldname}>{label}{required && <span style={{ color: 'red'}}>*</span>}</label>
        <FormSelect name={fieldname} 
            onChange={handleChange}
            onBlur={handleBlur}
            className={'form-control' + (errors[fieldname] ? ' is-invalid' : '')}
            value={val}>
            {options.map( option => (
                <option key={option.id} value={option.value}>{option.label}</option>
            ) )}
        </FormSelect>
        <ErrorMessage name={fieldname} component="div" className="invalid-feedback"/>
    </Col>
    )
}

const InputField = ( { disabled, type, md, label, fieldname, handleChange, handleBlur, val, required, errors  } ) => {
    return (
        <Col md={ md || "6"} className="form-group">
            <label htmlFor={fieldname}>{label}: {required && <span style={{ color: 'red' }}>*</span>}</label>
            <FormInput
                type={ type || "text"}
                id={fieldname}
                name={fieldname}
                placeholder={label}
                onChange={handleChange}
                className={'form-control' + (errors[fieldname] ? ' is-invalid' : '')}
                onBlur={handleBlur}
                value={val}
                autoComplete="off"
                disabled={disabled}
            />
            <ErrorMessage name={fieldname} component="div" className="invalid-feedback"/>
        </Col>
    )
}
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
                <label htmlFor="date">Date:</label>
                <FormInput
                    id={"date"}
                    name={"date"}
                    className={'form-control'}
                    placeholder={"Date"}
                    value={moment( new Date()).format('Do MMMM YYYY')}
                    autoComplete="off"
                    disabled={true}
                />
            </Col>
            <SelectField 
                fieldname={applicant_type.name}
                val={values.applicant_type}
                label={applicant_type.label}
                handleChange={handleChange}
                handleBlur={handleBlur}
                errors={errors}
                required={true}
                options={[ 
                    { id: 1, value: "", label: "Choose..." }, 
                    { id: 2, value: "INDIVIDUAL", label: "INDIVIDUAL" },
                    { id: 3, value: "COMPANY", label: "COMPANY" },
                ]}
            />
        </Row>
        <Row form className="mt-2">
            {values.applicant_type === "INDIVIDUAL" && (
                <>
                <InputField 
                    fieldname={first_name.name}
                    required 
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    errors={errors}
                    val={values.first_name}
                    label={first_name.label}
                    md="4"
                />
                <InputField 
                    fieldname={last_name.name}
                    required 
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    errors={errors}
                    val={values.last_name}
                    label={last_name.label}
                    md="4"
                />
                <SelectField 
                    md="4"
                    fieldname={gender.name}
                    val={values.gender}
                    label={gender.label}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    errors={errors}
                    required={true}
                    options={[ 
                        { id: 1, value: "", label: "Choose..." }, 
                        { id: 2, value: "MALE", label: "MALE" },
                        { id: 3, value: "FEMALE", label: "FEMALE" },
                    ]}
            />
                </>
            )}

            {values.applicant_type === "COMPANY" && (
                <>
                    <InputField 
                        fieldname={company_name.name}
                        required 
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        errors={errors}
                        val={values.company_name}
                        label={company_name.label}
                        md="6"
                    />
                    <InputField 
                        fieldname={business_registration_number.name}
                        required 
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        errors={errors}
                        val={values.business_registration_number}
                        label={business_registration_number.label}
                        md="6"
                    />
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
            <InputField 
                fieldname={physical_business_address.name}
                required 
                handleChange={handleChange}
                handleBlur={handleBlur}
                errors={errors}
                val={values.physical_business_address}
                label={physical_business_address.label}
                md="6"
            />
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

            <InputField 
                type="number"
                fieldname={phone.name}
                required 
                handleChange={handleChange}
                handleBlur={handleBlur}
                errors={errors}
                val={values.phone}
                label={phone.label}
                md="4"
            />
            { values.applicant_type === "INDIVIDUAL" && (
                <InputField 
                    fieldname={nin.name}
                    required 
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    errors={errors}
                    val={values.nin}
                    label={nin.label}
                    md="4"
                />
            )}
        </Row>
        <Row form className="mt-3">
            <InputField 
                type="email"
                fieldname={email_address.name}
                required 
                handleChange={handleChange}
                handleBlur={handleBlur}
                errors={errors}
                val={localStorage.getItem('email_address')}
                label={email_address.label}
                md="4"
                disabled={true}
            />
            <InputField 
                fieldname={website_url.name}
                handleChange={handleChange}
                handleBlur={handleBlur}
                errors={errors}
                val={values.website_url}
                label={website_url.label}
                md="4"
            />
        </Row>
      </>
    )
}
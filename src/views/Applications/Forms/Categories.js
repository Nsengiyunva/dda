import React from 'react'
import { Row, Col, FormInput, FormSelect } from 'shards-react'
import model from '../FormModel/applicationModel'
import { ErrorMessage } from 'formik'
import data from '../fixtures'

export default props => {
    const { formField: { country_of_origin, category, category_importers, 
            product_type_importers, total_tonnage_importers,
            source_of_product, product_exported, country_of_destination,
            type_of_equipment, source_of_equipment, 
            category_of_processors, process_company_profile,
            tanker_capacity, tanker_owner, source_of_milk, 
            average_buying_price, average_selling_price, installed_capacity,
            source_of_milk_products, purpose_for_storage, volume_transported_milk,
            selling_milk_price, storage_condition, products_processed  } } = model

    const { handleBlur, handleChange, values, errors } = props

    return (
        <>
        <Row form>
            <Col md="6" className="form-group">
                    <label htmlFor={"institution_type"}>{"Type"}</label>
                    <FormSelect name={"institution_type"} 
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={'form-control' + (errors["institution_type"] ? ' is-invalid' : '')}
                        value={values.institution_type}>
                    <option value="">Choose...</option>
                    <option>Club</option>
                    <option>School</option>
                </FormSelect>
                <ErrorMessage name={"institution_type"} component="div" className="invalid-feedback"/>
                </Col>
        </Row>


            <Row form className="mt-2">
                <Col md="6" className="form-group">
                    <label htmlFor={"Name of Institution"}>{"Institution Name"}:</label>
                    <FormInput
                        id={"name_institution"}
                        name={"name_institution"}
                        placeholder={"Institution Name"} 
                        onChange={handleChange}
                        className={'form-control' + (errors["name_institution"] ? ' is-invalid' : '')}
                        onBlur={handleBlur}
                        value={values.name_institution}
                        autoComplete="Off"
                    />
                    <ErrorMessage name={"name_institution"} component="div" className="invalid-feedback"/>
                </Col>

                <Col md="6" className="form-group">
                    <label htmlFor={"executive_director"}>{"( Institution)Name of Executive Director"}</label>
                    <FormInput
                        id={"executive_director"}
                        name={"executive_director"}
                        placeholder={"( Institution)Name of Executive Director"}
                        onChange={handleChange}
                        className={'form-control' + (errors["executive_director"] ? ' is-invalid' : '')}
                        onBlur={handleBlur}
                        value={values.executive_director}
                        autoComplete="off"
                    />
                    <ErrorMessage name={"executive_director"} component="div" className="invalid-feedback"/>
                </Col> 

                
            </Row>
            <Row form>
                <Col md="6" className="form-group">
                    <label htmlFor={"head_title"}>{"Athletes /Coach/Support Personnel"}</label>
                    <FormSelect name={"head_title"} 
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={'form-control' + (errors["head_title"] ? ' is-invalid' : '')}
                        value={values.head_title}>
                    <option value="">Choose...</option>
                    <option>Athlete</option>
                    <option>Coach</option>
                    <option>Support Personnel</option>
                </FormSelect>
                    <ErrorMessage name={"head_title"} component="div" className="invalid-feedback"/>
                </Col>

                <Col md="6" className="form-group">
                    <label htmlFor={"Position_head_title"}>{"Names:"}</label>
                    <FormInput
                        id={"names_head_title"}
                        name={"names_head_title"}
                        placeholder={"Names:"}
                        onChange={handleChange}
                        className={'form-control' + (errors["names_head_title"] ? ' is-invalid' : '')}
                        onBlur={handleBlur}
                        value={values.position}
                        autoComplete="off"
                    />
                    <ErrorMessage name={"names_head_title"} component="div" className="invalid-feedback"/>
                </Col> 
            </Row>
            <Row form>
                <Col md="6" className="form-group">
                    <label htmlFor={"position"}>{"Names:"}</label>
                    <FormInput
                        id={"position"}
                        name={"position"}
                        placeholder={"Position:"}
                        onChange={handleChange}
                        className={'form-control' + (errors["position"] ? ' is-invalid' : '')}
                        onBlur={handleBlur}
                        value={values.position}
                        autoComplete="off"
                    />
                    <ErrorMessage name={"position"} component="div" className="invalid-feedback"/>
                </Col> 
            </Row>
        </>
        
    )
}
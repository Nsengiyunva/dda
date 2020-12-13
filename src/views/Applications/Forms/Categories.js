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

    const { handleBlur, handleChange, values } = props

    return (
        <>
        <Row form>
            <Col md="6" className="form-group">
                <label htmlFor={category.name}>{category.label}</label>
                <FormSelect name={category.name} 
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onBlur={handleBlur}
                    value={values.category}>
                    <option value="">Choose...</option>
                    {data.licenses.map( license => {
                        return ( <option key={license.id} value={license.name}>{license.description.toUpperCase()}</option>)
                    })}
                </FormSelect>
            </Col>

            {values.category === 'importers' && (
                <Col md="6" className="form-group">
                    <label htmlFor={category_importers.name}>{category_importers.label}</label>
                    <FormSelect id={category_importers.name} name={category_importers.name} 
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.category_importers}>
                        <option value="">Choose...</option>
                        {data.importers.map( importer => {
                            return ( <option key={importer.id} value={importer.name}>{importer.description.toUpperCase()}</option>)
                        })}
                    </FormSelect>
                    <ErrorMessage name={category_importers.name} component="div" className="invalid-feedback"/>
                </Col>
            )} 

            {values.category === 'processors' && (
                <Col md="6" className="form-group">
                    <label htmlFor={category_of_processors.name}>{category_of_processors.label}</label>
                    <FormSelect id={category_of_processors.name} name={category_of_processors.name} 
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.category_of_processors}>
                        <option value="">Choose...</option>
                        {data.processors.map( processor => {
                            return ( <option key={processor.id} value={processor.name}>{processor.description.toUpperCase()}</option>)
                        })}
                    </FormSelect>
                    <ErrorMessage name={category_of_processors.name} component="div" className="invalid-feedback"/>
                </Col>
            )}
        </Row>

        
        <hr style={{ width: '100%', border: "2px solid #c99211" }} className="mt-5"/>

        {/* The Coolers  */}
        <Row form className="my-3">
            {( values.category === 'milk_bulking'  || values.category === 'milk_collection' || values.category === 'processors' ) && (
            <Col md="6">
                <label htmlFor={installed_capacity.name}>{installed_capacity.label}:</label>
                <FormInput
                    id={installed_capacity.name}
                    name={installed_capacity.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={installed_capacity.label}
                    value={values.installed_capacity}
                    autoComplete="off"
                    type="number"
                />
                <ErrorMessage name={installed_capacity.name} component="div" className="invalid-feedback"/>
            </Col> 
            )} 

            {( values.category === 'milk_bulking' || values.category === 'milk_collection') && (
            <Col md="6">
                <label htmlFor={source_of_milk.name}>{source_of_milk.label}:</label>
                <FormInput
                    id={source_of_milk.name}
                    name={source_of_milk.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={source_of_milk.label}
                    value={values.source_of_milk}
                    autoComplete="off"
                />
                <ErrorMessage name={source_of_milk.name} component="div" className="invalid-feedback"/>
            </Col>
            )}

            {values.category === 'processors' && (
            <Col md="4">
                <label htmlFor={products_processed.name}>{products_processed.label}:</label>
                <FormInput
                    id={products_processed.name}
                    name={products_processed.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={products_processed.label}
                    value={values.products_processed}
                    autoComplete="off"
                />
                <ErrorMessage name={products_processed.name} component="div" className="invalid-feedback"/>
            </Col>
            )}
        </Row>

        {values.category === 'milk_tankers_and_transporters' && (
        <>
        <Row form className="my-3">
            <Col md="6">
                <label htmlFor={tanker_capacity.name}>{tanker_capacity.label}:</label>
                <FormInput
                    id={tanker_capacity.name}
                    name={tanker_capacity.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={tanker_capacity.label}
                    value={values.tanker_capacity}
                    autoComplete="off"
                />
            </Col>
            <Col md="6">
                <label htmlFor={tanker_owner.name}>{tanker_owner.label}:</label>
                <FormInput
                    id={tanker_owner.name}
                    name={tanker_owner.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={tanker_owner.label}
                    value={values.tanker_owner}
                    autoComplete="off"
                />
            </Col>
        </Row>
        <Row form className="mt-3">
            <Col md="6">
                <label htmlFor={source_of_milk.name}>{source_of_milk.label}:</label>
                <FormInput
                    id={source_of_milk.name}
                    name={source_of_milk.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={source_of_milk.label}
                    value={values.source_of_milk}
                    autoComplete="off"
                />
            </Col>
            <Col md="6">
                <label htmlFor={volume_transported_milk.name}>{volume_transported_milk.label}:</label>
                <FormInput
                    id={volume_transported_milk.name}
                    name={volume_transported_milk.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={volume_transported_milk.label}
                    value={values.volume_transported_milk}
                    autoComplete="off"
                    type="number"
                />
            </Col>
        </Row>
        </>
        )}

        {( values.category === 'milk_collection' || values.category === 'milk_bulking'  ||  values.category === 'milk_sales' || values.category === 'milk_tankers_and_transporters' ) && (
        <Row form className="my-3">
            <Col md="6">
                <label htmlFor={average_buying_price.name}>{average_buying_price.label}:</label>
                <FormInput
                    id={average_buying_price.name}
                    name={average_buying_price.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={average_buying_price.label}
                    value={values.average_buying_price}
                    autoComplete="off"
                    type="number"
                />
            </Col>
                
            <Col md="6">
                <label htmlFor={average_selling_price.name}>{average_selling_price.label}:</label>
                <FormInput
                    id={average_selling_price.name}
                    name={average_selling_price.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={average_selling_price.label}
                    value={values.average_selling_price}
                    autoComplete="off"
                    type="number"
                />
            </Col>
        </Row>
        )}
        {values.category === 'stores' && (
        <>
        <Row form className="my-3">
            <Col md="6">
                <label htmlFor={source_of_milk_products.name}>{source_of_milk_products.label}:</label>
                <FormInput
                    id={source_of_milk_products.name}
                    name={source_of_milk_products.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={source_of_milk_products.label}
                    value={values.source_of_milk_products}
                    autoComplete="off"
                />
            </Col>
            <Col md="6">
                <label htmlFor={purpose_for_storage.name}>{purpose_for_storage.label}:</label>
                <FormInput
                    id={purpose_for_storage.name}
                    name={purpose_for_storage.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={purpose_for_storage.label}
                    value={values.purpose_for_storage}
                    autoComplete="off"
                />
            </Col>
            
        </Row>

        <Row form className="my-3">
            <Col md="6">
                <label htmlFor={selling_milk_price.name}>{selling_milk_price.label}:</label>
                <FormInput
                    id={selling_milk_price.name}
                    name={selling_milk_price.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={selling_milk_price.label}
                    value={values.selling_milk_price}
                    autoComplete="off"
                />
            </Col>
            <Col md="6">
                <label htmlFor={storage_condition.name}>{storage_condition.label}:</label>
                <FormInput
                    id={storage_condition.name}
                    name={storage_condition.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={storage_condition.label}
                    value={values.storage_condition}
                    autoComplete="off"
                />
            </Col>
        </Row>
        </>
        )}

        {( values.category === 'exporter_of_milk_products') && (
        <Row form className="my-3">
            <Col md="4">
                <label htmlFor={source_of_product.name}>{source_of_product.label}:</label>
                <FormInput
                    id={source_of_product.name}
                    name={source_of_product.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={source_of_product.label}
                    value={values.source_of_product}
                    autoComplete="off"
                />
            </Col>

            <Col md="4">
                <label htmlFor={product_exported.name}>{product_exported.label}:</label>
                <FormInput
                    id={product_exported.name}
                    name={product_exported.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={product_exported.label}
                    value={values.product_exported}
                    autoComplete="off"
                />
            </Col>

            <Col md="4">
                <label htmlFor={country_of_destination.name}>{country_of_destination.label}:</label>
                <FormInput
                    id={country_of_destination.name}
                    name={country_of_destination.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={country_of_destination.label}
                    value={values.country_of_destination}
                    autoComplete="off"
                />
            </Col>
        </Row>
        ) }

        {( values.category === 'importers' && values.category_importers === 'importer_of_milk_products' ) &&  (
            <Row form className="my-3">
                <Col md="6">
                    <label htmlFor={product_type_importers.name}>{product_type_importers.label}:</label>
                    <FormInput
                        id={product_type_importers.name}
                        name={product_type_importers.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder={product_type_importers.label}
                        value={values.product_type_importers}
                        autoComplete="off"
                    />
                </Col>

                <Col md="6">
                    <label htmlFor={total_tonnage_importers.name}>{total_tonnage_importers.label}:</label>
                    <FormInput
                        id={total_tonnage_importers.name}
                        name={total_tonnage_importers.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder={total_tonnage_importers.label}
                        value={values.total_tonnage_importers}
                        autoComplete="off"
                    />
                </Col>
            </Row>
            )}

            {values.category_importers === 'importer_of_ingredients' && (
            <Row form className="my-3">
                <Col md="6">
                    <label htmlFor={country_of_origin.name}>{country_of_origin.label}:</label>
                    <FormInput
                        id={country_of_origin.name}
                        name={country_of_origin.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder={country_of_origin.label}
                        value={values.country_of_origin}
                        autoComplete="off"
                    />
                </Col>
            </Row>
            )}
            {values.category_importers === 'importer_of_equipment' && (
                <Row form className="my-3">
                    <Col md="6">
                        <label htmlFor={source_of_equipment.name}>{source_of_equipment.label}:</label>
                        <FormInput
                            id={source_of_equipment.name}
                            name={source_of_equipment.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder={source_of_equipment.label}
                            value={values.source_of_equipment}
                            autoComplete="off"
                        />
                    </Col>
                    <Col md="6">
                        <label htmlFor={type_of_equipment.name}>{type_of_equipment.label}:</label>
                        <FormInput
                            id={type_of_equipment.name}
                            name={type_of_equipment.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder={type_of_equipment.label}
                            value={values.type_of_equipment}
                            autoComplete="off"
                        />
                    </Col>
                </Row>
            )}
    </>
    )
}
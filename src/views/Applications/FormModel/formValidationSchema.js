import * as Yup from 'yup'
import model from './applicationModel'

const { formField: { 
      first_name, last_name, gender, company_name, 
      district, subcounty, village, applicant_type,
      nin, country, country_of_origin, phone, email_address, 
      business_registration_number, physical_business_address,
      category, category_importers, product_type_importers, total_tonnage_importers,
      source_of_product, product_exported, country_of_destination,
      type_of_equipment, source_of_equipment, products_processed,
      category_of_processors, tanker_capacity, tanker_owner, source_of_milk, 
      average_buying_price, average_selling_price, volume_transported_milk, installed_capacity,
      source_of_milk_products, purpose_for_storage,
      selling_milk_price, storage_condition, 
      certificate_of_registration, monthly_returns, certificate_of_analysis,
      veterinary_certificate, certificate_of_origin, distribution_plan, product_recall_plan } } = model

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export default [
  Yup.object().shape({
    [applicant_type.name]: Yup.string().required(`${applicant_type.requiredErrorMsg}`),
    [physical_business_address.name]: Yup.string().required(`${physical_business_address.requiredErrorMsg}`),
    [first_name.name]: Yup.string().when( [applicant_type.name], {
      is: 'INDIVIDUAL',
      otherwise: Yup.string().notRequired(),
      then: Yup.string().required(`${first_name.requiredErrorMsg}`)
    } ),
    [last_name.name]: Yup.string().when( [applicant_type.name], {
      is: 'INDIVIDUAL',
      otherwise: Yup.string().notRequired(),
      then: Yup.string().required(`${last_name.requiredErrorMsg}`)
    } ),
    [gender.name]: Yup.string().when( [applicant_type.name], {
      is: 'INDIVIDUAL',
      otherwise: Yup.string().notRequired(),
      then: Yup.string().required(`${gender.requiredErrorMsg}`)
    } ),
    [nin.name]: Yup.string().when( [applicant_type.name], {
      is: 'INDIVIDUAL',
      otherwise: Yup.string().notRequired(),
      then: Yup.string().min(12, 'NIN should be at least 12 characters').required(`${nin.requiredErrorMsg}`)
    } ),
    [business_registration_number.name]: Yup.string().when( [applicant_type.name], {
      is: 'COMPANY',
      otherwise: Yup.string().notRequired(),
      then: Yup.string().required(`${business_registration_number.requiredErrorMsg}`)
    } ),
    [company_name.name]: Yup.string().when( [applicant_type.name], {
      is: 'COMPANY',
      otherwise: Yup.string().notRequired(),
      then: Yup.string().required(`${company_name.requiredErrorMsg}`)
    } ),
    [email_address.name]: Yup.string().email().required(`${email_address.requiredErrorMsg}`),
    [district.name]: Yup.string().required(`${district.requiredErrorMsg}`),
    [subcounty.name]: Yup.string().required(`${subcounty.requiredErrorMsg}`),
    [village.name]: Yup.string().required(`${village.requiredErrorMsg}`),
    [country.name]: Yup.string().required(`${country.requiredErrorMsg}`),
    [country_of_origin.name]: Yup.string().required(`${country_of_origin.requiredErrorMsg}`),
    [phone.name]: Yup.string().min(10, 'Phone Number should be at least 10 characters').required(`${phone.requiredErrorMsg}`).matches(phoneRegExp, 'Phone number is not valid')
  }),
  Yup.object().shape({
    [category_importers.name]: Yup.string().when( [category.name], {
      is: '7',
      otherwise: Yup.string().notRequired(),
      then: Yup.string().required(`${category_importers.requiredErrorMsg}`)
    }),
    [product_type_importers.name]: Yup.string().when( [category_importers.name], {
      is: '1',
      otherwise: Yup.string().notRequired(),
      then: Yup.string().required(`${product_type_importers.requiredErrorMsg}`)
    }),
    [total_tonnage_importers.name]: Yup.string().when( [category_importers.name], {
      is: '1',
      otherwise: Yup.string().notRequired(),
      then: Yup.string().required(`${total_tonnage_importers.requiredErrorMsg}`)
    }),
    [total_tonnage_importers.name]: Yup.string().when( [category_importers.name], {
      is: '1',
      otherwise: Yup.string().notRequired(),
      then: Yup.string().required(`${total_tonnage_importers.requiredErrorMsg}`)
    }),
    [category_importers.name]: Yup.string( [ category.name ], {
      is: '7',
      otherwise: Yup.string().notRequired(),
      then: Yup.string().required(`${category_importers.requiredErrorMsg}`)
    } ),
    [category_of_processors.name]: Yup.string( [ category.name ], {
      is: '6',
      otherwise: Yup.string().notRequired(),
      then: Yup.string().required(`${category_of_processors.requiredErrorMsg}`)
    } ),
    [installed_capacity.name]: Yup.string( [ category.name ], {
      is: '1', //2,1,5
      otherwise: Yup.string().notRequired(),
      then: Yup.string().required(`${installed_capacity.requiredErrorMsg}`)
    } ),
    [source_of_milk.name]: Yup.string( [ category.name ], {
      is: '1', //1,2
      otherwise: Yup.string().notRequired(),
      then: Yup.string().required(`${source_of_milk.requiredErrorMsg}`)
    } ),
    [products_processed.name]: Yup.string( [ category.name ], {
      is: '5', //1,2
      otherwise: Yup.string().notRequired(),
      then: Yup.string().required(`${products_processed.requiredErrorMsg}`)
    } ),
    [tanker_capacity.name]: Yup.string( [ category.name ], {
      is: '4', //1,2
      otherwise: Yup.string().notRequired(),
      then: Yup.string().required(`${tanker_capacity.requiredErrorMsg}`)
    } ),
    [tanker_owner.name]: Yup.string( [ category.name ], {
      is: '4', //1,2
      otherwise: Yup.string().notRequired(),
      then: Yup.string().required(`${tanker_owner.requiredErrorMsg}`)
    } ),
    [source_of_milk.name]: Yup.string( [ category.name ], {
      is: '4', //1,2
      otherwise: Yup.string().notRequired(),
      then: Yup.string().required(`${source_of_milk.requiredErrorMsg}`)
    } ),
    [average_buying_price.name]: Yup.string( [ category.name ], {
      is: '4', //1,2,3,4
      otherwise: Yup.string().notRequired(),
      then: Yup.string().required(`${average_buying_price.requiredErrorMsg}`)
    } ), 
    [average_selling_price.name]: Yup.string( [ category.name ], {
      is: '4', //1,2,3,4
      otherwise: Yup.string().notRequired(),
      then: Yup.string().required(`${average_selling_price.requiredErrorMsg}`)
    } ),
    [source_of_milk_products.name]: Yup.string( [ category.name ], {
      is: '9', //1,2,3,4
      otherwise: Yup.string().notRequired(),
      then: Yup.string().required(`${source_of_milk_products.requiredErrorMsg}`)
    } ),
    [purpose_for_storage.name]: Yup.string( [ category.name ], {
      is: '9', //1,2,3,4
      otherwise: Yup.string().notRequired(),
      then: Yup.string().required(`${purpose_for_storage.requiredErrorMsg}`)
    } ),
    [selling_milk_price.name]: Yup.string( [ category.name ], {
      is: '9', //1,2,3,4
      otherwise: Yup.string().notRequired(),
      then: Yup.string().required(`${selling_milk_price.requiredErrorMsg}`)
    } ),
    [storage_condition.name]: Yup.string( [ category.name ], {
      is: '9', //1,2,3,4
      otherwise: Yup.string().notRequired(),
      then: Yup.string().required(`${storage_condition.requiredErrorMsg}`)
    } ),
    [source_of_product.name]: Yup.string( [ category.name ], {
      is: '6', //1,2,3,4
      otherwise: Yup.string().notRequired(),
      then: Yup.string().required(`${source_of_product.requiredErrorMsg}`)
    } ),
    [product_exported.name]: Yup.string( [ category.name ], {
      is: '6', //1,2,3,4
      otherwise: Yup.string().notRequired(),
      then: Yup.string().required(`${product_exported.requiredErrorMsg}`)
    } ),
    [country_of_destination.name]: Yup.string( [ category.name ], {
      is: '6', //1,2,3,4
      otherwise: Yup.string().notRequired(),
      then: Yup.string().required(`${country_of_destination.requiredErrorMsg}`)
    } ),
    [product_type_importers.name]: Yup.string( [ category_importers.name ], {
      is: '1', //1,2,3,4
      otherwise: Yup.string().notRequired(),
      then: Yup.string().required(`${product_type_importers.requiredErrorMsg}`)
    } ),
    [total_tonnage_importers.name]: Yup.string( [ category_importers.name ], {
      is: '1', //1,2,3,4
      otherwise: Yup.string().notRequired(),
      then: Yup.string().required(`${total_tonnage_importers.requiredErrorMsg}`)
    } ),
    [source_of_equipment.name]: Yup.string( [ category_importers.name ], {
      is: '3', //1,2,3,4
      otherwise: Yup.string().notRequired(),
      then: Yup.string().required(`${source_of_equipment.requiredErrorMsg}`)
    } ),
    [type_of_equipment.name]: Yup.string( [ category_importers.name ], {
      is: '3', //1,2,3,4
      otherwise: Yup.string().notRequired(),
      then: Yup.string().required(`${type_of_equipment.requiredErrorMsg}`)
    } ),
    [volume_transported_milk.name]: Yup.string( [ category.name ], {
      is: '4', //1,2,3,4
      otherwise: Yup.string().notRequired(),
      then: Yup.string().required(`${volume_transported_milk.requiredErrorMsg}`)
    } )
  })
];
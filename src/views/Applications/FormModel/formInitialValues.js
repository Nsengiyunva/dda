import applicationModel from './applicationModel'

const { formField: {  
    username, password, 
    applicant_type,first_name, last_name,company_name, gender, 
    physical_business_address, district, subcounty, village,
    business_registration_number, phone, email_address,
    country, country_of_origin, website_url, nin,
    category, category_importers, product_type_importers, total_tonnage_importers,
    source_of_product, product_exported, country_of_destination,
    type_of_equipment, source_of_equipment, products_processed,
    category_of_processors, tanker_capacity, tanker_owner, source_of_milk, 
    average_buying_price, average_selling_price, volume_transported_milk, installed_capacity,
    source_of_milk_products, purpose_for_storage,
    selling_milk_price, storage_condition, 
  }, registerField: {
    firstname, lastname, emailaddress, register_password, phonenumber, institution
  } } = applicationModel

export default [ {
    loginInitials : {
        [username.name]: "",
        [password.name]: ""
    },
    registerInitials: {
      [firstname.name]: "",
      [lastname.name]: "",
      [register_password.name]: "",
      [phonenumber.name]: "",
      [emailaddress.name]: "",
      [institution.name]: ""
    },
    application: {
      [applicant_type.name]: "",
      [first_name.name]: "",
      [last_name.name]: "",
      [gender.name]: "",
      [company_name.name]: "",
      [business_registration_number.name]: "",
      [physical_business_address.name]: "",
      [district.name]: "",
      [subcounty.name]: "",
      [village.name]: "",
      [country.name]: "",
      [country_of_origin.name]: "",
      [nin.name]: "",
      [phone.name]: "",
      [website_url.name]: "",
      [email_address.name]: localStorage.getItem("email_address"),
      [category.name]: "",
      [category_importers.name]: "",
      [product_type_importers.name]: "",
      [total_tonnage_importers.name]: "",
      [source_of_product.name]: "",
      [product_exported.name]: "",
      [country_of_destination.name]: "",
      [type_of_equipment.name]: "",
      [source_of_equipment.name]: "",
      [products_processed.name]: "",
      [category_of_processors.name]: "",
      [tanker_capacity.name]: "",
      [tanker_owner.name]: "",
      [source_of_milk.name]: "",
      [average_buying_price.name]: "",
      [average_selling_price.name]: "",
      [volume_transported_milk.name]: "",
      [installed_capacity.name]: "",
      [source_of_milk_products.name]: "",
      [purpose_for_storage.name]: "",
      [selling_milk_price.name]: "",
      [storage_condition.name]: "",
    }
  }
] 
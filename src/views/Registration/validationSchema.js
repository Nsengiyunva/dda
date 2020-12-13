import * as Yup from 'yup'
import registrationFields  from './formModel'

const { date, type, category, first_name, last_name, others, company_name, gender,
    country, district, subcounty, village, physical_address, telephone,
    type_of_license, expected_volumes, types, website 
} = registrationFields

export default {
        registration: Yup.object().shape({
            [date.name]: Yup.string().required(`${date.error}`),
            [category.name]: Yup.string().required(`${category.error}`),
            [district.name]: Yup.string().required(`${district.error}`),
            [subcounty.name]: Yup.string().required(`${subcounty.error}`),
            [village.name]: Yup.string().required(`${village.error}`),
            [physical_address.name]: Yup.string().required(`${physical_address.error}`),
            [telephone.name]: Yup.string().required(`${telephone.error}`),
            [country.name]: Yup.string().required(`${country.error}`),
            [type_of_license.name]: Yup.string().required(`${type_of_license.error}`),
            [first_name.name]: Yup.string().when( [category.name], {
                is: 'individual',
                then: fieldSchema => fieldSchema.required('First Name is Required')
            } ),
            [last_name.name]: Yup.string().when( [category.name], {
                is: 'individual',
                then: fieldSchema => fieldSchema.required('Last Name is Required')
            } ),
            [gender.name]: Yup.string().when( [category.name], {
                is: 'individual',
                then: fieldSchema => fieldSchema.required('Gender is Required')
            } ),
            [company_name.name]: Yup.string().when( [category.name], {
                is: 'company',
                then: fieldSchema => fieldSchema.required('Company Name is Required')
            } )
        })
}
    
        
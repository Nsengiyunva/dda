import registrationFields  from "./formModel"
import moment from 'moment'

const { date, type, category, first_name, last_name, others, company_name, gender,
        country, district, subcounty, village, physical_address, telephone,
        type_of_license, expected_volumes, types, website 
    } = registrationFields

export default {
    [date.name]: moment( new Date() ).format('DD-MM-YYYY'),
    [category.name]: "",
    [first_name.name]: "",
    [last_name.name]: "",
    [others.name]: "",
    [gender.name]: "",
    [country.name]: "UGANDA",
    [district.name]: "",
    [subcounty.name]: "",
    [village.name]: "",
    [physical_address.name]: "",
    [telephone.name]: "",
    [type_of_license.name]: "",
    [types.name]: "",
    [expected_volumes.name]: "",
    [website.name]: "",
}
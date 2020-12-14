import * as Yup from 'yup'
import applicationModel from './applicationModel'

const { formField : { username, password }, registerField: 
    { firstname, lastname, phonenumber, emailaddress, register_password } } = applicationModel

export default [
    Yup.object().shape({
        [username.name]: Yup.string().email().required(`${username.requiredErrorMsg}`),
        [password.name]: Yup.string().required(`${password.requiredErrorMsg}`).min( 4, 'Password should be at least 4 characters long'),
    }),
    Yup.object().shape({
        [firstname.name]: Yup.string().min( 2, 'First Name should be more than 2 characters').required(`${firstname.requiredErrorMsg}`),
        [lastname.name]: Yup.string().min( 2, 'First Name should be more than 2 characters').required(`${lastname.requiredErrorMsg}`),
        [emailaddress.name]: Yup.string().email().required(`${emailaddress.requiredErrorMsg}`),
        [phonenumber.name]: Yup.number().required(`${phonenumber.requiredErrorMsg}`),
        [register_password.name]: Yup.string().required(`${register_password.requiredErrorMsg}`).min( 4, 'Password should be at least 4 characters long'),
    })
]
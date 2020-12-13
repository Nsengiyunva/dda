import * as Yup from 'yup'
import applicationModel from './applicationModel'

const { formField : { username, password } } = applicationModel

export default [
    Yup.object().shape({
        [username.name]: Yup.string().email().required(`${username.requiredErrorMsg}`),
        [password.name]: Yup.string().required(`${password.requiredErrorMsg}`).min( 4, 'Password should be at least 4 characters long'),
    })
]
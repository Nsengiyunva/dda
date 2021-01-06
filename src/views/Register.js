import React, { useState } from 'react'
import { Row, Col, Button } from 'shards-react'
// import logo from '../images/dda_logo.png'
import Axios from "axios"
import Header from '../components/header'
import './styles.css'

const Register = props => {
    const [ formfields, setFields ] = useState({})

    const handleChange = ( event, name ) => {
        // console.log( event.target?.value )
        setFields( {
            ...formfields, [ name ]: event.target?.value
        } )
    }
    const _handleSubmit = e => {
        e.preventDefault()
        Axios.post("http://localhost:4000/users/register", {
            first_name: formfields.first_name,
            last_name: formfields.last_name,
            email_address: formfields.email_address,
            password: formfields.password,
            role: "USER"
        } ).then( response => {
            if( response.data.status === "success"){
                alert("Your account has been added. An email will be sent to you to confirm the account")
                props.history.push("/")
            } else {
                alert("error occured")
            }
        } ).catch( error => {
            // console.log( error )
            alert("error occured")
        } )
    }

    return(
        <>
        <Header history={props.history} />
            <div className="container" style={{ paddingTop: "25vh" }}>
                
            <div className="registration-form">
            <h4 style={{ textTransform: "uppercase", textAlign: "center"}}>Register for An Account</h4>
                <form id="sign-in" onSubmit={_handleSubmit}>
                    <input type="hidden" />

                    <div className="form-group">
                         <input type="text" className="form-control item" 
                            id="first_name" 
                            name="first_name"
                            placeholder="First Name" 
                            name="first_name" 
                            onChange={e  => handleChange(e, "first_name")}
                            autoComplete="off"
                            required />
                    </div>

                    <div className="form-group">
                         <input type="text" className="form-control item" 
                            id="last_name" 
                            name="last_name"
                            placeholder="Last Name" 
                            name="last_name" 
                            onChange={e  => handleChange(e, "last_name")}
                            autoComplete="off"
                            required />
                    </div>

                    <div className="form-group">
                         <input type="text" className="form-control item" 
                            id="email_address" 
                            name="email_address"
                            placeholder="Email Address" 
                            name="email_address" 
                            onChange={e  => handleChange(e, "email_address")}
                            autoComplete="off"
                            required />
                    </div>

                    <div className="form-group">
                         <input type="number" className="form-control item" 
                            id="phone" 
                            name="phone"
                            placeholder="Phone Number" 
                            onChange={e  => handleChange(e,"phone")}
                            name="phone" 
                            autoComplete="off"
                            required />
                    </div>

                    <div className="form-group">
                         <input type="password" className="form-control item" 
                            id="password" 
                            name="password"
                            placeholder="Password" 
                            onChange={e  => handleChange(e, "password")}
                            name="password" 
                            autoComplete="off"
                            required />
                    </div>

                    <div className="form-group">
                        <Button type="submit" theme="danger" className="btn btn-block create-account">
                            Create Account 
                        </Button>
                    </div>

                    <div className="row" style={{ justifyContent: "center" }}>
                        <div>
                            <div className="loader center" id="loading" />
                        </div>
                    </div>
                </form>
            </div>
            </div>
        </>
        
    )
}
export default Register
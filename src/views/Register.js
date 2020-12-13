import React from 'react'
import { Row, Col, Button } from 'shards-react'
import logo from '../images/dda_logo.png'
import './styles.css'

const Register = props => {

    return(
        <div className="container">
            <div className="registration-form">
                <form id="sign-in" method="post">
                    <input type="hidden" />

                    <div className="form-group">
                         <input type="text" className="form-control item" 
                            id="email_address" 
                            placeholder="Email Address" 
                            name="email_address" 
                            autoComplete="off"
                            required />
                    </div>

                    <div className="form-group">
                         <input type="password" className="form-control item" 
                            id="password" 
                            placeholder="Password" 
                            name="password" 
                            autoComplete="off"
                            required />
                    </div>

                    <div className="form-group">
                         <input type="password" className="form-control item" 
                            id="confirm_password" 
                            placeholder="Confirm Password" 
                            name="confirm_password" 
                            autoComplete="off"
                            required />
                    </div>

                    <div className="form-group">
                        <Button theme="danger" className="btn btn-block create-account" onClick={ () => alert( 'register' ) }>
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
    )
}
export default Register
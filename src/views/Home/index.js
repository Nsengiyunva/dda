import React, { useState } from 'react'
import Header from '../../components/header'
import { Container, Button } from 'shards-react'

const GuideLine = props => {
    return (
        <>
            <h6>{props.label}</h6>
            <div className="mb-3 my-2" style={{ display: "block", color: "black",backgroundColor: "#DDD" }}>
                <ul className="py-2 px-2" style={{ listStyleType: "none" }}>
                    <li className="p-2">1. Before you make an Application, you need to register for an account first,
                    A new account requires a valid Email Address, Name and Valid Phone Number.
                    An auto generated password will be sent to your Email Address.</li>
                    <li className="p-2">2. Files to be Attached can be in the PDF Format or Word Documents.</li>
                    <li className="p-2">3. After Submitting the Application, you will have to make a payment either using mobile money or attaching a receipt.</li>
                </ul>
            </div>
        </>
    )
}

export default props => {

    const[ displayGuide, setDisplayGuide ] = useState( false )

    return (
        <div style={{ backgroundColor: "white"}}>
            <Header history={props.history}/>
            <Container style={{  width: "100vw", 
                height: "100vh", 
                paddingTop: "15vh", 
                display: "flex",
                justifyContent: "center",
                alignItems: "center" }}>
                <div style={{
                    border: "1px solid #ddd", 
                    boxShadow: "5px 5px 2px #ddd",
                    width: "100%", 
                    height: "50vh",
                    display: "flex",
                    flexDirection: "column",
                    padding: "0.5em"
                    }}>
                    <h3 style={{ alignSelf: "center", }}>
                        Welcome to Uganda Swimming Federation
                    </h3>
                    <GuideLine 
                        label="Making a New Application" 
                        display={displayGuide} />

                    <Button style={{ width: "15rem", padding: "1rem", alignSelf: "center" }} 
                            theme="warning" onClick={() => props.history.push("/services")}>
                        Go to Services
                    </Button>
                </div>
            </Container>
        </div>
    )
}

import React from 'react'
import Header from '../components/header'
import { Container, Button } from 'shards-react'

const Link = ( { label, path} ) => {
  return (
    <div style={{ fontSize: '1rem', borderBottom: "1px solid #ddd", padding: "0.5rem" }}>
      <a href="javascript:void(0)" onClick={path}>
        {label}
      </a>
    </div>
  )
}

export default props => {
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
                    width: "100%", 
                    height: "80vh",
                    display: "flex",
                    flexDirection: "column",
                    }}>
                    <h3 style={{ alignSelf: "center", }}>
                       Services
                    </h3>
                    <Link label={"1. Register for A User Account and Login"} 
                      path={() => props.history.push('/register')} />
                    <Link label={"2. Make New Membership Application"} 
                      path={() => { 
                        if( localStorage.getItem("email_address")?.length > 0 ) {
                          return props.history.push( '/new-membership' )
                        }
                        else { 
                          return props.history.push('/sign-in', { "stage": "application"} ) 
                        }
                      } } />
                    <Link label={"3. Transfer the coaches"} 
                      path={() => props.history.push('/transfer-athlete')} />
                    <Link label={"4. Athletes / Coaches Profile"} 
                      path={() => props.history.push('/athletes')} />
                    <Link label={"5. Submit Quaterly Reports"} 
                      path={() => props.history.push('/report')} />
                    <Link label={"6. Payment"} 
                      path={() => props.history.push('/payment')} />
                </div>
            </Container>
        </div>
    )
}

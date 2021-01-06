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
                      path={() => props.history.push('/new-membership')} />
                    <Link label={"3. Transfer the coaches"} 
                      path={() => props.history.push('/transfer')} />
                    <Link label={"4. Athletes Profile"} 
                      path={() => props.history.push('/athletes-profile')} />
                    <Link label={"5. Submit Quaterly Reports"} 
                      path={() => props.history.push('/athletes-profile')} />
                </div>
            </Container>
        </div>
    )
}

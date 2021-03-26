import { Divider } from "@material-ui/core"
import React from "react"
import logo from "../../images/usf-logo.jpg"
import "../../views/styles.css"

const Header = props => {
    const handleLogout = () => {
        localStorage.clear()
        props.history.push("/")
    }
    return (
    <header id="header" className="fixed-top " style={{ backgroundColor: "#322f30" }}>
        <div className="container d-flex align-items-center">

        <div className="logo mr-auto" style={{ display: 'flex', flexDirection: 'column'}}>
            {/* <a href="#"> */}
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                    <img src={logo} style={{ objectFit: 'contain'}}/>
                    <div className="ml-1" style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <span className="p-1" style={{ fontSize: "12px", color: "white"}}>UGANDA</span>
                        <span className="p-1" style={{ fontSize: "12px", color: "white"}}>SWIMMING</span>
                        <span className="p-1" style={{ fontSize: "12px", color: "white" }}>FEDERATION</span>
                    </div>
                </div>
            {/* </a> */}
        </div>
        

        <nav className="nav-menu d-none d-lg-block">
            <ul>
                <li><a href="/">Home</a></li>
                {!( localStorage.getItem('role')?.length > 0 ) ? 
                 <li><a href="/sign-in">Login</a></li> :
                 <li className="drop-down" style={{ color: "red" }}>
                     <a>{localStorage.getItem("email_address")}</a>
                     <ul>
                        <li> 
                        <a href="javascript:void(0)" onClick={() => handleLogout()}>
                         Logout
                        </a>
                        </li>
                        <li><a href="/applications">My Applications</a></li>
                    </ul>
                </li>
                }
                {/* <li className="drop-down"><a href="#">apply for membership</a>
                    <ul>
                        <li> <a href="#">Profile</a></li>
                    </ul>
                </li> */}

                {/* <li className="drop-down"><a href="#">email</a>
                    <ul>
                        <li className="drop-down"> <a href="">My Profile</a>
                            <ul>
                                <li><a href="#">View</a></li>
                            </ul>
                        </li>

                        <li> <a href="/applications">My Applications</a></li>

                        <li className="drop-down"> <a href="#">Settings</a>
                            <ul>
                                <li><a href="#">Change Password</a></li>
                            </ul>
                        </li>

                        <li> <a href="javascript:void(0)" onClick={ () => handleLogout()}>Logout</a> </li>
                    </ul>
                </li> */}
            </ul>
        </nav>
        </div>
  </header>
    )
}
export default Header
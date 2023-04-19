import React from 'react'
import "./Navbar.css"


function Navbar({ user }) {

    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        window.location.replace("/")
    }

    return (
        <div className='navbarBigBox'>
            <nav className="navbar navbar-expand-lg">
                <div>
                    <img style={{width:"35px", height:"35px", marginLeft:"20px"}} 
                    src='https://play-lh.googleusercontent.com/KNInXD9XRXJPXtWEGWvNf_MnT664xCO3yBr-KP9wmogIPplkyQcZLahhCmf3h1mtldmz'alt='eoror'/>
                </div>
                
                <div id="navbarDP" >
                    <a href='/profile'><img id="navbarProfile" src={user.profile} alt="Loading" /></a>
                    <img id="logoutImage" src="https://cdn.iconscout.com/icon/premium/png-128-thumb/logout-1-110657.png" onClick={logout} />
                </div>
            </nav>
        </div>
    )
}

export default Navbar
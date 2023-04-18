import React from 'react'
import "./Navbar.css"


function Navbar({ user, userLogin }) {

    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
    }

    return (
        <div className='navbarBigBox'>
            <nav className="navbar navbar-expand-lg">    
                <div id="navbarDP">
                    {userLogin ? <a href='/Profile'><img id="navbarProfile" src={user.profile} alt="Loading" /></a> :
                        <a className="nav-link active" href="/Login"><i id='loginIcon' class="fa-solid fa-user"></i></a>}
                </div>
            </nav>
        </div>
    )
}

export default Navbar
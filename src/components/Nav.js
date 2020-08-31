import React from 'react'
import { Link } from 'react-router-dom';
import TokenService from '../services/token-service'
import '../styles/Nav.css'

function Nav(){
    function handleLogout(){
        TokenService.clearAuthToken()
    }
    return(
        <div className="nav">
            <div className="logo">DreamDiary</div>
            <div className="auth-links">
                <Link to="/" onClick={handleLogout}>Sign Out</Link>
            </div>
        </div>
    )
}

export default Nav
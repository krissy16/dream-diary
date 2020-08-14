import React from 'react'
import { Link } from 'react-router-dom';
import '../styles/Nav.css'

function Nav(){
    return(
        <div className="nav">
            <div className="logo">DreamDiary</div>
            <div className="auth-links">
                <Link to="/">Sign Out</Link>
            </div>
        </div>
    )
}

export default Nav
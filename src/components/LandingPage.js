import React from 'react'
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css'

function LandingPage(){
    return(
        <div className="closed-book">
          <h1 className="book title">Dream Diary</h1>
          <p className="instructions">Record all your dreams in one place! Just click the lock to get started</p>
          <div className="strap">
            <Link className="lock" to="/register">
              <div className="circle"></div><div className="rectangle"></div>
            </Link>
          </div>
        </div>
    )
}

export default LandingPage
import React from 'react'
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css'

function LandingPage(){
    return(
        <div className="closed-book">
          <h1 className="book title">Dream Diary</h1>
          <p className="instructions">Record all your dreams in one place! Just click the lock to get started.</p>
          <p className="instructions credentials">Don't feel like making an account yet?  Use the demo account credentials:  
              <br />Email: test@email.com   
              <br />Password: Test123!</p>
          <div className="strap">
            <Link className="lock" to="/login">
              <div className="circle"></div><div className="rectangle"></div>
            </Link>
          </div>
        </div>
    )
}

export default LandingPage
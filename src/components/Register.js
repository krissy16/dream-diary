import React from 'react'
import { Link } from 'react-router-dom';
import '../styles/Register.css'
import LandingPage from './LandingPage'

function Register(props){
    function authorize(){
        props.history.push('/login')
    }
    return(
        <>
            <LandingPage />
            <div className="register-form" >
                <h2>Register</h2>
                <form>
                <span className="input-group">
                    <label htmlFor="email"> Email: </label>
                    <input id="email" type="email" />
                </span>
                <span className="input-group">
                    <label htmlFor="password">Password: </label>
                    <input id="password" type = "password" />
                </span>
                <span className="input-group">
                    <label htmlFor="confirm-password">Confirm Password: </label>
                    <input id="confirm-password" type = "password" />
                </span>
                <button type="submit" onClick={authorize}>Register</button>
                </form>
                <Link to="/login">Already have an account? Login</Link>
            </div>
        </>
    )
}

export default Register

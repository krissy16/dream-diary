import React from 'react'
import { Link } from 'react-router-dom';
import '../styles/Login.css'
import LandingPage from './LandingPage'

function Login(props){
    function authorize(){
        props.history.push('/home')
    }
    return(
        <div>
            <LandingPage />
            <div className="login-form">
                <h2>Log In</h2>
                <form>
                <span className="input-group">
                    <label htmlFor="email"> Email: </label>
                    <input id="email" type="email" />
                </span>
                <span className="input-group">
                    <label htmlFor="password">Password</label>
                    <input id="password" type = "password" />
                </span>
                <button type="submit" onClick={authorize}>Log In</button>
                </form>
                <Link to="/register">Don't have an account? Sign up!</Link>
            </div>
        </div>
    )
}

export default Login
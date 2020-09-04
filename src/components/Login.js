import React from 'react';
import { Link } from 'react-router-dom';
import AuthApiService from '../services/auth-api-service';
import TokenService from '../services/token-service';
import DreamContext from '../DreamContext';
import LandingPage from './LandingPage';
import '../styles/Login.css';

class Login extends React.Component{
    static contextType = DreamContext;
    
    authorize = (e) => {
        e.preventDefault();
        const { email, password } = e.target;

        AuthApiService.postLogin({
            email: email.value,
            password: password.value,
        })
            .then(res => {
                email.value = '';
                password.value = '';
                TokenService.saveAuthToken(res.authToken);
                window.sessionStorage.setItem('userId', res.userId);
                this.onLoginSuccess();
            })
            .catch(error => {
                console.log( error );
            })
    }

    onLoginSuccess = () => {
        this.props.history.push('/home');
    }
    render(){
        return(
            <div>
                <LandingPage />
                <div className="login-form">
                    <Link to="/" className="x">X</Link>
                    <h2>Log In</h2>
                    <form onSubmit={this.authorize}>
                        <span className="input-group">
                            <label htmlFor="email"> Email: </label>
                            <input id="email" type="email" name="email" />
                        </span>
                        <span className="input-group">
                            <label htmlFor="password">Password: </label>
                            <input id="password" type = "password" name="password"/>
                        </span>
                        <button type="submit">Log In</button>
                    </form>
                    <Link to="/register" className="link">Don't have an account? Sign up!</Link>
                </div>
            </div>
        );
    }
}

export default Login;
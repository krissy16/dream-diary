import React from 'react';
import { Link } from 'react-router-dom';
import AuthApiService from '../services/auth-api-service';
import LandingPage from './LandingPage';
import '../styles/Register.css';

class Register extends React.Component{    
    state = { error: null };

    register = (e) =>{
        e.preventDefault();
        const { email, password, confirm } = e.target;
        
        if(password.value.trim() !== confirm.value.trim()){
            this.setState({ error: "Password and Confirm Password does not match" });
            return;
        }
        else if(!email || !password || !confirm){
            this.setState({ error: "All fields are mandatory" });
            return;
        }

        this.setState({ error: null });

        AuthApiService.postUser({
            email: email.value,
            password: password.value,
        })
        .then(user => {
            email.value = '';
            password.value = '';
            confirm.value = '';
            this.onRegistrationSuccess();
        })
        .catch(res => {
            this.setState({ error: res.error });
        });
    }

    onRegistrationSuccess = () => {
        console.log('redirecting to login....');
        this.props.history.push('/login');
    }

    render(){
        return(
            <>
                <LandingPage />
                <div className="register-form" >
                    <Link to="/" className="x">X</Link>
                    <h2>Register</h2>
                    <form onSubmit={this.register}>
                        <div role='alert'>
                            {this.state.error && <p className='red'>{this.state.error}</p>}
                        </div>
                        <span className="input-group">
                            <label htmlFor="email"> Email: </label>
                            <input id="email" type="email" name="email" />
                        </span>
                        <span className="input-group">
                            <label htmlFor="password">Password: </label>
                            <input id="password" type = "password" name="password"/>
                        </span>
                        <span className="input-group">
                            <label htmlFor="confirm">Confirm Password: </label>
                            <input id="confirm" type = "password" name="confirm"/>
                        </span>
                        <button type="submit">Register</button>
                    </form>
                    <Link to="/login" className="link">Already have an account? Login</Link>
                </div>
            </>
        ) 
    }
}

export default Register;

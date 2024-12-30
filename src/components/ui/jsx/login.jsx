import logoInstagram from '../../../assets/logo.png';
import React, { useState } from 'react';
import '../css/login.css';
import Home from '../jsx/home';
import { Link } from 'react-router-dom';

function Login() {
    const [input, setInput] = useState({
        username: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const signupHandler = async (e) => {
        e.preventDefault();
        console.log("User Input:", input);
        // keo APIAPI
        try {
            // const res = await axios.post('API_URL', input);
            // console.log("Response:", res);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="login">
            <form className="signup-form" onSubmit={signupHandler}>
                <div className="logo-container">
                    <img src={logoInstagram} alt="Instagram Logo" />
                    <h2>Welcome to My Instagram</h2>
                </div>
                <div className="input-group">
                    <label htmlFor="username">Username</label>
                    <input
                        onChange={handleChange}
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Enter your username"
                        value={input.username}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input
                        onChange={handleChange}
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter your password"
                        value={input.password}
                        required
                    />
                </div>
                <button type="submit" className="submit-btn">
                <Link className='linkSignIn' to="/home">Sign In</Link>
                </button>
                <p className="register-link">
                Already have an account? <Link className='linkSignUp' to="/signup">Sign Up</Link>
                </p>
            </form>
        </div>
    );
}

export default Login;

import logoInstagram from '../../../assets/logo.png';
import React, { useState } from 'react';

import Home from '../jsx/home';
import { Link, useNavigate } from 'react-router-dom';
import { InputField } from './register';
function Login() {
    const [input, setInput] = useState({
        username: "",

        password: ""
    });
    const navigate = useNavigate()

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
        console.log(input)
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
        <div className="flex justify-center items-center h-screen bg-gradient-to-br from-[#fbc2eb] to-[#a6c1ee] font-sans">
        <form className="flex flex-col bg-white p-8 sm:p-10 rounded-lg shadow-lg w-full max-w-sm items-center text-center animate-fadeIn space-y-6">
            <div className="logo-container mb-6">
                <img className="w-24 h-auto mb-4" src={logoInstagram} alt="Instagram Logo" />
                <h2 className="text-2xl font-bold text-gray-800">Welcome to My Instagram</h2>
            </div>
    
            <InputField 
                label="Username" 
                name="username" 
                type="text" 
                placeholder="Enter your username" 
                value={input.username} 
                id="username" 
                onChange={handleChange} 
            />
            <InputField 
                label="Password" 
                name="password" 
                type="password" 
                placeholder="Enter your password" 
                value={input.password} 
                id="password" 
                onChange={handleChange} 
            />
    
            <button 
                type="submit" 
                className="w-full py-3 bg-gradient-to-br from-[#6a82fb] to-[#fc5c7d] rounded-lg text-white text-base font-bold 
                           cursor-pointer transition-all duration-300 ease-in-out hover:bg-gradient-to-br hover:from-[#fc5c7d] hover:to-[#6a82fb] 
                           hover:shadow-lg hover:shadow-[rgba(106,130,251,0.3)]"
            >
                <Link className="text-white no-underline font-bold hover:underline" to="/home">Sign In</Link>
            </button>
    
            <p className="text-gray-600 text-sm">
                Don't have an account?{" "}
                <Link 
                    className="text-[#6a82fb] font-medium hover:underline transition-all duration-300 ease-in-out" 
                    to="/signup"
                >
                    Sign Up
                </Link>
            </p>
        </form>
    </div>
    
    );
}

export default Login;

import logoInstagram from "../../../assets/logo.png";
import React, { useState } from "react";
import "../css/login.css";
import { Link } from "react-router-dom";
import { SIGNUP_MUTATION } from "../../../graphql/mutations/auth.mutation";
import { useMutation } from "@apollo/client";
import { setCookies } from "../../../utils/cookie.util";
function SignUp() {
  const [input, setInput] = useState({
    username: "",
    full_name: "",
    email: "",
    password: "",
  });

  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [signup, { data, loading, error }] = useMutation(SIGNUP_MUTATION, {
    onError: () => {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000); // Hide error after 3 seconds
    },
    onCompleted: () => {
      setShowSuccess(true);

      setTimeout(() => {
        window.location.href = "/";
        setShowSuccess(false);
      }, 1000);
    },
  });
  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const signupHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await signup({ variables: { input } });
      // console.log(response);
      if (response.data.signup.token) {
        setCookies(response.data.signup.token);
      }
    } catch (err) {
      console.error("Login Error:", err);
    }
  };

  return (
    <div className="login">
      {showError && <div className="error-popup">Error: {error.message}</div>}
      {showSuccess && (
        <div className="success-notification">Sign Up successful!</div>
      )}
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
          <label htmlFor="full_name">Full Name</label>
          <input
            onChange={handleChange}
            type="full_name"
            name="full_name"
            id="full_name"
            placeholder="Enter your full name"
            value={input.full_name}
          />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            value={input.email}
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
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Executing..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}

export default SignUp;

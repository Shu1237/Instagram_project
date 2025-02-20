import logoInstagram from "../../assets/logo.png";
import React, { useState } from "react";
import "../ui/css/login.css";
import Home from "../pages/home";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "../../graphql/mutations/auth.mutation";
import { setCookies, getCookie, removeCookies } from "../../utils/cookie.util";
import { getMyInformation } from "../../utils/jwt-decode.util.js";
import * as localStorageFunctions from "../../utils/localStorage.util.js";
function Login() {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();
  const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION, {
    onError: () => {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000); // Hide error after 3 seconds
    },
    onCompleted: () => {
      setShowSuccess(true);
      setTimeout(() => {
        navigate("/");
        setShowSuccess(false);
      }, 500); // Hide success after 3 seconds and navigate to /home
    },
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ variables: { input } });
      // console.log(response);
      if (response.data.login.token) {
        setCookies("jwt-token", response.data.login.token);
        setCookies("user_id", response.data.login.user.user_id);
      }
      const token = getCookie();
      const myInformation = getMyInformation(token);
      localStorageFunctions.setLocalStorage(myInformation);
    } catch (err) {
      console.error("Login Error:", err);
    }
  };

  return (
    <div className="login">
      {showError && <div className="error-popup">Error: {error.message}</div>}
      {showSuccess && (
        <div className="success-notification">Login successful!</div>
      )}
      <form className="signup-form" onSubmit={loginHandler}>
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
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Logging in..." : "Sign In"}
        </button>
        <p className="register-link">
          Don&apos;t have an account?{" "}
          <Link className="linkSignUp" to="/signup">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;

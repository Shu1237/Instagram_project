import logoInstagram from "../../assets/logo.png";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "../../graphql/mutations/auth.mutation";
import { setCookies, getCookie } from "../../utils/cookie.util";
import { getMyInformation } from "../../utils/jwt-decode.util.js";
import * as localStorageFunctions from "../../utils/localStorage.util.js";

function Login() {
  const [input, setInput] = useState({ username: "", password: "" });
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();
  const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION, {
    onError: () => {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    },
    onCompleted: () => {
      setShowSuccess(true);
      setTimeout(() => {
        navigate("/");
        setShowSuccess(false);
      }, 500);
    },
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ variables: { input } });
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
        {showError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 animate-fade">
            {error?.message || "Invalid credentials"}
          </div>
        )}
        {showSuccess && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-4 animate-fade">
            Login successful!
          </div>
        )}

        <div className="text-center">
          <img src={logoInstagram} alt="Instagram Logo" className="mx-auto h-14 mb-2" />
          <h2 className="text-2xl font-semibold text-gray-700">Welcome Back</h2>
        </div>

        <form className="mt-6" onSubmit={loginHandler}>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm">Username</label>
            <input
              type="text"
              name="username"
              value={input.username}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 text-sm">Password</label>
            <input
              type="password"
              name="password"
              value={input.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="text-right mb-4">
            <Link to="/forgotpassword" className="text-sm text-blue-500 hover:underline">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className={`w-full bg-blue-500 text-white py-2 rounded-lg font-semibold ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
            }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Sign In"}
          </button>

          <p className="mt-4 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;

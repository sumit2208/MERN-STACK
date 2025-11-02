import React, { useState } from "react";
import supabase from "../config/supabaseClient";
import { useNavigate } from "react-router-dom";

const AdminLogin = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
    } else {
      console.log("✅ Logged in:", data);
      onLoginSuccess(data.user);
      navigate("/admin")

    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="w-full bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 shadow-lg border border-blue-200 relative"
    > 
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">
        🔐 Admin Login
      </h2>
 
      {errorMsg && (
        <p className="text-red-600 text-sm text-center mb-3 font-medium bg-red-50 py-1 rounded-md">
          {errorMsg}
        </p>
      )}
 
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email Address
        </label>
        <input
          type="email"
          placeholder="Enter admin email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none text-black"
        />
      </div>
 
      <div className="mb-6 relative">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-md p-2 pr-10 focus:ring-2 focus:ring-blue-400 focus:outline-none text-black"
        />
 
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-9 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          {showPassword ? ( 
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.8"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
              <circle cx="12" cy="12" r="3" />
            </svg>
          ) : ( 
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.8"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.055 7.02 19 11.5 19a10.48 10.48 0 007.52-3.777M21 21L3 3"
              />
            </svg>
          )}
        </button>
      </div>
 
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition-all duration-200 shadow-md hover:shadow-lg"
      >
        Login
      </button>
 
      <p className="text-xs text-gray-500 text-center mt-3">
        For authorized admins only.
      </p>
    </form>
  );
};

export default AdminLogin;

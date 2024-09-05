import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/auth/authActions";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo1.png";

// Login page component for user and admin
const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Check if the user is already logged in

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login(formData));
      const updatedUser = JSON.parse(localStorage.getItem('user'));
      if (updatedUser && updatedUser.role === "admin") {
        navigate("/admin");
      } else if (updatedUser && updatedUser.role === "user") {
        navigate("/user");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen min-w-96 mx-auto mobile-container">
      <div className="w-96 max-w-md p-8 rounded-lg shadow-md bg-blue-300 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-5 mobile-form">
      <div className="flex justify-center items-center mb-8">
                <img src={logo} alt="Logo" className="w-8 h-8 mr-2" />
                <span className="text-3xl font-semibold font-mono text-[#682c94]">JobApp</span>
              </div>
        <div>
          <h2 className="text-2xl font-semibold text-center text-black mt-8">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-6 space-y-8" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className=" mb-4 appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#682c94] hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
          <Link
            to="/signup"
            className="flex text-sm text-black hover:underline flex-col items-center justify-center hover:text-blue-500 mt-3"
          >
            Don't have an account? {"Sign Up"}
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

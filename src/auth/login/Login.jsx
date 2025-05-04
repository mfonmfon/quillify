import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useUserAuthStore from '../../zustands/stores/UserAuthStore'
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi'
import DashboardCardImage from '../../assets/images/Fixa.jpg'
import Swal from 'sweetalert2'
import axios from 'axios'

const Login = () => {
  const { setUser, setToken, setError, setLoading, clearError, error, isLoading } = useUserAuthStore();
  const navigate = useNavigate();
  
  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    clearError();
  }, [clearError]);

  const validateForm = () => {
    const errors = {};
    if (!loginFormData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(loginFormData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!loginFormData.password) {
      errors.password = 'Password is required';
    } else if (loginFormData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }
    return errors;
  };

  const handleLoginInputChange = (event) => {
    const { name, value } = event.target;
    setLoginFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      setLoading(true);
      clearError();

      const response = await axios.post(
        'http://localhost:8080/publisher/login',
        loginFormData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        }
      );

      const { user, token } = response.data;
      
      // Update Zustand store with user data
      setUser(user);
      setToken(token);

      Swal.fire({
        icon: 'success',
        title: 'Login Successful!',
        text: 'Welcome back to DinaTalks',
        confirmButtonText: 'Continue',
        confirmButtonColor: '#3085d6',
      }).then(() => {
        navigate('/dashboard');
      });
    } catch (error) {
      let errorMessage = 'Something went wrong. Please try again.';
      let errorTitle = 'Login Failed';
      
      // Handle specific error cases
      if (error.response) {
        const status = error.response.status;
        const data = error.response.data;
        
        switch (status) {
          case 401:
            if (data.message?.includes('password')) {
              errorMessage = 'Incorrect password. Please try again.';
              setFormErrors({ password: 'Incorrect password' });
            } else if (data.message?.includes('email')) {
              errorMessage = 'Email not found. Please check your email or sign up.';
              setFormErrors({ email: 'Email not found' });
            } else {
              errorMessage = 'Invalid credentials. Please try again.';
            }
            break;
          case 404:
            errorMessage = 'Email not found. Please check your email or sign up.';
            setFormErrors({ email: 'Email not found' });
            break;
          case 422:
            errorMessage = 'Please check your email and password format.';
            if (data.errors?.email) {
              setFormErrors({ email: data.errors.email });
            }
            if (data.errors?.password) {
              setFormErrors({ password: data.errors.password });
            }
            break;
          case 429:
            errorMessage = 'Too many login attempts. Please try again later.';
            errorTitle = 'Rate Limit Exceeded';
            break;
          case 500:
            errorMessage = 'Server error. Please try again later.';
            errorTitle = 'Server Error';
            break;
          default:
            errorMessage = data.message || 'Something went wrong. Please try again.';
        }
      }

      setError(errorMessage);
      
      Swal.fire({
        icon: 'error',
        title: errorTitle,
        text: errorMessage,
        confirmButtonText: 'Try Again',
        confirmButtonColor: '#d33',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image Section */}
      <div className="hidden lg:block w-1/2 relative">
        <div className="absolute inset-0">
          <img
            src={DashboardCardImage}
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-center p-12 text-white">
          <h1 className="text-4xl font-bold mb-4 text-center">Welcome Back</h1>
          <p className="text-xl text-white/90 text-center max-w-md">
            Continue your journey with DinaTalks. Share your voice with the world.
          </p>
          <div className="mt-8 flex flex-col space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <FiMail className="w-5 h-5" />
              </div>
              <span>Connect with your community</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <FiLock className="w-5 h-5" />
              </div>
              <span>Secure and private access</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Sign In</h1>
            <p className="text-gray-600 mt-2">Welcome back to your account</p>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl">
              <div className="flex items-center text-red-600">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                    formErrors.email ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200`}
                  type="email"
                  placeholder="example@example.com"
                  name="email"
                  value={loginFormData.email}
                  onChange={handleLoginInputChange}
                  required
                />
                {formErrors.email && (
                  <div className="mt-1 text-sm text-red-600 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {formErrors.email}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                    formErrors.password ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200`}
                  type="password"
                  placeholder="••••••••"
                  name="password"
                  value={loginFormData.password}
                  onChange={handleLoginInputChange}
                  required
                />
                {formErrors.password && (
                  <div className="mt-1 text-sm text-red-600 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {formErrors.password}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <Link to="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                  Forgot password?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-xl text-white font-medium transition duration-200 transform hover:scale-[1.02] ${
                isLoading 
                  ? "bg-gray-400 cursor-not-allowed" 
                  : "bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900"
              }`}
            >
              <div className="flex items-center justify-center">
                {isLoading ? (
                  <span className="animate-spin border-2 border-white border-t-transparent rounded-full h-5 w-5"></span>
                ) : (
                  <>
                    <span>Sign In</span>
                    <FiArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </div>
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

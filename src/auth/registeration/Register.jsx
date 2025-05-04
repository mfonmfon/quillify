import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useUserAuthStore from '../../zustands/stores/UserAuthStore'
import { FiUser, FiMail, FiLock, FiArrowRight } from 'react-icons/fi'
import DashboardCardImage from '../../assets/images/Fixa.jpg'
import Swal from 'sweetalert2'
import axios from 'axios'

const Register = () => {
  const { setUser, setToken, setError, setLoading, clearError, error, isLoading } = useUserAuthStore();
  const navigate = useNavigate();
  
  const [userFormData, setUserFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    clearError();
  }, [clearError]);

  const validateForm = () => {
    const errors = {};
    if (!userFormData.firstName.trim()) {
      errors.firstName = 'First name is required';
    }
    if (!userFormData.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }
    if (!userFormData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(userFormData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!userFormData.password) {
      errors.password = 'Password is required';
    } else if (userFormData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
    } else if (!/(?=.*[a-z])/.test(userFormData.password)) {
      errors.password = 'Password must contain at least one lowercase letter';
    } else if (!/(?=.*[A-Z])/.test(userFormData.password)) {
      errors.password = 'Password must contain at least one uppercase letter';
    } else if (!/(?=.*\d)/.test(userFormData.password)) {
      errors.password = 'Password must contain at least one number';
    } else if (!/(?=.*[@$!%*?&])/.test(userFormData.password)) {
      errors.password = 'Password must contain at least one special character (@$!%*?&)';
    }
    return errors;
  };

  const validateField = (name, value) => {
    const errors = {};
    if (name === 'email') {
      if (!value.trim()) {
        errors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        errors.email = 'Please enter a valid email address';
      }
    } else if (name === 'password') {
      if (!value) {
        errors.password = 'Password is required';
      } else if (value.length < 8) {
        errors.password = 'Password must be at least 8 characters long';
      } else if (!/(?=.*[a-z])/.test(value)) {
        errors.password = 'Password must contain at least one lowercase letter';
      } else if (!/(?=.*[A-Z])/.test(value)) {
        errors.password = 'Password must contain at least one uppercase letter';
      } else if (!/(?=.*\d)/.test(value)) {
        errors.password = 'Password must contain at least one number';
      } else if (!/(?=.*[@$!%*?&])/.test(value)) {
        errors.password = 'Password must contain at least one special character (@$!%*?&)';
      }
    }
    return errors;
  };

  const handleRegistrationInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Validate the field in real-time
    const fieldErrors = validateField(name, value);
    setFormErrors(prev => ({
      ...prev,
      [name]: fieldErrors[name] || '',
    }));
  };

  const handleRegistrationSubmit = async (event) => {
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
        'http://localhost:8080/publisher/register',
        userFormData,
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
        title: 'Registration Successful!',
        text: 'Your account has been created successfully.',
        confirmButtonText: 'Continue',
        confirmButtonColor: '#3085d6',
      }).then(() => {
        navigate('/dashboard');
      });
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Something went wrong. Please try again.';
      setError(errorMessage);
      
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
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
          <h1 className="text-4xl font-bold mb-4 text-center">Welcome to DinaTalks</h1>
          <p className="text-xl text-white/90 text-center max-w-md">
            Join our community of thinkers, creators, and innovators. Share your voice with the world.
          </p>
          <div className="mt-8 flex flex-col space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <FiUser className="w-5 h-5" />
              </div>
              <span>Create your unique profile</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <FiMail className="w-5 h-5" />
              </div>
              <span>Connect with like-minded people</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <FiLock className="w-5 h-5" />
              </div>
              <span>Secure and private</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
            <p className="text-gray-600 mt-2">Join our community today</p>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleRegistrationSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                      formErrors.firstName ? 'border-red-500' : 'border-gray-300'
                    } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200`}
                    type="text"
                    placeholder="John"
                    name="firstName"
                    value={userFormData.firstName}
                    onChange={handleRegistrationInputChange}
                    required
                  />
                  {formErrors.firstName && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.firstName}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                      formErrors.lastName ? 'border-red-500' : 'border-gray-300'
                    } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200`}
                    type="text"
                    placeholder="Doe"
                    name="lastName"
                    value={userFormData.lastName}
                    onChange={handleRegistrationInputChange}
                    required
                  />
                  {formErrors.lastName && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.lastName}</p>
                  )}
                </div>
              </div>
            </div>

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
                  value={userFormData.email}
                  onChange={handleRegistrationInputChange}
                  onBlur={(e) => {
                    const fieldErrors = validateField('email', e.target.value);
                    setFormErrors(prev => ({
                      ...prev,
                      email: fieldErrors.email || '',
                    }));
                  }}
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
                  value={userFormData.password}
                  onChange={handleRegistrationInputChange}
                  onBlur={(e) => {
                    const fieldErrors = validateField('password', e.target.value);
                    setFormErrors(prev => ({
                      ...prev,
                      password: fieldErrors.password || '',
                    }));
                  }}
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
              {userFormData.password && !formErrors.password && (
                <div className="mt-2 text-sm text-green-600 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Password meets all requirements
                </div>
              )}
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
                    <span>Create Account</span>
                    <FiArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </div>
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

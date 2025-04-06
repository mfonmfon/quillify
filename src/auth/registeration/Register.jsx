
import React, { useState } from 'react'
import { Link, useNavigation } from 'react-router-dom'
import userAuthStore from '../../zustands/stores/UserAuthStore'

const Register = () => {
  const { register, error, isLoading } = userAuthStore();
  const [userFormData, setUserFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  })
  const navigateToDashboard = useNavigation();

  const handleRegistrationInputChange = (event)=>{
    const { name, value } = event.target;
    setUserFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  const handleRegistrationSubmit = async(event)=>{
    event.preventDefault();
    await register(userFormData);
   if(error){
    alert(error)
  }
  else{
    alert('Registration successful')
    navigateToDashboard ('/login')
  }
}
  return (
    <div className='w-full min-h-screen flex justify-center items-center p-4 '> 
      <div className=' rounded-xl shadow-lg p-8 sm:p-12  w-full max-w-md bg-gradient-to-bl from-blue-50'>
        <div className='text-center mb-19'>
          <h1 className='font-medium-300 text-2xl'>Get Onboarded Here </h1>

        </div>
        <form onSubmit={handleRegistrationSubmit} className='space-y-6 '>
        <div className=''>
            <label className='block text-gray-700 font-medium mb-2'>First name</label>
            <input
            className='w-full px-2 py-3 border border-gray-500 focus:outline-none rounded-xl'
            type='firstName'
            placeholder='first name'
            name='first name'
            onChange={handleRegistrationInputChange}
            required
            />
          </div>

          <div className=''>
          <label className='block text-gray-700 font-medium mb-2'>Last name</label>
            <input
            className='w-full px-3 py-3 border rounded-xl border-gray-500 focus:outline-none'
            type='firstName'
            placeholder='first name'
            name='first name'
            onChange={handleRegistrationInputChange}
            required
            />
          </div>

          <div className=''>
          <label className='block text-gray-700 font-medium mb-2'>Email</label>
            <input
            className='w-full px-3 py-3 border rounded-xl border-gray-500 focus:outline-none'
            type='email'
            placeholder='example@example.com'
            name='eamil'
            onChange={handleRegistrationInputChange}
            required
            />
          </div>

          <div className=''>
          <label className='block text-gray-700 font-medium mb-2'>Password</label>
            <input
            className='w-full px-3 py-3 rounded-xl border border-gray-500 focus:outline-none'
            type='password'
            placeholder='password'
            name='password'
            onChange={handleRegistrationInputChange}
            required
            />

            <div className='mt-2'>
              <p className=''><Link>forget password</Link></p>
            </div>
          </div>

          <div className='mb-6 rounded-lg bg-blue-600 px-6 cursor-grabbing'>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full p-2 rounded ${
            isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500"
            } text-white flex items-center justify-center`}
          >
          {isLoading ? <span className="animate-spin border-2 border-white border-t-transparent rounded-full h-5 w-5"></span> : "Proceed"}
        </button>

          </div>
        </form>

        <div className=''>
          <h2 className='text-black'>Already have an account? <span className='text-blue-500'>
            <Link>Login</Link></span></h2>

        </div>
      </div>
    </div>
  )
}

export default Register

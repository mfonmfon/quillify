
import React from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <div className='w-full min-h-screen flex justify-center items-center p-4 '> 
      <div className=' rounded-xl shadow-lg p-8 sm:p-12  w-full max-w-md bg-gradient-to-bl from-blue-50'>
        <div className='text-center mb-19'>
          <h1 className='font-medium-300 text-2xl'>Get Onboarded Here </h1>

        </div>
        <form className='space-y-6 '>
        <div className=''>
            <label className='block text-gray-700 font-medium mb-2'>First name</label>
            <input
            className='w-full px-2 py-3 border border-gray-500 focus:outline-none rounded-xl'
            type='firstName'
            placeholder='first name'
            name='first name'
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
            required
            />

            <div className='mt-2'>
              <p className=''><Link>forget password</Link></p>
            </div>
          </div>

          <div className='mb-6 rounded-lg bg-blue-600 px-6 cursor-grabbing'>
            <button className='text-white text-xl shadow-md  py-3 cursor-grabbing'
            onClick={()=>{window.location.href='/login'}}
            >Proceed</button>
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

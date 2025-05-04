import { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
// import { SlEarphones } from 'react-icons/sl';
import { Link } from 'react-router-dom';


const DinaTalksHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      console.log('Searching for:', searchQuery);
      // You can implement actual search functionality here
    }
  };

  const newsHeaderData=[
    {
      title: "Home",
      path:"/"
    },
    {
      title: "About",
      path:"/about"
    },
    {
      title: "About",
      path:"/about"
    },
    {
      title: "News",
      path:"/news"
    }
  ]
  return (
    <div className='w-full bg-white shadow-md fixed top-0 left-0 z-50'>
      <nav className='flex justify-between items-center p-4'>
        <div>
          <h2 className='text-blue-600 text-[17px]'>
            News<span className='text-black'>hub</span>
          </h2>
        </div>

        {/* Mobile Menu Icon */}
        <div className='block lg:hidden'>
          <button
            onClick={toggleMobileMenu}
            className='text-gray-600 focus:outline-none'
          >
            <svg className='h-6 w-6' viewBox='0 0 24 24' stroke='currentColor' fill='none'>
              {mobileMenuOpen ? (
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' />
              ) : (
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16m-7 6h7' />
              )}
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <ul
          className={`${
            mobileMenuOpen ? 'flex flex-col items-center space-y-4 absolute bg-white w-full left-0 top-16 p-4 shadow-md' 
            : 'hidden lg:flex lg:flex-row gap-6'
          }`}
        >
          {newsHeaderData.map((newshead, index) => (
            <li className='list-none text-[13px]' key={index}>
              <Link className='hover:text-blue-500' to={newshead.path}>
                {newshead.title}
              </Link>
            </li>
          ))}
        </ul>

        {/* Search Input */}
        <div className='relative hidden lg:flex items-center'>
          <input
            type='search'
            className='px-4 py-2 border rounded-2xl outline-none w-64'
            placeholder='Search news...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
          />
          <BiSearch className='absolute right-4 text-gray-500 cursor-pointer' onClick={() => console.log('Searching for:', searchQuery)} />
        </div>

        {/* Buttons */}
        <div className='hidden lg:flex space-x-4 cursor-grabbing'>
          <button className='cursor-grabbing border rounded-2xl py-2 px-6 bg-blue-500 text-white text-[12px]'
          onClick={()=>{
            window.location.href='/register'
          }}
          >Sign Up</button>
          <button className='cursor-grabbing border rounded-2xl py-2 px-6 bg-blue-500 text-white text-[12px]'
          onClick={()=>{
            window.location.href="/login"
          }}
          >Login</button>
        </div>
      </nav>

      {/* Mobile Search Bar */}
      {mobileMenuOpen && (
        <div className='flex justify-center p-4 bg-white shadow-md lg:hidden'>
          <input
            type='search'
            className='px-4 py-2 border rounded-2xl outline-none w-3/4'
            placeholder='Search news...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
          />
          <button className='ml-2 bg-blue-500 text-white rounded-2xl py-2 px-4' onClick={() => 
            console.log('Searching for:', searchQuery)}></button>
        </div>
      )}
    </div>
  );
};

export default DinaTalksHeader;

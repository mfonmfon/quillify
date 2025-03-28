import React from 'react';
// import DashboardCardImage from ''
import DashboardCardImage from '../../assets/images/Fixa.jpg'
import DashboardHeader from './dashboardheader/DashboardHeader';

const DinaTalksDashboard = () => {
  return (
    <>
      <div>
        <DashboardHeader />
        <div className='mt-25'>
          <div className='flex rounded-lg focus:outline-none bg-blue-500 max-w-xl md:max-w-3/4 mx-auto justify-between items-center p-7 h-50'>
           <div className='mb-7'>
           <h1 className='text-white md:text-5xl text-2xl mb-3'>Welcome <span className='text-2xl md:text-4xl'>Mfon</span></h1>
           <p className='text-white text-xl'>Explore all kinds of talks by dina</p>
           </div>

           <div className="">
            <img className='sm:w-69 rounded-lg w-45 ' src={DashboardCardImage} alt="image" />
           </div>
          </div>
        </div>
        
      </div>
    </>
  );
};

export default DinaTalksDashboard;

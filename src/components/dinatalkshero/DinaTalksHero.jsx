import React from 'react';
import BackgroundImageOne from '../../assets/images/BakcgroundImageOne.jpeg';
import { useNavigate } from 'react-router-dom';

const DinaTalksHero = () => {
  const navigate = useNavigate();
  return (
    <div className=" relative w-full h-[600px] bg-gradient-to-r from-[#0a0a0a] to-[#1a1a1a] text-white overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url(${BackgroundImageOne})` }}
      ></div>
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70"></div>
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center md:text-left md:flex-row md:justify-between">
        {/* Text Section */}
        <div className="max-w-6xl mt-40 md:mb-0 leading-relaxed">
          <h4 className="text-lg font-medium uppercase tracking-widest text-gray-400 mb-4 ">
            Your Journey to Tomorrow Begins Here
          </h4>
          <h1 className=" text-5xl md:text-8xl font-extrabold leading-tight mb-6">
            Explore Dina Talks Of Artificial Intelligence
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            Discover the latest trends, advancements, and applications of artificial intelligence in the digital age.<br></br>
            Unlock your full potential with Dina Talks.
          </p>
          <button className="cursor-grab px-7 py-5 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-900 transition duration-300"
          onClick={()=>navigate('/register')}
          >
            Get Started
          </button>
        </div>
        {/* Image Section */}
        {/* <div className="mt-10 md:mt-0">
          <img
            className="w-[300px] md:w-[600px] h-auto rounded-lg shadow-lg animate-float"
            src={BackgroundImageOne}
            alt="AI Illustration"
          />
        </div> */}
      </div>
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-blue-900 rounded-full blur-3xl opacity-50 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-900 rounded-full blur-3xl opacity-50 animate-pulse"></div>
    </div>
  );
};
export default DinaTalksHero;

import React from 'react';
import ResourceCardImage from '../../assets/images/ImageTwo.jpeg';
import ResourceImageCore from '../../assets/images/Fixa.jpg'
import FixaImage from '../../assets/images/FixaTwo.jpg'

const ViewAllResources = () => {
  const resourcesEbook = [
    {
      ebookImage: ResourceCardImage,
      ebookTitle: "Ebook",
      ebookDescription: "Explore our collection of ebooks covering a wide range of future technology topics.",
      downloadEbookButton: "Download Ebook Now",
      downloadedByUsers: "Downloaded by ",
      totalDownloads: "10K + Users",
    },
    {
      ebookImage: ResourceCardImage,
      ebookTitle: "Ebook",
      ebookDescription: "Explore our collection of ebooks covering a wide range of future technology topics.",
      downloadEbookButton: "Download Ebook Now",
      downloadedByUsers: "Downloaded by ",
      totalDownloads: "10K + Users",
    },
  ];

  return (
    <>
      <div className="bg-gray-50 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between px-6 sm:px-12 lg:px-20 gap-8">
          {/* Text Section */}
          <div className="text-center md:text-left max-w-lg">
            <h6 className="text-sm font-medium text-gray-600 uppercase tracking-wide">
              Your Gateway to In-Depth Information
            </h6>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mt-4">
              Unlock Valuable Knowledge with DinaTalks Resources
            </h1>
          </div>

          {/* Button Section */}
          <div className="flex justify-center md:justify-end">
            <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
              View All Resources
            </button>
          </div>
        </div>
      </div>

      <div className="py-8 px-6 sm:px-12 lg:px-20 grid grid-cols-1 sm:grid-cols-2 gap-8">
        {resourcesEbook.map((resources, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden p-6">
            <div className="flex flex-col items-center text-center">
              {/* Circular Image */}
              <img
                className="w-32 h-32 object-cover rounded-full mb-4"
                src={resources.ebookImage}
                alt={resources.ebookTitle}
              />
              <h4 className="text-xl font-bold text-gray-800 mb-2">{resources.ebookTitle}</h4>
              <p className="text-gray-600 mb-4">{resources.ebookDescription}</p>
              <button className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
                {resources.downloadEbookButton}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-8xl mx-auto px-6 sm:px-12 lg:px-20 py-12 flex flex-col lg:flex-row items-center justify-between gap-12 bg-gray-200">
        {/* Text Section */}
        <div className="lg:w-1/2 text-center lg:text-left mt-8 lg:mt-0">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-6 leading-tight">
            Expanding The Reach
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-6">
            {`This product roadmap outlines the strategic evolution of BubusPlug from its initial MVP (a 
            human-verified job board with basic application functionality) to the ultimate vision of an integrated 
            AI-powered job application agent with comprehensive cybersecurity features. The roadmap is organized 
            into six key phases, each building upon previous capabilities while introducing new value to users and 
            the organization.`}
          </p>
          <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
            Learn More
          </button>
        </div>

        {/* Image Section */}
        <div className="lg:w-1/2 flex justify-center mt-8 lg:mt-0">
          <img
            className="w-[300px] md:w-[600px] h-auto rounded-lg shadow-lg"
            src={ResourceImageCore}
            alt="Expanding The Reach"
          />
        </div>
      </div>

      <div className="max-w-8xl mx-auto px-6 sm:px-12 lg:px-20 py-12 flex flex-col lg:flex-row items-center justify-between gap-12 bg-gray-200">

         {/* Image Section */}
         <div className="lg:w-1/2 flex justify-center mt-8 lg:mt-0">
          <img
            className="w-[300px] md:w-[600px] h-auto rounded-lg shadow-lg"
            src={FixaImage}
            alt="Expanding The Reach"
          />
        </div>
        {/* Text Section */}
        <div className="lg:w-1/2 text-center lg:text-left mt-8 lg:mt-0">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-6 leading-tight">
            Expanding The Reach
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-6">
            {`This product roadmap outlines the strategic evolution of BubusPlug from its initial MVP (a 
            human-verified job board with basic application functionality) to the ultimate vision of an integrated 
            AI-powered job application agent with comprehensive cybersecurity features. The roadmap is organized 
            into six key phases, each building upon previous capabilities while introducing new value to users and 
            the organization.`}
          </p>
          <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
            Learn More
          </button>
        </div>
      </div>
    </>
  );
};

export default ViewAllResources;




import React from 'react';
import { PiArrowCircleDownLeft } from 'react-icons/pi';
import CardImage from '../../assets/images/BackgroundImageTwo.jpeg';
import CardImageOne from '../../assets/images/BackgroundImageThree.jpeg';
import CardImageTwo from '../../assets/images/CardImageFour.jpeg';
import CardImageThree from '../../assets/images/CardImageFive.jpeg'
import CardImageFour from '../../assets/images/CardImageSix.jpeg'
import CardImageHive from '../../assets/images/ImageTwo.jpeg'

const DinaTalksCard = () => {
  const cardData = [
    {
      headerImage: CardImage,
      title: "Latest News",
      description: "Stay updated with the latest trends and insights.",
      cardFoot: "Over 1,000 articles published monthly",
      cardIcon: PiArrowCircleDownLeft,
    },
    {
      headerImage: CardImageOne,
      title: "AI Innovations",
      description: "Explore groundbreaking advancements in AI.",
      cardFoot: "Discover the future of technology",
      cardIcon: PiArrowCircleDownLeft,
    },
    {
      headerImage: CardImageTwo,
      title: "Tech Insights",
      description: "Dive deep into the world of technology.",
      cardFoot: "Expert opinions and analysis",
      cardIcon: PiArrowCircleDownLeft,
    },
    {
      headerImage: CardImageThree,
      title: "Tech Insights",
      description: "Dive deep into the world of technology.",
      cardFoot: "Expert opinions and analysis",
      cardIcon: PiArrowCircleDownLeft,
    },
    {
      headerImage: CardImageFour,
      title: "Tech Insights",
      description: "Dive deep into the world of technology.",
      cardFoot: "Expert opinions and analysis",
      cardIcon: PiArrowCircleDownLeft,
    },
    {
      headerImage: CardImageOne,
      title: "Tech Insights",
      description: "Dive deep into the world of technology.",
      cardFoot: "Expert opinions and analysis",
      cardIcon: PiArrowCircleDownLeft,
    },
  ];

  

  return (
    <>
    <div className="w-full py-12 bg-gray-100">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {cardData.map((dinaCard, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl"
          >
            {/* Header Image */}
            <img
              className="w-full h-48 object-cover"
              src={dinaCard.headerImage}
              alt={dinaCard.title}
            />

            {/* Card Content */}
            <div className="p-6">
              <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-2">
                {dinaCard.title}
              </h2>
              <p className="text-sm lg:text-base text-gray-600 mb-4">
                {dinaCard.description}
              </p>
              <div className="flex items-center justify-between">
                <p className="text-xs lg:text-sm text-gray-500">
                  {dinaCard.cardFoot}
                </p>
                <dinaCard.cardIcon className="text-blue-500 text-xl lg:text-2xl" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className=''>
      <div className=''>

      </div>

      <div className=''>

      </div>
    </div>
    </>
   
  );
};

export default DinaTalksCard;

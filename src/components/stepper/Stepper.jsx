import React, { useState } from 'react'
import './stepper.css'

const Stepper = () => {
  const steps = ["Customer Details", "Shipping Address", "Payment", "Confirmation"];
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState("");

  const validateStep = () => {
    if (currentStep === 0) {
      // Example validation for "Customer Details"
      return true; // Replace with actual validation logic
    } else if (currentStep === 1) {
      // Example validation for "Shipping Address"
      return true; // Replace with actual validation logic
    } else if (currentStep === 2) {
      // Example validation for "Payment"
      return true; // Replace with actual validation logic
    }
    return false;
  };

  const handleNext = () => {
    if (validateStep()) {
      setErrors("");
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    } else {
      setErrors("Please complete the current step before proceeding.");
    }
  };

  const handlePrevious = () => {
    setErrors("");
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className='w-full'>
      <div className='flex items-center justify-center mx-auto mt-72'>
        {steps.map((stepItem, index) => (
          <div
            className={`stepper-items relative flex flex-col items-center justify-center w-36 before:: content-[' '] ${
              index === currentStep ? 'text-blue-500 font-bold' : 'text-gray-500'
            }`}
            key={index}
          >
            <div>{index + 1}</div>
            <p>{stepItem}</p>
          </div>
        ))}
      </div>
      {errors && <p className='text-red-500 text-center mt-2'>{errors}</p>}
      <div className='flex justify-center mt-4'>
        <button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className='px-4 py-2 mx-2 bg-gray-300 rounded disabled:opacity-50'
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={currentStep === steps.length - 1}
          className='px-4 py-2 mx-2 bg-blue-500 text-white rounded disabled:opacity-50'
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Stepper;

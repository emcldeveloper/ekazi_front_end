import React from 'react';

const StepProgress = ({ currentStep, onStepClick }) => {
  const stepNames = [
    "Introduction",
    "Objective",
    "Education",
    "Work Experience",
    "Skills",
    "Languages",
    "Proficiency",
    "Training",
    "Referees",
    "Completes",
  ];

  return (
    <div className="w-full py-6">
      
      <div className="
          relative 
          flex 
          flex-wrap 
          items-center 
          justify-center 
          gap-4 
          md:justify-between
      ">
        
        {/* Long line only visible on medium+ screens */}
        <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gray-300 -translate-y-1/2"></div>

        {stepNames.map((name, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          const isFuture = stepNumber > currentStep;

          return (
            <div
              key={stepNumber}
              className="relative z-10 flex flex-col items-center"
              onClick={() => onStepClick(stepNumber)}
            >
              <div
                className={`
                  w-10 h-10 md:w-12 md:h-12 
                  rounded-full flex items-center justify-center 
                  transition-all cursor-pointer
                  font-medium text-xs
                  ${isActive ? 'bg-[#2E58A6] text-white scale-110' : ''}
                  ${isCompleted ? 'bg-[#D36314] text-white' : ''}
                  ${isFuture ? 'bg-gray-300 text-gray-600' : ''}
                `}
                title={name}
              >
                {stepNumber}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepProgress;

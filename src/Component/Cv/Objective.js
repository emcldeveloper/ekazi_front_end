import { useNavigate } from "react-router-dom";

import PageLoader from "../../widgets/pageLoader";
import StepProgress from "./Stepprogress";
import { useCvProfile } from "../../hooks/useCv";

const ProfessionalSummary = () => {
  const navigate = useNavigate();
  const applicantId = localStorage.getItem("applicantId");

  const { data: candidateDetails, isPending: isLoading } =
    useCvProfile(applicantId);

  const summary = candidateDetails?.data?.careers?.[0]?.career;
  const objective = candidateDetails?.data?.objective?.objective;

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <StepProgress
        currentStep={2}
        onStepClick={(step) => {
          // Handle navigation to different steps
          switch (step) {
            case 1:
              navigate("/jobseeker/introduction");
              break;
            case 2:
              navigate("/jobseeker/objective");
              break;
            case 3:
              navigate("/jobseeker/EducationCv");
              break;
            case 4:
              navigate("/jobseeker/ExperienceCv");
              break;
            case 5:
              navigate("/jobseeker/SkillsCv");
              break;
            case 6:
              navigate("/jobseeker/LanguageCv");
              break;
            case 7:
              navigate("/jobseeker/proficiencyCv");
              break;
            case 8:
              navigate("/jobseeker/TrainingCv");
              break;
            case 9:
              navigate("/jobseeker/RefereeCv");
              break;
            case 10:
              navigate("/jobseeker/CompleteCv");
              break;
            // ... add other cases for each step
            default:
              break;
          }
        }}
      />
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 p-4 bg-white rounded-lg shadow-md  ">
        <div className="text-center sm:text-left">
          <h1 className="font-bold text-2xl sm:text-3xl text-gray-800">
            Professional Summary
          </h1>
          <p className="text-base sm:text-lg text-gray-500 mt-1 sm:mt-2">
            Edit professional summary here
          </p>
        </div>
      </div>

      {/* Career Objective Section */}
      <div className="mt-8">
        <label className="block text-sm font-medium text-gray-700">About</label>
        {summary ? (
          <textarea
            // onInput={handleCareerChange}
            defaultValue={summary}
            className="w-full mt-1 p-3 rounded-lg border border-gray-300 bg-transparent focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={5}
          />
        ) : (
          <p className="text-gray-500 mt-2">No career objective available</p>
        )}
      </div>

      {/* Main Objective Section */}
      <div className="mt-8">
        <label className="block text-sm font-medium text-gray-700">
          Main Objective
        </label>
        {objective ? (
          <textarea
            // onInput={handleObjectiveChange}
            defaultValue={objective}
            className="w-full mt-1 p-3 rounded-lg border border-gray-300 bg-transparent focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={5}
          />
        ) : (
          <p className="text-gray-500 mt-2">No main objective available</p>
        )}
      </div>

      {/* Footer Buttons */}
      <div className="mt-8 flex justify-end space-x-4">
        <button className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
          Cancel
        </button>
        <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ProfessionalSummary;

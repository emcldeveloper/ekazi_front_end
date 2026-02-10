import { useNavigate } from "react-router-dom";

import PageLoader from "../../widgets/pageLoader";
import StepProgress from "./Stepprogress";
import { useCvProfile } from "../../hooks/useCv";

const IntroductionDetails = () => {
  const navigate = useNavigate();
  const applicantId = localStorage.getItem("applicantId");

  const { data: candidateDetuils, isPending: isLoading } =
    useCvProfile(applicantId);

  const candidate = candidateDetuils?.data;

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className=" ">
      <StepProgress
        currentStep={1}
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
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center p-4 bg-white shadow-sm rounded mb-4">
        {/* Left Section: Title & Description */}
        <div className="text-center text-md-start mb-3 mb-md-0">
          <h1 className="fw-bold h2 text-dark mb-1">Personal Details</h1>
        </div>
      </div>
      {/* Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 ">
        {/* Name */}
        <div>
          <label>Name</label>
          <input
            readOnly
            defaultValue={
              candidate?.applicant_profile?.[0]?.first_name &&
              candidate?.applicant_profile?.[0]?.last_name
            }
            className="w-full mt-1 py-2 rounded-lg border-gray-300 bg-transparent"
          />
        </div>

        {/* Position */}
        <div>
          <label>Position</label>
          <input
            readOnly
            defaultValue={candidate?.current_position}
            className="w-full mt-1 py-2 rounded-lg border-gray-300 bg-transparent"
          />
        </div>

        {/* Email */}
        <div>
          <label>Email</label>
          <input
            readOnly
            defaultValue={candidate?.applicant_profile?.[0]?.email}
            className="w-full mt-1 py-2 rounded-lg border-gray-300 bg-transparent"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label>Phone Number</label>
          <input
            readOnly
            defaultValue={candidate?.phone?.phone_number}
            type="number"
            className="w-full mt-1 py-2 rounded-lg border-gray-300 bg-transparent"
          />
        </div>

        {/* Date of Birth */}
        <div>
          <label>Date of Birth</label>
          <input
            readOnly
            defaultValue={candidate?.applicant_profile?.[0]?.dob}
            type="date"
            className="w-full mt-1 py-2 rounded-lg border-gray-300 bg-transparent"
          />
        </div>

        {/* Gender */}
        <div>
          <label>Gender</label>
          <select
            readOnly
            defaultValue={candidate?.applicant_profile?.[0]?.gender_name}
            className="w-full mt-1 py-2 rounded-lg border-gray-300 bg-transparent"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        {/* Marital Status */}
        <div>
          <label>Marital Status</label>
          <select
            readOnly
            defaultValue={candidate?.applicant_profile?.[0]?.marital_status}
            className="w-full mt-1 py-2 rounded-lg border-gray-300 bg-transparent"
          >
            <option>Married</option>
            <option>Single</option>
          </select>
        </div>

        {/* Location */}
        <div className="sm:col-span-2 lg:col-span-1">
          <label>Location</label>
          <input
            readOnly
            placeholder="Sublocation, Region, Country"
            defaultValue={`${candidate?.address?.[0]?.sub_location}, ${
              candidate?.address?.[0]?.region_name
            }, ${candidate?.address?.[0]?.name}`}
            className="w-full mt-1 py-2 rounded-lg border-gray-300 bg-transparent"
          />
        </div>
      </div>
    </div>
  );
};

export default IntroductionDetails;

import { useContext, useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { collection, doc, setDoc } from "firebase/firestore";

import PageLoader from "../../widgets/pageLoader";
import axios from "axios";
import StepProgress from "./Stepprogress";
// import { checkIfExists } from "../controllers/apisController";
// import HideInfo from '../layouts/useHideFields';

import { CvApi } from "../../Api/Jobseeker/CvApi";
const ProfessionalSummary = () => {

  const [originalDetails, setOriginalDetails] = useState(null)
  const [candidate, setCandidate] = useState(null);
  const [careerObjective, setCareerObjective] = useState(
    originalDetails?.careers?.[0]?.career || '' // Default to empty string if data is null or undefined
  );

  const [Objective, setObjective] = useState(
    originalDetails?.objective?.objective || '' // Default to empty string if data is null or undefined
  );

  const uuid = localStorage.getItem("applicantId");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await CvApi.getCvprofile(uuid)
        if (response != null) {
          const data = response.data
          console.log("all data safi", data);
          setOriginalDetails(data);
          // checkIfExists({ uuid }).then((value) => {
          //     // if(value == false){
          //     //     setDoc(doc(collection(firestore,"apis"),`${uuid}`),data) 
          //     // }
          // });
        }
      } catch (error) {

      }
    };
    fetchData();

  }, []);
  console.log("objective dat objctvive data ", originalDetails);
  // Initialize state with candidate data



  const sendData = {
    career: careerObjective
  }
  const sendData2 = {
    objective: Objective
  }
  const handleCareerChange = async (e) => {
    const newCareerObjective = e.target.value;
    setCareerObjective(newCareerObjective);

    setCandidate(prev => ({
      ...prev,
      careers: [{ ...prev.careers[0], career: newCareerObjective }]
    }));

  };
  const handleObjectiveChange = async (e) => {
    const newObjective = e.target.value;
    setObjective(newObjective);



    setCandidate(prev => ({
      ...prev,
      objective: [{ ...prev.objective[0], career: newObjective }]
    }));




  };
  useEffect(() => {
    const saveCareerObjective = async () => {
      try {
        const response = await axios.put(`http://127.0.0.1:8000/api/applicant/storecareerobjective/${uuid}`, sendData,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }

        );
        if (response.status === 200) {

        }
        // window.location.reload();

      } catch (error) {
        console.error("Error updating career objective:", error);
      }
    };

    // Only call saveCareerObjective if careerObjective is not empty
    if (careerObjective) saveCareerObjective();

  }, [sendData, uuid]);

  useEffect(() => {
    const saveObjective = async () => {
      try {
        console.log('send data three', sendData2);
        const response = await axios.put(`http://127.0.0.1:8000/api/applicant/storeObjective/${uuid}`, sendData2,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }

        );
        if (response.status === 200) {
          console.log('send objective is better ', response.data.success);
        }
        // window.location.reload();

      } catch (error) {
        console.error("Error updating career objective:", error);
      }
    };

    // Only call saveObjective if careerObjective is not empty
    if (Objective) saveObjective();

  }, [sendData2, uuid]);
  return (
    !originalDetails ? (  // Changed this condition
      <PageLoader />
    ) : (
      <div className="p-4 sm:p-6 md:p-8">
        <StepProgress currentStep={2} onStepClick={(step) => {
          // Handle navigation to different steps
          switch (step) {
            case 1: navigate('/jobseeker/introduction'); break;
            case 2: navigate('/jobseeker/objective'); break;
            case 3: navigate('/jobseeker/EducationCv'); break;
            case 4: navigate('/jobseeker/ExperienceCv'); break;
            case 5: navigate('/jobseeker/SkillsCv'); break;
            case 6: navigate('/jobseeker/LanguageCv'); break;
            case 7: navigate('/jobseeker/proficiencyCv'); break;
            case 8: navigate('/jobseeker/TrainingCv'); break;
            case 9: navigate('/jobseeker/RefereeCv'); break;
            case 10: navigate('/jobseeker/CompleteCv'); break;
            // ... add other cases for each step
            default: break;
          }
        }} />
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 p-4 bg-white rounded-lg shadow-md  ">
          <div className="text-center sm:text-left">
            <h1 className="font-bold text-2xl sm:text-3xl text-gray-800">Professional Summary</h1>
            <p className="text-base sm:text-lg text-gray-500 mt-1 sm:mt-2">
              Edit professional summary here
            </p>
          </div>
       
        </div>

        {/* Career Objective Section */}
        <div className="mt-8">
          <label className="block text-sm font-medium text-gray-700">Career Objective</label>
          {originalDetails.data?.careers?.[0]?.career ? (
            <textarea
              onInput={handleCareerChange}
              defaultValue={originalDetails.data.careers[0].career}
              className="w-full mt-1 p-3 rounded-lg border border-gray-300 bg-transparent focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={5}
            />
          ) : (
            <p className="text-gray-500 mt-2">No career objective available</p>
          )}
        </div>

        {/* Main Objective Section */}
        <div className="mt-8">
          <label className="block text-sm font-medium text-gray-700">Main Objective</label>
          {originalDetails.data?.objective?.objective ? (
            <textarea
              onInput={handleObjectiveChange}
              defaultValue={originalDetails.data.objective.objective}
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
    )
  );
}

export default ProfessionalSummary;
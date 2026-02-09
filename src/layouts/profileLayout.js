import { Outlet, useNavigate, useParams } from "react-router-dom";
import Template1 from "../templates/template1";
import { createContext, useEffect, useState } from "react";
import FromReactPdf from "../templates/fromReactPdf";
import axios from "axios";
import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";
import { firestore } from "../utils/firebase";
import { api } from "../utils/apiSample";
import { checkIfExists } from "../controllers/apisController";
import Template2 from "../templates/template2";
import Template3 from "../templates/template3";
import Template4 from "../templates/template4";
import Template5 from "../templates/template5";
import Template6 from "../templates/template6";
import Template7 from "../templates/template7";
import Template8 from "../templates/template8";

export const StepsContext = createContext();
const ProfileLayout = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [candidate, setCandidate] = useState(null);
  const [originalDetails, setOriginalDetails] = useState(null);

  const steps = [
    { title: "Preview" },
    { title: "Introduction" },
    { title: "Professional Summary" },
    { title: "Education" },
    { title: "Work Experience" },
    { title: "Skills" },
    { title: "Language" },
    { title: "Proficiency" },
    { title: "Training" },
    { title: "Referees" },
    { title: "Complete" },
  ];
  const { uuid, template } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/cv/cv_builder/${uuid}`)
      .then((response) => {
        if (response != null) {
          const data = response.data.data;
          setOriginalDetails(data);
          checkIfExists({ uuid }).then((value) => {
            if (value == false) {
              setDoc(doc(collection(firestore, "apis"), `${uuid}`), data);
            }
          });
        }
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  }, []);
  useEffect(() => {
    onSnapshot(doc(collection(firestore, "apis"), `${uuid}`), (value) => {
      if (value.exists) {
        setCandidate(value.data());
      }
    });
  }, []);
  return (
    <div>
      <div className="">
        <div className=" w-3/12 fixed bg-primary h-screen text-white px-12 py-5">
          <div className="">
            <h1 className=" text-white text-2xl font-bold ">
              CV Builder (eKazi){" "}
            </h1>
          </div>
          <div className="  mt-8">
            {steps.map((item, index) => {
              return (
                <div className="font-bold text-opacity-75  border-white border-opacity-50 rounded">
                  <div className="flex space-x-2 items-center">
                    <div
                      className={`h-8 w-8  ${
                        index < currentStep
                          ? "bg-green-600"
                          : " bg-white bg-opacity-10"
                      } rounded-full flex justify-center items-center`}
                    >
                      {index + 1}
                    </div>
                    <h1>{item.title}</h1>
                  </div>
                  {index + 1 != steps.length && (
                    <div
                      className={`h-5 ${
                        index < currentStep
                          ? "bg-green-600"
                          : "bg-white bg-opacity-10"
                      } ml-4 w-[2px]`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-9/12 ms-auto min-h-screen bg-gray-100">
          <div className="fixed w-full">
            <div className="flex py-5 w-9/12  bg-[#E5E4F6] justify-end px-12 ">
              <h1
                onClick={() => {
                  window.location.href =
                    "https://api.ekazi.co.tz/applicant/dashboard";
                }}
                className="font-bold text-black cursor-pointer"
              >
                Back to profile
              </h1>
            </div>
          </div>
          <div className=" px-12 py-8 pb-32 pt-20">
            <StepsContext.Provider
              value={{
                currentStep,
                setCurrentStep,
                candidate,
                setCandidate,
                originalDetails,
              }}
            >
              <Outlet />
            </StepsContext.Provider>
          </div>
          {currentStep !== 0 && currentStep !== 11 && (
            <div className="fixed bottom-6 left-0 right-0 py-5">
              <div className="w-3/12"></div>
              <div className="w-9/12 ms-auto flex justify-center">
                <div className="">
                  <button
                    onClick={() => {
                      setShowPreview(true);
                    }}
                    className="bg-green-600 hover:scale-105 transition-all  text-white shadow-2xl font-bold rounded-full py-4 px-8"
                  >
                    Preview template
                  </button>
                  {showPreview && (
                    <div
                      onClick={() => {
                        // setShowPreview(false)
                      }}
                      className={`inset-0  bg-translate fixed bg-black bg-opacity-30  transition-all duration-500  `}
                    >
                      <div className="w-full h-full flex justify-center items-center">
                        <div className="w-7/12 mx-auto  border-gray-200  bg-white h-[95%] shadow-2xl overflow-y-auto ">
                          <div className=" bg-gray-50">
                            <div className="px-12 flex justify-end"></div>
                            <div className="fixed  bg-white w-7/12">
                              <div className="flex justify-between px-12 py-4 items-center">
                                <h1 className="font-bold text-2xl "></h1>
                                <div className="flex items-center space-x-4">
                                  <div
                                    onClick={() => {
                                      setShowPreview(false);
                                    }}
                                    className="font-bold cursor-pointer hover:scale-105 transition-all text-gray-800  "
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={1.5}
                                      stroke="currentColor"
                                      className="w-6 h-6"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18 18 6M6 6l12 12"
                                      />
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="mt-12">
                            <StepsContext.Provider
                              value={{
                                currentStep,
                                setCurrentStep,
                                candidate,
                                setCandidate,
                                originalDetails,
                              }}
                            >
                              {[
                                { template: <Template1 /> },
                                { template: <Template2 /> },
                                { template: <Template3 /> },
                                { template: <Template4 /> },
                                { template: <Template5 /> },
                                { template: <Template6 /> },
                                { template: <Template7 /> },
                                { template: <Template8 /> },
                              ].map((item, index) => {
                                return (
                                  index + 1 == template && (
                                    <div>{item.template}</div>
                                  )
                                );
                              })}
                            </StepsContext.Provider>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;

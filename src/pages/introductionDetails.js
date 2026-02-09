import { useContext, useEffect } from "react";
import { StepsContext } from "../layouts/mainLayout";
import { useNavigate, useParams } from "react-router-dom";
import { collection, doc, setDoc } from "firebase/firestore";
import { firestore } from "../utils/firebase";
import PageLoader from "../widgets/pageLoader";
import { useState } from "react";
import axios from "axios";
import HideInfo from '../layouts/useHideFields';

const IntroductionDetails = () => {
  // const {originalDetails, candidate, setCandidate } = useContext(StepsContext)
  // const { uuid, template } = useParams()
    const [originalDetails, setOriginalDetails] = useState(null)
 const candidate=originalDetails;
 const uuid=48;
  const navigate = useNavigate();
      useEffect(() => {
        console.log(uuid);
        axios.get(`http://127.0.0.1:8000/api/cv/cv_builder/${uuid}`).then((response) => {

            if (response != null) {
                const data = response.data.data
                 console.log("all data",data);
                setOriginalDetails(data);
                // checkIfExists({ uuid }).then((value) => {
                //     // if(value == false){
                //     //     setDoc(doc(collection(firestore,"apis"),`${uuid}`),data) 
                //     // }
                // });
            }
        }).catch((error) => {
            console.log(error);
            throw error;
        })
    }, [])
  // useEffect(() => {
  //   setCurrentStep(2)
  // }, [])
  // const [NameApplicant, setNameApplicant] = useState(
  //   originalDetails?.applicant_profile[0].first_name || ''
  // );
  // const [phoneApplicant, setPhoneApplicant] = useState(
  //   originalDetails?.phone.phone_number || ''
  // );
  // const [emailApplicant, setEmailApplicant] = useState(
  //   originalDetails?.applicant_profile.email || ''
  // );
  // const [birthApplicant, setBirthApplicant] = useState(
  //   originalDetails?.applicant_profile.dob || ''
  // );
  // const [genderApplicant, setGenderApplicant] = useState(
  //   originalDetails?.applicant_profile.gender_name || ''
  // );
  // const [maritalApplicant, setMaritalApplicant] = useState(
  //   originalDetails?.applicant_profile.marital_status || ''
  // );
  // const [positionlApplicant, setPositionApplicant] = useState(
  //   originalDetails?.experience[0].position.position_name || ''
  // );

  // const [locationApplicant, setLocationApplicant] = useState({
  //   sub_location: originalDetails?.address?.sub_location || '',
  //   region_name: originalDetails?.address?.region_name || '',
  //   name: originalDetails?.address?.name || ''
  // });

  // console.log('check marital is available', positionlApplicant);
  // const handleNameChange = async (e) => {
  //   const newNameApplicant = e.target.value;
  //   setNameApplicant(newNameApplicant);

  //   setCandidate(prev => ({
  //     ...prev,
  //     applicant_profile: [
  //       {
  //         ...prev.applicant_profile?.[0],
  //         first_name: newNameApplicant
  //       }
  //     ]
  //   }));
  // };
  // const handlePhoneChange = async (e) => {
  //   const newPhoneApplicant = e.target.value;
  //   setPhoneApplicant(newPhoneApplicant);

  //   setCandidate(prev => ({
  //     ...prev,
  //     phone: [
  //       {
  //         ...prev.phone?.[0],
  //         phone_number: newPhoneApplicant
  //       }
  //     ]

  //   }));
  // }
  // const handEmailChange = async (e) => {
  //   const newEmailApplicant = e.target.value;

  //   setEmailApplicant(newEmailApplicant);
  //   setCandidate(prev => (
  //     {
  //       ...prev,
  //       applicant_profile: [
  //         {
  //           ...prev.applicant_profile?.[0],
  //           email: newEmailApplicant
  //         }
  //       ]
  //     }));
  // }
  // const handLocationApplicant = async (e) => {
  //   const [sub_location, region_name, country] = e.target.value.split(", ");

  //   const newLocationApplicant = {
  //     sub_location,
  //     region_name,
  //     country,
  //   };

  //   setLocationApplicant(newLocationApplicant);

  //   setLocationApplicant(prev => ({
  //     ...prev,
  //     sub_location: sub_location, // Update specific properties as needed
  //     region_name: region_name,
  //     country: country,
  //   }));

  // };

  // const handleBirthChange = async (e) => {
  //   const newbirth = e.target.value;
  //   setBirthApplicant(newbirth);
  //   setCandidate(prev => ({
  //     ...prev,
  //     applicant_profile: [
  //       {
  //         ...prev,
  //         dob: newbirth,
  //       }

  //     ]
  //   }));
  // }
  // const handleGenderChange = async (e) => {
  //   const newGender = e.target.value;
  //   setGenderApplicant(newGender);
  //   setCandidate(prev => (
  //     {
  //       ...prev,
  //       gender_name: [
  //         {
  //           ...prev,
  //           gender_name: newGender,
  //         }
  //       ]

  //     }));
  // }
  // const handleMaritalChange = async (e) => {
  //   const newMarital = e.target.value;
  //   setMaritalApplicant(newMarital);
  //   setCandidate(prev => (
  //     {
  //       ...prev,
  //       marital_status: [
  //         {
  //           ...prev,
  //           marital_status: newMarital,
  //         }
  //       ]

  //     }));
  // }
  // const handlePositionlChange = async (e) => {
  //   const newPosition = e.target.value;
  //   setPositionApplicant(newPosition);
  //   setCandidate(prev => (
  //     {
  //       ...prev,
  //       position_name: [
  //         {
  //           ...prev,
  //           position_name: newPosition,
  //         }
  //       ]

  //     }));
  // }




  // const sendData = {
  //   // name: NameApplicant,
  //   phone: phoneApplicant,
  //   // email: emailApplicant,
  //   address: locationApplicant,
  //   dob: birthApplicant,
  //   gender: genderApplicant,
  //   maritas_status: maritalApplicant,
  //   applicant_id:uuid,
  //   // current_position: positionlApplicant,

  // }
  // useEffect(() => {
  //   const saveIntroduction = async () => {
  //     console.log(" summery detail skills", sendData);
  //     try {
  //       const response = await axios.put(`https://test.ekazi.co.tz/api/applicant/updateIntroduction`, sendData,
  //         {
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //         }

  //       );
  //       if (response.status === 200) {
  //         console.log(" introduction is get ",response.data.success);
  //       }
  //       // window.location.reload();

  //     } catch (error) {
  //       console.log(error)
  //       console.error("Error updating career objective:", error);
  //     }
  //   };

  //   // Only call saveCareerObjective if careerObjective is not empty

  //   if (
  //     NameApplicant ||
  //     phoneApplicant ||
  //     // emailApplicant ||
  //     locationApplicant ||
  //     birthApplicant ||
  //     genderApplicant ||
  //     maritalApplicant 
  //     // positionlApplicant
  //   ) {
  //     saveIntroduction();
  //   }


  // }, [sendData, uuid]);
  return (
    originalDetails == null || candidate == null ? (
      <PageLoader />
    ) : (
      <div className="p-4 sm:p-6 md:p-8">
        {/* Header Section */}

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 p-4 bg-white shadow-md rounded-lg mt-3">
          {/* Left Section: Title & Description */}
          <div className="text-center sm:text-left">
            <h1 className="font-bold text-2xl sm:text-3xl text-gray-800">Introduction Details</h1>

          </div>

          {/* Right Section: Buttons */}
          <div className="mt-4 sm:mt-0 flex items-center space-x-4">

            <div className="bg-white rounded-full">
              <button className="py-2 px-4 bg-secondary font-bold text-secondary bg-opacity-20 rounded-full">
                Step 2
              </button>
            </div>
          </div>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {/* Name */}
          <div>
            <label>Name</label>
            <input
              readOnly
              defaultValue={
                originalDetails?.applicant_profile?.[0]?.first_name ===
                  candidate?.applicant_profile?.[0]?.first_name
                  ? originalDetails?.applicant_profile?.[0]?.first_name
                  : candidate?.applicant_profile?.[0]?.first_name || "Not specified"
              }
              className="w-full mt-1 py-2 rounded-lg border-gray-300 bg-transparent"
            />
          </div>

          {/* Position */}
          <div>
            <label>Position</label>
            <input
              readOnly
              defaultValue={
                originalDetails?.experience?.[0]?.position?.position_name ===
                  candidate?.experience?.[0]?.position?.position_name
                  ? originalDetails?.experience?.[0]?.position?.position_name
                  : candidate?.experience?.[0]?.position?.position_name || "Not specified"
              }
              className="w-full mt-1 py-2 rounded-lg border-gray-300 bg-transparent"
            />
          </div>

          {/* Email */}
          <div>
            <label>Email</label>
            <input
              readOnly
              defaultValue={
                originalDetails?.applicant_profile?.[0]?.email ===
                  candidate?.applicant_profile?.[0]?.email
                  ? originalDetails?.applicant_profile?.[0]?.email
                  : candidate?.applicant_profile?.[0]?.email || "Not specified"
              }
              className="w-full mt-1 py-2 rounded-lg border-gray-300 bg-transparent"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label>Phone Number</label>
            <input
              readOnly
              defaultValue={
                originalDetails?.phone?.phone_number === candidate?.phone?.phone_number
                  ? originalDetails?.phone?.phone_number
                  : candidate?.phone?.phone_number || "Not specified"
              }
              type="number"
              className="w-full mt-1 py-2 rounded-lg border-gray-300 bg-transparent"
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label>Date of Birth</label>
            <input
              readOnly
              defaultValue={
                originalDetails?.applicant_profile?.[0]?.dob ===
                  candidate?.applicant_profile?.[0]?.dob
                  ? originalDetails?.applicant_profile?.[0]?.dob
                  : candidate?.applicant_profile?.[0]?.dob || "Not specified"
              }
              type="date"
              className="w-full mt-1 py-2 rounded-lg border-gray-300 bg-transparent"
            />
          </div>

          {/* Gender */}
          <div>
            <label>Gender</label>
            <select
              readOnly
              defaultValue={
                originalDetails?.applicant_profile?.[0]?.gender_name ===
                  candidate?.applicant_profile?.[0]?.gender_name
                  ? originalDetails?.applicant_profile?.[0]?.gender_name
                  : candidate?.applicant_profile?.[0]?.gender_name || "Not specified"
              }
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
              defaultValue={
                originalDetails?.applicant_profile?.[0]?.marital_status ===
                  candidate?.applicant_profile?.[0]?.marital_status
                  ? originalDetails?.applicant_profile?.[0]?.marital_status
                  : candidate?.applicant_profile?.[0]?.marital_status || "Not specified"
              }
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
              defaultValue={`${originalDetails?.address?.[0]?.sub_location || "Not specified"}, ${originalDetails?.address?.[0]?.region_name || "Not specified"
                }, ${originalDetails?.address?.[0]?.name || "Not specified"}`}
              className="w-full mt-1 py-2 rounded-lg border-gray-300 bg-transparent"
            />
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="relative z-10 w-full mt-10 px-4">
          <div className="flex flex-col sm:flex-row justify-end items-center gap-4">
            {/* Prev Button */}
            <button
              type="button"
              // onClick={() => {
              //   console.log("Prev clicked");
              //   navigate(-1);
              //   setCurrentStep(currentStep - 1);
              // }}
              className="w-full sm:w-auto text-gray-700 font-semibold hover:text-primary transition-all"
            >
              ← Prev
            </button>

            {/* Continue Button */}
            <button
              type="button"
              // onClick={() => {
              //   console.log("Continue clicked");
              //   navigate(`/professional_summary/${uuid}/${template}`);
              //   setCurrentStep(currentStep + 1);
              // }}
              className="w-full sm:w-auto py-3 px-6 bg-primary text-white font-bold rounded-full hover:scale-105 transition-all"
            >
              Continue
            </button>
          </div>
        </div>



      </div>
    )
  );
}


export default IntroductionDetails;
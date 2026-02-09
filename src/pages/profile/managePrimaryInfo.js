import { useContext, useEffect } from "react";
// import { StepsContext } from "../layouts/mainLayout";
import { useNavigate, useParams } from "react-router-dom";
import { collection, doc, setDoc } from "firebase/firestore";
import { StepsContext } from "../../layouts/profileLayout";
import { firestore } from "../../utils/firebase";
import PageLoader from "../../widgets/pageLoader";
// import { firestore } from "../utils/firebase";
// import PageLoader from "../widgets/pageLoader";

const ManagePrimaryInformations = () => {
    const {currentStep,setCurrentStep,originalDetails,candidate} = useContext(StepsContext)
    const {uuid,template} = useParams()
    const navigate = useNavigate();
    useEffect(()=>{
       setCurrentStep(1)
    },[])
    return ( originalDetails == null || candidate == null ?<PageLoader/>
    :  <div>
         <div className="flex justify-between items-center">
        <div>
        <h1 className="font-bold text-3xl">Introduction Details</h1>
        <p className="text-lg text-gray-500 mt-2">Edit introduction details here</p>
        </div>
        <div>
            <div className="bg-white rounded-full">
            <button className="py-2 px-4 bg-secondary font-bold text-secondary bg-opacity-20 rounded-full ">Step 2</button>
            </div>
        </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-12">
  <div className="">
    <label>Name</label>
    <input 
      onChange={(e) => {
        const newData = { ...candidate }; // Create a shallow copy of candidate
        newData.applicant_profile[0].first_name = e.target.value; // Update the first_name field
         // Update the state with the new data
        // Update Firestore document
        setDoc(doc(collection(firestore, "apis"), `${uuid}`), newData);
      }} 
      defaultValue={originalDetails.applicant_profile[0].first_name == candidate.applicant_profile[0].first_name ? originalDetails.applicant_profile[0].first_name : candidate.applicant_profile[0].first_name}
      className="w-full mt-1 py-2 rounded-lg border-gray-300 bg-transparent"
    />
  </div>
  <div className="">
    <label>Position</label>
    <input 
      onChange={(e) => {
        const newData = { ...candidate };
        newData.experience[0].position.position_name = e.target.value;
        setDoc(doc(collection(firestore, "apis"), `${uuid}`), newData);
      }} 
      defaultValue={originalDetails.experience.length>0&&originalDetails.experience[0].position.position_name == candidate.experience.length>0&& candidate.experience[0].position.position_name ? originalDetails.experience.length>0&& originalDetails.experience[0].position.position_name :candidate.experience.length>0&& candidate.experience[0].position.position_name}
      className="w-full mt-1 py-2 rounded-lg border-gray-300 bg-transparent"
    />
  </div>
  <div className="">
    <label>Email</label>
    <input 
      onChange={(e) => {
        const newData = { ...candidate };
        newData.applicant_profile[0].email = e.target.value;
        setDoc(doc(collection(firestore, "apis"), `${uuid}`), newData);
      }} 
      defaultValue={originalDetails.applicant_profile[0].email == candidate.applicant_profile[0].email ? originalDetails.applicant_profile[0].email : candidate.applicant_profile[0].email} 
      className="w-full mt-1 py-2 rounded-lg border-gray-300 bg-transparent"
    />
  </div>
  <div className="">
    <label>Phone Number</label>
    <input  
      onChange={(e) => {
        const newData = { ...candidate };
        newData.phone.phone_number = e.target.value;
        setDoc(doc(collection(firestore, "apis"), `${uuid}`), newData);
        
      }} 
      defaultValue={originalDetails.phone.phone_number == candidate.phone.phone_number ? originalDetails.phone.phone_number : candidate.phone.phone_number}
      type="number" 
      className="w-full mt-1 py-2 rounded-lg border-gray-300 bg-transparent"
    />
  </div>
  <div className="">
    <label>Location</label>
    <input  
      onChange={(e) => {
        const newData = { ...candidate };
        const address = newData.address[0];
        const [sub_location, region_name, name] = e.target.value.split(", ");
        address.sub_location = sub_location;
        address.region_name = region_name;
        address.name = name;
        setDoc(doc(collection(firestore, "apis"), `${uuid}`), newData);
      }} 
      defaultValue={`${originalDetails.address[0].sub_location}, ${originalDetails.address[0].region_name}, ${originalDetails.address[0].name} `}
      className="w-full mt-1 py-2 rounded-lg border-gray-300 bg-transparent"
    />
  </div>
  <div className="">
    <label>Date of birth</label>
    <input 
      onChange={(e) => {
        const newData = { ...candidate };
        newData.applicant_profile[0].dob = e.target.value;
        setDoc(doc(collection(firestore, "apis"), `${uuid}`), newData);
      }} 
      defaultValue={originalDetails.applicant_profile[0].dob == candidate.applicant_profile[0].dob ? originalDetails.applicant_profile[0].dob : candidate.applicant_profile[0].dob}
      type="date" 
      className="w-full mt-1 py-2 rounded-lg border-gray-300 bg-transparent"
    />
  </div>
  <div className="">
    <label>Gender</label>
    <select 
      onChange={(e) => {
        const newData = { ...candidate };
        newData.applicant_profile[0].gender_name = e.target.value;
        setDoc(doc(collection(firestore, "apis"), `${uuid}`), newData);
      }} 
      defaultValue={originalDetails.applicant_profile[0].gender_name == candidate.applicant_profile[0].gender_name ? originalDetails.applicant_profile[0].gender_name : candidate.applicant_profile[0].gender_name}
      className="w-full mt-1 py-2 rounded-lg border-gray-300 bg-transparent"
    >
      <option value="Male">Male</option>
      <option value="Female">Female</option>
    </select>
  </div>
  <div className="">
    <label>Marital Status</label>
    <select  
      onChange={(e) => {
        const newData = { ...candidate };
        newData.applicant_profile[0].marital_status = e.target.value;
        setDoc(doc(collection(firestore, "apis"), `${uuid}`), newData);
      }} 
      defaultValue={originalDetails.applicant_profile[0].marital_status == candidate.applicant_profile[0].marital_status ? originalDetails.applicant_profile[0].marital_status : candidate.applicant_profile[0].marital_status}
      className="w-full mt-1 py-2 rounded-lg border-gray-300 bg-transparent"
    >
      <option>Married</option>
      <option>Not Married</option>
    </select>
  </div>
</div>


                <div className="flex justify-end space-x-2 mt-4 items-center">
                  <h1 onClick={()=>{
                      navigate(-1)
                      setCurrentStep(currentStep-1)
                  }} className="font-bold text-gray-800 cursor-pointer">Prev</h1>
                  <button onClick={()=>{
                    navigate(`/professional_summary/${uuid}/${template}`)
                    setCurrentStep(currentStep+1)
                  }} className="py-3 px-5  bg-primary hover:scale-105 transition-all rounded-full font-bold cursor-pointer text-white">Continue</button>
                </div>
    </div> );
}
 
export default ManagePrimaryInformations;
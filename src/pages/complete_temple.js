import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { StepsContext } from "../layouts/mainLayout";
import { useNavigate, useParams } from "react-router-dom";
import PageLoader from "../widgets/pageLoader";

const Complete = () => {
   const [downloading,setDownloading] = useState(false)
   const [margin,setMargin] = useState("mt-32 opacity-0 ")

   const {currentStep,setCurrentStep,originalDetails,candidate} = useContext(StepsContext)
    const {uuid,template} = useParams()
    const navigate = useNavigate()
    
   useEffect(()=>{
     
    setCurrentStep(9)
 },[])
 useEffect(()=>{
     setMargin("mt-0 opacity-100")
 },[originalDetails])
    return ( originalDetails == null || candidate == null ?<PageLoader/> : <div>
        <div className={`flex flex-col transition-all duration-300 ${margin}  items-center justify-center h-screen`}>
            <div className="">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-24 h-24 text-green-600">
            <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
            </svg>
    
            </div>
            <h1 className="font-bold text-2xl">Congrats! Your CV is complete</h1>
      <p>Press button below to download</p>
      <button onClick={()=>{
                                   setDownloading(true)
                                   axios.get(`http://127.0.0.1:8000/generatePdf/?template=${template}&uuid=${uuid}&name=${candidate.applicant_profile[0].first_name}`).then((response)=>{
                                       const link =  response.data.body.link;
                                       setDownloading(false)
                                       window.open(link,'_blank')
                                   
                                   })
                               }} className="bg-primary mt-8 bg-opacity-90 rounded-full hover:scale-105 transition-all shadow-2xl text-white flex justify-center items-center font-bold h-12 w-40">
                                   {downloading?<div className=" border-4 h-5 w-5 border-white rounded-full border-t-transparent animate-spin"></div>:"Download CV"}

                               </button> 
                               <h1 onClick={()=>{
                                navigate(-1)
                               }} className="font-bold cursor-pointer hover:text-opacity-70 transition-all text-darkShadow mt-2">Go back</h1>  

        </div>
    </div> );
}
 
export default Complete;
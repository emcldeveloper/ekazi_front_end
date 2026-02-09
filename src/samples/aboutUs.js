import { useState } from "react";

 const AboutUs = ()=>{
      const [isLoading, setIsLoading] = useState(false)
    return <div>
         <div className="w-screen h-screen flex justify-center items-center">
            
            <button onClick={()=>{
                setIsLoading(!isLoading)
            }}  className="py-2 px-3 hover:scale-105 font-bold transition-all cursor-pointer flex justify-center w-48  h-14 items-center bg-blue-700 text-white">
             
              {isLoading ? <div className="h-5 w-5 border-2 border-t-transparent rounded-full animate-spin"></div>
              :"Click Me "}
            </button>
         </div>
    </div>
}

export default AboutUs;



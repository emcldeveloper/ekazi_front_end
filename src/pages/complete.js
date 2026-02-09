import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { StepsContext } from "../layouts/mainLayout";
import { useNavigate, useParams } from "react-router-dom";
import PageLoader from "../widgets/pageLoader";
import Swal from 'sweetalert2';
import HideInfo from '../layouts/useHideFields';

const Complete = () => {
    const [downloading, setDownloading] = useState(false)
    const [margin, setMargin] = useState("mt-32 opacity-0 ")

    const { currentStep, setCurrentStep, originalDetails, candidate } = useContext(StepsContext)
    const { uuid, template } = useParams()
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false);
    const [cvName, setCvName] = useState(""); // To store the user-entered CV name
    const [error, setError] = useState(null);

  

    useEffect(() => {

        setCurrentStep(11)
    }, [])
    useEffect(() => {
        setMargin("mt-0 opacity-100")
    }, [originalDetails])
    const sendToData = {
        'template':template,
        'applicant_id': uuid,
        'cv_name':cvName,
        

    }
    const handleDownloadClick = () => {
        setShowModal(true); // Show the modal when the button is clicked
      };
    
      const handleSaveAndDownload = () => {
        const newTab = window.open("", "_blank"); // Open a blank tab immediately
        setDownloading(true); // Start loading indicator
    
        console.log("CV name:", cvName);
    
        // Step 1: Save the CV
        axios
            .post("http://127.0.0.1:8000/api/applicant/savedCv", sendToData)
            .then((saveResponse) => {
                // Ensure the save operation was successful
                if (saveResponse.status === 200) {
                    Swal.fire({
                        title: "Success!",
                        text: saveResponse.data.success,
                        icon: "success",
                        confirmButtonText: "OK",
                    });
    
                    // Step 2: Generate the PDF and get the link
                    return axios.get(
                        `http://127.0.0.1:8000/generatePdf/?template=${template}&uuid=${uuid}&name=${cvName}`
                    );
                } else {
                    throw new Error("Failed to save CV. Please try again.");
                }
            })
            .then((generateResponse) => {
                // Handle the response from the PDF generation
                const link = generateResponse?.data?.body?.link;
                if (link) {
                    // window.open(link, "_blank"); // Open the link in a new tab
                    if (newTab) {
                        newTab.location.href = link; // Update URL after fetching the link
                        setDownloading(false); // Stop loading indicator
                    } else {
                        alert("Pop-up blocked! Please allow pop-ups for this site.");
                    }
                } else {
                    throw new Error("Failed to generate PDF link.");
                }
            })
            .catch((error) => {
                // Handle any errors in the process
                console.error("Error occurred during saving or downloading the CV:", error);
                Swal.fire({
                    title: "Error!",
                    text: error.message || "An error occurred. Please try again.",
                    icon: "error",
                    confirmButtonText: "OK",
                });
            })
            .finally(() => {
                setDownloading(false); // Stop loading indicator
                setShowModal(false); // Close modal
            });
    };
    
    
               // First, call API to download the CV
           
    
    return (originalDetails == null || candidate == null ? <PageLoader /> : <div>
        <div className={`flex flex-col transition-all duration-300 ${margin}  items-center justify-center h-screen`}>
            <div className="">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-24 h-24 text-green-600">
                    <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                </svg>

            </div>
            <h1 className="font-bold text-2xl">Congrats! Your CV is complete</h1>
            <p>Press button below to download</p>
            <button
                onClick={handleDownloadClick}
                className="bg-primary mt-8 bg-opacity-90 rounded-full hover:scale-105 transition-all shadow-2xl text-white flex justify-center items-center font-bold h-12 w-40"
            >
                {downloading ? (
                <div className="border-4 h-5 w-5 border-white rounded-full border-t-transparent animate-spin"></div>
                ) : (
                " Save & Download"
                )}
            </button>

            <h1 onClick={() => {
                navigate(-1)
            }} className="font-bold cursor-pointer hover:text-opacity-70 transition-all text-darkShadow mt-2">Go back</h1>
            {/* Modal Popup for entering CV name */}
                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded shadow-lg">
                        <h2 className="text-lg font-bold mb-4">Enter CV Name</h2>
                         {/* Informational description */}
                         <p className="mb-2 text-gray-700 max-w-xs">
                            <HideInfo uuid={uuid} template={template} > </HideInfo>
                            Your CV will be saved to the Ekazi platform and will be available in your personal account.
                            You can view  your saved CVs at any time by going to the <strong>My CV</strong>.

                        </p>
                        <input
                        type="text"
                        className="border p-2 w-full"
                        placeholder="Enter CV Name"
                        value={cvName}
                        onChange={(e) => setCvName(e.target.value)}
                        />
                        {error && <p className="text-red-500 mt-2">{error}</p>}
                        <div className="mt-4 flex justify-end">
                        <button
                            onClick={() => setShowModal(false)}
                            className="bg-gray-300 px-4 py-2 rounded mr-2"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSaveAndDownload}
                            className="bg-primary px-4 py-2 text-white rounded"
                        >
                            Save & Download
                        </button>
                        </div>
                    </div>
                    </div>
                )}
        </div>
    </div>);
}

export default Complete;
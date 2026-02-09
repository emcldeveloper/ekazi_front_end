import { Outlet, useNavigate, useParams } from "react-router-dom";
import Template1 from "../templates/template1";
import { createContext, useEffect, useState } from "react";
import FromReactPdf from "../templates/fromReactPdf";
import axios from "axios";
import { FaBars, FaTimes } from "react-icons/fa";
import Sidebar from './Sidebar';

// import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";
// import { firestore } from "../utils/firebase";
// import { api } from "../utils/apiSample";
// MainLayout.js
 

import { checkIfExists } from "../controllers/apisController";
import Template2 from "../templates/template2";
import Template3 from "../templates/template3";
import Template4 from "../templates/template4";
import Template5 from "../templates/template5";
import Template6 from "../templates/template6";
import Template7 from "../templates/template7";
import Template8 from "../templates/template8";
import Template9 from "../templates/template9";
import Template10 from "../templates/template10";
import NavBar from "../layouts/NavBar";
import PageLoader from "../widgets/pageLoader";
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import Footer from "./footer";

export const StepsContext = createContext()
const MainLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const [currentStep, setCurrentStep] = useState(0)
    const [showPreview, setShowPreview] = useState(false)
    const [candidate, setCandidate] = useState(null)

    const [originalDetails, setOriginalDetails] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const [selected, setSelected] = useState(null); // State to track the selected item
    const [showPaymentModal, setShowPaymentModal] = useState(false); // Toggle payment modal
    const [cvSubscription, setCvSubscription] = useState([]);
    const [MySubscription, setSubscription] = useState('');
    const cvSubscriptionArray = Object.values(cvSubscription);


    const steps = [
        { title: "Preview" },
        { title: "Introduction" },
        { title: "Objective" },
        { title: "Education" },
        { title: "Experience" },
        { title: "Skills" },
        { title: "Language" },
        { title: "Proficiency" },
        { title: "Training" },
        { title: "Referees" },
        { title: "Complete" }]


    const { uuid, template } = useParams()
    const navigate = useNavigate()

    const closeSubModel = () => {
        setIsModalOpen(false);
        setSelected(null);
    }

    // useEffect(() => {
    //     console.log(uuid);
    //     axios.get(`http://127.0.0.1:8000/api/cv/cv_builder/${uuid}`).then((response) => {

    //         if (response != null) {
    //             const data = response.data.data
    //              console.log("all data",data);
    //             setOriginalDetails(data);
    //             // checkIfExists({ uuid }).then((value) => {
    //             //     // if(value == false){
    //             //     //     setDoc(doc(collection(firestore,"apis"),`${uuid}`),data) 
    //             //     // }
    //             // });
    //         }
    //     }).catch((error) => {
    //         console.log(error);
    //         throw error;
    //     })
    // }, [])
    // useEffect(() => {
    //     console.log(uuid);
    //     axios.get(`http://127.0.0.1:8000/api/cv/cv_builder/${uuid}`).then((response) => {
    //         if (response != null) {
    //             const data = response.data.data

    //             setCandidate(data);

    //         }
    //     }).catch((error) => {
    //         console.log(error);
    //         throw error;
    //     })
    // }, [])



    // useEffect(() => {
    //     axios
    //         .get(`http://127.0.0.1:8000/api/applicant/CvSubscription`)
    //         .then((response) => {
    //             console.log("subscription data msoft:", response); // Debug API response

    //             // Check if the response and its data exist
    //             if (response && response.data) {
    //                 const data = response.data.cv_plan_subscription;

    //                 // Ensure data is an array before setting it to state
    //                 if (Array.isArray(data)) {
    //                     setCvSubscription(data);
    //                     console.log("Data set to cvSubscription:", data);
    //                 } else {
    //                     console.error("Expected an array but got:", data);
    //                     setCvSubscription([]); // Set to an empty array to avoid errors
    //                 }
    //             } else {
    //                 console.error("Unexpected response structure:", response);
    //                 setCvSubscription([]); // Set to an empty array to avoid errors
    //             }
    //         })
    //         .catch((error) => {
               
    //             setCvSubscription([]); // Set to an empty array to avoid errors
    //         });
    // }, []); // Empty dependency array means this runs only once on component mount
    
    // useEffect(() => {
    //     axios
    //         .get(`http://127.0.0.1:8000/api/applicant/CvSubscriptiondata/${uuid}`)
    //         .then((response) => {
    //             console.log("API Response:", response); // Debug API response
    //             if (response) {
    //                 const data = response.data.subscription
    //                 setSubscription(data);
    //                 console.log("test cv sub", data);
    //             } else {
    //                 console.error("Unexpected response structure:", response);
    //             }
    //         })
    //         .catch((error) => {
    //             console.error("Error fetching CV Subscription data:", error.message);
    //         });
    // }, []); // Empty dependency array means this runs only once on component mount


    const handleSubscriptionSelect = (subId) => {
        setSelected(subId);

      
        axios
            .get(`http://127.0.0.1:8000/api/applicant/checksubsription/${subId}`)
 
            .then((response) => {
                console.log("check id", response.data);
                if (response.data.data && response.data.data.length > 0) {

                  
                    Swal.fire({
                        title: "Subscription Active",
                        text: "You already have an active subscription. Do you want to continue with a new subscription?",
                        icon: "info",
                        showCancelButton: true,
                        confirmButtonText: "Yes, Continue",
                        cancelButtonText: "No",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            openPaymentModal(subId); // Proceed to payment if the user accepts
                        }
                    });
                } else {
                    openPaymentModal(subId); // Directly open the payment modal if no subscription
                }
            })
            .catch((error) => {
                console.error("Error checking subscription:", error);
                Swal.fire({
                    title: "Error",
                    text: "Failed to check subscription. Please try again later.",
                    icon: "error",
                    confirmButtonText: "OK",
                });
            });
    };

    const openPaymentModal = (id) => {
        setSelected(id);
        setShowPaymentModal(true);
    };
    const [referenceNumber, setReferenceNumber] = useState('');
    const paymentData = {
        referenceNumber: referenceNumber,
        applicantId: uuid,
        subscriptionId: selected,
    };
    const closePaymentModal = () => setShowPaymentModal(false);




    const handleSubmit = async (e) => {
        e.preventDefault();

  

        try {

            // Submit form data without manually setting the Content-Type
            const response = await axios.post('http://127.0.0.1:8000/api/applicant/savesubsription', paymentData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                console.log('data sub', response.data.success);
                Swal.fire({
                    title: 'Success!',
                    text: response.data.success,
                    icon: 'success',
                    confirmButtonText: 'OK'
                });

                window.location.reload();
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: response.data.error,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: error,
                icon: 'error',
                confirmButtonText: 'OK'
            });

        }
    };

    



    return (<div>


        <div className="">
             
            <NavBar openModal={openModal} />
           


            <div className="w-12/12 ms-auto min-h-screen bg-gray-100">

               
                <div className="px-4 sm:px-6 md:px-8 lg:px-12 py-4 sm:py-6 md:py-8 pb-16 sm:pb-24 md:pb-32 pt-10 sm:pt-16 md:pt-20 max-w-full overflow-x-hidden">
                    <StepsContext.Provider
                        value={{ currentStep, setCurrentStep, candidate, setCandidate, originalDetails }}
                    >
                        <Outlet />
                    </StepsContext.Provider>
                </div>
                {/* {currentStep !== 0 && currentStep !== 11 && <div className="fixed bottom-6 left-0 right-0 py-5">
                    <div className="w-3/12"></div>
 
                    <div className="w-9/12 ms-auto flex justify-center">

                        <div className="">
                            <button onClick={() => {
                                setShowPreview(true)
                            }} className="bg-green-600 hover:scale-105 transition-all  text-white shadow-2xl font-bold rounded-full py-4 px-8 mt-20">Preview template</button>
                            {showPreview && <div onClick={() => {
                        
                            }} className={`inset-0  bg-translate fixed bg-black bg-opacity-30  transition-all duration-500  `}>
                                <div className="w-full h-full flex justify-center items-center mt-12">
                                    <div className="w-7/12 mx-auto  border-gray-200  bg-white h-[95%] shadow-2xl overflow-y-auto ">

                                        <div className=" bg-gray-50">
                                            <div className="px-12 flex justify-end">

                                            </div>
                                            <div className="fixed  bg-white w-7/12">
                                                <div className="flex justify-between px-12 py-4 items-center">
                                                    <h1 className="font-bold text-2xl "></h1>
                                                    <div className="flex items-center space-x-4">
                                                        <div onClick={() => {
                                                            setShowPreview(false)
                                                        }} className="font-bold cursor-pointer hover:scale-105 transition-all text-gray-800  ">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-12">
                                            <StepsContext.Provider value={{ currentStep, setCurrentStep, candidate, setCandidate, originalDetails }}>
                                                {[
                                                    { template: <Template1 /> },
                                                    { template: <Template2 /> },
                                                    { template: <Template3 /> },
                                                    { template: <Template4 /> },
                                                    { template: <Template5 /> },
                                                    { template: <Template6 /> },
                                                    { template: <Template7 /> },
                                                    { template: <Template8 /> },
                                                    { template: <Template9 /> },
                                                    { template: <Template10 /> }].map((item, index) => {
                                                        return index + 1 == template && <div>{item.template}</div>
                                                    })}
                                            </StepsContext.Provider>


                                        </div>
                                    </div>
                                </div>
                            </div>}
                        </div>
                    </div>
                </div>} */}


            </div>
            

            {/* {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white w-96 h-auto max-h-100 p-6 rounded-lg shadow-lg overflow-y-auto">
                        <h2 className="text-lg font-semibold mb-4">Choose a CV Template Subscription   </h2>
                        <ul className="space-y-4">

                            {cvSubscription?.map((sub) => (
                                <li
                                    key={sub.id}
                                    onClick={() => handleSubscriptionSelect(sub.id)}
                                    className={`border-b pb-4 flex items-start space-x-4 cursor-pointer ${selected === sub.id ? "bg-yellow-100" : ""}`}
                                >
                                    <img
                                        src='/cv5.jpg'
                                        alt={sub.name || 'Subscription Image'}
                                        className="w-16 h-16 object-cover rounded-md"
                                    />
                                    <div>

                                        <strong className="block text-lg">{sub.name || 'No Name'}</strong>
                                        <p className="text-sm text-gray-600">{sub.description || 'No Description'}</p>
                                        <div className="mt-2 text-sm text-gray-700">
                                            <p>
                                                <strong>Price:</strong> {sub.price} Tsh
                                            </p>
                                            <p>
                                                <strong>CV Limit:</strong> {sub.cv_limit} CVs
                                            </p>
                                            <p>
                                                <strong>Duration:</strong> {sub.duration} Days
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>


                        <div className="flex justify-end mt-4">

                            <button
                                onClick={closeSubModel}
                                className="ml-2 px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 transition"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>

            )} */}
            {/* {showPaymentModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
                        <h2 className="text-lg font-semibold mb-4">Payment Details</h2>
                        {selected && (
                            <div>
                                <p>
                                    <strong>Subscription:</strong>{" "}
                                    {cvSubscription.find((sub) => sub.id === selected)?.name}
                                </p>
                                <p>
                                    <strong>Price:</strong>{" "}
                                    {cvSubscription.find((sub) => sub.id === selected)?.price}
                                </p>
                                <p>

                                    <strong>PAY TO:</strong>{" "}
                                    Exact Manpower Consulting Ltd
                                    info@exactmanpower.co.tz
                                </p>

                                < p>
                                    <strong style={{ color: "rgb(211, 99, 20)" }}> Tigo Lipa Number:</strong>{" "}
                                    6786004
                                </p>
                                <p>
                                    <strong>Name: </strong>{" "}
                                    Exact Manpower Consulting LTD</p>
                            </div>
                        )}
                        <form onSubmit={handleSubmit} className="mt-4">
                            <label className="block text-sm font-medium mb-2" style={{ color: "rgb(211, 99, 20)" }}>
                                Add confirmation code of successful payment below.
                            </label>

                            <input

                                name="referenceNumber"
                                className="w-full p-2 border rounded mb-4"
                                required
                                value={referenceNumber}
                                onChange={(e) => setReferenceNumber(e.target.value)}
                            />
                            <p>
                                Also, send us your successful Lipa Namba message to Whatsapp No <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                    <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />9
                                </svg>  <a
                                    href="https://wa.me/255677975251"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center space-x-1 text-green-600 font-medium"
                                > +255 677 975 251</a>
                            </p>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                            >
                                Send
                            </button>
                        </form>
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={closePaymentModal}
                                className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 transition"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )} */}
            <Footer></Footer>
        </div>
    </div>);
}

export default MainLayout;
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StepsContext } from "../layouts/mainLayout";
import Template1 from "../templates/template1";
import axios from "axios";
import Swal from 'sweetalert2';
import Spinner from "../widgets/spinner";
import Template2 from "../templates/template2";
import Template3 from "../templates/template3";
import Template4 from "../templates/template4";
import Template5 from "../templates/template5";
import Template6 from "../templates/template6";
import Template7 from "../templates/template7";
import Template8 from "../templates/template8";
import Template9 from "../templates/template9";
import Template10 from "../templates/template10";
import HideInfo from '../layouts/useHideFields';
import { useLocation } from 'react-router-dom';
import { FaDownload } from "react-icons/fa";

const HomePage = () => {
    const [downloading, setDownloading] = useState(false)
    const [selectedTemplate, setselectedTemplate] = useState(null)
    const [donwload, setSub] = useState(null)
    const { currentStep, setCurrentStep, originalDetails, candidate } = useContext(StepsContext)
    const { uuid, template } = useParams()
    const navigate = useNavigate();
    useEffect(() => {
        setCurrentStep(0)
    }, [])
    const [margin, setMargin] = useState("mt-32 opacity-0 ")

    const [showModal, setShowModal] = useState(false);
    const [cvName, setCvName] = useState(""); // To store the user-entered CV name
    const [error, setError] = useState(null);
    const profileCompletion = 75; // Profile completion percentage



    useEffect(() => {

        setCurrentStep(11)
    }, [])
    useEffect(() => {
        setMargin("mt-0 opacity-100")
    }, [originalDetails])
    const sendToData = {
        'template': template,
        'applicant_id': uuid,
        'cv_name': cvName,


    }

    const handleDownloadClick = () => {
        setShowModal(true); // Show the modal when the button is clicked
    };


    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }


    };

    const handleSaveAndDownload = () => {
        if (!cvName || !sendToData || !template || !uuid) {
            console.error("Missing required data: cvName, sendToData, template, or uuid.");
            Swal.fire({
                title: "Error!",
                text: "Required data is missing. Please fill in all fields.",
                icon: "error",
                confirmButtonText: "OK",
            });
            return;
        }



        console.log("CV Name:", cvName);
        const newTab = window.open("", "_blank"); // Open a blank tab immediately
        setDownloading(true); // Start loading indicator
        // Step 1: Save the CV

        axios
            .post("http://127.0.0.1:8000/api/applicant/savedCv", sendToData)
            .then((saveResponse) => {
                console.log("Save Response:", saveResponse);

                if (saveResponse.status === 200 && saveResponse.data.success) {

                    // https://cvtemplate.ekazi.co.tz
                    return axios.get(
                        `http://127.0.0.1:8000/generatePdf/?template=${template}&uuid=${uuid}&name=${cvName}`, options
                    );
                } else {
                    throw new Error(
                        saveResponse.data.message || "Failed to save CV. Please try again."
                    );
                }
            })
            .then((generateResponse) => {
                console.log("Generate Response:", generateResponse);

                const link = generateResponse?.data?.body?.link;
                if (link) {


                    // const newTab = window.open("", "_blank"); // Open a blank tab immediately
                    // window.open(link, "_blank"); // Open the link in a new tab
                    if (newTab) {
                        newTab.location.href = link; // Update URL after fetching the link
                        setDownloading(false); // Stop loading indicator
                    } else {
                        alert("Pop-up blocked! Please allow pop-ups for this site.");
                    }
                } else {
                    throw new Error("Failed to generate PDF link. Please try again.");
                }
            })
            .catch((error) => {
                console.error("Error during save or download process:", error);
                Swal.fire({
                    title: "Error!",
                    text: error.message || "An unexpected error occurred. Please try again.",
                    icon: "error",
                    confirmButtonText: "OK",
                });
            })
            .finally(() => {
                setDownloading(false); // Stop loading indicator
                if (showModal) {
                    setShowModal(false); // Close modal
                }
            });
    };
    useEffect(() => {
        axios
            .get(`http://127.0.0.1:8000/api/applicant/mycv/${uuid}`)
            .then((response) => {
                console.log("API Response:", response); // Debug API response
                if (response) {
                    const data = response.data.mycv
                    setSub(data);
                    console.log("test cv sub", data);
                } else {
                    console.error("Unexpected response structure:", response);
                }
            })
            .catch((error) => {
                console.error("Error fetching CV Subscription data:", error.message);
            });
    }, []);
    console.log("check download", donwload);

    let templateCount = {};
    let uniqueTemplateCount = 0;
    let totalUsageSum = 0;

    if (Array.isArray(donwload)) {
        donwload.forEach(item => {
            const templateNo = item.template_no;
            if (templateNo != null) {  // Skip if template_no is null or undefined
                templateCount[templateNo] = (templateCount[templateNo] || 0) + 1;
            }
        });

        // Step 2: Count unique templates (avoid redundancy)
        uniqueTemplateCount = Object.keys(templateCount).length;

        totalUsageSum = Object.values(templateCount).reduce((sum, count) => sum + count, 0);
    } else {

        templateCount = {};
        uniqueTemplateCount = 0;
        totalUsageSum = 0;
    }

    console.log("Template Usage:", templateCount);
    console.log("Unique Template Count:", uniqueTemplateCount);
    console.log("Total Template Usage Count:", totalUsageSum);

    const UserManualPopup = ({ onClose }) => {
        const [currentStep, setCurrentStep] = useState(0);

        const steps = [
            {
                title: "How to Verify Your Account",
                content: "Complete your profile and verify your email address to access all features.",
                image: "/cv1.png" // Replace with your image path
            },
            {
                title: "How to View Jobs",
                content: "Browse recommended jobs or search for specific positions. Click 'View Job' to see details.",
                image: "/cv2.png"
            },
            {
                title: "How to Apply for Jobs",
                content: "After viewing a job, click 'Apply Now' and follow the application process.",
                image: "/cv4.png"
            },
            {
                title: "How to Track Applications",
                content: "Check your 'Applications' section to monitor the status of jobs you've applied to.",
                image: "/cv6.png"
            }
        ];

        const handleNext = () => {
            if (currentStep < steps.length - 1) {
                setCurrentStep(currentStep + 1);
            } else {
                onClose();
            }
        };

        const handleSkip = () => {
            onClose();
        };

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 max-w-md w-full">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold">{steps[currentStep].title}</h3>
                        <button onClick={handleSkip} className="text-gray-500 hover:text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="mb-4">
                        <img
                            src={steps[currentStep].image}
                            alt={steps[currentStep].title}
                            className="w-full h-48 object-cover rounded"
                        />
                    </div>

                    <p className="mb-6">{steps[currentStep].content}</p>

                    <div className="flex justify-between items-center">
                        <div>
                            {currentStep > 0 && (
                                <button
                                    onClick={() => setCurrentStep(currentStep - 1)}
                                    className="text-blue-500 hover:text-blue-700 mr-4"
                                >
                                    Back
                                </button>
                            )}
                        </div>

                        <div className="flex items-center">
                            {steps.map((_, index) => (
                                <div
                                    key={index}
                                    className={`w-2 h-2 rounded-full mx-1 ${currentStep === index ? 'bg-blue-500' : 'bg-gray-300'}`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={handleNext}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </button>
                    </div>
                </div>
            </div>
        );
    };


    const [showManual, setShowManual] = useState(false);

    useEffect(() => {
        // Check if user has seen the manual before (using localStorage)
        const hasSeenManual = localStorage.getItem('hasSeenManual');
        if (!hasSeenManual) {
            setShowManual(true);
            // Set to show only 3 times (you can adjust this)
            const showCount = parseInt(localStorage.getItem('manualShowCount') || '0');
            if (showCount < 5) {
                localStorage.setItem('manualShowCount', (showCount + 1).toString());
            } else {
                localStorage.setItem('hasSeenManual', 'true');
            }
        }
    }, []);

    const [showModalpay, setShowModalpay] = useState(false);
    const [step, setStep] = useState(1); // 1=benefits, 2=comparison, 3=payment
    const [selectedPlan, setSelectedPlan] = useState(null);

    // Benefits data
    const premiumBenefits = [
        "Priority job applications",
        "Unlimited resume downloads",
        "Featured profile in search results",
        "Direct messaging with recruiters",
        "Advanced analytics dashboard",
        "Exclusive job listings",
        "Custom resume templates"
    ];

    // Plan comparison data
    const planFeatures = [
        "Access basic jobs",
        "3 resume downloads/month",
        "Standard profile visibility",
        "Basic analytics",
        "Priority customer support",
        "Unlimited applications"
    ];




    return (
        <div className="min-h-screen overflow-x-hidden bg-gray-50 p-4">
            {/* Your existing dashboard content */}
            {showManual && (
                <UserManualPopup onClose={() => setShowManual(false)} />
            )}

            <div className="container mx-auto flex flex-col lg:flex-row gap-6">
                <div className="min-h-screen overflow-x-hidden bg-gray-50 p-4">
                    <div className="container mx-auto flex flex-col lg:flex-row gap-6">
                        {/* Left Side - Profile Section */}
                        <div className="w-full lg:w-1/4 flex flex-col gap-4">
                            {/* Profile Card */}
                            <div className="bg-white rounded-lg shadow-md p-4">
                                {/* Top Image */}
                                {/* Cover Image */}
                                <div className="relative h-30 w-full">
                                    <img
                                        src="/maneno.jpeg"
                                        alt="Cover"
                                        className="w-full h-24 object-cover"
                                    />

                                    {/* Profile Image */}
                                    <div className="absolute -bottom-12 left-6">
                                        <div className="relative w-24 h-24 rounded-full bg-gray-200 border-4 border-white shadow-md">
                                            <img
                                                src="/msoft.JPEG"
                                                alt="Profile"
                                                className="w-full h-full object-cover rounded-full"
                                            />

                                            {/* Edit Icon */}
                                            <div
                                                className="absolute -bottom-1 -right-1 bg-blue-500 p-2 rounded-full cursor-pointer shadow-md hover:bg-blue-600 transition-all"
                                                onClick={() => window.location.href = '/edit-profiles'}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-4 w-4 text-white"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Person Information */}
                                <div className="text-center mb-4 mt-16">
                                    {/* ⬆️ Added mt-16 to push it down so it doesn't overlap */}
                                    <h3 className="text-xl font-bold">Halidi Maneno</h3>
                                    <p className="text-gray-600">Machine Learning Engineering</p>
                                    <p className="text-sm text-gray-500">Exactmanpower consult LTD</p>
                                </div>

                                {/* Profile Completion Bar */}
                                <div className="mb-4">
                                    <div className="flex justify-between mb-1 text-sm text-gray-600">
                                        <span>Profile Completion</span>
                                        <span>{profileCompletion}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 h-2 rounded-full">
                                        <div
                                            className="h-2 rounded-full bg-green-500"
                                            style={{ width: `${profileCompletion}%` }}
                                        ></div>
                                    </div>
                                </div>
                                {/* Upgrade to Premium Button */}
                                <button
                                    className="w-full mb-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-2 px-4 rounded-lg shadow-md hover:from-purple-600 hover:to-indigo-700 transition-all flex items-center justify-center gap-2"
                                    onClick={() => setShowModalpay(true)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                    </svg>
                                    Upgrade to Premium
                                </button>
                                {/* Dashboard Stats */}
                                <div className="border-t pt-4 mb-4">
                                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                        </svg>
                                        Dashboard
                                    </h4>
                                </div>

                                {/* Resume Manager Dropdown */}
                                <div className="border-t pt-4 mb-4">
                                    <details className="dropdown">
                                        <summary className="flex justify-between items-center cursor-pointer">
                                            <span className="font-semibold flex items-center gap-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                                Resume Manager
                                            </span>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </summary>
                                        <ul className="mt-2 space-y-2 pl-4">
                                            <li><a href="#" className="text-sm hover:text-blue-500 flex items-center gap-2">

                                                Add Resume
                                            </a></li>
                                            <li><a href="#" className="text-sm hover:text-blue-500 flex items-center gap-2">

                                                My Resume
                                            </a></li>
                                        </ul>
                                    </details>
                                </div>

                                {/* My Jobs Dropdown */}
                                <div className="border-t pt-4 mb-4">
                                    <details className="dropdown">
                                        <summary className="flex justify-between items-center cursor-pointer">
                                            <span className="font-semibold flex items-center gap-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                                My Jobs
                                            </span>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </summary>
                                        <ul className="mt-2 space-y-2 pl-4">
                                            <li><a href="#" className="text-sm hover:text-blue-500 flex items-center gap-2">

                                                My Applications
                                            </a></li>
                                            <li><a href="#" className="text-sm hover:text-blue-500 flex items-center gap-2">

                                                Saved Jobs
                                            </a></li>
                                        </ul>
                                    </details>
                                </div>

                                {/* My Account Dropdown */}
                                <div className="border-t pt-4 mb-4">
                                    <details className="dropdown">
                                        <summary className="flex justify-between items-center cursor-pointer">
                                            <span className="font-semibold flex items-center gap-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                                My Account
                                            </span>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </summary>
                                        <ul className="mt-2 space-y-2 pl-4">
                                            <li><a href="#" className="text-sm hover:text-blue-500 flex items-center gap-2">

                                                Account Settings
                                            </a></li>
                                            <li><a href="#" className="text-sm hover:text-blue-500 flex items-center gap-2">

                                                Change Password
                                            </a></li>
                                        </ul>
                                    </details>
                                </div>

                                {/* My Job Search Dropdown */}
                                <div className="border-t pt-4 mb-4">
                                    <details className="dropdown">
                                        <summary className="flex justify-between items-center cursor-pointer">
                                            <span className="font-semibold flex items-center gap-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                </svg>
                                                My Job Search
                                            </span>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </summary>
                                        <ul className="mt-2 space-y-2 pl-4">
                                            <li><a href="#" className="text-sm hover:text-blue-500 flex items-center gap-2">

                                                Saved Searches
                                            </a></li>
                                            <li><a href="#" className="text-sm hover:text-blue-500 flex items-center gap-2">

                                                Recent Searches
                                            </a></li>
                                        </ul>
                                    </details>
                                </div>

                                {/* Resources Dropdown */}
                                <div className="border-t pt-4 mb-4">
                                    <details className="dropdown">
                                        <summary className="flex justify-between items-center cursor-pointer">
                                            <span className="font-semibold flex items-center gap-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                                </svg>
                                                Resources
                                            </span>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </summary>
                                        <ul className="mt-2 space-y-2 pl-4">
                                            <li><a href="#" className="text-sm hover:text-blue-500 flex items-center gap-2">

                                                Resume Tips
                                            </a></li>
                                            <li><a href="#" className="text-sm hover:text-blue-500 flex items-center gap-2">

                                                Interview Tips
                                            </a></li>
                                        </ul>
                                    </details>
                                </div>
                            </div>
                        </div>

                        {/* Middle Section - Job Listings */}
                        <div className="w-full lg:w-2/4">
                            <div className="bg-white rounded-lg shadow-md p-4">


                                {/* 4-Card Information Panel */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                    {/* Resume Card */}
                                    <div className="border rounded-lg p-4 hover:shadow-md transition cursor-pointer">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="text-2xl font-bold text-blue-600">5</p>
                                                <p className="text-gray-600 text-sm mt-1">Resume</p>
                                            </div>
                                            <div className="bg-blue-100 p-2 rounded-full">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Applications Card */}
                                    <div className="border rounded-lg p-4 hover:shadow-md transition cursor-pointer">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="text-2xl font-bold text-green-600">12</p>
                                                <p className="text-gray-600 text-sm mt-1"> Applications</p>
                                            </div>
                                            <div className="bg-green-100 p-2 rounded-full">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Saved Jobs Card */}
                                    <div className="border rounded-lg p-4 hover:shadow-md transition cursor-pointer">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="text-2xl font-bold text-purple-600">8</p>
                                                <p className="text-gray-600 text-sm mt-1">Saved Jobs</p>
                                            </div>
                                            <div className="bg-purple-100 p-2 rounded-full">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Saved Search Card */}
                                    <div className="border rounded-lg p-4 hover:shadow-md transition cursor-pointer">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="text-2xl font-bold text-orange-600">3</p>
                                                <p className="text-gray-600 text-sm mt-1">Saved Search</p>
                                            </div>
                                            <div className="bg-orange-100 p-2 rounded-full">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Recommended Jobs Header with View All Link */}
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-bold">Recommended jobs for you</h2>
                                    <a
                                        href="/jobs"
                                        className="text-blue-500 hover:text-blue-700 text-sm font-medium flex items-center"
                                    >
                                        View all jobs
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </a>
                                </div>
                                {/* Job Listings */}
                                <div className="space-y-4">
                                    {[1, 2, 3, 4].map((job) => (
                                        <div key={job} className="border rounded-lg p-4 hover:shadow-md transition">
                                            <div className="flex gap-4">
                                                <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
                                                    <img
                                                        src="/b.jpg"
                                                        alt="Company Logo"
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-bold">Senior Frontend Developer</h3>
                                                    <div className="flex items-center gap-2">
                                                        <svg xmlns="http://www.w3.org/2000/svg"
                                                            className="h-5 w-5 text-gray-500"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor">
                                                            <path strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={1.5}
                                                                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                        </svg>
                                                        <p className="text-gray-600">TechCorp Inc.</p>
                                                    </div>
                                                    <p className="text-gray-600">Dar Es Salaam, Tanzania</p>
                                                    <div className="flex items-center text-sm text-gray-500 mt-1">
                                                        <span>Posted</span>
                                                        <span className="mx-2">:</span>
                                                        <span>2 days ago</span>
                                                    </div>
                                                </div>
                                                {/* <button className="self-start bg-blue-500 text-white px-4 py-1 rounded-md text-sm hover:bg-blue-600">
                                                    view job
                                                </button> */}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Featured Companies */}
                        <div className="w-full lg:w-1/4">
                            <div className="bg-white rounded-lg shadow-md p-4">
                                <h2 className="text-xl font-bold mb-4">Featured Companies</h2>



                            </div>
                            <div className="bg-white rounded-lg shadow-md p-4 mt-2">
                                <h2 className="text-xl font-bold mb-4">Featured Companies</h2>

                                <div className="space-y-4">
                                    {[1, 2, 3, 4].map((company) => (
                                        <div key={company} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                                            <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                                                <img
                                                    src="/a.jpg"
                                                    alt="Company Logo"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold">TechCorp Inc.</h4>
                                                <p className="text-sm text-gray-500">12 Jobs</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6">
                                    <h3 className="font-bold mb-2">Job Alerts</h3>
                                    <div className="bg-blue-50 p-3 rounded-lg">
                                        <p className="text-sm">Get notified when new jobs match your profile</p>
                                        <button className="mt-2 bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600 w-full">
                                            Create Job Alert
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Premium Upgrade Modal */}
                    {showModalpay && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                            <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                                {/* Step 1: Benefits Overview */}
                                {step === 1 && (
                                    <div>
                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="text-xl font-bold">Premium Account Benefits</h3>
                                            <button onClick={() => setShowModalpay(false)} className="text-gray-500 hover:text-gray-700">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>

                                        <div className="mb-6">
                                            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-lg mb-4">
                                                <h4 className="font-bold text-lg text-purple-700 mb-2">Why Upgrade to Premium?</h4>
                                                <ul className="space-y-2">
                                                    {premiumBenefits.map((benefit, index) => (
                                                        <li key={index} className="flex items-start">
                                                            <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                            </svg>
                                                            {benefit}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="flex justify-end">
                                            <button
                                                onClick={() => setStep(2)}
                                                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
                                            >
                                                Next: Choose Plan
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Step 2: Plan Comparison */}
                                {step === 2 && (
                                    <div>
                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="text-xl font-bold">Choose Your Plan</h3>
                                            <button onClick={() => setStep(1)} className="text-gray-500 hover:text-gray-700">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                                </svg>
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                            {/* Free Plan */}
                                            <div
                                                className={`border rounded-lg p-4 ${selectedPlan === 'free' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                                            // onClick={() => setSelectedPlan('free')}
                                            >
                                                <h4 className="font-bold text-lg mb-2">Basic Account</h4>
                                                <p className="text-gray-600 mb-4">Free</p>
                                                <ul className="space-y-2">
                                                    {planFeatures.map((feature, index) => (
                                                        <li key={index} className="flex items-start">
                                                            {index < 4 ? (
                                                                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                                </svg>
                                                            ) : (
                                                                <svg className="h-5 w-5 text-gray-300 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                                </svg>
                                                            )}
                                                            {feature}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {/* Premium Plan */}
                                            <div
                                                className={`border rounded-lg p-4 ${selectedPlan === 'premium' ? 'border-purple-500 bg-purple-50' : 'border-gray-200'}`}
                                                onClick={() => setSelectedPlan('premium')}
                                            >
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h4 className="font-bold text-lg mb-2">Premium Account</h4>
                                                        <p className="text-gray-600 mb-4">10,000 tsh/Year</p>
                                                    </div>
                                                    <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">Recommended</span>
                                                </div>
                                                <ul className="space-y-2">
                                                    {planFeatures.map((feature, index) => (
                                                        <li key={index} className="flex items-start">
                                                            <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                            </svg>
                                                            {feature}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="flex justify-between">
                                            <button
                                                onClick={() => setStep(1)}
                                                className="text-gray-600 hover:text-gray-800 px-4 py-2 rounded border border-gray-300 hover:border-gray-400 transition"
                                            >
                                                Back
                                            </button>
                                            <button
                                                onClick={() => setStep(3)}
                                                disabled={!selectedPlan}
                                                className={`px-4 py-2 rounded transition ${selectedPlan ? 'bg-purple-600 text-white hover:bg-purple-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                                            >
                                                Next: Payment
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Step 3: Payment */}
                                {step === 3 && (
                                    <div>
                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="text-xl font-bold">Complete Your Payment</h3>
                                            <button onClick={() => setStep(2)} className="text-gray-500 hover:text-gray-700">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                                </svg>
                                            </button>
                                        </div>

                                        <div className="mb-6">
                                            <div className="bg-gray-50 p-4 rounded-lg mb-4">
                                                <h4 className="font-bold mb-2">Invoice Summary</h4>
                                                <div className="flex justify-between mb-2">
                                                    <span>Premium Subscription</span>
                                                    <span>$9.99/month</span>
                                                </div>
                                                <div className="flex justify-between font-bold">
                                                    <span>Total</span>
                                                    <span>$9.99</span>
                                                </div>
                                            </div>

                                            <div className="mb-4">
                                                <label className="block text-gray-700 mb-2">Payment Code</label>
                                                <input
                                                    type="text"
                                                    placeholder="Enter your payment code"
                                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                                                />
                                            </div>

                                            <div className="mb-4">
                                                <label className="block text-gray-700 mb-2">Payment Methods</label>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="border rounded-lg p-3 flex flex-col items-center">
                                                        <img src="/tigo-pesa.png" alt="Tigo Pesa" className="h-10 mb-2" />
                                                        <span className="text-sm">Tigo Pesa: 0655 123456</span>
                                                    </div>
                                                    <div className="border rounded-lg p-3 flex flex-col items-center">
                                                        <img src="/mpesa.png" alt="M-Pesa" className="h-10 mb-2" />
                                                        <span className="text-sm">M-Pesa: 0767 123456</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="bg-yellow-50 p-3 rounded-lg text-sm">
                                                <p className="font-medium mb-1">Payment Instructions:</p>
                                                <p>1. Send payment to one of the numbers above</p>
                                                <p>2. Enter the transaction code in the field</p>
                                                <p>3. WhatsApp confirmation to: <span className="font-semibold">+255 123 456 789</span></p>
                                            </div>
                                        </div>

                                        <div className="flex justify-between">
                                            <button
                                                onClick={() => setStep(2)}
                                                className="text-gray-600 hover:text-gray-800 px-4 py-2 rounded border border-gray-300 hover:border-gray-400 transition"
                                            >
                                                Back
                                            </button>
                                            <button
                                                onClick={() => {
                                                    // Handle payment submission
                                                    setShowModal(false);
                                                    // Show success message
                                                }}
                                                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
                                            >
                                                Submit Payment
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>

    );
}

export default HomePage;
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";
import Spinner from "../../widgets/spinner";
import Template1 from "../../templates/template1";
import Template2 from "../../templates/template2";
import Template3 from "../../templates/template3";
import Template4 from "../../templates/template4";
import Template5 from "../../templates/template5";
import Template6 from "../../templates/template6";
import Template7 from "../../templates/template7";
import Template8 from "../../templates/template8";
import Template9 from "../../templates/template9";
import Template10 from "../../templates/template10";
import Template11 from "../../templates/template11";
import Template12 from "../../templates/template12";
import Template13 from "../../templates/template13";
import Template14 from "../../templates/template14";
import Template15 from "../../templates/template15";
import Template17 from "../../templates/template17";
import Template18 from "../../templates/template18";
import Template19 from "../../templates/template19";
import Template20 from "../../templates/template20";
import Template21 from "../../templates/template21";
import Template22 from "../../templates/template22";
import Template23 from "../../templates/template23";
import Template24 from "../../templates/template24";
import Template25 from "../../templates/template25";
import Template26 from "../../templates/template26";
import Template27 from "../../templates/template27";
import Template28 from "../../templates/template28";
import Template29 from "../../templates/template29";
import Template30 from "../../templates/template30";
import { useCvProfileData } from "../../hooks/Candidate/Cv";
import { Card, Col } from "react-bootstrap";
import { FaEye } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const HomePageCv = () => {
    const [downloading, setDownloading] = useState(false)
    const uuid = localStorage.getItem("applicantId");
    const { data, loading, error } = useCvProfileData(uuid);
    const originalDetails = data;
    const location = useLocation();
    const [selectedTemplate, setSelectedTemplate] = useState(location.state?.template);
    const template = selectedTemplate;
    const navigate = useNavigate();

    console.log("slected tempalted", selectedTemplate);
    const templates = [
        { id: 1, component: <Template1 /> },
        { id: 2, component: <Template2 /> },
        { id: 3, component: <Template3 /> },
        { id: 4, component: <Template4 /> },
        { id: 5, component: <Template5 /> },
        { id: 6, component: <Template6 /> },
        { id: 7, component: <Template7 /> },
        { id: 8, component: <Template8 /> },
        { id: 9, component: <Template9 /> },
        { id: 10, component: <Template10 /> },
        { id: 11, component: <Template11 /> },
        { id: 12, component: <Template12 /> },
        { id: 13, component: <Template13 /> },
        { id: 14, component: <Template14 /> },
        { id: 15, component: <Template15 /> },
        { id: 17, component: <Template17 /> },
        { id: 18, component: <Template18 /> },
        { id: 19, component: <Template19 /> },
        { id: 20, component: <Template20 /> },
        { id: 21, component: <Template21 /> },
        { id: 22, component: <Template22 /> },
        { id: 23, component: <Template23 /> },
        { id: 24, component: <Template24 /> },
        { id: 25, component: <Template25 /> },
        { id: 26, component: <Template26 /> },
        { id: 27, component: <Template27 /> },
        { id: 28, component: <Template28 /> },
        { id: 29, component: <Template29 /> },
        { id: 30, component: <Template30 /> },
    ];


    return (
        <div className=" min-h-screen overflow-x-hidden  ">
            <div className="min-h-screen bg-gray-50 ">
                <div className="max-w-12xl mx-auto">
                    {/* Header Section */}
                    <div className="min-h-screen bg-gray-50 ">
                        {/* Professional Header with Toolbar */}
                        <div className="max-w-12xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                            {/* Ribbon-style Toolbar */}
                            <div className=" text-white px-6 py-3 flex flex-wrap items-center justify-between gap-4" style={{ backgroundColor: '#D36314' }}>
                                <div className="flex items-center space-x-4">
                                    <h1 className="text-xl font-bold">CV Dashboard</h1>

                                </div>

                                <div className="flex items-center space-x-2">
                                    <div className="hidden md:flex items-center bg-gray-700 px-3 py-1 rounded">
                                        <span className="text-sm">cv complete percentage 100%</span>
                                    </div>

                                </div>
                            </div>

                            {/* Document Header */}
                            <div className="px-8 py-6 border-b">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                    <div>
                                        <h2 className="text-2xl font-semibold text-gray-800">Curriculum Vitae</h2>
                                        <p className="text-gray-600 mt-1 flex items-center">
                                            <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                            Last saved: {new Date().toLocaleString()}
                                        </p>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                                        <button
                                            onClick={() => navigate(`/jobseeker/introduction`)}
                                            className="px-5 py-2.5 border border-blue-500 text-blue-600 font-medium rounded hover:bg-blue-50 flex items-center gap-2 transition-colors w-full md:w-auto justify-center"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                            </svg>
                                            Edit CV
                                        </button>

                                        <button
                                            // onClick={() => {
                                            //     setDownloading(true);
                                            //     axios.get(`https://cvtemplate.ekazi.co.tz/generatePdf/?template=${template}&uuid=${uuid}&name=${originalDetails.applicant_profile[0].first_name}`)
                                            //         .then((response) => {
                                            //             setDownloading(false);
                                            //             window.open(response.data.body.link, '_blank');
                                            //         });
                                            // }}
                                            className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 flex items-center gap-2 transition-colors w-full md:w-auto justify-center"
                                            disabled={downloading}
                                        >
                                            {downloading ? (
                                                <>
                                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    <span>Processing...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                                                    </svg>
                                                    <span>Download PDF</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Document Content Area */}
                            <div className="flex flex-col md:flex-row">

                                {/* Main Document Preview */}
                                <div className="flex-1 p-0">
                                    <div className="max-w-4xl mx-auto  p-8 min-h-[70vh]">
                                        {/* CV Preview Content Would Go Here */}
                                        <div className="text-center  text-gray-400     rounded">
                                            {templates.map((item, index) =>
                                                item.id === template && <div key={index}>{item.component}</div>
                                            )}


                                        </div>
                                        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto mt-7">
                                            <button
                                                onClick={() => navigate(`/introduction/${uuid}/${template}`)}
                                                className="px-5 py-2.5 border border-blue-500 text-blue-600 font-medium rounded hover:bg-blue-50 flex items-center gap-2 transition-colors w-full md:w-auto justify-center"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                                </svg>
                                                Edit CV
                                            </button>

                                            <button
                                                onClick={() => {
                                                    setDownloading(true);
                                                    axios.get(`https://cvtemplate.ekazi.co.tz/generatePdf/?template=${template}&uuid=${uuid}&name=${originalDetails.applicant_profile[0].first_name}`)
                                                        .then((response) => {
                                                            setDownloading(false);
                                                            window.open(response.data.body.link, '_blank');
                                                        });
                                                }}
                                                className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 flex items-center gap-2 transition-colors w-full md:w-auto justify-center"
                                                disabled={downloading}
                                            >
                                                {downloading ? (
                                                    <>
                                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                        <span>Processing...</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                                                        </svg>
                                                        <span>Download PDF</span>
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            {/* Status Bar */}
                            <div className="bg-gray-100 px-4 py-2 text-xs text-gray-600 flex justify-between items-center">
                                <div>CV Builder v1.0</div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>);
}

export default HomePageCv;
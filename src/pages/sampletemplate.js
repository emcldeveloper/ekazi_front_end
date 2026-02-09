import { useContext, useEffect, useState } from "react";
import { StepsContext } from "../layouts/mainLayout";
import { useNavigate, useParams } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FaEye } from "react-icons/fa";
import Template1 from "../templates/template1";
import Template2 from "../templates/template2";
import Template3 from "../templates/template3";
import Template4 from "../templates/template4";
import Template5 from "../templates/template5";
import Template6 from "../templates/template6";
import Template7 from "../templates/template7";
import Template8 from "../templates/template8";
import Template9 from "../templates/template9";
import Template10 from "../templates/template10";
import Template11 from "../templates/template11";
import { FaFileAlt } from 'react-icons/fa'; // CV icon + View icon


import axios from "axios";

const SampleTemplate = () => {
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [showPreview, setShowPreview] = useState(false);
    const { currentStep, setCurrentStep } = useContext(StepsContext);
    const navigate = useNavigate();
    const { uuid } = useParams();
    const [templateViews, setTemplateViews] = useState({});
    const [totalview, setotalview] = useState("");


    const templates = [
        { id: 1, name: "Template 1", image: "/cv1.png", component: <Template1 /> },
        { id: 2, name: "Template 2", image: "/cv2.png", component: <Template2 /> },
        { id: 3, name: "Template 3", image: "/cv3.png", component: <Template3 /> },
        { id: 4, name: "Template 4", image: "/cv4.png", component: <Template4 /> },
        { id: 5, name: "Template 5", image: "/cv5.png", component: <Template5 /> },
        { id: 6, name: "Template 6", image: "/cv6.png", component: <Template6 /> },
        { id: 7, name: "Template 7", image: "/cv7.png", component: <Template7 /> },
        { id: 8, name: "Template 8", image: "/cv8.png", component: <Template8 /> },
        { id: 9, name: "Template 9", image: "/cv9.png", component: <Template9 /> },
        { id: 10, name: "Template 10", image: "/cv10.png", component: <Template10 /> },
        { id: 11, name: "Template 11", image: "/cv10.png", component: <Template11 /> },
    ];

    useEffect(() => {
        setCurrentStep(0);
    }, [setCurrentStep]);

    const handleTemplateSelect = (templateId) => {
        setSelectedTemplate(templateId);
        setShowPreview(true); // Show preview modal
    };

    const handleSave = () => {
        
        navigate(`/${uuid}/${selectedTemplate}`); // Navigate to the next step
    };

    const handleCancel = () => {
        setShowPreview(false); // Close the modal
        setSelectedTemplate(null); // Reset selected template
    };

    const goBackToTemplates = () => {
        setShowPreview(false); // Close the modal and return to template list
    };
    const handleSubmit = async (templateId) => {
        try {
            const formData = new FormData();
            formData.append('template_id', templateId);
            formData.append('view_count', 1);

            await axios.post('http://127.0.0.1:8000/api/applicant/countcv', formData);

            // Refresh views after submit
            const response = await axios.get("http://127.0.0.1:8000/api/applicant/getcvno");
            const viewCounts = response.data.view_count;
            const totalview = response.data.count;
            setotalview(totalview);

            const mappedViews = {};
            viewCounts.forEach((item) => {
                mappedViews[item.template_no] = item.view;
            });
            setTemplateViews(mappedViews);

        } catch (error) {
            console.error("Failed to track view or fetch updated views:", error.message);
        }
    };

    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/api/applicant/getcvno")
            .then((response) => {
                const viewCounts = response.data.view_count;
                const totalview = response.data.count;
                console.log("view total", totalview);
                setotalview(totalview);
                if (Array.isArray(viewCounts)) {
                    const mappedViews = {};
                    viewCounts.forEach((item) => {
                        mappedViews[item.template_no] = item.view;
                    });
                    console.log('no of view total', viewCounts);
                    setTemplateViews(mappedViews); // set all views at once
                } else {
                    console.error("Invalid view_count format:", response.data);
                }
            })
            .catch((error) => {
                console.error("Error fetching CV view counts:", error.message);
            });
    }, []);



    const selectedTemplateData = templates.find((template) => template.id === selectedTemplate);

    return (
        <div className="p-6">



            <h1 className="font-bold text-3xl mb-6 flex items-center gap-3">
                <FaFileAlt className="text-blue-600" />
                <span>Select Your CV Template</span>
                <div className="flex items-center gap-1 text-gray-600 text-lg">
                    <FaEye />
                    <span>{totalview}</span>
                </div>
            </h1>



            {/* Template Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {templates.map((template) => {
                    const viewCount = templateViews[template.id] ?? template.views ?? 0;

                    return (
                        <div
                            key={template.id}
                            className={`p-4 border rounded-md cursor-pointer ${selectedTemplate === template.id
                                ? "border-blue-500 bg-blue-100"
                                : "border-gray-300"
                                }`}
                            onClick={() => {
                                const selectedTemplateId = template.id;
                                handleTemplateSelect(selectedTemplateId);
                                handleSubmit(selectedTemplateId);
                            }}
                        >
                            <div className="h-40 w-full overflow-hidden flex justify-center items-center bg-gray-100 rounded-md">
                                <img
                                    src={template.image}
                                    alt={template.name}
                                    className="h-full object-contain rounded-md"
                                />
                            </div>
                            <h2 className="text-center font-semibold mt-2">{template.name}</h2>
                            <div className="flex items-center justify-center gap-1 text-sm text-gray-500 mt-1">
                                <FaEye className="text-gray-400 mr-1" />
                                <span>{viewCount}</span>
                            </div>
                        </div>
                    );
                })}
            </div>


            {/* Preview Modal */}
            {showPreview && selectedTemplateData && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
                    <div className="bg-white rounded-lg w-full max-w-4xl p-6 overflow-y-auto max-h-[90vh]">
                        <h2 className="font-bold text-xl mb-4">Preview Selected Template </h2>
                        <div className="border p-4 rounded-md bg-gray-50">
                            {selectedTemplateData.component}
                        </div>
                        <div className="flex justify-between mt-6">
                            <button
                                onClick={goBackToTemplates}
                                className="px-6 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800"
                            >
                                Back to Templates
                            </button>
                            <div>
                                <button
                                    onClick={handleCancel}
                                    className="px-6 py-2 rounded bg-red-500 hover:bg-red-600 text-white mr-4"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="px-6 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SampleTemplate;
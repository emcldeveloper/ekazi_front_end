import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageLoader from "../../widgets/pageLoader";
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import Culture from "../../pages/culture";
import Personality from "../../pages/personalities";
import Knowledge from "../../pages/knowledge";
import Software from "../../pages/software";
// import Tool from "./tool";
import Tool from "../../pages/tool";
import axios from "axios";
import { CvApi } from "../../Api/Jobseeker/CvApi";
import {
    Row, Col, Card, Badge, Modal, Form, Button,
    ListGroup, ListGroupItem
} from 'react-bootstrap';
import { Pencil } from 'react-bootstrap-icons';
import StepProgress from "./Stepprogress";



const SkillsCvCompnent = () => {


    const [isopenModel, setOpenModel] = useState(false);
    const [isopenEditModel, setOpenEditModel] = useState(false);
    const [selectedCultures, setSelectedCultures] = useState([]);
    const [selectpersonalities, setseletedPersonality] = useState([]);
    const [selectedSkill, setSelectedSkills] = useState([])
    const [selectedSoftware, setSelectedSoftware] = useState([]);
    const [selectedTool, setSelectedTool] = useState('');
    const [originalDetails, setOriginalDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const uuid = localStorage.getItem("applicantId");

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await CvApi.getCvprofile(uuid);
                if (response != null) {
                    setOriginalDetails(response.data);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [uuid]);
    const [formData, setFormData] = useState({
        personalities: '',
        software: '',
        culture: '',
        skill: '',
        tool: '',


    });
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const navigate = useNavigate();

    const openModal = () => {
        setOpenModel(true);
    }
    const CloseModel = () => {
        setOpenEditModel(false);
    }
    const openeditNodel = () => {
        setOpenEditModel(true);
        setFormData(originalDetails.data);
    }



    const handlecultureChange = (selectedValues) => {

        setSelectedCultures(selectedValues);
    };

    const handlepersonalitiesSelect = (selectedValues) => {

        setseletedPersonality(selectedValues);
    }
    const handleSelectSkill = (skill) => {

        setSelectedSkills(skill)
    }
    const handleselectedSoftware = (software) => {

        setSelectedSoftware(software)
    }
    const handleSelectedTool = (tool) => {

        setSelectedTool(tool)
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        const softwareData =
            selectedSoftware?.length > 0
                ? selectedSoftware
                : formData.software.map((item) => item.software.id);
        const ToolData =
            selectedTool?.length > 0
                ? selectedTool
                : formData.tools.map((item) => item.tool.id);
        const knowledgeData = selectedSkill?.length > 0
            ? selectedSkill
            : formData.knowledge.map((item) => item.knowledge.id)
        const cultureData = selectedCultures?.length > 0
            ? selectedCultures
            : formData.culture.map((item) => item.culture.id)

        const personalityData = selectpersonalities?.length > 0
            ? selectpersonalities
            : formData.applicant_personality.map((item) => item.personality.id)
        const dataToSend = {
            cultures: cultureData, // or any other data structure your API expects
            skill: knowledgeData,
            personalities: personalityData,
            tool: ToolData,
            software: softwareData,
            user_id: uuid,
        };

        try {

            const response = await axios.post(`http://127.0.0.1:8000/api/applicant/generalskills`, dataToSend,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            // alert('Referee added successfully!');
            if (response.status === 200) {
                Swal.fire({
                    title: 'Success!',
                    text: response.data.success,
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            }


            window.location.reload(); // Reloads the entire page

            // Handle the response
            //   console.log('Response data:', response.data); // The actual response data from the server
            //   console.log('Status:', response.status); // The HTTP status code
            //  alert('Referee added successfully!'); // Notify the user of success
        } catch (error) {
            // Handle any errors that occur during the request

            Swal.fire({
                title: 'Error!',
                text: 'Something went wrong. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }

    };
    const hideculture = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "This action will permanently delete the item. Do you want to proceed? ",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {

                    const response = await axios.post(`http://127.0.0.1:8000/api/applicant/hideculture/${id}`);

                    if (response.status === 200) {
                        Swal.fire({
                            title: 'Success!',
                            text: 'Data has been hidden.',
                            icon: 'success',
                            confirmButtonText: 'OK'
                        }).then(() => {
                            window.location.reload(); // Reloads the entire page after the success message
                        });
                    }

                } catch (error) {


                    Swal.fire({
                        title: 'Error!',
                        text: 'Failed to remove referee. Please try again.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            }
        });
    };
    const hidetool = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "This action will hidde the item. Do you want to proceed? ",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, hidde it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {

                    const response = await axios.post(`http://127.0.0.1:8000/api/applicant/hidetool/${id}`);

                    if (response.status === 200) {
                        Swal.fire({
                            title: 'Success!',
                            text: 'Data has been hidden.',
                            icon: 'success',
                            confirmButtonText: 'OK'
                        }).then(() => {
                            window.location.reload(); // Reloads the entire page after the success message
                        });
                    }

                } catch (error) {


                    Swal.fire({
                        title: 'Error!',
                        text: 'Failed to remove referee. Please try again.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            }
        });
    };
    const hidepersonality = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "This action will permanently delete the item. Do you want to proceed? ",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, hide it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {

                    const response = await axios.post(`http://127.0.0.1:8000/api/applicant/hidepersonality/${id}`);

                    if (response.status === 200) {
                        Swal.fire({
                            title: 'Success!',
                            text: 'Data has been hidden.',
                            icon: 'success',
                            confirmButtonText: 'OK'
                        }).then(() => {
                            window.location.reload(); // Reloads the entire page after the success message
                        });
                    }

                } catch (error) {


                    Swal.fire({
                        title: 'Error!',
                        text: 'Failed to remove referee. Please try again.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            }
        });
    };
    const hidesoftware = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "This action will permanently delete the item. Do you want to proceed? ",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, hide it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {

                    const response = await axios.post(`http://127.0.0.1:8000/api/applicant/hidesoftware/${id}`);

                    if (response.status === 200) {
                        Swal.fire({
                            title: 'Success!',
                            text: 'Data has been hidden.',
                            icon: 'success',
                            confirmButtonText: 'OK'
                        }).then(() => {
                            window.location.reload(); // Reloads the entire page after the success message
                        });
                    }

                } catch (error) {


                    Swal.fire({
                        title: 'Error!',
                        text: 'Failed to remove referee. Please try again.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            }
        });
    };
    const hideknowledge = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "This action will permanently delete the item. Do you want to proceed? ",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, hide it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {

                    const response = await axios.post(`http://127.0.0.1:8000/api/applicant/hideknowledge/${id}`);

                    if (response.status === 200) {
                        Swal.fire({
                            title: 'Success!',
                            text: 'Data has been hidden.',
                            icon: 'success',
                            confirmButtonText: 'OK'
                        }).then(() => {
                            window.location.reload(); // Reloads the entire page after the success message
                        });
                    }

                } catch (error) {


                    Swal.fire({
                        title: 'Error!',
                        text: 'Failed to remove referee. Please try again.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            }
        });
    };
    {/* Culture Section */ }
    const sections = [
        { title: "Culture", data: originalDetails?.data?.culture, key: "culture", handler: hideculture },
        { title: "Tools", data: originalDetails?.data?.tools, key: "tool", handler: hidetool },
        { title: "Personality", data: originalDetails?.data?.applicant_personality, key: "personality", handler: hidepersonality },
        { title: "Softwares", data: originalDetails?.data?.software, key: "software", handler: hidesoftware },
        { title: "Skills & Knowledge", data: originalDetails?.data?.knowledge, key: "knowledge", handler: hideknowledge },
    ];
    if (isLoading) {
        return <div>Loading skills data...</div>;
    }

    if (!originalDetails) {
        return <div>No applicant data found</div>;
    }


    return (!originalDetails == null ? <PageLoader />
        : <div>
            <StepProgress currentStep={5} onStepClick={(step) => {
                // Handle navigation to different steps
                switch (step) {
                    case 1: navigate('/jobseeker/introduction'); break;
                    case 2: navigate('/jobseeker/objective'); break;
                    case 3: navigate('/jobseeker/EducationCv'); break;
                    case 4: navigate('/jobseeker/ExperienceCv'); break;
                    case 5: navigate('/jobseeker/SkillsCv'); break;
                    case 6: navigate('/jobseeker/LanguageCv'); break;
                    case 7: navigate('/jobseeker/proficiencyCv'); break;
                    // ... add other cases for each step
                    default: break;
                }
            }} />

            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center p-4 bg-white shadow-sm rounded mb-4">
                {/* Left Section: Title & Description */}
                <div className="text-center text-md-start mb-3 mb-md-0">
                    <h1 className="fw-bold h2 text-dark mb-1">Skills</h1>
                    <p className="text-muted mb-0">
                        Add or remove skills here
                    </p>
                </div>

                {/* Right Section: Buttons */}
                <div className="d-flex flex-column flex-md-row gap-2">
                   
                    <button
                        className="py-2 px-4 bg-[#D36314] text-white font-bold rounded-full hover:bg-[#2E58A6] transition-all w-full sm:w-auto"
                        onClick={openeditNodel}
                    >
                        Edit
                    </button>
                </div>
            </div>

            <div className="skills-sections mt-4">
                {sections.map((section) => (
                    <div key={section.key} className="mb-4">
                        {/* Only render if section has data */}
                        {section.data?.length > 0 && (
                            <>
                                {/* Section Header */}
                                <div>
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <h6 className="section-title mb-0">
                                            <b>{section.title.toUpperCase()}</b>
                                        </h6>
                                        <div className="d-flex gap-2">
                                            <Button
                                                variant="link"
                                                className="p-0 border-0 bg-transparent"
                                            >

                                            </Button>

                                        </div>
                                    </div>
                                    <div className="mb-3 mt-2 divider"></div>
                                </div>

                                {/* Items List */}
                                <Col md={12} className="mt-3">
                                    <Row className="g-2">
                                        {section.data.map((item, index) => {
                                            const itemName = item?.[section.key]?.[`${section.key}_name`] || `${section.title} name not available`;
                                            return (
                                                <Col xs="auto" key={index}>
                                                    <div
                                                        className="skill-tag p-1 d-flex align-items-center"
                                                        style={{ cursor: 'pointer' }}
                                                    >
                                                        {itemName}
                                                        <FontAwesomeIcon
                                                            icon={faEyeSlash}
                                                            className="cursor-pointer text-gray-500 hover:text-gray-700 transition-all ms-2"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                section.handler(item?.id);
                                                            }}
                                                        />
                                                    </div>
                                                </Col>
                                            );
                                        })}
                                    </Row>
                                </Col>
                            </>
                        )}
                    </div>
                ))}

                {/* Style */}
                <style jsx>{`
            .divider {
                height: 1px;
                width: 100%;
                background-color: rgb(235, 235, 235);
            }
            .skill-tag {
                border: 1px solid rgb(226, 226, 226);
                border-radius: 5px;
                margin-right: 8px;
                margin-bottom: 8px;
                transition: all 0.2s;
            }
            .skill-tag:hover {
                background-color: #f8f9fa;
                border-color: #dee2e6;
            }
        `}</style>
            </div>







            {isopenEditModel && (<div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50" >
                <div className="bg-white rounded-lg shadow-lg w-full max-w-sm max-h-[80vh] overflow-y-auto">
                    {/* Modal Header */}
                    <div className="flex justify-between items-center p-2 border-b">
                        <h5 className="text-sm font-medium">Skills - No best title specified yet</h5> {/* Reduced font size */}
                        <button
                            type="button"
                            className="text-gray-500 hover:text-gray-700"
                            aria-label="Close"
                            onClick={CloseModel}
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    {/* Modal Body */}
                    <div className="p-3">
                        <form onSubmit={handleSubmit} className="skill-applicant">
                            {/* Culture Field */}
                            <div className="mb-2">
                                <label className="block text-xs font-medium text-gray-700 mb-1">Culture</label> {/* Reduced font size */}
                                <Culture
                                    label="Culture"
                                    onChange={handleChange}
                                    onSelect={handlecultureChange}
                                    initialValue={formData.culture.map((item) => item.culture.id)}
                                    onOptionsLoad={(options) => console.log('Loaded Options culture:', options)}
                                />



                            </div>

                            {/* Personalities Field */}
                            <div className="mb-2">
                                <label className="block text-xs font-medium text-gray-700 mb-1">Personalities</label> {/* Reduced font size */}
                                <Personality
                                    onChange={handleChange}
                                    onSelect={handlepersonalitiesSelect}
                                    initialValue={formData.applicant_personality.map((item) => item.personality.id)}
                                    onOptionsLoad={(options) => console.log('Loaded options personality:', options)}
                                />

                            </div>

                            {/* Skills & Knowledge Field */}
                            <div className="mb-2">
                                <label className="block text-xs font-medium text-gray-700 mb-1">Skills & Knowledge</label> {/* Reduced font size */}
                                <Knowledge
                                    onChange={handleChange}
                                    onSelect={handleSelectSkill}
                                    initialValue={formData.knowledge.map((item) => item.knowledge.id)}
                                    onOptionsLoad={(options) => console.log('Loaded Options knowledge:', options)}
                                />

                            </div>

                            {/* Software Field */}
                            <div className="mb-2">
                                <label className="block text-xs font-medium text-gray-700 mb-1">Software</label> {/* Reduced font size */}
                                <Software
                                    name="software_name"
                                    onChange={handleChange}
                                    onSelect={handleselectedSoftware}
                                    initialValue={formData.software.map((item) => item.software.id)}
                                    onOptionsLoad={(options) => console.log('Loaded Options software:', options)}
                                />
                            </div>

                            {/* Tools Field */}
                            <div className="mb-2">
                                <label className="block text-xs font-medium text-gray-700 mb-1">Tools</label> {/* Reduced font size */}

                                <Tool
                                    onChange={handleChange}
                                    onSelect={handleSelectedTool}
                                    initialValue={formData.tools.map((item) => item.tool.id)}
                                    onOptionsLoad={(options) => console.log('Loaded Options tool:', options)}
                                />
                            </div>

                            {/* Modal Footer */}
                            <div className="flex justify-end space-x-1 pt-1 border-t">
                                <button
                                    type="button"
                                    className="py-1 px-2 text-xs bg-gray-200 text-gray-700 rounded-sm hover:bg-gray-300"
                                    onClick={CloseModel}
                                >
                                    Close
                                </button>
                                <button
                                    type="submit"
                                    className="py-1 px-2 text-xs bg-indigo-500 text-white rounded-sm hover:bg-indigo-600"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>)

            }
        </div>);
}

export default SkillsCvCompnent;
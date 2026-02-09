import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageLoader from "../../widgets/pageLoader";
// import { collection, doc, setDoc } from "firebase/firestore";

import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Country from "../../pages/universal/country";
import Region from "../../pages/universal/region";
import Employers from "../../pages/universal/employers";
import Positions from "../../pages/universal/position";
import Industries from "../../pages/universal/industry";
import EducationLevel from "../../pages/universal/educationLevel";
import SalaryRange from "../../pages/universal/salarayRange";
import axios from "axios";
import PositionLevel from "../../pages/universal/positionLevel";
import moment from "moment";
import { useCvProfileData } from "../../hooks/Candidate/Cv";
import {
    Card, Button, Modal, Form, Row, Col,
    ListGroup, Badge, Spinner, Alert, Image
} from 'react-bootstrap';
import { Plus, Pencil } from 'react-bootstrap-icons';
import {
    faBuilding,
    faEdit,
    faTrash,
    faEyeSlash,
    faCircle
} from '@fortawesome/free-solid-svg-icons';
import StepProgress from "./Stepprogress";


const WorksExperiencesCv = () => {
    const [experiences, setExperiences] = useState([])
    const [isopenModal, setIsOpenModel] = useState(false);
    const [isopenEditmodel, setopenEditmodel] = useState(false);
    const [isCurrentRole, setIsCurrentRole] = useState(false);
    const [selectedcountry, setselectedCoutry] = useState('');
    const [selectedregion, setregionSelected] = useState('');
    const [selectedemployer, setEmployer] = useState('');
    const [selectedposition, setPosition] = useState('');
    const [selectedIndustry, setIndustry] = useState('');
    const [selectedlevel, setEducationLevel] = useState('')
    const [startedsalary, setStartedSalary] = useState('')
    const [endedsalary, setEndedSalary] = useState('')
    const uuid = localStorage.getItem("applicantId");
    const { data, loading, error } = useCvProfileData(uuid);
    const originalDetails = data;
    const [formData, setFormData] = useState({
        'started': '',
        'ended': '',
        'position': '',
        'country': '',
        'region': '',
        'employer': '',
        'industry': '',
        'start_salary': '',
        'end_salary': '',
        'level': '',
        'sub_location': '',
        'remark': '',
        'responsibility': ''
    });
    const [editexperiency, setEditExperience] = useState({
        'started': '',
        'ended': '',
        'position': '',
        'country': '',
        'region': '',
        'employer': '',
        'industry': '',
        'start_salary': '',
        'end_salary': '',
        'level': '',
        'sub_location': '',
        'remark': '',
        'responsibility': ''
    });

    const sendToData = {
        ...formData,
        'position': selectedposition,
        'country': selectedcountry,
        'employer': selectedemployer,
        'industry': selectedIndustry,
        'region': selectedregion,
        'level': selectedlevel,
        'start_salary': startedsalary,
        'end_salary': endedsalary,
        'user_id': uuid,





    };

    // Handler for checkbox change

    const handleCheckboxChange = () => {
        setIsCurrentRole(!isCurrentRole);
    };

    const navigate = useNavigate();

    const openModal = () => {
        setIsOpenModel(true);
    };
    const handleEmployer = (employer) => {
        setEmployer(employer)

    };

    const closeModel = () => {
        setIsOpenModel(false);
    };

    const handlecountry = (country) => {
        setselectedCoutry(country);

    };
    const handleregion = (region) => {
        setregionSelected(region)
    };
    const handPosition = (position) => {

        if (position) {
            setPosition(position.value);// Update state with the selected value
        } else {
            setEditPosition(null); // Handle case where the selection is cleared
        }

    };
    console.log("psoiton is inter ", selectedposition)
    const handleIndustry = (industry) => {
        setIndustry(industry);

    };
    const handleLevel = (level) => {
        setEducationLevel(level)

    };
    const handlestartsalry = (start) => {
        setStartedSalary(start);

    };
    const handleendsalary = (end) => {
        setEndedSalary(end);
    };
    const [editEmployer, setEditEmployer] = useState('');
    const [editsublocation, setEditSublocation] = useState('');
    const [editEducationLevel, setEditEducationLevel] = useState('');
    const [editCountry, setEditCountry] = useState('');
    const [editRegion, setEditRegion] = useState('');
    const [editPosition, setEditPosition] = useState('');
    const [editIndustry, setEditIndustry] = useState('');
    const [editstartdate, setEditstartdate] = useState('');
    const [editenddate, setEditenddate] = useState('');
    const [editstart_alary_id, setEditstartsalaryid] = useState('');
    const [editend_alary_id, setEditendsalaryid] = useState('');
    const [editremark, setEditremark] = useState('');
    const [editresponsibility, setEditresponsibility] = useState('');




    const openEditModal = (experience) => {
        setEditEmployer(experience.employer.employer_name);
        setEditSublocation(experience.employer.sub_location);
        setEditEducationLevel(experience.position_level_id);
        setEditCountry(experience.employer.region.country.name);
        setEditRegion(experience.employer.region.region_name);
        setEditPosition(experience.position.position_name);
        setEditIndustry(experience.industry.industry_name);

        setEditstartsalaryid(experience.start_salary_id);
        setEditendsalaryid(experience.end_salary_id);
        setEditremark(experience.remark);
        setEditresponsibility(experience.responsibility);
        if (experience && experience.start_date) {
            setEditstartdate(experience.start_date);
        }
        if (experience && experience.end_date) {
            setEditenddate(experience.end_date);
        }


        setEditExperience(experience);
        setopenEditmodel(true);



    }
    const handleEditEmployer = (employer) => {
        setEditEmployer(employer);

    };



    const handleEditcountry = (country) => {
        setEditCountry(country);

    };
    const handleEditregion = (region) => {
        setEditRegion(region);
    };
    const handEditPosition = (position) => {
        if (position) {
            setEditPosition(position.value); // Update state with the selected value
        } else {
            setEditPosition(null); // Handle case where the selection is cleared
        }
    };

    const handleEditIndustry = (industry) => {
        setEditIndustry(industry);

    };
    const handleeditpositionlevel = (value) => {
        setEditEducationLevel(value);

    };
    const handleEditstartsalry = (start) => {
        setEditstartsalaryid(start)

    };
    const handleEditendsalary = (end) => {
        setEditendsalaryid(end);
    };

    const handleEditstartdate = (e) => {
        setEditstartdate(e.target.value); // Directly set the date string
    };
    const handleEditenddate = (e) => {
        setEditenddate(e.target.value); // Directly set the date string
    };
    const handleeditsublocation = (e) => {
        setEditSublocation(e.target.value);
    };




    const closeEdit = () => {
        setopenEditmodel(false);
    }
    const editData = {
        employer: editEmployer,
        country: editCountry,
        region: editRegion,
        industry: editIndustry,
        position: editPosition,
        sub_location: editsublocation,
        position_level_id: editEducationLevel,
        started: editstartdate,
        ended: editenddate,
        start_salary_id: editstart_alary_id,
        end_salary_id: editend_alary_id,
        remark: editremark,
        responsibility: editresponsibility,
        applicant_id: uuid,

    };




    useEffect(() => {
        if (originalDetails) {
            const newExperiences = [];

            originalDetails.data.experience.forEach((item) => {
                // Check if this employer's experience is already in the newExperiences array or experiences state
                if (
                    !experiences.some((e) => e.employer.id === item.employer.id) &&
                    !newExperiences.some((e) => e.employer.id === item.employer.id)
                ) {
                    // Group positions by employer
                    const positions = originalDetails.data.experience.filter((ex) => ex.employer.id === item.employer.id);
                    // Create a new item with grouped positions
                    newExperiences.push({ ...item, positions });
                }
            });

            if (newExperiences.length > 0) {
                setExperiences((prev) => [...prev.filter((e) => !newExperiences.some((ne) => ne.employer.id === e.employer.id)), ...newExperiences]);
            }
        }
    }, [originalDetails]);


    console.log("check experience is available", originalDetails);
    const handleChange = (e) => {

        // Handle other inputs normally
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };


    const handleHide = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "This action will hide the information from your CV, but it will remain visible on your profile. Do you want to proceed? ",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, hidden it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    console.log("hidden experince id", id);
                    const response = await axios.post(`http://127.0.0.1:8000/api/applicant/hideexperiences/${id}`);

                    if (response.status === 200) {
                        Swal.fire({
                            title: 'Success!',
                            text: response.data.success,
                            icon: 'success',
                            confirmButtonText: 'OK'
                        });
                    }

                    window.location.reload(); // Reloads the entire page
                } catch (error) {
                    console.error('There was an error hide the referee:', error);
                    Swal.fire({
                        title: 'Error!',
                        text: 'Something went wrong. Please try again.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            }
        });
    };
    const handleUpdate = async (id, updateData) => {
        try {
            console.log("update proficience  ", updateData);
            const response = await axios.post(`http://127.0.0.1:8000/api/applicant/updateexperience/${id}`, updateData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }

            );
            if (response.status === 200) {
                Swal.fire({
                    title: 'Success!',
                    text: response.data.success,
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            }


            window.location.reload(); // Reloads the entire page
        } catch (error) {
            console.error('There was an error hide the referee:', error);
            Swal.fire({
                title: 'Error!',
                text: 'Something went wrong. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };
    return (!originalDetails?.data == null ? <PageLoader />
        : <div>
            <StepProgress currentStep={4} onStepClick={(step) => {
                // Handle navigation to different steps
                switch (step) {
                    case 1: navigate('/jobseeker/introduction'); break;
                    case 2: navigate('/jobseeker/objective'); break;
                    case 3: navigate('/jobseeker/EducationCv'); break;
                    case 4: navigate('/jobseeker/ExperienceCv'); break;
                    case 5: navigate('/jobseeker/SkillsCv'); break;
                    case 6: navigate('/jobseeker/LanguageCv'); break;
                    case 7: navigate('/jobseeker/proficiencyCv'); break;
                    case 8: navigate('/jobseeker/TrainingCv'); break;
                    case 9: navigate('/jobseeker/RefereeCv'); break;
                    case 10: navigate('/jobseeker/CompleteCv'); break;
                    // ... add other cases for each step
                    default: break;
                }
            }} />
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center p-4 bg-white shadow-sm rounded mb-4">
                {/* Left Section: Title & Description */}
                <div className="text-center text-md-start mb-3 mb-md-0">
                    <h1 className="fw-bold h2 text-dark mb-1">Work Experience</h1>
                    <p className="text-muted mb-0">
                      experiences here
                    </p>
                </div>

                
            </div>

            <div className="row g-3">
                {experiences?.map((item) => {
                    const employerName = item?.employer?.employer_name || "Employer name not available";
                    const regionName = item?.employer?.region?.region_name || "Region not specified";
                    const subLocation = item?.employer?.sub_location || "Sub-location not specified";

                    // Calculate duration
                    const startDates = item?.positions?.map(p => p.start_date ? new Date(p.start_date) : null).filter(Boolean);
                    const endDates = item?.positions?.map(p => p.end_date ? new Date(p.end_date) : new Date()).filter(Boolean);

                    const minStart = startDates.length ? new Date(Math.min(...startDates.map(d => d.getTime()))) : null;
                    const maxEnd = endDates.length ? new Date(Math.max(...endDates.map(d => d.getTime()))) : null;

                    const durationText = minStart
                        ? `${minStart.getFullYear()} - ${maxEnd ? (maxEnd.getFullYear() === new Date().getFullYear() ? 'Present' : maxEnd.getFullYear()) : 'Present'}`
                        : 'Duration not specified';

                    return (
                        <div key={item?.id} className="col-12">
                            <div className="d-flex">
                                <div className="flex-shrink-0 me-3">
                                    <FontAwesomeIcon
                                        icon={faBuilding}
                                        className="text-gray-500"
                                        style={{ fontSize: '2rem' }}
                                    />
                                </div>

                                <div className="flex-grow-1">
                                    <div className="d-flex justify-content-between">
                                        <div>
                                            <h5 className="mb-1">{employerName}</h5>
                                            <p className="text-muted mb-2">
                                                {subLocation}, {regionName}
                                            </p>
                                            <span className="badge bg-light text-dark mb-1">
                                                {durationText}
                                            </span>
                                        </div>

                                    </div>

                                    <ul className="list-group list-group-flush mt-1">
                                        {item?.positions?.map((positionItem, idx) => {
                                            const positionName = positionItem?.position?.position_name || "Position name not available";
                                            const startDate = positionItem?.start_date ? new Date(positionItem.start_date) : null;
                                            const endDate = positionItem?.end_date ? new Date(positionItem.end_date) : null;

                                            return (
                                                <li key={positionItem?.id} className="list-group-item border-0 px-0 py-1">
                                                    <div className="d-flex justify-content-between">
                                                        <div>
                                                            <div className="d-flex position-relative mb-2">
                                                                {/* Timeline line + dot */}
                                                                <div className="position-relative me-3" style={{ width: "20px" }}>
                                                                    {/* Vertical line (only if not last item) */}
                                                                    {idx < item.positions.length - 1 && (
                                                                        <div
                                                                            style={{
                                                                                position: "absolute",
                                                                                top: "12px",
                                                                                left: "7px",
                                                                                height: "100%",
                                                                                width: "2px",
                                                                                backgroundColor: "#dee2e6",
                                                                                zIndex: 0,
                                                                            }}
                                                                        />
                                                                    )}

                                                                    {/* Circle (dot) - replaced with icon */}
                                                                    <div style={{ position: 'relative', zIndex: 1 }}>
                                                                        <FontAwesomeIcon
                                                                            icon={faCircle}
                                                                            style={{
                                                                                color: "#6c757d",
                                                                                fontSize: "0.7rem"
                                                                            }}
                                                                        />
                                                                    </div>
                                                                </div>

                                                                {/* Position details */}
                                                                <div>
                                                                    <p className="mb-1">
                                                                        <strong>{positionName}</strong>
                                                                    </p>
                                                                    <p className="text-muted small">
                                                                        {startDate ? startDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Not specified'} -{" "}
                                                                        {endDate ? endDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present'}
                                                                    </p>

                                                                    {positionItem.responsibility && (
                                                                        <div className="mt-2">
                                                                            <p className="mb-1 text-wrap" style={{ wordBreak: 'break-word', maxWidth: '100%' }}>
                                                                                <strong>Responsibility:</strong>{" "}
                                                                                {positionItem.responsibility}
                                                                            </p>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex align-items-start">
                                                            <button
                                                                className="btn btn-sm btn-outline-secondary me-2"
                                                                onClick={() => handleHide(item.id)}
                                                            >
                                                                <FontAwesomeIcon icon={faEyeSlash} />
                                                            </button>
                                                            {/* <button
                                                                className="btn btn-sm btn-outline-primary me-2"
                                                                onClick={() => openEditModal(item)}
                                                            >
                                                                <FontAwesomeIcon icon={faEdit} />
                                                            </button> */}
                                                        </div>
                                                    </div>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>


            {/* edit nodel  */}
            {isopenEditmodel && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-3"> {/* Reduced width and padding */}
                        {/* Modal Header */}
                        <div className="flex justify-between items-center pb-2 border-b border-gray-300">
                            <h5 className="text-sm font-semibold">Edit Experience</h5> {/* Reduced text size */}
                            <button type="button" className="text-gray-500 hover:text-gray-700"  >&times;</button>
                        </div>

                        {/* Modal Body */}
                        <div className="py-3"> {/* Reduced padding */}
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                handleUpdate(editexperiency.id, editData);
                            }} className="space-y-2">
                                <input type="hidden" name="id" id="" />

                                {/* Employer Field */}

                                <div className="space-y-2">
                                    <div className="flex items-start">
                                        <label className="w-1/4 text-xs font-medium">Employer <span className="text-red-500">*</span></label>
                                        <div className="w-3/4">
                                            <div className="flex space-x-1">
                                                <div className="w-full">
                                                    <Employers
                                                        onSelect={handleEditEmployer}
                                                        initialValue={editEmployer} // Pass the language ID to edit
                                                        onOptionsLoad={(options) => console.log('Loaded Options language tttr:', options)} // Optional: Handle loaded options
                                                    />

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Location Field */}

                                <div className="flex items-center">
                                    <label className="w-1/4 text-xs font-medium">Location <span className="text-red-500">*</span></label>
                                    <div className="w-3/4">

                                        <div className="flex space-x-1">
                                            <div className="w-1/2">
                                                <label className="text-xs font-medium">Sub Location <span className="text-red-500">*</span></label>
                                                <input
                                                    className="form-input w-full mt-1 text-xs border-gray-300 rounded-md shadow-sm"
                                                    type="text"
                                                    name="sub_location"
                                                    placeholder="Enter Sub Location"
                                                    value={editsublocation}

                                                    onChange={handleeditsublocation}
                                                />

                                            </div>


                                            <div className="w-1/2">
                                                <label className="text-xs font-medium">
                                                    Education Level<span className="text-red-500">*</span>
                                                </label>

                                                <PositionLevel
                                                    onSelect={handleeditpositionlevel}
                                                    initialValue={editEducationLevel} // Pass the language ID to edit
                                                    onOptionsLoad={(options) => console.log('Loaded Options level tttr:', options)}

                                                />

                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex">
                                        <label className="w-1/4 text-xs font-medium">Location <span className="text-red-500">*</span></label>
                                        <div className="w-3/4 space-y-1">
                                            <div className="flex space-x-1">
                                                {/* Country / State Input */}
                                                <div className="w-1/2">
                                                    <label className="text-xs font-medium">Country / State <span className="text-red-500">*</span></label>
                                                    <Country
                                                        onSelect={handleEditcountry}
                                                        initialValue={editCountry} // Pass the language ID to edit
                                                        onOptionsLoad={(options) => console.log('Loaded Options country tttr:', options)}
                                                    />

                                                </div>
                                                {/* Region / City Input */}
                                                <div className="w-1/2">
                                                    <label className="text-xs font-medium">Region / City <span className="text-red-500">*</span></label>
                                                    <Region
                                                        onSelect={handleEditregion}
                                                        initialValue={editRegion} // Pass the language ID to edit
                                                        onOptionsLoad={(options) => console.log('Loaded Options region tttr:', options)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-start">
                                        <label className="w-1/4 text-xs font-medium">Position <span className="text-red-500">*</span></label>
                                        <div className="w-3/4">
                                            <div className="flex space-x-1">
                                                <div className="w-full">
                                                    <label className="text-xs font-medium">
                                                        Position  Name <span className="text-red-500">*</span>
                                                    </label>
                                                    <Positions
                                                        onSelect={handEditPosition}
                                                        // initialValue={editPosition}// Pass the language ID to edit

                                                        initialValue={{ value: editPosition, label: editPosition }}
                                                        onOptionsLoad={(options) => console.log('Loaded Option position experi:', options)}
                                                    />

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-start">
                                        <label className="w-1/4 text-xs font-medium">Industry <span className="text-red-500">*</span></label>
                                        <div className="w-3/4">
                                            <div className="flex space-x-1">
                                                <div className="w-full">
                                                    <label className="text-xs font-medium">
                                                        Industry Name <span className="text-red-500">*</span>
                                                    </label>
                                                    <Industries
                                                        onSelect={handleEditIndustry}
                                                        initialValue={editIndustry}// Pass the language ID to edit
                                                        onOptionsLoad={(options) => console.log('Loaded Options region tttr:', options)}
                                                    />

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Duration Field */}
                                <div className="flex items-center">
                                    <label className="w-1/4 text-xs font-medium">Duration <span className="text-red-500">*</span></label>
                                    <div className="w-3/4">
                                        <div className="flex items-center mb-1">
                                            <input
                                                id="tickInput"
                                                type="checkbox"
                                                className="form-checkbox"
                                                checked={isCurrentRole}
                                                onChange={handleCheckboxChange}
                                            />
                                            <label htmlFor="tickInput" className="ml-2 text-xs">I am currently working in this role</label>
                                        </div>
                                        <div className="flex space-x-1">
                                            <div className="w-1/2">
                                                <label className="text-xs font-medium">Started <span className="text-red-500">*</span></label>
                                                <input
                                                    name="started"
                                                    type="date"
                                                    className="form-input w-full text-xs mt-1 border-gray-300 rounded-md shadow-sm"
                                                    value={moment(editstartdate).format('YYYY-MM-DD')}
                                                    onChange={handleEditstartdate}
                                                />



                                            </div>
                                            {!isCurrentRole && (
                                                <div className="w-1/2">
                                                    <label className="text-xs font-medium">
                                                        Ended <span className="text-red-500">*</span>
                                                    </label>
                                                    <input
                                                        className="form-input w-full text-xs mt-1 border-gray-300 rounded-md shadow-sm"
                                                        name="ended"
                                                        type="date"
                                                        //  value={formatDate(editenddate)}
                                                        value={moment(editenddate).format('YYYY-MM-DD')}
                                                        onChange={handleEditenddate}

                                                    />

                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Salary Range Field */}
                                <div className="flex items-center">
                                    <label className="w-1/4 text-xs font-medium">Salary Range <span className="text-red-500">*</span></label>
                                    <div className="w-3/4 flex space-x-1">
                                        <SalaryRange
                                            className="form-select w-1/2 mt-1 "
                                            onSelect={handleEditstartsalry}
                                            initialValue={editexperiency.start_salary_id}// Pass the language ID to edit
                                            onOptionsLoad={(options) => console.log('Loaded Options region tttr:', options)}
                                        />

                                        <SalaryRange
                                            className="form-select w-1/2 mt-1 "
                                            onSelect={handleEditendsalary}
                                            initialValue={editexperiency.end_salary_id}// Pass the language ID to edit
                                            onOptionsLoad={(options) => console.log('Loaded Options region tttr:', options)}
                                        />
                                    </div>
                                </div>

                                {/* Responsibility Field */}
                                <div className="flex items-center">
                                    <label className="w-1/4 text-xs font-medium">Responsibility <span className="text-red-500">*</span></label>
                                    <textarea className="form-textarea w-3/4 text-xs mt-1 border-gray-300 rounded-md shadow-sm"
                                        name="responsibility"


                                        onChange={(e) => setEditresponsibility(e.target.value)}

                                        rows="2">{editexperiency.responsibility}</textarea>

                                </div>

                                {/* Reason for Leaving Field */}
                                <div className="flex items-center">
                                    <label className="w-1/4 text-xs font-medium">Reason for Leaving <span className="text-red-500">*</span></label>
                                    <textarea className="form-textarea w-3/4 text-xs mt-1 border-gray-300 rounded-md shadow-sm"
                                        name="remark" rows="2"

                                        onChange={(e) => setEditremark(e.target.value)}
                                    >
                                        {editexperiency.remark}
                                    </textarea>
                                </div>

                                {/* Modal Footer */}
                                <div className="flex justify-end space-x-2 mt-2">
                                    <button type="button" className="bg-gray-200 text-gray-800 text-xs py-1 px-2 rounded-md hover:bg-gray-300" onClick={closeEdit} >Close</button>
                                    <button type="submit" className="bg-blue-500 text-white text-xs py-1 px-2 rounded-md hover:bg-blue-600">Save changes</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )

            }
        </div>);
}

export default WorksExperiencesCv;
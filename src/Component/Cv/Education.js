import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";




import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faEyeSlash, faTimes } from '@fortawesome/free-solid-svg-icons';
import StepProgress from "./Stepprogress";
// import Course from "./course";


import axios from "axios";

import EducationLevel from "../../pages/universal/educationLevel";
import Major from "../../pages/major";
import College from "../../pages/universal/college";
import PageLoader from "../../widgets/pageLoader";
import Course from "../../pages/course";
import { useCvProfileData } from "../../hooks/Candidate/Cv";
import {
    Container, Badge, Card, Button, Modal, Form, Row, Col,
    Spinner, Alert, Image
} from 'react-bootstrap';

import { faPlus, faPencilAlt, faDownload, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';

import { Plus, Pencil } from 'react-bootstrap-icons';
import moment from 'moment';
import { Link } from 'react-router-dom';


const EducationsCv = () => {

    const [isModelOpen, setIsMOdelOpen] = useState(false);
    const [ishown, setIsShown] = useState(false);
    const [selectcourse, setSelectedCourese] = useState('');
    const [selectcollege, setSelectedCollege] = useState('');
    const [selectLevel, setSelectedLevel] = useState('');
    const [selectMajor, setSelectedajor] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [editEducation, setEditEducation] = useState("");
    const [editCollege, setEditCollege] = useState("");
    const [editMajor, seteditMajor] = useState("");
    const [setInitialCollege, setSetInitialCollege] = useState(null);
    const [setInitialMajor, setSetInitialMajor] = useState(null);
    const [setInitialSelection, setSetInitialSelection] = useState(null);
    const [editCourse, setEditCourse] = useState("");
    const uuid = localStorage.getItem("applicantId");
    const { data, loading, error } = useCvProfileData(uuid);
    const originalDetails = data;

    console.log("API Response:", data); // Check if data exists

    const [errors, setErrors] = useState({});

    const [editEducation2, setDateEducation] = useState(
        {
            level: '',
            college: '',
            course: '',
            major: '',
            started: '',
            ended: '',
            attachment: null // To store the file
        }

    );
    console.log('update cv ', editEducation2);
    const [formData, setFormData] = useState({
        level: '',
        college: '',
        course: '',
        major: '',
        started: '',
        ended: '',
        attachment: null // To store the file
    });


    useEffect(() => {
        if (editCollege) {
            if (setInitialCollege) {
                setInitialCollege(editCollege);
            }
        }
    }, [editCollege, setInitialCollege]);




    // Handle file input change
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0],);

    };

    const handleCourseSelect = (course) => {
        setSelectedCourese(course);

    }

    const handCollegeSelect = (college) => {
        setSelectedCollege(college);

    }
    const handLevelSelect = (level) => {
        setSelectedLevel(level);

    }
    const handleMajor = (major) => {
        setSelectedajor(major);

    }
    const handleChange = (e) => {

        // Handle other inputs normally
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };


    const navigate = useNavigate();

    const openModel = () => {
        setIsMOdelOpen(true);
    };



    const handleEducationSelect = (value) => {

        setEditEducation(value);
    };
    const handleeditcollegeSelect = (value) => {
        setEditCollege(value);
    };
    const handleeditcourseSelect = (value) => {
        setEditCourse(value);
    }
    const handleeditmajorSelect = (value) => {
        seteditMajor(value);
    }

    const sendToData = {
        ...formData,
        'level': selectLevel,
        'college': selectcollege,
        'course': selectcourse,
        'major': selectMajor,
        'attachment': selectedFile,
        'applicant_id': uuid,

    }



    useEffect(() => {
        if (editEducation) {
            if (setInitialSelection) {
                setInitialSelection(editEducation); // Update selection if `editEducation` changes
            }
        }
    }, [editEducation, setInitialSelection]);
    // Example to format a Date object into 'yyyy-mm-dd' format
    const formatDate = (date) => {
        if (!date) return '';
        const d = new Date(date);
        return d.toISOString().split('T')[0]; // 'yyyy-mm-dd'
    };
    const [editeducationlevelId, setEducationLevelId] = useState('');
    const [editCollegeName, setEditCollegeId] = useState('');
    const [editCourseName, setEditCoures] = useState('');
    const [editMajorId, setEditMajorId] = useState('');
    const openEditModal = (education) => {
        setEducationLevelId(education.education_level_id);
        setEditCollegeId(education.college.college_name)
        setEditCoures(education.course.course_name)
        setEditMajorId(education.major.id)
        setDateEducation(education);
        setIsShown(true);
    };
    const sendUpdteData = {
        'started': editEducation2.started,
        'ended': editEducation2.ended,
        'level': editeducationlevelId,
        'college': editCollegeName,
        'course': editCourseName,
        'major': editMajorId,
        'attachment': selectedFile,
        'applicant_id': uuid,

    }
    const handleEditLevelSelect = (value) => {
        setEducationLevelId(value)
    }
    const handleEditCollegeSelect = (value) => {
        setEditCollegeId(value)
    }
    const handleEditCourseSelect = (value) => {
        setEditCoures(value)
    }
    const handleEditMajorSelect = (value) => {
        setEditMajorId(value)

    }


    const handleSubmit = async (e) => {
        e.preventDefault();


        console.log('send data to server :', sendToData);

        try {


            const response = await axios.post('http://127.0.0.1:8000/api/applicant/educationstore', sendToData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
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
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.error);
            } else {
                console.error('An unexpected error occurred:', error);
            }
        }
    };
    const handleRemove = (id) => {
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
                    console.log("delete education :", id);
                    const response = await axios.delete(`http://127.0.0.1:8000/api/applicant/deleteeducation/${id}`);

                    if (response.status === 200) {
                        Swal.fire({
                            title: 'Success!',
                            text: response.data.success,
                            icon: 'success',
                            confirmButtonText: 'OK'
                        }).then(() => {
                            window.location.reload(); // Reloads the entire page after the success message
                        });
                    }

                } catch (error) {
                    console.error('There was an error removing the referee:', error);

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
    const handleHide = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "This action will hide the information from your CV, but it will remain visible on your profile. Do you want to proceed? ",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, hide it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.post(`http://127.0.0.1:8000/api/applicant/hideeducation/${id}`);

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
            console.log("update education is available 00005 ", updateData);
            const response = await axios.post(`http://127.0.0.1:8000/api/applicant/updateeducation/${id}`, updateData,
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

    return (!originalDetails?.data == null ? <PageLoader /> : <div>
        {/* Add the StepProgress component at the top */}
        <StepProgress currentStep={3} onStepClick={(step) => {
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
                <h1 className="fw-bold h2 text-dark mb-1">Education</h1>
                <p className="text-muted mb-0">
                    Add or remove experiences here
                </p>
            </div>

             
        </div>


        <div className="education-section bg-white rounded-lg p-4 mb-4 mt-6">
            {/* Education Details Header */}
            <div className="flex justify-between items-center mb-3">
                <h6 className="text-base font-bold text-gray-800 mb-0">
                    EDUCATION DETAILS
                </h6>

            </div>

            <div className="border-b border-gray-200 mb-3" />

            {/* Education Items */}
            <div className="education-list space-y-2">
                {originalDetails?.data?.education?.length > 0 ? (
                    originalDetails.data.education.map((item) => {
                        const courseName = item?.course?.course_name || "Course name not available";
                        const educationLevel = item?.level?.education_level || "Level not specified";
                        const collegeName = item?.college?.college_name || "College name not specified";
                        const majorName = item?.major?.name;

                        return (
                            <div key={item?.id} className="education-item p-2 hover:bg-gray-50 rounded">
                                <div className="flex">
                                    {/* Education Icon */}
                                    <div className="mr-3 mt-1">
                                        <FontAwesomeIcon
                                            icon={faGraduationCap}
                                            className="text-primary"
                                            style={{ fontSize: '1.75rem' }}
                                        />
                                    </div>

                                    {/* Education Details */}
                                    <div className="flex-grow-1">
                                        <div className="flex justify-between items-start">
                                            <h6 className="font-bold mb-1 text-gray-800">
                                                {educationLevel} in {courseName}
                                            </h6>
                                        </div>

                                        {majorName && (
                                            <p className="mb-1">
                                                <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                                                    Major: {majorName}
                                                </span>
                                            </p>
                                        )}

                                        <p className="mb-1 text-gray-700">
                                            {collegeName}
                                        </p>

                                        <p className="text-gray-500 text-sm mb-1">
                                            <FontAwesomeIcon icon={faCalendarAlt} className="mr-1" />
                                            {item?.started ? new Date(item.started).getFullYear() : 'Not specified'} - {item?.ended ? new Date(item.ended).getFullYear() : 'Not specified'}
                                        </p>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex items-start gap-2 ml-2">
                                        <button
                                            onClick={() => handleHide(item.id)}
                                            className="text-gray-500 hover:text-gray-700"
                                            aria-label="Hide"
                                        >
                                            <FontAwesomeIcon icon={faEyeSlash} className="text-lg" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="text-center py-4 text-gray-500">
                        No education records found
                    </div>
                )}
            </div>
        </div>

        {/*navigation  */}


        {isModelOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
                <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-3">
                    {/* Modal Header */}
                    <div className="flex justify-between items-center pb-2 border-b border-gray-300">
                        <h5 className="text-sm font-semibold">Add Education</h5>
                        <button
                            type="button"
                            className="text-gray-500 hover:text-gray-700"
                            onClick={() => setIsMOdelOpen(false)} // Replace with your logic for closing the modal
                        >
                            &times;
                        </button>
                    </div>

                    {/* Modal Body */}

                    <div className="pt-2 pb-2">
                        <form onSubmit={handleSubmit} className="education-applicant space-y-1" encType="multipart/form-data">
                            <input type="hidden" name="id" id="" />

                            {/* Level Field */}
                            <div className="space-y-1">
                                <label htmlFor="level" className="block text-xs font-medium text-gray-700">
                                    Education Level<span className="text-red-500">*</span>
                                </label>

                                <EducationLevel
                                    onSelect={handLevelSelect}
                                />
                                {errors.level && <p className="text-red-500">{errors.level[0]}</p>}

                            </div>

                            {/* College/University Field */}
                            <div className="space-y-1">
                                <label htmlFor="college" className="block text-xs font-medium text-gray-700">
                                    College / University<span className="text-red-500">*</span>
                                </label>

                                <College

                                    onSelect={handCollegeSelect}
                                />
                                {errors.college && <p className="text-red-500">{errors.college[0]}</p>}
                            </div>

                            {/* Course Field */}
                            <div className="space-y-1">
                                <label htmlFor="course" className="block text-xs font-medium text-gray-700">
                                    Course<span className="text-red-500">*</span>
                                </label>
                                <Course
                                    onSelect={handleCourseSelect}
                                />
                                {errors.course && <p className="text-red-500">{errors.course[0]}</p>}
                            </div>

                            {/* Major/Specialization Field */}
                            <div className="space-y-1">
                                <label htmlFor="major_id" className="block text-xs font-medium text-gray-700">
                                    Major / Specialized In<span className="text-red-500">*</span>
                                </label>
                                {/* <select className="form-select w-full mt-1 text-xs border-gray-300 rounded-md shadow-sm" name="major_id"></select> */}
                                <Major
                                    onSelect={handleMajor}
                                />
                                {errors.major && <p className="text-red-500">{errors.major[0]}</p>}
                            </div>

                            {/* Started Date Field */}
                            <div className="space-y-1">
                                <label htmlFor="started" className="block text-xs font-medium text-gray-700">
                                    Started<span className="text-red-500">*</span>
                                </label>
                                <input name="started" onChange={handleChange} type="date" className="form-input w-full text-xs mt-1 border-gray-300 rounded-md shadow-sm" />
                                {errors.started && <p className="text-red-500">{errors.started[0]}</p>}
                            </div>

                            {/* Ended Date Field */}
                            <div className="space-y-1">
                                <label htmlFor="ended" className="block text-xs font-medium text-gray-700">
                                    Ended<span className="text-red-500">*</span>
                                </label>
                                <input name="ended" onChange={handleChange} type="date" className="form-input w-full text-xs mt-1 border-gray-300 rounded-md shadow-sm" />
                                {errors.ended && <p className="text-red-500">{errors.ended[0]}</p>}
                            </div>

                            {/* Attach Certificate Field */}
                            <div className="space-y-1">
                                <label htmlFor="attachment" className="block text-xs font-medium text-gray-700">
                                    Attach Certificate<span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="attachment"
                                    name="attachment"
                                    type="file"
                                    // accept=".pdf"
                                    className="form-input w-full text-xs mt-1 border-gray-300 rounded-md shadow-sm"
                                    onChange={handleFileChange}
                                />
                                {errors.attachment && <p className="text-red-500">{errors.attachment[0]}</p>}
                                {/* <small className="text-gray-500 text-xxs">PDF format only. Max size: 5120 KB.</small> */}
                            </div>

                            {/* Modal Footer */}
                            <div className="flex justify-end space-x-1 mt-3">
                                <button
                                    type="button"
                                    className="bg-gray-200 text-gray-800 text-xs py-1 px-2 rounded-md hover:bg-gray-300"
                                    onClick={() => setIsMOdelOpen(false)} // Replace with your logic for closing the modal
                                >
                                    Close
                                </button>
                                <button type="submit" className="bg-secondary text-white text-xs py-1 px-2 rounded-md hover:bg-secondary-dark">
                                    Save changes
                                    <i
                                        className="fas fa-spinner fa-spin spinner ml-2 hidden"
                                        style={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            transform: 'translate(-50%, -50%)',
                                        }}
                                    ></i>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )}
        {ishown && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
                <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-3">
                    {/* Modal Header */}
                    <div className="flex justify-between items-center pb-2 border-b border-gray-300">
                        <h5 className="text-sm font-semibold">Edit Education</h5>
                        <button
                            type="button"
                            className="text-gray-500 hover:text-gray-700"
                            onClick={() => setIsShown(false)} // Replace with your logic for closing the modal
                        >
                            &times;
                        </button>
                    </div>

                    {/* Modal Body */}

                    <div className="pt-2 pb-2">
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            handleUpdate(editEducation2.id, sendUpdteData);
                        }} className="education-applicant space-y-1">
                            <input type="hidden" name="id" id="" />

                            {/* Level Field */}
                            <div className="space-y-1">
                                <label htmlFor="level" className="block text-xs font-medium text-gray-700">
                                    Level<span className="text-red-500">*</span>
                                </label>
                                <EducationLevel
                                    label="Education Level"
                                    onSelect={handleEditLevelSelect}
                                    initialValue={editeducationlevelId} // Pass the language ID to edit
                                    onOptionsLoad={(options) => console.log('Loaded Options language tttr:', options)}
                                />
                            </div>

                            {/* College/University Field */}
                            <div className="space-y-1">
                                <label htmlFor="college" className="block text-xs font-medium text-gray-700">
                                    College / University<span className="text-red-500">*</span>
                                </label>
                                <College

                                    onSelect={handleEditCollegeSelect}
                                    initialValue={editCollegeName} // Pass the language ID to edit
                                    onOptionsLoad={(options) => console.log('Loaded Options college 777:', options)}
                                />

                            </div>

                            {/* Course Field */}
                            <div className="space-y-1">
                                <label htmlFor="course" className="block text-xs font-medium text-gray-700">
                                    Course<span className="text-red-500">*</span>
                                </label>
                                <Course
                                    initialValue={editCourseName}

                                    onSelect={handleEditCourseSelect}
                                    onOptionsLoad={(options) => console.log('Loaded Options course 777:', options)}
                                />

                            </div>
                            {/* Major/Specialization Field */}
                            <div className="space-y-1">
                                <label htmlFor="major_id" className="block text-xs font-medium text-gray-700">
                                    Major / Specialized In<span className="text-red-500">*</span>
                                </label>
                                <Major
                                    initialValue={editMajorId}
                                    // setInitialMajor={setSetInitialMajor}
                                    onSelect={handleEditMajorSelect}
                                    onOptionsLoad={(options) => console.log('Loaded Options major 777:', options)}

                                />


                            </div>

                            {/* Started Date Field */}
                            <div className="space-y-1">
                                <label htmlFor="started" className="block text-xs font-medium text-gray-700">
                                    Started<span className="text-red-500">*</span>
                                </label>
                                <input name="started" type="date" className="form-input w-full text-xs mt-1 border-gray-300 rounded-md shadow-sm"

                                    value={formatDate(editEducation2.started)}
                                    onChange={(e) => setDateEducation({ ...editEducation2, started: e.target.value })}
                                />
                            </div>

                            {/* Ended Date Field */}
                            <div className="space-y-1">
                                <label htmlFor="ended" className="block text-xs font-medium text-gray-700">
                                    Ended<span className="text-red-500">*</span>
                                </label>
                                <input
                                    name="ended"
                                    type="date"

                                    className="form-input w-full text-xs mt-1 border-gray-300 rounded-md shadow-sm"
                                    value={formatDate(editEducation2.ended)}
                                    // Ensure it's a valid date format or an empty string
                                    onChange={(e) => setDateEducation({ ...editEducation2, ended: e.target.value })}
                                />



                            </div>

                            {/* Attach Certificate Field */}
                            <div className="space-y-1">
                                <label htmlFor="attachment" className="block text-xs font-medium text-gray-700">
                                    Attach Certificate<span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="attachment"
                                    name="attachment"
                                    type="file"
                                    accept=".pdf"
                                    className="form-input w-full text-xs mt-1 border-gray-300 rounded-md shadow-sm"
                                />
                                <small className="text-gray-500 text-xxs">PDF format only. Max size: 5120 KB.</small>
                            </div>

                            {/* Modal Footer */}
                            <div className="flex justify-end space-x-1 mt-3">
                                <button
                                    type="button"
                                    className="bg-gray-200 text-gray-800 text-xs py-1 px-2 rounded-md hover:bg-gray-300"
                                    onClick={() => setIsShown(false)} // Replace with your logic for closing the modal
                                >
                                    Close
                                </button>
                                <button type="submit" className="bg-secondary text-white text-xs py-1 px-2 rounded-md hover:bg-secondary-dark">
                                    Save changes
                                    <i
                                        className="fas fa-spinner fa-spin spinner ml-2 hidden"
                                        style={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            transform: 'translate(-50%, -50%)',
                                        }}
                                    ></i>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )}
    </div>);
}

export default EducationsCv;
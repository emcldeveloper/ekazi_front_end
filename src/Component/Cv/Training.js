import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


import { collection, doc, setDoc } from "firebase/firestore";
import PageLoader from "../../widgets/pageLoader";
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faEyeSlash, faTimes, faPlus, faPencilAlt, faDownload, faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons';
import Major from "../../pages/major";
import axios from "axios";
import EducationLevel from "../../pages/universal/educationLevel";
import { Row, Col, Button } from 'react-bootstrap';
import Course from "../../pages/course";
import College from "../../pages/universal/college";
import { useCvProfileData } from "../../hooks/Candidate/Cv";
import StepProgress from "./Stepprogress";

const Training = () => {

    const [isModelOpen, setIsMOdelOpen] = useState(false);
    const [ishown, setIsShown] = useState(false);

    const [selectedFile, setSelectedFile] = useState(null);
    const [errors, setErrors] = useState({});
    const edu = 2;
    const uuid = localStorage.getItem("applicantId");
    const { data, loading, error } = useCvProfileData(uuid);
    const originalDetails = data;

    const [formData, setFormData] = useState({
        name: '',
        institution: '',
        started: '',
        ended: '',
        attachment: null
    });
    const [editTraining, setEditTraining] = useState({
        name: '',
        institution: '',
        started: '',
        ended: '',
        attachment: null
    });

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const navigate = useNavigate();
    const openModel = () => {
        setIsMOdelOpen(true);
    };
    const openEditModal = (training) => {
        setEditTraining(training);
        setIsShown(true);
    };

    const closeEditModal = () => {
        setIsShown(false);
    }

    const sendToData = {
        ...formData,
        'attachment': selectedFile,
        'applicant_id': uuid,
    }

    const formatDate = (dateString) => {
        if (!dateString) return 'Present';
        const options = { year: 'numeric', month: 'short' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const getFileNameFromUrl = (url) => {
        if (!url) return '';
        const parts = url.split('/');
        const fullName = parts[parts.length - 1];
        const lastDotIndex = fullName.lastIndexOf('.');
        if (lastDotIndex === -1) return fullName;

        const name = fullName.substring(0, lastDotIndex);
        const extension = fullName.substring(lastDotIndex);

        const shortenedName = name.length > 10
            ? `${name.substring(0, 7)}...`
            : name;

        return `${shortenedName}${extension}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/applicant/storetraining', sendToData, {
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
                    const response = await axios.delete(`http://127.0.0.1:8000/api/applicant/trainingdelete/${id}`);
                    if (response.status === 200) {
                        Swal.fire({
                            title: 'Success!',
                            text: response.data.success,
                            icon: 'success',
                            confirmButtonText: 'OK'
                        }).then(() => {
                            window.location.reload();
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
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.post(`http://127.0.0.1:8000/api/applicant/hidetraining/${id}`);
                    if (response.status === 200) {
                        Swal.fire({
                            title: 'Success!',
                            text: response.data.success,
                            icon: 'success',
                            confirmButtonText: 'OK'
                        });
                    }
                    window.location.reload();
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
            const response = await axios.post(`http://127.0.0.1:8000/api/applicant/updatetraining/${id}`, updateData, {
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
            }
            window.location.reload();
        } catch (error) {
            console.error('There was an error update the training', error);
            Swal.fire({
                title: 'Error!',
                text: 'Something went wrong. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    return (originalDetails == null ? <PageLoader /> :
        <div className="training-section mt-3">
               <StepProgress currentStep={8} onStepClick={(step) => {
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
                <h1 className="fw-bold h2 text-dark mb-1">Training</h1>
                
            </div>

            {/* Right Section: Buttons */}
            <div className="d-flex flex-column flex-md-row gap-2">
                {/* Step 5 Button */}
                  {/* <button
                        className="py-2 px-4 bg-green-500 text-white font-bold rounded-full hover:bg-green-600 transition-all w-full sm:w-auto"
                        onClick={openModel}
                    >
                        Add Training
                    </button> */}
            </div>
        </div>
      

            <div className="mb-3 divider" />

            {/* Training List */}
            <div className="training-list">
                {originalDetails.data?.training?.length > 0 ? (
                    originalDetails .data.training.map((training, index) => (
                        <div key={index} className="d-flex mb-3 training-item p-3 bg-white rounded-lg shadow-sm">
                            <div className="me-3 mt-1">
                                <FontAwesomeIcon
                                    icon={faChalkboardTeacher}
                                    className="text-primary"
                                    style={{ fontSize: '1.5rem' }}
                                />
                            </div>
                            <div className="flex-grow-1">
                                <div className="d-flex justify-content-between">
                                    <h6 className="mb-0 fw-bold">
                                        {training.name} - {' '}
                                        <span className="fw-light text-muted">
                                            {formatDate(training.started)} - {formatDate(training.ended)}
                                        </span>
                                    </h6>
                                    {originalDetails.data?.training?.some((e) => e.id === training?.id) && (
                                        <div className="flex space-x-2">
                                            {/* <Button
                                                variant="link"
                                                className="p-0 text-secondary"
                                                onClick={() => openEditModal(training)}
                                            >
                                                <FontAwesomeIcon icon={faPencilAlt} />
                                            </Button> */}
                                            {/* <Button
                                                variant="link"
                                                className="p-0 text-red-500"
                                                onClick={() => handleRemove(training?.id)}
                                            >
                                                <FontAwesomeIcon icon={faTrash} />
                                            </Button> */}
                                            <Button
                                                variant="link"
                                                className="p-0 text-gray-500"
                                                onClick={() => handleHide(training?.id)}
                                            >
                                                <FontAwesomeIcon icon={faEyeSlash} />
                                            </Button>
                                        </div>
                                    )}
                                </div>
                                <p className="mb-0">
                                    {training.institution}
                                </p>

                                {training.attachment && (
                                    <div className="mt-1">
                                        <a
                                            href={training.attachment}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-decoration-none small"
                                        >
                                            <FontAwesomeIcon icon={faDownload} className="me-1" />
                                            {getFileNameFromUrl(training.attachment)}
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-2 text-muted">
                        No trainings or workshops added
                    </div>
                )}
            </div>



            {/* Add Training Modal */}
            {isModelOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-3">
                        <div className="flex justify-between items-center pb-2 border-b border-gray-300">
                            <h5 className="text-sm font-semibold">Add Training</h5>
                            <button
                                type="button"
                                className="text-gray-500 hover:text-gray-700"
                                onClick={() => setIsMOdelOpen(false)}
                            >
                                &times;
                            </button>
                        </div>

                        <div className="pt-2 pb-2">
                            <form onSubmit={handleSubmit} className="education-applicant space-y-1" encType="multipart/form-data">
                                <input type="hidden" name="id" id="" />

                                <div className="space-y-1">
                                    <label htmlFor="attachment" className="block text-xs font-medium text-gray-700">
                                        Training Name<span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        className="form-input w-full text-xs mt-1 border-gray-300 rounded-md shadow-sm"
                                        onChange={handleChange}
                                    />
                                    {errors.name && <p className="text-red-500">{errors.name[0]}</p>}
                                </div>

                                <div className="space-y-1">
                                    <label htmlFor="college" className="block text-xs font-medium text-gray-700">
                                        Institution Name<span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="institution"
                                        name="institution"
                                        value={formData.institution}
                                        className="form-input w-full text-xs mt-1 border-gray-300 rounded-md shadow-sm"
                                        onChange={handleChange}
                                    />
                                    {errors.institution && <p className="text-red-500">{errors.institution[0]}</p>}
                                </div>

                                <div className="space-y-1">
                                    <label htmlFor="started" className="block text-xs font-medium text-gray-700">
                                        Started<span className="text-red-500">*</span>
                                    </label>
                                    <input name="started" onChange={handleChange} type="date" className="form-input w-full text-xs mt-1 border-gray-300 rounded-md shadow-sm" />
                                    {errors.started && <p className="text-red-500">{errors.started[0]}</p>}
                                </div>

                                <div className="space-y-1">
                                    <label htmlFor="ended" className="block text-xs font-medium text-gray-700">
                                        Ended<span className="text-red-500">*</span>
                                    </label>
                                    <input name="ended" onChange={handleChange} type="date" className="form-input w-full text-xs mt-1 border-gray-300 rounded-md shadow-sm" />
                                    {errors.ended && <p className="text-red-500">{errors.ended[0]}</p>}
                                </div>

                                <div className="space-y-1">
                                    <label htmlFor="attachment" className="block text-xs font-medium text-gray-700">
                                        Attach Certificate<span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="attachment"
                                        name="attachment"
                                        type="file"
                                        className="form-input w-full text-xs mt-1 border-gray-300 rounded-md shadow-sm"
                                        onChange={handleFileChange}
                                    />
                                    {errors.attachment && <p className="text-red-500">{errors.attachment[0]}</p>}
                                </div>

                                <div className="flex justify-end space-x-1 mt-3">
                                    <button
                                        type="button"
                                        className="bg-gray-200 text-gray-800 text-xs py-1 px-2 rounded-md hover:bg-gray-300"
                                        onClick={() => setIsMOdelOpen(false)}
                                    >
                                        Close
                                    </button>
                                    <button type="submit" className="bg-secondary text-white text-xs py-1 px-2 rounded-md hover:bg-secondary-dark">
                                        Save changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Training Modal */}
            {ishown && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-3">
                        <div className="flex justify-between items-center pb-2 border-b border-gray-300">
                            <h5 className="text-sm font-semibold">Edit Training</h5>
                            <button
                                type="button"
                                className="text-gray-500 hover:text-gray-700"
                                onClick={closeEditModal}
                            >
                                &times;
                            </button>
                        </div>

                        <div className="pt-2 pb-2">
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                handleUpdate(editTraining.id, editTraining);
                            }} className="education-applicant space-y-1" encType="multipart/form-data">
                                <input type="hidden" name="id" id="" />

                                <div className="space-y-1">
                                    <label htmlFor="attachment" className="block text-xs font-medium text-gray-700">
                                        Training Name<span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={editTraining.name}
                                        onChange={(e) => setEditTraining({ ...editTraining, name: e.target.value })}
                                        className="form-input w-full text-xs mt-1 border-gray-300 rounded-md shadow-sm"
                                    />
                                    {errors.name && <p className="text-red-500">{errors.name[0]}</p>}
                                </div>

                                <div className="space-y-1">
                                    <label htmlFor="college" className="block text-xs font-medium text-gray-700">
                                        Institution Name<span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="institution"
                                        name="institution"
                                        value={editTraining.institution}
                                        className="form-input w-full text-xs mt-1 border-gray-300 rounded-md shadow-sm"
                                        onChange={(e) => setEditTraining({ ...editTraining, institution: e.target.value })}
                                    />
                                    {errors.institution && <p className="text-red-500">{errors.institution[0]}</p>}
                                </div>

                                <div className="space-y-1">
                                    <label htmlFor="started" className="block text-xs font-medium text-gray-700">
                                        Started<span className="text-red-500">*</span>
                                    </label>
                                    <input name="started"
                                        value={editTraining.started}
                                        onChange={(e) => setEditTraining({ ...editTraining, started: e.target.value })}
                                        type="date" className="form-input w-full text-xs mt-1 border-gray-300 rounded-md shadow-sm" />
                                    {errors.started && <p className="text-red-500">{errors.started[0]}</p>}
                                </div>

                                <div className="space-y-1">
                                    <label htmlFor="ended" className="block text-xs font-medium text-gray-700">
                                        Ended<span className="text-red-500">*</span>
                                    </label>
                                    <input name="ended"
                                        value={editTraining.ended}
                                        onChange={(e) => setEditTraining({ ...editTraining, ended: e.target.value })}
                                        type="date" className="form-input w-full text-xs mt-1 border-gray-300 rounded-md shadow-sm" />
                                    {errors.ended && <p className="text-red-500">{errors.ended[0]}</p>}
                                </div>

                                <div className="space-y-1">
                                    <label htmlFor="attachment" className="block text-xs font-medium text-gray-700">
                                        Attach Certificate<span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="attachment"
                                        name="attachment"
                                        type="file"
                                        className="form-input w-full text-xs mt-1 border-gray-300 rounded-md shadow-sm"
                                        onChange={(e) => setEditTraining({ ...editTraining, attachment: e.target.value })}
                                    />
                                    {errors.attachment && <p className="text-red-500">{errors.attachment[0]}</p>}
                                </div>

                                <div className="flex justify-end space-x-1 mt-3">
                                    <button
                                        type="button"
                                        className="bg-gray-200 text-gray-800 text-xs py-1 px-2 rounded-md hover:bg-gray-300"
                                        onClick={closeEditModal}
                                    >
                                        Close
                                    </button>
                                    <button type="submit" className="bg-secondary text-white text-xs py-1 px-2 rounded-md hover:bg-secondary-dark">
                                        Save changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                .divider {
                    height: 1px;
                    width: 100%;
                    background-color: rgb(235, 235, 235);
                }
                .training-item {
                    transition: background-color 0.2s;
                    padding: 8px;
                    border-radius: 4px;
                }
                .training-item:hover {
                    background-color: rgba(0, 0, 0, 0.03);
                }
            `}</style>
        </div>
    );
}

export default Training;
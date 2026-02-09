import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StepsContext } from "../layouts/mainLayout";
import { firestore } from "../utils/firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import PageLoader from "../widgets/pageLoader";
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faEyeSlash, faTimes } from '@fortawesome/free-solid-svg-icons';
import Course from "./course";
import College from "./universal/college";
import Major from "./major";
import axios from "axios";
import EducationLevel from "./universal/educationLevel";

const Training = () => {
    const { currentStep, setCurrentStep, originalDetails, candidate } = useContext(StepsContext)
    const [isModelOpen, setIsMOdelOpen] = useState(false);
    const [ishown, setIsShown] = useState(false);

    const [selectedFile, setSelectedFile] = useState(null);
    const [errors, setErrors] = useState({});
    const edu = 2;
    const [formData, setFormData] = useState({
        name: '',
        institution: '',
        started: '',
        ended: '',
        attachment: null // To store the file
    });
    const [editTraining, setEditTraining] = useState({
        name: '',
        institution: '',
        started: '',
        ended: '',
        attachment: null // To store the file

    });
    
    // Handle file input change
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0],);

    };
    // const handleFileChange = (e) => {
    //     setSelectedFile(e.target.files[0],);

    // };



    const handleChange = (e) => {

        // Handle other inputs normally
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const { uuid, template } = useParams()
    const navigate = useNavigate();
    useEffect(() => {
        setCurrentStep(9)
    }, [])
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



    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare the form data
        console.log('send training data  :', sendToData);

        try {

            // Submit form data without manually setting the Content-Type
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
            // Swal.fire({
            //     title: 'Error!',
            //     text: error,
            //     icon: 'error',
            //     confirmButtonText: 'OK'
            // });
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
                    console.log(id);
                    const response = await axios.delete(`http://127.0.0.1:8000/api/applicant/trainingdelete/${id}`);

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
            console.log('update data for training ', updateData);
            const response = await axios.post(`http://127.0.0.1:8000/api/applicant/updatetraining/${id}`, updateData,
                {

                    headers: {
                        'Content-Type': 'multipart/form-data',
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
            console.error('There was an error update the training', error);
            Swal.fire({
                title: 'Error!',
                text: 'Something went wrong. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };




    return (originalDetails == null || candidate == null ? <PageLoader /> : <div>
     
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 p-4 bg-white shadow-md rounded-lg mt-3">
            {/* Left Section: Title & Description */}
            <div className="text-center sm:text-left">
                <h1 className="font-bold text-2xl sm:text-3xl text-gray-800">Training</h1>
                <p className="text-base sm:text-lg text-gray-500 mt-1 sm:mt-2">
                Add or remove training here
                </p>
            </div>

            {/* Right Section: Buttons */}
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                <button className="py-2 px-4 bg-secondary font-bold text-secondary bg-opacity-20 rounded-full w-full sm:w-auto">
                Step 9
                </button>

                {/* Add Experience Button */}
                <button
                    className="py-2 px-4 bg-green-500 text-white font-bold rounded-full hover:bg-green-600 transition-all w-full sm:w-auto"
                    onClick={openModel}
                >
                   Add Training
                </button>
            </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">

            {
                originalDetails?.training?.map((item) => {
                    // Safely access properties with optional chaining and provide fallback values
                    const name = item?.name || "Training name not available";
                    const startedYear = item?.started ? new Date(item.started).getFullYear() : "Start year not available";
                    const endedYear = item?.ended ? new Date(item.ended).getFullYear() : "End year not available";
                    const institution = item?.institution || "Institution not available";

                    return (
                        <div
                            className="p-4 sm:p-5 bg-white border border-gray-200 rounded-lg     transition-all  "
                            key={item?.id}
                        >
                            {/* Name and Year Range */}
                            <p className="text-lg font-bold text-gray-800">
                                {name}: <span className="font-normal text-gray-600">{startedYear} - {endedYear}</span>
                            </p>

                            {/* Institution */}
                            <p className="mt-1 text-sm text-gray-600">{institution}</p>

                            {/* Action Icons (Conditional Rendering) */}
                            {candidate?.training?.some((e) => e.id === item?.id) && (
                                <div className="flex justify-end space-x-3 mt-3">
                                    {/* Edit Icon */}
                                    <button
                                        onClick={() => openEditModal(item)}
                                        className="text-blue-500 hover:text-blue-700 p-2 rounded-full hover:bg-blue-50 transition-all"
                                    >
                                        <FontAwesomeIcon icon={faEdit} className="w-5 h-5" />
                                    </button>

                                    {/* Delete Icon */}
                                    <button
                                        onClick={() => handleRemove(item?.id)}
                                        className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-all"
                                    >
                                        <FontAwesomeIcon icon={faTrash} className="w-5 h-5" />
                                    </button>

                                    {/* Hide Icon */}
                                    <button
                                        onClick={() => handleHide(item?.id)}
                                        className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-50 transition-all"
                                    >
                                        <FontAwesomeIcon icon={faEyeSlash} className="w-5 h-5" />
                                    </button>
                                </div>
                            )}
                        </div>
                    );
                })
            }

        </div>
     
        <div className="relative z-10 w-full mt-10 px-4">
          <div className="flex flex-col sm:flex-row justify-end items-center gap-4">
            {/* Prev Button */}
            <button
              type="button"
              onClick={() => {
                console.log("Prev clicked");
                navigate(-1);
                setCurrentStep(currentStep - 1);
              }}
              className="w-full sm:w-auto text-gray-700 font-semibold hover:text-primary transition-all"
            >
              ← Prev
            </button>

            {/* Continue Button */}
            <button
              type="button"
              onClick={() => {
                navigate(`/refrees/${uuid}/${template}`)
                setCurrentStep(currentStep + 1)
              }}
              className="w-full sm:w-auto py-3 px-6 bg-primary text-white font-bold rounded-full hover:scale-105 transition-all"
            >
              Continue
            </button>
          </div>
        </div>
        {isModelOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
                <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-3">
                    {/* Modal Header */}
                    <div className="flex justify-between items-center pb-2 border-b border-gray-300">
                        <h5 className="text-sm font-semibold">Add Training</h5>
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
                                {/* <small className="text-gray-500 text-xxs">PDF format only. Max size: 5120 KB.</small> */}
                            </div>

                            {/* College/University Field */}
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
                        <h5 className="text-sm font-semibold">Edit Training</h5>
                        <button
                            type="button"
                            className="text-gray-500 hover:text-gray-700"
                            onClick={closeEditModal} // Replace with your logic for closing the modal
                        >
                            &times;
                        </button>
                    </div>

                    {/* Modal Body */}

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
                                {/* <small className="text-gray-500 text-xxs">PDF format only. Max size: 5120 KB.</small> */}
                            </div>

                            {/* College/University Field */}
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
                            {/* Started Date Field */}
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

                            {/* Ended Date Field */}
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
                                    onChange={(e) => setEditTraining({ ...editTraining, attachment: e.target.value })}
                                />
                                {errors.attachment && <p className="text-red-500">{errors.attachment[0]}</p>}
                                {/* <small className="text-gray-500 text-xxs">PDF format only. Max size: 5120 KB.</small> */}
                            </div>

                            {/* Modal Footer */}
                            <div className="flex justify-end space-x-1 mt-3">
                                <button
                                    type="button"
                                    className="bg-gray-200 text-gray-800 text-xs py-1 px-2 rounded-md hover:bg-gray-300"
                                    onClick={closeEditModal} // Replace with your logic for closing the modal
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

export default Training;
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StepsContext } from "../layouts/mainLayout";
import PageLoader from "../widgets/pageLoader";
import { collection, doc, setDoc } from "firebase/firestore";
import { firestore } from "../utils/firebase";
import axios from "axios";
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faEyeSlash } from '@fortawesome/free-solid-svg-icons';







const Refrees = () => {

    const [referees, setReferees] = useState([]); // Initialize referees state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isShown, setShown] = useState(false);
    const [formData, setFormData] = useState({
        first_name: '',
        middle_name: '',
        last_name: '',
        position: '',
        employer: '',
        email: '',
        phone: '',
    });
    const [editReferee, setEditReferee] = useState({
        first_name: '',
        middle_name: '',
        last_name: '',
        position: '',
        employer: '',
        email: '',
        phone: '',
    });
    
    // When you want to update specific fields in the `editReferee` object
    // Use `setEditReferee` to update the state
    

    const closeModal = () => setIsModalOpen(false);
    const [isEditMode, setIsEditMode] = useState(false);

    const openModal = () => {
        setIsEditMode(false); // Set to add mode

        setIsModalOpen(true); // Open the modal
    };

    ;

    const openEditModal = (referee) => {
        setEditReferee(referee);
        setShown(true);
    };

    const closeEditModal = () => {
        setShown(false);
    };

    const { currentStep, setCurrentStep, originalDetails, candidate } = useContext(StepsContext)
    const { uuid, template } = useParams()
    const navigate = useNavigate();
    useEffect(() => {
        setCurrentStep(10)
    }, [])
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const dataToSend = {
        ...formData,
        user_id: uuid,
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const response = await axios.post(`http://127.0.0.1:8000/api/applicant/refereestore/`, dataToSend,
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
                    text: 'Data has been saved successfully.',
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
   
        closeModal();
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
                    const response = await axios.delete(`http://127.0.0.1:8000/api/applicant/refereedelete/${id}`);

                    if (response.status === 200) {
                        Swal.fire({
                            title: 'Success!',
                            text: 'Data has been deleted permanently.',
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


    const handleHide = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "This action will hide the information on your CV but keep it visible on your profile. Do you want to continue?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, hide it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.post(`http://127.0.0.1:8000/api/applicant/hide/${id}`);

                    if (response.status === 200) {
                        Swal.fire({
                            title: 'Success!',
                            text: 'Data has been hiden successfully.',
                            icon: 'success',
                            confirmButtonText: 'OK'
                        });
                    }

                    window.location.reload(); // Reloads the entire page
                } catch (error) {
                 
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
    const handleUpdate =async (id,updateData) => {
        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/applicant/updatereferee/${id}`,updateData ,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }

            );
            if (response.status === 200) {
                Swal.fire({
                    title: 'Success!',
                    text: 'response.data.success',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            }


            window.location.reload(); // Reloads the entire page
        } catch (error) {
    
            Swal.fire({
                title: 'Error!',
                text: 'Something went wrong. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    return (originalDetails == null || candidate == null ? <PageLoader /> : <div>
      
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 p-4 bg-white  rounded-lg mt-3">
            {/* Left Section: Title & Description */}
            <div className="text-center sm:text-left">
                <h1 className="font-bold text-2xl sm:text-3xl text-gray-800">Referees</h1>
                <p className="text-base sm:text-lg text-gray-500 mt-1 sm:mt-2">
                Add or remove refrees here
                </p>
            </div>

            {/* Right Section: Buttons */}
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                <button className="py-2 px-4 bg-secondary font-bold text-secondary bg-opacity-20 rounded-full w-full sm:w-auto">
                Step 10
                </button>

                {/* Add Experience Button */}
                <button
                    className="py-2 px-4 bg-green-500 text-white font-bold rounded-full hover:bg-green-600 transition-all w-full sm:w-auto"
                    onClick={openModal}> 
                
                    Add Referee
                </button>
            </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-5">
        {
  originalDetails?.referees?.map((item) => {
    // Safely access properties with optional chaining and provide fallback values
    const firstName = item?.first_name || "First name not available";
    const middleName = item?.middle_name || "";
    const lastName = item?.last_name || "Last name not available";
    const position = item?.referee_position || "Position not available";
    const employer = item?.employer || "Employer not available";

    return (
        <div
        className="p-4 sm:p-5 bg-white border border-gray-200 flex flex-col items-center rounded-lg    transition-all   "
        key={item?.id}
      >
        {/* Profile Icon */}
        <div className="bg-orange-100 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-16 h-16 sm:w-20 sm:h-20 p-4 sm:p-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
        </div>
      
        {/* Name */}
        <p className="mt-2 text-center">
          <span className="font-bold capitalize text-lg sm:text-xl">
            {firstName} {middleName} {lastName}
          </span>
        </p>
      
        {/* Position */}
        <p className="text-sm sm:text-base text-gray-600 text-center">Position : {position}</p>
      
        {/* Employer */}
        <p className="text-sm sm:text-base text-gray-600 italic text-center">
          Company: {employer}
        </p>
      
        {/* Action Icons (Conditional Rendering) */}
        {candidate?.referees?.some((e) => e.id === item?.id) && (
          <div className="flex justify-center space-x-4 mt-3">
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
                navigate(`/complete/${uuid}/${template}`)
                setCurrentStep(currentStep + 1)
              }}
              className="w-full sm:w-auto py-3 px-6 bg-primary text-white font-bold rounded-full hover:scale-105 transition-all"
            >
              Continue
            </button>
          </div>
        </div>
        {/* Modal */}

        {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                <div className="bg-white rounded-lg p-4 w-80">
                    <h2 className="text-lg font-bold mb-3">Add Referee</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-2 mb-3">
                            <div>
                                <label className="block text-sm text-gray-700 font-bold mb-1">
                                    First Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="first_name"
                                    value={formData.first_name}
                                    onChange={handleChange}
                                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-700 font-bold mb-1">
                                    Middle Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="middle_name"
                                    value={formData.middle_name}
                                    onChange={handleChange}
                                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                    required
                                />
                            </div>

                            <div className="col-span-2">
                                <label className="block text-sm text-gray-700 font-bold mb-1">
                                    Last Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="last_name"
                                    value={formData.last_name}
                                    onChange={handleChange}
                                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                    required
                                />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="block text-sm text-gray-700 font-bold mb-1">
                                Position <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="position"
                                value={formData.position}
                                onChange={handleChange}
                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="block text-sm text-gray-700 font-bold mb-1">
                                Employer <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="employer"
                                value={formData.employer}
                                onChange={handleChange}
                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="block text-sm text-gray-700 font-bold mb-1">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="block text-sm text-gray-700 font-bold mb-1">
                                Phone <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                required
                            />
                        </div>

                        <div className="flex justify-end mt-4">
                            <button
                                type="button"
                                className="mr-2 py-1 px-4 bg-gray-300 text-gray-700 rounded-full text-sm"
                                onClick={closeModal}
                            >
                                Close
                            </button>
                            <button
                                type="submit"
                                className="py-1 px-4 bg-primary text-white rounded-full text-sm"
                            >
                                Save changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )}
        {/* edit referee*/}
        {isShown && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                <div className="bg-white rounded-lg p-6 w-96">
                    <h2 className="text-xl font-bold mb-4">Edit Referee</h2>
                    <form onSubmit={(e) => { 
                            e.preventDefault(); 
                            handleUpdate(editReferee.id, editReferee); 
                        }}>
                        <div className="grid grid-cols-2 gap-2 mb-3">
                            <div>
                                <label className="block text-sm text-gray-700 font-bold mb-1">
                                    First Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={editReferee.first_name || ''}
                                    onChange={(e) => setEditReferee({ ...editReferee, first_name: e.target.value })}
                                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-700 font-bold mb-1">
                                    Middle Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="middleName"
                                    value={editReferee.middle_name || ''}
                                    onChange={(e) => setEditReferee({ ...editReferee, middle_name: e.target.value })}
                                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                    required
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm text-gray-700 font-bold mb-1">
                                    Last Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={editReferee.last_name || ''}
                                    onChange={(e) => setEditReferee({ ...editReferee, last_name: e.target.value })}
                                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="block text-sm text-gray-700 font-bold mb-1">
                                Position <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="position"
                                value={editReferee.referee_position || ''}
                                onChange={(e) => setEditReferee({ ...editReferee, referee_position: e.target.value })}
                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="block text-sm text-gray-700 font-bold mb-1">
                                Employer <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="employer"
                                value={editReferee.employer || ''}
                                onChange={(e) => setEditReferee({ ...editReferee, employer: e.target.value })}
                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="block text-sm text-gray-700 font-bold mb-1">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={editReferee.email || ''}
                                onChange={(e) => setEditReferee({ ...editReferee, email: e.target.value })}
                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="block text-sm text-gray-700 font-bold mb-1">
                                Phone <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="phone"
                                value={editReferee.phone || ''}
                                onChange={(e) => setEditReferee({ ...editReferee, phone: e.target.value })}
                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                required
                            />
                        </div>
                        <div className="flex justify-end mt-4">
                            <button
                                type="button"
                                className="mr-2 py-1 px-4 bg-gray-300 text-gray-700 rounded-full text-sm"
                                onClick={closeEditModal}
                            >
                                Close
                            </button>
                            <button
                                type="submit"
                                className="py-1 px-4 bg-primary text-white rounded-full text-sm"
                            >
                                Save changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )}

    </div>);
}



export default Refrees;
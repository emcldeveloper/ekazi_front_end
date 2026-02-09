import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageLoader from "../../widgets/pageLoader";
import axios from "axios";
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faEyeSlash, faPlus, faPencilAlt, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { CvApi } from "../../Api/Jobseeker/CvApi";
import StepProgress from "./Stepprogress";
import { useCvProfileData } from "../../hooks/Candidate/Cv";
import { Row, Col, Button, Table } from 'react-bootstrap';

const RefreesCvComponent = () => {
    const [referees, setReferees] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isShown, setShown] = useState(false);

    const uuid = localStorage.getItem("applicantId");
    const { data, loading, error } = useCvProfileData(uuid);
    const originalDetails = data;

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

    const closeModal = () => setIsModalOpen(false);
    const [isEditMode, setIsEditMode] = useState(false);

    const openModal = () => {
        setIsEditMode(false);
        setIsModalOpen(true);
    };

    const openEditModal = (referee) => {
        setEditReferee(referee);
        setShown(true);
    };

    const closeEditModal = () => {
        setShown(false);
    };

    const navigate = useNavigate();

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

    const getFileNameFromUrl = (url) => {
        if (!url) return '';
        const parts = url.split('/');
        const filename = parts[parts.length - 1];
        return filename.length > 20 ? `${filename.substring(0, 15)}...` : filename;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/applicant/refereestore/`, dataToSend, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            if (response.status === 200) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Data has been saved successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                window.location.reload();
            }
        } catch (error) {
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
                            window.location.reload();
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
                    window.location.reload();
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

    const handleUpdate = async (id, updateData) => {
        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/applicant/updatereferee/${id}`, updateData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 200) {
                Swal.fire({
                    title: 'Success!',
                    text: 'response.data.success',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            }
            window.location.reload();
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: 'Something went wrong. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    return (originalDetails == null ? <PageLoader /> : 
        <div className="referees-section mt-4">
            <StepProgress currentStep={9} onStepClick={(step) => {
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
                    default: break;
                }
            }} />
               <div className="d-flex flex-column flex-md-row justify-content-between align-items-center p-4 bg-white shadow-sm rounded mb-4">
            {/* Left Section: Title & Description */}
            <div className="text-center text-md-start mb-3 mb-md-0">
                <h1 className="fw-bold h2 text-dark mb-1"> Referee</h1>
                <p className="text-muted mb-0">
                    Add or remove  referee here
                </p>
            </div>

            {/* Right Section: Buttons */}
            <div className="d-flex flex-column flex-md-row gap-2">
                {/* Step 5 Button */}
               <button
                        className="py-2 px-4 bg-green-500 text-white font-bold rounded-full hover:bg-green-600 transition-all w-full sm:w-auto"
                        onClick={openModal}>
                        Add Referee
                    </button>
            </div>
        </div>
 

            <div className="mb-3 divider" />

            {/* Referees List */}
            <div className="table-responsive">
                <Table hover className="info-table">
                    <tbody id="refereediv-details">
                        {originalDetails.data?.referees?.length > 0 ? (
                            originalDetails.data.referees.map((referee, index) => (
                                <tr key={index}>
                                    <td style={{ verticalAlign: 'top', width: '70px' }}>
                                        <div className="referee-avatar mt-1">
                                            <FontAwesomeIcon
                                                icon={faUserTie}
                                                className="text-primary"
                                                style={{
                                                    fontSize: '1.25rem',
                                                    border: '3px solid #28a8e4',
                                                    borderRadius: '50%',
                                                    padding: '3px',
                                                    backgroundColor: 'white',
                                                    width: '32px',
                                                    height: '32px'
                                                }}
                                            />
                                        </div>
                                    </td>
                                    <td style={{ paddingLeft: '1%' }}>
                                        <div className="d-flex justify-content-between align-items-start">
                                            <div>
                                                <h6 className="mb-1">
                                                    {[referee.first_name, referee.middle_name, referee.last_name]
                                                        .filter(Boolean)
                                                        .map(name => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase())
                                                        .join(' ')}
                                                </h6>
                                                <p className="mb-1">
                                                    {referee.referee_position &&
                                                        referee.referee_position.charAt(0).toUpperCase() +
                                                        referee.referee_position.slice(1).toLowerCase()}
                                                </p>
                                                <p className="mb-1">
                                                    {referee.employer &&
                                                        referee.employer.charAt(0).toUpperCase() +
                                                        referee.employer.slice(1).toLowerCase()}
                                                </p>
                                                <p className="mb-1 text-muted">
                                                    {referee.email}
                                                </p>
                                                <p className="mb-1">
                                                    {referee.phone}
                                                </p>
                                            </div>
                                            <div className="flex space-x-2">
                                                <Button
                                                    variant="link"
                                                    className="p-0 text-secondary"
                                                    onClick={() => openEditModal(referee)}
                                                >
                                                    <FontAwesomeIcon icon={faPencilAlt} />
                                                </Button>
                                                <Button
                                                    variant="link"
                                                    className="p-0 text-red-500"
                                                    onClick={() => handleRemove(referee?.id)}
                                                >
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </Button>
                                                <Button
                                                    variant="link"
                                                    className="p-0 text-gray-500"
                                                    onClick={() => handleHide(referee?.id)}
                                                >
                                                    <FontAwesomeIcon icon={faEyeSlash} />
                                                </Button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={2} className="text-center py-3 text-muted">
                                    No referees added
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>

        

            {/* Add Referee Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 w-96">
                        <h2 className="text-xl font-bold mb-4">Add Referee</h2>
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

            {/* Edit Referee Modal */}
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

            <style jsx>{`
                .divider {
                    height: 1px;
                    width: 100%;
                    background-color: rgb(235, 235, 235);
                }
                .referee-avatar {
                    margin-top: -10px;
                }
                .info-table tr:hover {
                    background-color: rgba(0, 0, 0, 0.02);
                }
            `}</style>
        </div>
    );
}

export default RefreesCvComponent;
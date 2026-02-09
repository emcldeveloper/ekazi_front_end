import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import PageLoader from "../../widgets/pageLoader";
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faEyeSlash, faTimes, faPlus, faPencilAlt, faDownload, faMedal } from '@fortawesome/free-solid-svg-icons';
import { useOrganization } from "../../pages/organizationContext";
import axios from "axios";
import Dropdown from "../../pages/droapdown";
import UniversalProfiency from "../../pages/universalproficiency";
import moment from "moment";
import { Button, Row, Col, Modal, Form, Card, Badge } from 'react-bootstrap';
import { useCvProfileData } from "../../hooks/Candidate/Cv";
import StepProgress from "./Stepprogress";

const Proficiencycvcomponent = () => {
    const [selectedOrganization, setSelectedOrganization] = useState('');
    const [selectedprociciency, setSelectedProciency] = useState('');
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [isShown, setIsShown] = useState(false);
    const uuid = localStorage.getItem("applicantId");
    const { data, loading, error } = useCvProfileData(uuid);
    const originalDetails = data;
    const [selectedFile, setSelectedFile] = useState(null);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        organization: '',
        attachment: null,
        ended: '',
        started: '',
        proficiency: '',
        award: ''
    });

    const [EditDatestart, setEditstart] = useState('');
    const [EditDataended, setEditended] = useState('');
    const [editOrganization, seteditOrganization] = useState('');
    const [editProficience, seteditProficience] = useState('');
    const [editaward, seteditaward] = useState('');
    const [editdata, seteditdata] = useState('');
    const [EditFile, setEditFile] = useState(null);

    const navigate = useNavigate();



    const handleOrganizationSelect = (organization) => {
        setSelectedOrganization(organization);
    };

    const handleProciencySelect = (proficency) => {
        setSelectedProciency(proficency);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const sendTOdata = {
        ...formData,
        user_id: uuid,
        proficiency: selectedprociciency,
        organization: selectedOrganization,
        attachment: selectedFile
    };

    const openModel = () => {
        setIsModelOpen(true);
    };

    const onClose = () => {
        setIsModelOpen(false);
    };

    const onCloseEditModel = () => {
        setIsShown(false);
    };

    const openEditModal = (proficiency) => {
        seteditOrganization(proficiency.organization?.organization_name || '');
        seteditProficience(proficiency.proficiency?.proficiency_name || '');
        setEditstart(proficiency.started);
        setEditended(proficiency.ended);
        seteditaward(proficiency.award || '');
        seteditdata(proficiency);
        setIsShown(true);
    };

    const handleFileEditChange = (e) => {
        setEditFile(e.target.files[0]);
    };

    const handlechangeorganization = (value) => {
        seteditOrganization(value);
    };

    const handlechangeproficiency = (value) => {
        seteditProficience(value);
    };

    const handleChangestart = (e) => {
        setEditstart(e.target.value);
    };

    const handleChangeend = (e) => {
        setEditended(e.target.value);
    };

    const handleChangeaward = (e) => {
        seteditaward(e.target.value);
    };

    const EditToData = {
        started: EditDatestart,
        ended: EditDataended,
        applicant_id: uuid,
        proficiency: editProficience,
        organization: editOrganization,
        attachment: EditFile,
        award: editaward,
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/applicant/proficiencystore', sendTOdata, {
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
            }
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: 'Something went wrong. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
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
                    const response = await axios.delete(`http://127.0.0.1:8000/api/applicant/deleteproficiency/${id}`);

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
                    const response = await axios.post(`http://127.0.0.1:8000/api/applicant/hideproficiency/${id}`);

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
            const response = await axios.post(`http://127.0.0.1:8000/api/applicant/updateproficiency/${id}`, updateData, {
                headers: {
                    'Content-Type': 'application/json',
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
            Swal.fire({
                title: 'Error!',
                text: 'Something went wrong. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    const formatYear = (dateString) => {
        if (!dateString) return 'Present';
        return moment(dateString).format('MMM YYYY');
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

    if (!originalDetails == null) {
        return <PageLoader />;
    }
    console.log('check data for proficency ', originalDetails);
    return (
        <div>
            {/* Header Section */}
            {/* Add the StepProgress component at the top */}
            <StepProgress currentStep={7} onStepClick={(step) => {
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

            {/* <div className="d-flex flex-column flex-md-row justify-content-between align-items-center p-4 bg-white shadow-sm rounded mb-4">
                     
                        <div className="text-center text-md-start mb-3 mb-md-0">
                            <h1 className="fw-bold h2 text-dark mb-1">Education</h1>
                            <p className="text-muted mb-0">
                                Add or remove experiences here
                            </p>
                        </div>
             
                        <div className="d-flex flex-column flex-md-row gap-2">
                        
                            <button className="btn btn-outline-secondary rounded-pill fw-bold px-4 py-2">
                                Step 4
                            </button>
                        </div>
                    </div> */}
            <Row  >
                <Col>
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-center p-4 bg-white shadow-sm rounded mb-4">
                        <div>
                            <h2 className="mb-1">Proficiency</h2>
                            <p className="text-muted mb-0">A List of  proficiency </p>
                        </div>
                        {/* <div>
                           
                            <Button variant="success" onClick={openModel}>
                                <FontAwesomeIcon icon={faPlus} className="me-2" />
                                Add Proficiency
                            </Button>
                        </div> */}
                    </div>
                </Col>
            </Row>

            {/* Proficiency Cards */}
            <Row>

                <Col md={12} className="mb-3">
                    <Card>
                        {originalDetails?.data?.proficiency?.map((item) => (
                            <Card.Body >

                                <div className="d-flex " key={item?.id}>
                                    <div className="me-3">
                                        <FontAwesomeIcon icon={faMedal} className="text-primary" size="2x" />
                                    </div>
                                    <div className="flex-grow-1">
                                        <div className="d-flex justify-content-between">
                                            <Card.Title className="mb-1">
                                                {item?.proficiency?.proficiency_name || "Proficiency name not available"} - {' '}
                                                <span className="text-muted">
                                                    {formatYear(item.started)} - {formatYear(item.ended)}
                                                </span>
                                            </Card.Title>
                                            <div>
                                                {/* <Button variant="link" size="sm" onClick={() => openEditModal(item)}>
                                                    <FontAwesomeIcon icon={faPencilAlt} />
                                                </Button> */}
                                                {/* <Button variant="link" size="sm" onClick={() => handleRemove(item?.id)}>
                                                    <FontAwesomeIcon icon={faTrash} className="text-danger" />
                                                </Button> */}
                                                <Button variant="link" size="sm" onClick={() => handleHide(item?.id)}>
                                                    <FontAwesomeIcon icon={faEyeSlash} className="text-muted" />
                                                </Button>
                                            </div>
                                        </div>
                                        <Card.Text className="text-uppercase">
                                            {item.award || "Award not available"} ({item?.organization?.organization_name || "Organization name not available"})
                                        </Card.Text>
                                        {item.attachment && (
                                            <a href={item.attachment} target="_blank" rel="noopener noreferrer" className="small">
                                                <FontAwesomeIcon icon={faDownload} className="me-1" />
                                                {getFileNameFromUrl(item.attachment)}
                                            </a>
                                        )}
                                    </div>
                                </div>

                            </Card.Body>
                        ))}
                    </Card>
                </Col>

            </Row>


            {/* Add Proficiency Modal */}
            <Modal show={isModelOpen} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Proficiency</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Organization / Institution <span className="text-danger">*</span></Form.Label>
                            <Dropdown onSelect={handleOrganizationSelect} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Proficiency <span className="text-danger">*</span></Form.Label>
                            <UniversalProfiency onSelect={handleProciencySelect} />
                        </Form.Group>

                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Started <span className="text-danger">*</span></Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="started"
                                        value={formData.started}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Ended <span className="text-danger">*</span></Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="ended"
                                        value={formData.ended}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className="mb-3">
                            <Form.Label>Awarded <span className="text-danger">*</span></Form.Label>
                            <Form.Control
                                type="text"
                                name="award"
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Attach Certificate <span className="text-danger">*</span></Form.Label>
                            <Form.Control
                                type="file"
                                name="attachment"
                                onChange={handleFileChange}
                                required
                            />
                        </Form.Group>

                        <div className="d-flex justify-content-end gap-2">
                            <Button variant="secondary" onClick={onClose}>
                                Close
                            </Button>
                            <Button variant="primary" type="submit">
                                Save Changes
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Edit Proficiency Modal */}
            <Modal show={isShown} onHide={onCloseEditModel}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Proficiency</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={(e) => {
                        e.preventDefault();
                        handleUpdate(editdata.id, EditToData);
                    }}>
                        <Form.Group className="mb-3">
                            <Form.Label>Organization / Institution <span className="text-danger">*</span></Form.Label>
                            <Dropdown
                                onSelect={handlechangeorganization}
                                initialValue={editOrganization}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Proficiency <span className="text-danger">*</span></Form.Label>
                            <UniversalProfiency
                                onSelect={handlechangeproficiency}
                                initialValue={editProficience}
                            />
                        </Form.Group>

                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Started <span className="text-danger">*</span></Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="started"
                                        value={moment(EditDatestart).format("YYYY-MM-DD")}
                                        onChange={handleChangestart}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Ended <span className="text-danger">*</span></Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="ended"
                                        value={moment(EditDataended).format("YYYY-MM-DD")}
                                        onChange={handleChangeend}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className="mb-3">
                            <Form.Label>Awarded <span className="text-danger">*</span></Form.Label>
                            <Form.Control
                                type="text"
                                name="award"
                                value={editaward}
                                onChange={handleChangeaward}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Attach Certificate <span className="text-danger">*</span></Form.Label>
                            <Form.Control
                                type="file"
                                name="attachment"
                                onChange={handleFileEditChange}
                            />
                        </Form.Group>

                        <div className="d-flex justify-content-end gap-2">
                            <Button variant="secondary" onClick={onCloseEditModel}>
                                Close
                            </Button>
                            <Button variant="primary" type="submit">
                                Save Changes
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
            <style jsx>{`
        .divider {
          height: 1px;
          background-color: #eaeaea;
        }
       
    
      `}</style>
        </div>

    );
};

export default Proficiencycvcomponent;
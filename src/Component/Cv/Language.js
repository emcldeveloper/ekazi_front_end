import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import PageLoader from "../../widgets/pageLoader";

import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faEyeSlash, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useOrganization } from "../../pages/organizationContext";
import axios from "axios";
import Dropdown from "../../pages/droapdown";
import UniversalProfiency from "../../pages/universalproficiency";
import Language from "../../pages/universal/language";
import ReadLanguage from "../../pages/universal/readLanguage";
import SpeakLanguage from "../../pages/universal/speakLanguage";
import WriteLanguage from "../../pages/universal/writeLanguage";
import UnderstandLanguage from "../../pages/universal/understandLanguage";
import { CvApi } from "../../Api/Jobseeker/CvApi";
import { Table } from "react-bootstrap";
import StepProgress from "./Stepprogress";

const LanguagesCvComponent = () => {

    const [selectedlanguage, setSelectedLanguage] = useState('');
    const [selectedSpeak, setSelectedSpeak] = useState('');
    const [selectedWrite, setSelectedWrite] = useState('');
    const [selectedRead, setSelectedRead] = useState('');
    const [selectedUnderstand, setSelectedUnderstand] = useState('');
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [isShown, setIsShown] = useState(false);
    const [errors, setErrors] = useState({});
    const [editlanguage, setEditLanguage] = useState('');
    const [originalDetails, setOriginalDetails] = useState(null)
    const uuid = localStorage.getItem("applicantId");


    const handleSpeakAbilitySelect = (speak) => {
        setSelectedSpeak(speak);
    }
    const handleWriteAbilitySelect = (write) => {
        setSelectedWrite(write);
    }
    const handleReadAbilitySelect = (read) => {
        setSelectedRead(read);
    }
    const handleUnderstandAbilitySelect = (understand) => {
        setSelectedUnderstand(understand);
    }

    const sendTOdata = {

        applicant_id: uuid,
        language: selectedlanguage,
        read: selectedRead,
        write: selectedWrite,
        speak: selectedSpeak,
        understand: selectedUnderstand,

    };
    const navigate = useNavigate();

    const openModel = () => {
        setIsModelOpen(true);
    }
    const onClose = () => {
        setIsModelOpen(false);

    }
    const onCloseEditModel = () => {
        setIsShown(false);
    }
    const onOpeEditModel = () => {
        setIsShown(true);
    }
    const [initialSelection, setInitialSelection] = useState(null);

    useEffect(() => {
        if (editlanguage) {
            setInitialSelection(editlanguage.language_name); // Set the initial selection correctly
        }
    }, [editlanguage]); // Only depend on `editlanguage`

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await CvApi.getCvprofile(uuid)
                if (response != null) {
                    const data = response.data
                    console.log("all data safi", data);
                    setOriginalDetails(data);

                }
            } catch (error) {

            }
        };
        fetchData();

    }, []);
    console.log("language  data is open ", originalDetails);
    //edit language
    const [editLanguageId, setEditLanguageId] = useState(''); // ID of the language to edit (example: 1)
    const [editReadId, setEditReadId] = useState(''); // ID of the language to edit (example: 1)
    const [editWriteId, setEditWriteId] = useState(''); // ID of the language to edit (example: 1)
    const [editSpeakId, setEditSpeakId] = useState(''); // ID of the language to edit (example: 1)
    const [editUnderstandId, setEditUnderstandId] = useState(''); // ID of the language to edit (example: 1)

    // Callback to handle selection
    const handleEditLanguageSelect = (selectedValue) => {

        setEditLanguageId(selectedValue); // Update parent state
    };
    const handleLanguageSelect = (selectedValue) => {
        console.log('Selected Language ID:', selectedValue);
        setSelectedLanguage(selectedValue); // Update parent state
    };
    const handleEditSpeakAbilitySelect = (speak) => {
        setEditSpeakId(speak)
    }
    const handleEditWriteAbilitySelect = (language) => {
        setEditWriteId(language);
    }
    const handleEditReadAbilitySelect = (language) => {
        setEditReadId(language);
    }
    const handleEditUnderstandAbilitySelect = (understand) => {
        setEditUnderstandId(understand)
    }

    const openEditModal = (language) => {
        setEditLanguageId(language.language.id);
        setEditReadId(language.read.id);
        setEditWriteId(language.write.id);
        setEditSpeakId(language.speak.id)
        setEditUnderstandId(language.understand.id)
        setEditLanguage(language.id)
        setIsShown(true);
    }
    const EditData = {
        language: editLanguageId,
        read: editReadId,
        write: editWriteId,
        speak: editSpeakId,
        understand: editUnderstandId,
        applicant_id: uuid,
    }
    console.log('edit information yes', EditData);

  
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

                    const response = await axios.post(`http://127.0.0.1:8000/api/applicant/hidelanguage/${id}`);

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
            console.log('update data for Lnaguage ', updateData);
            const response = await axios.post(`http://127.0.0.1:8000/api/applicant/languageupdate/${id}`, updateData,
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




    // edit languagr

    return (!originalDetails == null ? <PageLoader /> : <div>
        <StepProgress currentStep={6} onStepClick={(step) => {
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
                <h1 className="fw-bold h2 text-dark mb-1">Language</h1>
                <p className="text-muted mb-0">
                    Add or remove language here
                </p>
            </div>

            
        </div>
        {originalDetails?.data?.language?.length > 0 ? (
            <div className="table-responsive mt-4">
                <Table borderless className="mb-0">
                    <thead>
                        <tr>
                            <th className="text-black fw-bold">Language</th>
                            <th className="text-black fw-bold">Read</th>
                            <th className="text-black fw-bold">Write</th>
                            <th className="text-black fw-bold">Speak</th>
                            <th className="text-black fw-bold">Understand</th>
                            <th className="text-black fw-bold">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {originalDetails.data.language.map((item, index) => {
                            const languageName = item?.language?.language_name || "Not specified";
                            const readAbility = item?.read?.read_ability || "Not specified";
                            const writeAbility = item?.write?.write_ability || "Not specified";
                            const speakAbility = item?.speak?.speak_ability || "Not specified";
                            const understandAbility = item?.understand?.understand_ability || "Not specified";

                            return (
                                <React.Fragment key={item?.id || index}>
                                    <tr className="language-row">
                                        <td className="p-2 align-middle">{languageName}</td>
                                        <td className="p-2 align-middle">{readAbility}</td>
                                        <td className="p-2 align-middle">{writeAbility}</td>
                                        <td className="p-2 align-middle">{speakAbility}</td>
                                        <td className="p-2 align-middle">{understandAbility}</td>
                                        <td className="p-2 align-middle">
                                            <div className="d-flex gap-2 justify-content-end">
                                               
                                              
                                                <button
                                                    className="btn btn-sm btn-link text-secondary p-1"
                                                    onClick={() => handleHide(item?.id)}
                                                    title="Hide"
                                                >
                                                    <FontAwesomeIcon icon={faEyeSlash} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>

                                    {index < originalDetails.data.language.length - 1 && (
                                        <tr>
                                            <td colSpan={6} className="border-top p-0">
                                                {/* <div className="divider"></div> */}
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </tbody>
                </Table>

                {/* Style for the divider */}
                <style jsx>{`
            .divider {
                height: 1px;
                width: 100%;
                background-color: #eaeaea;
                margin: 4px 0;
            }
            .language-row:hover {
                background-color: #f8f9fa;
            }
        `}</style>
            </div>
        ) : (
            <p className="text-muted mt-4">No languages added</p>
        )}

    </div>);
}

export default LanguagesCvComponent;
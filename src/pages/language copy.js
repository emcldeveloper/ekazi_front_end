import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StepsContext } from "../layouts/mainLayout";
import PageLoader from "../widgets/pageLoader";
import { collection, doc, setDoc } from "firebase/firestore";
import { firestore } from "../utils/firebase";
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faEyeSlash, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useOrganization } from "./organizationContext";
import axios from "axios";
import Dropdown from "./droapdown" // Import your dropdown component
import UniversalProfiency from "./universalproficiency";
import Language from "./universal/language";
import ReadLanguage from "./universal/readLanguage";
import SpeakLanguage from "./universal/speakLanguage";
import WriteLanguage from "./universal/writeLanguage";
import UnderstandLanguage from "./universal/understandLanguage";








const Languages = () => {

    const [selectedlanguage, setSelectedLanguage] = useState('');
    const [selectedSpeak, setSelectedSpeak] = useState('');
    const [selectedWrite, setSelectedWrite] = useState('');
    const [selectedRead, setSelectedRead] = useState('');
    const [selectedUnderstand, setSelectedUnderstand] = useState('');
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [isShown, setIsShown] = useState(false);
    const { currentStep, setCurrentStep, originalDetails, candidate } = useContext(StepsContext)
    const { uuid, template } = useParams()
    const [errors, setErrors] = useState({});
    const [editlanguage, setEditLanguage] = useState('');
 
    const handleChange = (e) => {

        // Handle other inputs normally
        // setFormData({
        //     ...formData,
        //     [e.target.name]: e.target.value,
        // });

    };

    // const handleLanguageSelect = (language) => {
    //     setSelectedLanguage(language)
    //     console.log('received langueg', language);
    // };
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
    useEffect(() => {
        setCurrentStep(7)
    }, [])
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
    const EditData={
        language:editLanguageId,
        read:editReadId,
        write:editWriteId,
        speak:editSpeakId,
        understand:editUnderstandId,
        applicant_id:uuid,
    }
    console.log('edit information yes',EditData);

    const handleSubmit = async (e) => {

        e.preventDefault();
        console.log('send data for language purpose :', sendTOdata);
        const response = await axios.post('http://127.0.0.1:8000/api/applicant/storeLanguage', sendTOdata, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }

        );
        try {
            if (response.status === 200) {
                console.log(response.data.success);
                Swal.fire({
                    title: 'Success!',
                    text: response.data.success,
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                window.location.reload(); // Reloads the entire page
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
        {
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

                        const response = await axios.delete(`http://127.0.0.1:8000/api/applicant/languagedelete/${id}`);

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
            console.log('update data for Lnaguage ',updateData);
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

    return (originalDetails == null || candidate == null ? <PageLoader /> : <div>
      
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 p-4 bg-white shadow-md rounded-lg mt-3">
  {/* Left Section: Title & Description */}
  <div className="text-center sm:text-left">
    <h1 className="font-bold text-2xl sm:text-3xl text-gray-800">Language</h1>
    <p classame="text-base sm:text-lg text-gray-500 mt-1 sm:mt-2">
    Add or remove language here
    </p>
  </div>

  {/* Right Section: Buttons */}
  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
  <button className="py-2 px-4 bg-secondary font-bold text-secondary bg-opacity-20 rounded-full w-full sm:w-auto">
      Step 7
    </button>

    {/* Add Experience Button */}
    <button
      className="py-2 px-4 bg-green-500 text-white font-bold rounded-full hover:bg-green-600 transition-all w-full sm:w-auto"
      onClick={openModel}
    >
      Add 
    </button>
  </div>
</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
  {originalDetails?.language?.map((item) => {
    // Safely access language properties using optional chaining and provide fallback values
    const languageName = item?.language?.language_name || "Language name not available";
    const readAbility = item?.read?.read_ability || "Not specified";
    const writeAbility = item?.write?.write_ability || "Not specified";
    const speakAbility = item?.speak?.speak_ability || "Not specified";
    const understandAbility = item?.understand?.understand_ability || "Not specified";

    return (
      <div
        className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm mb-4 last:mb-0  transition-all "
        key={item?.id}
      >
        {/* Language Name */}
        <p className="text-lg font-semibold text-gray-800 mb-3">
          {languageName}
        </p>

        {/* Language Abilities */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
          {[
            { label: "Read Ability", value: readAbility },
            { label: "Write Ability", value: writeAbility },
            { label: "Speak Ability", value: speakAbility },
            { label: "Understand Ability", value: understandAbility },
          ].map((ability, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-2 bg-gray-50 rounded-lg"
            >
              <span>{ability.label}:</span>
              <span className="font-medium">{ability.value}</span>
            </div>
          ))}
        </div>

        {/* Action Icons */}
        <div className="flex justify-end space-x-4 mt-4">
          <button
            className="text-blue-500 hover:text-blue-700 p-2 rounded-full hover:bg-blue-50 transition-all"
            onClick={() => openEditModal(item)}
          >
            <FontAwesomeIcon icon={faEdit} className="text-lg" />
          </button>
          <button
            className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-all"
            onClick={() => handleRemove(item?.id)}
          >
            <FontAwesomeIcon icon={faTrash} className="text-lg" />
          </button>
          <button
            className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-50 transition-all"
            onClick={() => handleHide(item?.id)}
          >
            <FontAwesomeIcon icon={faEyeSlash} className="text-lg" />
          </button>
        </div>
      </div>
    );
  })}
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
                navigate(`/proficiency/${uuid}/${template}`)
                setCurrentStep(currentStep + 1)
              }}
              className="w-full sm:w-auto py-3 px-6 bg-primary text-white font-bold rounded-full hover:scale-105 transition-all"
            >
              Continue
            </button>
          </div>
        </div>
        {isModelOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                <div className="bg-white rounded-lg p-4 w-80">
                    <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                        <h3 className="text-lg font-semibold">Add Language</h3>
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Language <span className="text-red-500">*</span>
                            </label>
                            <Language

                                onSelect={handleLanguageSelect}
                                className="w-full"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Read Ability <span className="text-red-500">*</span>
                            </label>
                            <ReadLanguage
                                // options={readAbilities}
                                onSelect={handleReadAbilitySelect}
                                className="w-full"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Write Ability <span className="text-red-500">*</span>
                            </label>
                            <WriteLanguage
                                // options={writeAbilities}
                                onSelect={handleWriteAbilitySelect}
                                className="w-full"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Speak Ability <span className="text-red-500">*</span>
                            </label>
                            <SpeakLanguage
                                // options={speakAbilities}
                                onSelect={handleSpeakAbilitySelect}
                                className="w-full"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Understand Ability <span className="text-red-500">*</span>
                            </label>
                            <UnderstandLanguage
                                // options={understandAbilities}
                                onSelect={handleUnderstandAbilitySelect}
                                className="w-full"
                            />
                        </div>

                        <div className="flex justify-end mt-4 space-x-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Close
                            </button>
                            <button
                                type="submit"
                                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Save changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )}

        {isShown && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                <div className="bg-white rounded-lg p-4 w-80">
                    <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                        <h3 className="text-lg font-semibold">Edit Language</h3>
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                    </div>

                    <form onSubmit={(e) => {
                            e.preventDefault();
                            handleUpdate(editlanguage, EditData) }} className="space-y-4 mt-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Language <span className="text-red-500">*</span>
                            </label>
                            {/* <Language
                     
                        
                        /> */}

                            <Language
                                label="Select Language"
                                onSelect={handleEditLanguageSelect} // Callback for when a language is selected
                                initialValue={editLanguageId} // Pass the language ID to edit
                                onOptionsLoad={(options) => console.log('Loaded Options language tttr:', options)} // Optional: Handle loaded options
                            />
                        
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Read Ability <span className="text-red-500">*</span>
                            </label>
                            <ReadLanguage
                                // options={readAbilities}
                                onSelect={handleEditReadAbilitySelect}
                                className="w-full"
                                initialValue={editReadId} // Pass the language ID to edit
                                onOptionsLoad={(options) => console.log('Loaded Options read tttr:', options)} 
                            />
                          
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Write Ability <span className="text-red-500">*</span>
                            </label>
                            <WriteLanguage
                                // options={writeAbilities}
                                onSelect={handleEditWriteAbilitySelect}
                                className="w-full"
                                initialValue={editWriteId} // Pass the language ID to edit
                                onOptionsLoad={(options) => console.log('Loaded Options read tttr:', options)} 
                            />
                            
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Speak Ability <span className="text-red-500">*</span>
                            </label>
                            <SpeakLanguage
                                // options={speakAbilities}
                                onSelect={handleEditSpeakAbilitySelect}
                                className="w-full"
                                initialValue={editSpeakId} // Pass the language ID to edit
                                onOptionsLoad={(options) => console.log('Loaded Options speak tttr:', options)}
                             
                            />
                         
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Understand Ability <span className="text-red-500">*</span>
                            </label>
                            <UnderstandLanguage
                                onSelect={handleEditUnderstandAbilitySelect}
                                className="w-full"
                                initialValue={editUnderstandId} // Pass the language ID to edit
                                onOptionsLoad={(options) => console.log('Loaded Options speak tttr:', options)}
                                isClearable={false}
                            />
                           
                        </div>

                        <div className="flex justify-end mt-4 space-x-4">
                            <button
                                type="button"
                                onClick={onCloseEditModel}
                                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Close
                            </button>
                            <button
                                type="submit"
                                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Save changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )

        }
    </div>);
}

export default Languages;
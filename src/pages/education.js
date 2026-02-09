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

const Educations = () => {
    const { currentStep, setCurrentStep, originalDetails, candidate } = useContext(StepsContext)
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
    console.log('update cv ',editEducation2);
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

    const { uuid, template } = useParams()
    const navigate = useNavigate();
    useEffect(() => {
        setCurrentStep(4)
    }, [])
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
    const [editeducationlevelId,setEducationLevelId]=useState('');
    const [editCollegeName,setEditCollegeId]=useState('');
    const [editCourseName,setEditCoures]=useState('');
    const [editMajorId,setEditMajorId]=useState('');
    const openEditModal = (education) => {  
        setEducationLevelId(education.education_level_id);
        setEditCollegeId(education.college.college_name)
        setEditCoures(education.course.course_name)
        setEditMajorId(education.major.id)
        setDateEducation(education);
        setIsShown(true);
    };
    const sendUpdteData = {
        'started':editEducation2.started,
        'ended':editEducation2.ended,
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

        // Prepare the form data
        console.log('send data to server :', sendToData);

        try {

            // Submit form data without manually setting the Content-Type
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
            console.log("update education is available 00005 ",updateData);
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

    return (originalDetails == null || candidate == null ? <PageLoader /> : <div>
  
<div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 p-4 bg-white shadow-md rounded-lg mt-3">
  {/* Left Section: Title & Description */}
  <div className="text-center sm:text-left">
    <h1 className="font-bold text-2xl sm:text-3xl text-gray-800">Education</h1>
    <p className="text-base sm:text-lg text-gray-500 mt-1 sm:mt-2">
    Add or remove education here
    </p>
  </div>

  {/* Right Section: Buttons */}
  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
  <button className="py-2 px-4 bg-secondary font-bold text-secondary bg-opacity-20 rounded-full w-full sm:w-auto">
      Step 4
    </button>

    {/* Add Experience Button */}
    <button
      className="py-2 px-4 bg-green-500 text-white font-bold rounded-full hover:bg-green-600 transition-all w-full sm:w-auto"
      onClick={openModel}
    >
      Add Education
    </button>
  </div>
</div>


        <div className="grid grid-cols-2 gap-5 mt-5">
        {
  originalDetails?.education?.map((item) => {
    // Ensure 'item' and its properties are defined before accessing them
    const courseName = item?.course?.course_name || "Course name not available";
    const startedYear = item?.started ? new Date(item.started).getFullYear() : "Not specified";
    const endedYear = item?.ended ? new Date(item.ended).getFullYear() : "Not specified";
    const educationLevel = item?.level?.education_level || "Level not specified";
    const collegeName = item?.college?.college_name || "College name not specified";

    return (
<div className="p-5 bg-white border border-gray-200 rounded shadow w-full" key={item?.id}>
  {/* Education Details */}
  <p className="text-sm sm:text-base">
    <span className="font-bold">{courseName}:</span> {startedYear} - {endedYear}
  </p>
  <div className="mt-1">
    <i className="block sm:inline">{educationLevel}</i>,{" "}
    <span className="block sm:inline">{collegeName}</span>
  </div>

  {/* Responsive Icons Section */}
  <div className="flex justify-end mt-3">
    {candidate?.education?.some((e) => e.id === item.id) && (
      <div className="flex space-x-3">
        {/* Edit Icon */}
        <FontAwesomeIcon
          icon={faEdit}
          className="cursor-pointer text-blue-500 hover:text-blue-700 transition-all text-lg sm:text-xl"
          onClick={() => openEditModal(item)}
        />

        {/* Delete Icon */}
        <FontAwesomeIcon
          icon={faTrash}
          className="cursor-pointer text-red-500 hover:text-red-700 transition-all text-lg sm:text-xl"
          onClick={() => handleRemove(item.id)}
        />

        {/* Hide Icon */}
        <FontAwesomeIcon
          icon={faEyeSlash}
          className="cursor-pointer text-gray-500 hover:text-gray-700 transition-all text-lg sm:text-xl"
          onClick={() => handleHide(item.id)}
        />
      </div>
    )}
  </div>
</div>
    );
  })
}

        </div>
     
        {/*navigation  */}
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
                navigate(`/experiences/${uuid}/${template}`)
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
                            handleUpdate(editEducation2.id,sendUpdteData );
                        }}   className="education-applicant space-y-1">
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

export default Educations;
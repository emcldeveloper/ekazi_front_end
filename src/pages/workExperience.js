import { useContext, useEffect, useState } from "react";
import { StepsContext } from "../layouts/mainLayout";
import { useNavigate, useParams } from "react-router-dom";
import PageLoader from "../widgets/pageLoader";
// import { collection, doc, setDoc } from "firebase/firestore";
import { firestore } from "../utils/firebase";
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faEyeSlash, faTimes } from '@fortawesome/free-solid-svg-icons';
import Country from "./universal/country";
import Region from "./universal/region";
import Employers from "./universal/employers";
import Positions from "./universal/position";
import Industries from "./universal/industry";
import EducationLevel from "./universal/educationLevel";
import SalaryRange from "./universal/salarayRange";
import axios from "axios";
import PositionLevel from "./universal/positionLevel";
import moment from "moment";


const WorksExperiences = () => {
  const { currentStep, setCurrentStep, originalDetails, candidate } = useContext(StepsContext)
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
  const { uuid, template } = useParams()
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
  useEffect(() => {
    setCurrentStep(5)
  }, [])
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
  console.log("psoiton is inter ",selectedposition)
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
    applicant_id:uuid,

  };


  

  useEffect(() => {
    if (originalDetails) {
      const newExperiences = [];

      originalDetails.experience.forEach((item) => {
        // Check if this employer's experience is already in the newExperiences array or experiences state
        if (
          !experiences.some((e) => e.employer.id === item.employer.id) &&
          !newExperiences.some((e) => e.employer.id === item.employer.id)
        ) {
          // Group positions by employer
          const positions = originalDetails.experience.filter((ex) => ex.employer.id === item.employer.id);
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('send data  to  experince:', sendToData)
    try {
    
      const response = await axios.post(`http://127.0.0.1:8000/api/applicant/experiencestoreyy`, sendToData,
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
          text: response.data.success,
          icon: 'success',
          confirmButtonText: 'OK'
        });
      }


      // window.location.reload();

     
    } catch (error) {
      // Handle any errors that occur during the request
      console.error('There was an error submitting the form:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }

  };

  const handleDelete = (id) => {
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
          console.log("delete epxeirnce id", id);
          const response = await axios.delete(`http://127.0.0.1:8000/api/applicant/deleteexperience/${id}`);

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
  return (originalDetails == null || candidate == null ? <PageLoader />
    : <div>
<div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 p-4 bg-white shadow-md rounded-lg mt-3">
  {/* Left Section: Title & Description */}
  <div className="text-center sm:text-left">
    <h1 className="font-bold text-2xl sm:text-3xl text-gray-800">Work Experience</h1>
    <p className="text-base sm:text-lg text-gray-500 mt-1 sm:mt-2">
      Add or remove experiences here
    </p>
  </div>

  {/* Right Section: Buttons */}
  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
    {/* Step 5 Button */}
    <button className="py-2 px-4 bg-secondary font-bold text-secondary bg-opacity-20 rounded-full shadow-md">
      Step 5
    </button>

    {/* Add Experience Button */}
    <button
      className="py-2 px-4 bg-green-500 text-white font-bold rounded-full hover:bg-green-600 transition-all shadow-md"
      onClick={openModal}
    >
      Add Experience
    </button>
  </div>
</div>

      <div className="grid grid-cols-1 gap-2 mt-5">

      {
  experiences?.map((item) => {
    const employerName = item?.employer?.employer_name || "Employer name not available";
    const regionName = item?.employer?.region?.region_name || "Region not specified";
    const subLocation = item?.employer?.sub_location || "Sub-location not specified";
    
    return (
      <div className="py-3 px-5 bg-white border border-gray-200 rounded shadow w-full" key={item?.id}>
      {/* Employer Details */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <p className="font-bold text-lg">{employerName}</p>
          <span className="capitalize text-sm text-gray-600">{regionName}, {subLocation}</span>
        </div>
      </div>
    
      {/* Positions List */}
      <ul className="list-disc list-outside ml-5 mt-3 space-y-4">
        {item?.positions?.map((positionItem) => {
          const positionName = positionItem?.position?.position_name || "Position name not available";
          const employerPosition = positionItem?.employer?.employer_name || "Employer name not available";
          const startDate = positionItem?.start_date ? new Date(positionItem.start_date).getFullYear() : "Not specified";
          const endDate = positionItem?.end_date ? new Date(positionItem.end_date).getFullYear() : "Present";
    
          return (
            <li key={positionItem?.id} className="bg-gray-50 p-3 rounded-lg shadow-sm">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                {/* Position Details */}
                <div className="flex-1">
                  <p className="font-bold text-sm sm:text-base">{positionName}</p>
                  <i className="text-gray-600 text-sm">{employerPosition}</i>
                  <p className="text-xs sm:text-sm text-gray-500">{startDate} - {endDate}</p>
                </div>
    
                {/* Action Icons */}
                <div className="flex space-x-3 mt-2 sm:mt-0">
                  <button
                    className="cursor-pointer text-blue-500 hover:text-blue-700 transition-all text-sm sm:text-base"
                    onClick={() => openEditModal(item)}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    className="cursor-pointer text-red-500 hover:text-red-700 transition-all text-sm sm:text-base"
                    onClick={() => handleDelete(positionItem?.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                  <button
                    className="cursor-pointer text-gray-500 hover:text-gray-700 transition-all text-sm sm:text-base"
                    onClick={() => handleHide(positionItem?.id)}
                  >
                    <FontAwesomeIcon icon={faEyeSlash} />
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
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
                navigate(`/skills/${uuid}/${template}`)
                setCurrentStep(currentStep + 1)
              }}
              className="w-full sm:w-auto py-3 px-6 bg-primary text-white font-bold rounded-full hover:scale-105 transition-all"
            >
              Continue
            </button>
          </div>
        </div>
      {isopenModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-3"> {/* Reduced width and padding */}
            {/* Modal Header */}
            <div className="flex justify-between items-center pb-2 border-b border-gray-300">
              <h5 className="text-sm font-semibold">Add Experience</h5> {/* Reduced text size */}
              <button type="button" className="text-gray-500 hover:text-gray-700" onClick={closeModel}>&times;</button>
            </div>

            {/* Modal Body */}
            <div className="py-3"> {/* Reduced padding */}
              <form onSubmit={handleSubmit} className="space-y-2">
                <input type="hidden" name="id" id="" />

                {/* Employer Field */}

                <div className="space-y-2">
                  <div className="flex items-start">
                    <label className="w-1/4 text-xs font-medium">Employer <span className="text-red-500">*</span></label>
                    <div className="w-3/4">
                      <div className="flex space-x-1">
                        <div className="w-full">
                          <Employers
                            onSelect={handleEmployer}
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
                          value={formData.sub_location}
                          onChange={handleChange}
                        />
                      </div>


                      <div className="w-1/2">
                        <label className="text-xs font-medium">
                          Position Level<span className="text-red-500">*</span>
                        </label>

                        <PositionLevel
                          onSelect={handleLevel}
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
                          <Country onSelect={handlecountry}

                          />
                        </div>
                        {/* Region / City Input */}
                        <div className="w-1/2">
                          <label className="text-xs font-medium">Region / City <span className="text-red-500">*</span></label>
                          <Region
                            onSelect={handleregion}
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
                            onSelect={handPosition}
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
                            onSelect={handleIndustry}
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
                        <input name="started" type="date" className="form-input w-full text-xs mt-1 border-gray-300 rounded-md shadow-sm"
                          // value={formData.started}
                          value={moment(formData.started).format('YYYY-MM-DD')} 
                          onChange={handleChange}
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
                            // value={formData.ended}
                            value={moment(formData.ended).format('YYYY-MM-DD')} 
                            onChange={handleChange}

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
                      onSelect={handlestartsalry}
                    />
                    <SalaryRange
                      className="form-select w-1/2 mt-1 "
                      onSelect={handleendsalary}
                    />
                  </div>
                </div>

                {/* Responsibility Field */}
                <div className="flex items-center">
                  <label className="w-1/4 text-xs font-medium">Responsibility <span className="text-red-500">*</span></label>
                  <textarea className="form-textarea w-3/4 text-xs mt-1 border-gray-300 rounded-md shadow-sm" name="responsibility"
                    value={formData.responsibility}
                    onChange={handleChange}
                    rows="2"></textarea>
                </div>

                {/* Reason for Leaving Field */}
                <div className="flex items-center">
                  <label className="w-1/4 text-xs font-medium">Reason for Leaving <span className="text-red-500">*</span></label>
                  <textarea className="form-textarea w-3/4 text-xs mt-1 border-gray-300 rounded-md shadow-sm"
                    name="remark" rows="2"

                    onChange={handleChange}

                  >

                  </textarea>
                </div>

                {/* Modal Footer */}
                <div className="flex justify-end space-x-2 mt-2">
                  <button type="button" className="bg-gray-200 text-gray-800 text-xs py-1 px-2 rounded-md hover:bg-gray-300" onClick={closeModel}>Close</button>
                  <button type="submit" className="bg-blue-500 text-white text-xs py-1 px-2 rounded-md hover:bg-blue-600">Save changes</button>
                </div>
              </form>
            </div>
          </div>
        </div>



      )

      }
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
                           
                            initialValue={{ value: editPosition , label: editPosition  }}
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

export default WorksExperiences;
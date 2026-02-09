import { useContext, useEffect } from "react";
import { StepsContext } from "../layouts/mainLayout";
import { useNavigate, useParams } from "react-router-dom";
import PageLoader from "../widgets/pageLoader";
import { collection, doc, setDoc } from "firebase/firestore";
import { firestore } from "../utils/firebase";
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import Culture from "./culture";
import Personality from "./personalities";
import Knowledge from "./knowledge";
import Software from "./software";
import Tool from "./tool";
import axios from "axios";


const Skills = () => {
  const { currentStep, setCurrentStep, originalDetails, candidate } = useContext(StepsContext)
  const { uuid, template } = useParams()
  const [isopenModel, setOpenModel] = useState(false);
  const [isopenEditModel, setOpenEditModel] = useState(false);
  const [selectedCultures, setSelectedCultures] = useState([]);
  const [selectpersonalities, setseletedPersonality] = useState([]);
  const [selectedSkill, setSelectedSkills] = useState([])
  const [selectedSoftware, setSelectedSoftware] = useState([]);
  const [selectedTool, setSelectedTool] = useState('');
  const [formData, setFormData] = useState({
    personalities: '',
    software: '',
    culture: '',
    skill: '',
    tool: '',


  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const navigate = useNavigate();

  const openModal = () => {
    setOpenModel(true);
  }
  const CloseModel = () => {
    setOpenEditModel(false);
  }
  const openeditNodel = () => {
    setOpenEditModel(true);
    setFormData(originalDetails);
  }



  const handlecultureChange = (selectedValues) => {

    setSelectedCultures(selectedValues);
  };

  const handlepersonalitiesSelect = (selectedValues) => {

    setseletedPersonality(selectedValues);
  }
  const handleSelectSkill = (skill) => {

    setSelectedSkills(skill)
  }
  const handleselectedSoftware = (software) => {

    setSelectedSoftware(software)
  }
  const handleSelectedTool = (tool) => {

    setSelectedTool(tool)
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    const softwareData =
      selectedSoftware?.length > 0
        ? selectedSoftware
        : formData.software.map((item) => item.software.id);
    const ToolData =
      selectedTool?.length > 0
        ? selectedTool
        : formData.tools.map((item) => item.tool.id);
    const knowledgeData = selectedSkill?.length > 0
      ? selectedSkill
      : formData.knowledge.map((item) => item.knowledge.id)
    const cultureData = selectedCultures?.length > 0
      ? selectedCultures
      : formData.culture.map((item) => item.culture.id)

    const personalityData = selectpersonalities?.length > 0
      ? selectpersonalities
      : formData.applicant_personality.map((item) => item.personality.id)
    const dataToSend = {
      cultures: cultureData, // or any other data structure your API expects
      skill: knowledgeData,
      personalities: personalityData,
      tool: ToolData,
      software: softwareData,
      user_id: uuid,
    };

    try {

      const response = await axios.post(`http://127.0.0.1:8000/api/applicant/generalskills`, dataToSend,
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

  };
  const hideculture = (id) => {
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

          const response = await axios.post(`http://127.0.0.1:8000/api/applicant/hideculture/${id}`);

          if (response.status === 200) {
            Swal.fire({
              title: 'Success!',
              text: 'Data has been hidden.',
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
  const hidetool = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This action will hidde the item. Do you want to proceed? ",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, hidde it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {

          const response = await axios.post(`http://127.0.0.1:8000/api/applicant/hidetool/${id}`);

          if (response.status === 200) {
            Swal.fire({
              title: 'Success!',
              text: 'Data has been hidden.',
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
  const hidepersonality = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This action will permanently delete the item. Do you want to proceed? ",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, hide it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {

          const response = await axios.post(`http://127.0.0.1:8000/api/applicant/hidepersonality/${id}`);

          if (response.status === 200) {
            Swal.fire({
              title: 'Success!',
              text: 'Data has been hidden.',
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
  const hidesoftware = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This action will permanently delete the item. Do you want to proceed? ",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, hide it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {

          const response = await axios.post(`http://127.0.0.1:8000/api/applicant/hidesoftware/${id}`);

          if (response.status === 200) {
            Swal.fire({
              title: 'Success!',
              text: 'Data has been hidden.',
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
  const hideknowledge = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This action will permanently delete the item. Do you want to proceed? ",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, hide it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {

          const response = await axios.post(`http://127.0.0.1:8000/api/applicant/hideknowledge/${id}`);

          if (response.status === 200) {
            Swal.fire({
              title: 'Success!',
              text: 'Data has been hidden.',
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
  {/* Culture Section */ }
  const sections = [
    { title: "Culture", data: originalDetails?.culture, key: "culture", handler: hideculture },
    { title: "Tools", data: originalDetails?.tools, key: "tool", handler: hidetool },
    { title: "Personality", data: originalDetails?.applicant_personality, key: "personality", handler: hidepersonality },
    { title: "Softwares", data: originalDetails?.software, key: "software", handler: hidesoftware },
    { title: "Skills & Knowledge", data: originalDetails?.knowledge, key: "knowledge", handler: hideknowledge },
  ];



  return (originalDetails == null || candidate == null ? <PageLoader />
    : <div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 p-4 bg-white shadow-md rounded-lg mt-3">
        {/* Left Section: Title & Description */}
        <div className="text-center sm:text-left">
          <h1 className="font-bold text-2xl sm:text-3xl text-gray-800">Skills</h1>
          <p className="text-base sm:text-lg text-gray-500 mt-1 sm:mt-2">
            Add or remove skills here
          </p>
        </div>

        {/* Right Section: Buttons */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <button className="py-2 px-4 bg-secondary font-bold text-secondary bg-opacity-20 rounded-full w-full sm:w-auto">
            Step 6
          </button>

          {/* Add Experience Button */}
          <button
            className="py-2 px-4 bg-green-500 text-white font-bold rounded-full hover:bg-green-600 transition-all w-full sm:w-auto"
            onClick={openeditNodel}
          >
            Edit
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {sections.map((section) => (
          <div key={section.key}>
            <p className="mt-2 font-semibold text-lg">{section.title}</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-2">
              {section.data?.map((item) => {
                const itemName = item?.[section.key]?.[`${section.key}_name`] || `${section.title} name not available`;
                return (
                  <div
                    key={item?.id}
                    className="flex items-center justify-between space-x-2 py-2 px-3 bg-white border border-gray-200 rounded-full cursor-pointer hover:scale-105 transition-all"
                  >
                    <h1 className="text-sm">{itemName}</h1>
                    <FontAwesomeIcon
                      icon={faEyeSlash}
                      className="cursor-pointer text-gray-500 hover:text-gray-700 transition-all"
                      onClick={() => section.handler(item?.id)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        ))}
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
              navigate(`/languages/${uuid}/${template}`)
              setCurrentStep(currentStep + 1)
            }}
            className="w-full sm:w-auto py-3 px-6 bg-primary text-white font-bold rounded-full hover:scale-105 transition-all"
          >
            Continue
          </button>
        </div>
      </div>


      {isopenEditModel && (<div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50" >
        <div className="bg-white rounded-lg shadow-lg w-full max-w-sm max-h-[80vh] overflow-y-auto">
          {/* Modal Header */}
          <div className="flex justify-between items-center p-2 border-b">
            <h5 className="text-sm font-medium">Skills - No best title specified yet</h5> {/* Reduced font size */}
            <button
              type="button"
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close"
              onClick={CloseModel}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-3">
            <form onSubmit={handleSubmit} className="skill-applicant">
              {/* Culture Field */}
              <div className="mb-2">
                <label className="block text-xs font-medium text-gray-700 mb-1">Culture</label> {/* Reduced font size */}
                <Culture
                  label="Culture"
                  onChange={handleChange}
                  onSelect={handlecultureChange}
                  initialValue={formData.culture.map((item) => item.culture.id)}
                  onOptionsLoad={(options) => console.log('Loaded Options culture:', options)}
                />



              </div>

              {/* Personalities Field */}
              <div className="mb-2">
                <label className="block text-xs font-medium text-gray-700 mb-1">Personalities</label> {/* Reduced font size */}
                <Personality
                  onChange={handleChange}
                  onSelect={handlepersonalitiesSelect}
                  initialValue={formData.applicant_personality.map((item) => item.personality.id)}
                  onOptionsLoad={(options) => console.log('Loaded options personality:', options)}
                />

              </div>

              {/* Skills & Knowledge Field */}
              <div className="mb-2">
                <label className="block text-xs font-medium text-gray-700 mb-1">Skills & Knowledge</label> {/* Reduced font size */}
                <Knowledge
                  onChange={handleChange}
                  onSelect={handleSelectSkill}
                  initialValue={formData.knowledge.map((item) => item.knowledge.id)}
                  onOptionsLoad={(options) => console.log('Loaded Options knowledge:', options)}
                />

              </div>

              {/* Software Field */}
              <div className="mb-2">
                <label className="block text-xs font-medium text-gray-700 mb-1">Software</label> {/* Reduced font size */}
                <Software
                  name="software_name"
                  onChange={handleChange}
                  onSelect={handleselectedSoftware}
                  initialValue={formData.software.map((item) => item.software.id)}
                  onOptionsLoad={(options) => console.log('Loaded Options software:', options)}
                />
              </div>

              {/* Tools Field */}
              <div className="mb-2">
                <label className="block text-xs font-medium text-gray-700 mb-1">Tools</label> {/* Reduced font size */}

                <Tool
                  onChange={handleChange}
                  onSelect={handleSelectedTool}
                  initialValue={formData.tools.map((item) => item.tool.id)}
                  onOptionsLoad={(options) => console.log('Loaded Options tool:', options)}
                />
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end space-x-1 pt-1 border-t">
                <button
                  type="button"
                  className="py-1 px-2 text-xs bg-gray-200 text-gray-700 rounded-sm hover:bg-gray-300"
                  onClick={CloseModel}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="py-1 px-2 text-xs bg-indigo-500 text-white rounded-sm hover:bg-indigo-600"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>)

      }
    </div>);
}

export default Skills;
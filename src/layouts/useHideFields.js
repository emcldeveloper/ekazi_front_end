import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHideFields } from '../layouts/HideFieldsContext';
import { useEffect } from 'react';
import axios from "axios";
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faEyeSlash, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FaEyeSlash } from "react-icons/fa"; // FontAwesome icon

// Reusable Modal Component
const HideModal = ({ hideFields, onFieldChange, onApply, onCancel, onHide }) => {
  // Removed useHideFields() call here; we use the props instead.
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-lg font-bold mb-4">Select Fields to Hide un select for Un hide then click apply </h2>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={hideFields.name}
              onChange={() => onFieldChange('name')}
              className="mr-2"
            />
            Name
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={hideFields.phone}
              onChange={() => onFieldChange('phone')}
              className="mr-2"
            />
            Phone
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={hideFields.email}
              onChange={() => onFieldChange('email')}
              className="mr-2"
            />
            Email
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={hideFields.referee}
              onChange={() => onFieldChange('referee')}
              className="mr-2"
            />
            Referee
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={hideFields.picture}
              onChange={() => onFieldChange('picture')}
              className="mr-2"
            />
            profile Picture
          </label>
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          {/* <button
            onClick={onHide}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-blue-600"
          >
            Un hide
          </button> */}
          <button
            onClick={onApply}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Component that handles the modal logic
const MyComponent = ({ uuid, template }) => {
  const navigate = useNavigate();
  // Use object destructuring here
  const { hideFields, setHideFields } = useHideFields();
  const [modalOpen, setModalOpen] = useState(false);
 

  const CvToData = {
    
    
      name : hideFields.name,
      phone: hideFields.phone,
      email: hideFields.email,
      referee: hideFields.referee,
      picture: hideFields.picture,
    
  };
  const handleApply = async (e) => {
    console.log("Apply clicked - Check if name is hidden:", CvToData);
    // // Create a new object so the state used in navigate is updated immediately.
    // const newHideFields = {
    //   name: true,
    //   phone: true,
    //   email: true,
    //   referee: true,
    //   picture :true,
    // };
    // setHideFields(newHideFields);
    // setModalOpen(false);
    // navigate(`/introduction/${uuid}/${template}`, { state: { hideFields: newHideFields } });
    e.preventDefault();
   
    const response = await axios.post('http://127.0.0.1:8000/api/applicant/Hidepersoninfo', CvToData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }

    );
    try {
      console.log('send data  to hide is reach:', CvToData);
      
        if (response.status === 200) {
            console.log('data imerud ',response.data.success);
            Swal.fire({
                title: 'Success!',
                text: response.data.success,
                icon: 'success',
                confirmButtonText: 'OK'
            });
           // window.location.reload(); // Reloads the entire page
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

  useEffect(() => {
    
  }, [hideFields]);
  const handleHideClick = () => {
    setModalOpen(true);
  };

  const handleFieldChange = (field) => {
    setHideFields((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handelUnHide = () => {
    const newHideFields = {
      name: false,
      phone: false,
      email: false,
      referee: false,
      picture : false,
    };
    
    setHideFields(newHideFields);
    setModalOpen(false);
    navigate(`/${uuid}/${template}`, { state: { hideFields: newHideFields } });
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

  return (
    <div>
  

 
  
    <div
      onClick={handleHideClick}
      className="flex items-center gap-3 bg-red-100 border border-red-300 text-red-700 font-semibold px-4 py-3 rounded-xl cursor-pointer hover:bg-red-200 transition"
    >
      <FaEyeSlash className="text-red-500 text-xl" />
      <span className="text-base sm:text-lg">
      Click to hide personal information
      </span>
    </div>
  


      {modalOpen && (
        <HideModal
          hideFields={hideFields}
          onFieldChange={handleFieldChange}
          onApply={handleApply}
          onCancel={handleCancel}
          onHide={handelUnHide}
        />
      )}
    </div>
  );
};

// Wrapper component to reuse the functionality in other parts of your app
const HideInfo = ({ uuid, template }) => {
  return <MyComponent uuid={uuid} template={template} />;
};

export default HideInfo;

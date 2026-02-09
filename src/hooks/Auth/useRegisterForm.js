import { useState, useContext } from 'react';
import { UniversalContext } from '../../context/UniversalContext';
import { registerUser } from '../../Api/Auth/Auth';

const initialFormData = {
  firstname: '',
  middlename: '',
  lastname: '',
  dob: '',
  gender: '',          // ID expected
  maritalStatus: '',   // ID expected
  country: '',         // ID expected
  region_id: '',       // ID expected
  address: '',
  education_level: '', // ID expected
  course_id: '',       // can be string (new) or ID
  major: '',           // can be string (new) or ID
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
 
};

const useRegisterForm = ({ onSuccess, onError }) => {
  const [formData, setFormData] = useState(initialFormData);
  const [showCandidateForm, setShowCandidateForm] = useState(false);

  // Universal data from context
  const {
    genders = [],
    countries = [],
    regions = [],
    educationLevels = [],
    maritalStatuses = [],
    courses = [],
    majors = [],
  } = useContext(UniversalContext);

  // Map options for selects (ID as value)
  const genderOptions = genders.map(({ id, gender_name }) => ({
    value: id,
    label: gender_name,
  }));

  const maritalStatusOptions = maritalStatuses.map(({ id, marital_status }) => ({
    value: id,
    label: marital_status,
  }));

  const educationLevelOptions = educationLevels.map(({ id, education_level }) => ({
    value: id,
    label: education_level,
  }));

  const countryOptions = countries.map(({ id, name }) => ({
    value: id,
    label: name,
  }));

  // Filter regions dynamically by selected country ID
  const regionOptions = (countryId) =>
    regions
      .filter(({ country_id }) => country_id === countryId)
      .map(({ id, region_name }) => ({
        value: id,
        label: region_name,
      }));

  // Courses and majors options (using names as values for now)
  const courseOptions = courses.map(({ id, course_name }) => ({
    value: id,
    label: course_name,
  }));

  const majorOptions = majors.map(({ id, name }) => ({
    value: id,
    label: name,
  }));

  // Handle input/select changes
  const handleChange = (e, field) => {
    if (e?.target) {
      // Normal input (text, email, etc)
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    } else {
      // React-select style object or null
      if (field === 'country') {
        // Reset region if country changes
        setFormData((prev) => ({ ...prev, country: e?.value || '', region_id: '' }));
      } else {
        setFormData((prev) => ({ ...prev, [field]: e?.value || '' }));
      }
    }
  };

  // Submit registration form
  const handleCandidateRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    // Prepare payload for backend
    const payload = {
      firstname: formData.firstname,
      middlename: formData.middlename,
      lastname: formData.lastname,
      dob: formData.dob,
      gender_id: formData.gender,
      marital_status_id: formData.maritalStatus,
      country_id: formData.country,
      region_id: formData.region_id,
      address: formData.address,
      sub_location: formData.sub_location,
      postal: formData.postal,
      education_level_id: formData.education_level,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      password_confirmation: formData.confirmPassword,
    };

    // Handle course: send course_id if numeric, else course_name
    if (typeof formData.course_id === 'string' && isNaN(Number(formData.course_id))) {
      payload.course_name = formData.course_id; // new course name string
    } else {
      payload.course_id = formData.course_id; // existing course ID
    }

    // Handle major: send major_id if numeric, else major_name
    if (typeof formData.major === 'string' && isNaN(Number(formData.major))) {
      payload.major_name = formData.major; // new major name string
    } else {
      payload.major_id = formData.major; // existing major ID
    }
try {
  const result = await registerUser(payload);

  if (result && result.success) {
    alert('Candidate registered successfully! Please check your email to verify your account.');
    
    // Reset form and hide candidate form
    setFormData(initialFormData);
    setShowCandidateForm(false);

    // Optional success callback
    if (onSuccess) onSuccess(result);
  } else {
    // Handle case where API responds but registration failed
    alert(result?.message || 'Registration failed. Please try again.');
    if (onError) onError(result);
  }
} catch (error) {
  // Handle network or unexpected errors
  alert(`Registration failed: ${error.message || 'Unknown error occurred'}`);
  if (onError) onError(error);
}

  };

  return {
    formData,
    setFormData,
    showCandidateForm,
    setShowCandidateForm,
    handleChange,
    handleCandidateRegister,
    genderOptions,
    maritalStatusOptions,
    educationLevelOptions,
    countryOptions,
    regionOptions,
    courseOptions,
    majorOptions,
  };
};

export default useRegisterForm;

import { useState } from 'react';
import axios from 'axios';

const useContactForm = (onSuccess, onError) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Use REACT_APP_API_URL from environment variables
      await axios.post(`${process.env.REACT_APP_API_URL}contact`, formData);
      setFormData({ name: '', email: '', message: '' });
      onSuccess && onSuccess();
    } catch (error) {
      console.error(error);
      onError && onError(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    loading,
  };
};

export default useContactForm;
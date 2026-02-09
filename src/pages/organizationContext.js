import React, { createContext, useState, useEffect ,useContext} from 'react';
import axios from 'axios';

// Create Context
 // Create Context
export const OrganizationContext = createContext();

// Create Provider component
export const OrganizationProvider = ({ children }) => {
    const [organizations, setOrganizations] = useState([]);  
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch organizations from API
    const fetchOrganizations = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/applicant/organization'); 
        setOrganizations(response.data.organization); 
        setLoading(false);
      } catch (error) {
        console.error('Error fetching organization data:', error);
        setLoading(false);
      }
    };

    fetchOrganizations();
  }, []);
  
  return (
    <OrganizationContext.Provider value={{ organizations, loading }}> {/* Use 'organizations' */}
    {children}
  </OrganizationContext.Provider>
  );
};
export const useOrganization = () => useContext(OrganizationContext);
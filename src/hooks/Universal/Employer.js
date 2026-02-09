import { useEffect, useState } from 'react';
import { getEmployer } from '../../Api/Universal/UniversalApi';
 

const useEmployers = () => {
  const [employers, setEmployer] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getEmployer().then((res) => {
      if (mounted) {
        setEmployer(res.data);  
        setLoading(false);
      }
    });

    return () => { mounted = false; };
  }, []);
 console.log("empluer exact 2",employers)
  return {employers, loading };
};

export default useEmployers;
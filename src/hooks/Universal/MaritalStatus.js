import { useEffect, useState } from 'react';
import { getMaritalStatuses } from '../../Api/Universal/UniversalApi';

const useMalitalstatus = () => {
  const [maritalstatus, setMalitalstatus] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getMaritalStatuses().then((res) => {
      if (mounted) {
        setMalitalstatus(res.data);  
        setLoading(false);
      }
    });

    return () => { mounted = false; };
  }, []);

  return { maritalstatus, loading };
};

export default useMalitalstatus;
import { useEffect, useState } from 'react';
import { getRegions } from '../../Api/Universal/UniversalApi';

const useRegions = () => {
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getRegions().then((res) => {
      if (mounted) {
        setRegions(res.data);  
        setLoading(false);
      }
    });

    return () => { mounted = false; };
  }, []);

  return { regions, loading };
};

export default useRegions;
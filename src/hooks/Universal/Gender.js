import { useEffect, useState } from 'react';
import { getGenders } from '../../Api/Universal/UniversalApi';

const useGenders = () => {
  const [genders, setGenders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getGenders().then((res) => {
      if (mounted) {
        setGenders(res.data);  
        setLoading(false);
      }
    });

    return () => { mounted = false; };
  }, []);

  return { genders, loading };
};

export default useGenders;
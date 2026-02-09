import { useEffect, useState } from 'react';
import { getPersonality } from '../../Api/Universal/UniversalApi';

const usePersoanlity = () => {
  const [personality, setpersonality] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getPersonality().then((res) => {
      if (mounted) {
        setpersonality(res.data);  
        setLoading(false);
      }
    });

    return () => { mounted = false; };
  }, []);

  return {personality, loading };
};

export default usePersoanlity;
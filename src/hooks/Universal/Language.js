import { useEffect, useState } from 'react';
import { getLanguage } from '../../Api/Universal/UniversalApi';

const useLanguage = () => {
  const [languages, setLanguage] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getLanguage().then((res) => {
      if (mounted) {
        setLanguage(res.data);  
        setLoading(false);
      }
    });

    return () => { mounted = false; };
  }, []);

  return { languages, loading };
};


export default useLanguage;
import { useEffect, useState } from 'react';
import { getReadLanguage } from '../../Api/Universal/UniversalApi';

const useReadLanguage = () => {
  const [readlanguage, setRead] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getReadLanguage().then((res) => {
      if (mounted) {
        setRead(res.data);  
        setLoading(false);
      }
    });

    return () => { mounted = false; };
  }, []);

  return { readlanguage, loading };
};

export default useReadLanguage;
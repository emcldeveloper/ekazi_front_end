import { useEffect, useState } from 'react';
import { getWriteLanguage } from '../../Api/Universal/UniversalApi';

const useWriteLanguage = () => {
  const [writelanguage, setwrite] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getWriteLanguage().then((res) => {
      if (mounted) {
        setwrite(res.data);  
        setLoading(false);
      }
    });

    return () => { mounted = false; };
  }, []);

  return { writelanguage, loading };
};

export default useWriteLanguage;
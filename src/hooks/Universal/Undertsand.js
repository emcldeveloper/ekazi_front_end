import { useEffect, useState } from 'react';
import { getWriteLanguage } from '../../Api/Universal/UniversalApi';
import { getUnderstandLanguage } from '../../Api/Universal/UniversalApi';
 

const useUnderstandLanguage = () => {
  const [understandlanguage, setunderstand] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getUnderstandLanguage().then((res) => {
      if (mounted) {
        setunderstand(res.data);  
        setLoading(false);
      }
    });

    return () => { mounted = false; };
  }, []);

  return { understandlanguage, loading };
};

export default useUnderstandLanguage;
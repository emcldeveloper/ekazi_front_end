import { useEffect, useState } from 'react';
import { getLanguage } from '../../Api/Universal/UniversalApi';
import { getknowlege } from '../../Api/Universal/UniversalApi';

const useKnowledge = () => {
  const [knowledge, setknowledge] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getknowlege().then((res) => {
      if (mounted) {
        setknowledge(res.data);  
        setLoading(false);
      }
    });

    return () => { mounted = false; };
  }, []);

  return {knowledge, loading };
};

export default useKnowledge;
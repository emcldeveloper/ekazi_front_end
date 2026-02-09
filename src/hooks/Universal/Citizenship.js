import { useEffect, useState } from 'react';
import { getCitizenship } from '../../Api/Universal/UniversalApi';

const useCitizenship = () => {
  const [citizenship, setCitizenship] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getCitizenship().then((res) => {
      if (mounted) {
        setCitizenship(res.data);  
        setLoading(false);
      }
    });

    return () => { mounted = false; };
  }, []);

  return { citizenship, loading };
};

export default useCitizenship;
import { useEffect, useState } from 'react';
import { getRegions } from '../../Api/Universal/UniversalApi';
import { getMajor } from '../../Api/Universal/UniversalApi';

const useMajor = () => {
  const [major, setMajor] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getMajor().then((res) => {
      if (mounted) {
        setMajor(res.data);  
        setLoading(false);
      }
    });

    return () => { mounted = false; };
  }, []);

  return { major, loading };
};

export default useMajor;
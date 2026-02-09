import { useEffect, useState } from 'react';
import { getRegions } from '../../Api/Universal/UniversalApi';
import { getTraining } from '../../Api/Universal/UniversalApi';

const useTraining = () => {
  const [training, setTraining] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getTraining().then((res) => {
      if (mounted) {
        setTraining(res.data);  
        setLoading(false);
      }
    });

    return () => { mounted = false; };
  }, []);

  return { training, loading };
};

export default useTraining;
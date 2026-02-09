import { useEffect, useState } from 'react';
import { getPositionLevel } from '../../Api/Universal/UniversalApi';

const usePositionLevel = () => {
  const [positionlevel, setPositionLevel] = useState([]);
  const [loading, setLoadingPositionlevel] = useState(true);

  useEffect(() => {
    let mounted = true;
    getPositionLevel().then((res) => {
      if (mounted) {
        setPositionLevel(res.data);  
        setLoadingPositionlevel(false);
      }
    });

    return () => { mounted = false; };
  }, []);

  return { positionlevel, loading};
};

export default usePositionLevel;
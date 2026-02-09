import { useEffect, useState } from 'react';
import { getEmployer } from '../../Api/Universal/UniversalApi';
import { getPosition } from '../../Api/Universal/UniversalApi';
 

const usePosition = () => {
  const [positions, setPosition] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getPosition().then((res) => {
      if (mounted) {
        setPosition(res.data);  
        setLoading(false);
      }
    });

    return () => { mounted = false; };
  }, []);
 
  return {positions, loading };
};

export default usePosition
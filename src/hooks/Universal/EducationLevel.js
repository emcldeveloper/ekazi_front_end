import { useEffect, useState } from 'react'
import { getEducationLevel } from '../../Api/Universal/UniversalApi';

const useEducationLevel = () => {
  const [educationLevel, setEducationLevel] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getEducationLevel().then((res) => {
      if (mounted) {
       
        setEducationLevel(res);  
        setLoading(false);
      }
    });

    return () => { mounted = false; };
  }, []);
 console.log("level",educationLevel);
  return { educationLevel, loading };
};

export default useEducationLevel;
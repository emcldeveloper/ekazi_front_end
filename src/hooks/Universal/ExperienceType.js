import { useEffect, useState } from 'react';
import { getExperienceType } from '../../Api/Universal/UniversalApi';

const useExperienceType = () => {
  const [experincetype, setexperiencetype] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log("check experinece type  Tanzania",experincetype);

  useEffect(() => {
    let mounted = true;
    getExperienceType().then((res) => {
      if (mounted) {
        setexperiencetype(res.data);  
        setLoading(false);
      }
    });

    return () => { mounted = false; };
  }, []);
 
  return {experincetype, loading };
};

export default useExperienceType;
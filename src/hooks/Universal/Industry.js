import { useEffect, useState } from 'react';
import { getSoftware } from '../../Api/Universal/UniversalApi';
import { getIndustry } from '../../Api/Universal/UniversalApi';

const useIndustry= () => {
  const [industry, setindustry] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getIndustry().then((res) => {
      if (mounted) {
        setindustry(res.data);  
        setLoading(false);
      }
    });

    return () => { mounted = false; };
  }, []);
  console.log("industry data",industry);
  return {industry, loading };
};

export default useIndustry
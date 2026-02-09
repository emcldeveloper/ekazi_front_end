import { useEffect, useState } from 'react';
import { getCulture } from '../../Api/Universal/UniversalApi';

const useCulture = () => {
  const [culture, setCulture] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getCulture().then((res) => {
      if (mounted) {
        setCulture(res.data);  
        setLoading(false);
      }
    });

    return () => { mounted = false; };
  }, []);
  console.log("check culture yap",culture);
  return {culture, loading };
};

export default useCulture;
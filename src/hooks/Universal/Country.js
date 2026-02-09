import { useEffect, useState } from 'react';
import { getCountries } from '../../Api/Universal/UniversalApi';

const UsegetCountries = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getCountries().then((res) => {
      if (mounted) {
        setCountries(res.data);  
        setLoading(false);
      }
    });

    return () => { mounted = false; };
  }, []);

  return { countries, loading };
};

export default UsegetCountries;
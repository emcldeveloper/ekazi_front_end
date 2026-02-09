import { useEffect, useState } from 'react';
import { getCountries } from '../../Api/Universal/UniversalApi';
import { getProficiency } from '../../Api/Universal/UniversalApi';

const UsegetProficiency = () => {
  const [proficiency, setProficiency] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getProficiency().then((res) => {
      if (mounted) {
        setProficiency(res.data);  
        setLoading(false);
      }
    });

    return () => { mounted = false; };
  }, []);

  return {proficiency, loading };
};

export default UsegetProficiency;
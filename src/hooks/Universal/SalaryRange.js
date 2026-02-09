import { useEffect, useState } from 'react';
import { getSalaryRange } from '../../Api/Universal/UniversalApi';

const useSalaryRange = () => {
  const [salaryrange, setSalaryRange] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getSalaryRange().then((res) => {
      if (mounted) {
        setSalaryRange(res.data);  
        setLoading(false);
      }
    });

    return () => { mounted = false; };
  }, []);

  return { salaryrange, loading };
};


export default useSalaryRange;
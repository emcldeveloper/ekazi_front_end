import { useEffect, useState } from 'react';
import { getRegions } from '../../Api/Universal/UniversalApi';
import { getCourse } from '../../Api/Universal/UniversalApi';

const useCourse = () => {
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getCourse().then((res) => {
      if (mounted) {
        setCourse(res.data);  
        setLoading(false);
      }
    });

    return () => { mounted = false; };
  }, []);

  return { course, loading };
};

export default useCourse
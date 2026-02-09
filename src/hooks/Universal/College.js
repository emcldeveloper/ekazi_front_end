import { useEffect, useState } from 'react';
 
import { getCollege } from '../../Api/Universal/UniversalApi';

const useCollege = () => {
  const [college, setCollege] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchCollege = async () => {
      try {
        setLoading(true);
        const res = await getCollege({ signal: controller.signal });
        console.log("collecy yes I'm");
        setCollege(res.data || []);
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Error fetching organization:', err);
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCollege();

    // Cleanup: cancel the request if component unmounts
    return () => controller.abort();
  }, []);

  return { college, loading, error };
};

export default useCollege;

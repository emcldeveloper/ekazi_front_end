import { useEffect, useState } from 'react';
import { getSoftware } from '../../Api/Universal/UniversalApi';

const useSoftware = () => {
  const [software, setSoftware] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchSoftware = async () => {
      try {
        setLoading(true);
        const res = await getSoftware({ signal: controller.signal });
        setSoftware(res.data || []);
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Error fetching software:', err);
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSoftware();

    // Cleanup: cancel request on unmount
    return () => controller.abort();
  }, []);

  return { software, loading, error };
};

export default useSoftware;

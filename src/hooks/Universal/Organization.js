import { useEffect, useState } from 'react';
import { getOrganization } from '../../Api/Universal/UniversalApi';

const useOrganization = () => {
  const [organization, setOrganization] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchOrganization = async () => {
      try {
        setLoading(true);
        const res = await getOrganization({ signal: controller.signal });
        setOrganization(res.data || []);
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Error fetching organization:', err);
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrganization();

    // Cleanup: cancel the request if component unmounts
    return () => controller.abort();
  }, []);

  return { organization, loading, error };
};

export default useOrganization;

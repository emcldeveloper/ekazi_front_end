import { useEffect, useState } from 'react';
import { getTool } from '../../Api/Universal/UniversalApi';

const useTool = () => {
  const [tool, settool] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getTool().then((res) => {
      if (mounted) {
        settool(res.data);  
        setLoading(false);
      }
    });

    return () => { mounted = false; };
  }, []);

  return {tool, loading };
};

export default useTool
import { useEffect, useState } from 'react';
import { getSpeakLanguage } from '../../Api/Universal/UniversalApi';

const useSpeakLanguage = () => {
  const [speaklanguage, setSpeak] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getSpeakLanguage().then((res) => {
      if (mounted) {
        setSpeak(res.data);  
        setLoading(false);
      }
    });

    return () => { mounted = false; };
  }, []);

  return { speaklanguage, loading };
};

export default useSpeakLanguage;
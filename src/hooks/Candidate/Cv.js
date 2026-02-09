import { useState, useEffect } from 'react';
import { CvApi } from '../../Api/Jobseeker/CvApi';

export const useCvProfileData = (uuid) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errors, setError] = useState(null);

    useEffect(() => {
        const fetchCV = async () => {
            try {
                const response = await  CvApi.getCvprofile(uuid)
                setData(response.data);
                console.log("backend api soon ",response.data);
                setError(null);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCV();
    }, [uuid]); // Re-run when UUID changes

    return { data, loading, errors };
};
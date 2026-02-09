import { useState, useEffect } from 'react';
import { profile } from '../../Api/Jobseeker/JobSeekerProfileApi';

export const useProfileData = (uuid) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errors, setError] = useState(null);

    useEffect(() => {
        const fetchCV = async () => {
            try {
                const response = await profile({ uuid });
                setData(response);
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
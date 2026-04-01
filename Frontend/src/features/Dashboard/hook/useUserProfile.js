import react, { useState, useEffect } from 'react'
import { fetchUserProfile } from '../api/fetchUserProfile';

const useUserProfile = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    const getUserProfile = async () => {
        try {
            const response = await fetchUserProfile();
            setUserProfile(response.data.user);
            console.log("User Profile data = ", response.data.user)
        } catch (error) {
            console.error('Error fetching user profile:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getUserProfile();
    }, [])

    return { userProfile, loading, refetch: getUserProfile };
}

export { useUserProfile }
import API from "../../../api/axiosInstance";
import getUserIdFromToken from '../../../api/getUserIdFromToken'

export const fetchUserProfile = (req) => {
    return API.get(`/auth/profile/${getUserIdFromToken()}`);
};

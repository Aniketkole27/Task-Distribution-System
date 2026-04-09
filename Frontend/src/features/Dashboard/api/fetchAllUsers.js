import API from "../../../api/axiosInstance";

export const fetchAllUsers = () => {
    return API.get('/api/auth/users/')
}
import API from "../../../api/axiosInstance";
import { jwtDecode } from "jwt-decode";

const getJwtTokenFromCookie = () => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; token=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
}

const getUserFromToken = () => {
    const token = jwtDecode(getJwtTokenFromCookie());
    if (!token) return null;
    console.log(token)
    return token.sub;
}

export const fetchUserProfile = async (req) => {
    return API.get(`/auth/profile/${getUserFromToken()}`);
};

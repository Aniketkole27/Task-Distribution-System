import { jwtDecode } from "jwt-decode";

const getJwtTokenFromCookie = () => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; token=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
}

const getUserIdFromToken = () => {
    const token = jwtDecode(getJwtTokenFromCookie());
    if (!token) return null;
    // console.log(token)
    return token.sub;
}

export default getUserIdFromToken
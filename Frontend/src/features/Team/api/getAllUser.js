import API from "../../../api/axiosInstance"

export const getAllUser = () => {
    return API.get("/auth/users/")
}
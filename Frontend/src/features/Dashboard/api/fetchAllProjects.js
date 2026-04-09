import API from "../../../api/axiosInstance";

export const fetchAllProjects =  () =>{
    return API.get('api/project/')
}

import API from "../../../api/axiosInstance";

export const createProject = (projectData) => {
    return API.post('api/project/create', projectData);
}

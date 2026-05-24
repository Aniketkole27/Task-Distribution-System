import API from "../../../api/axiosInstance";

export const updateProject = (id, projectData) => {
    return API.put(`api/project/update/${id}`, projectData);
}

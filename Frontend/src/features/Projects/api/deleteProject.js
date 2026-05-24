import API from "../../../api/axiosInstance";

export const deleteProject = (id) => {
    return API.delete(`api/project/delete/${id}`);
}

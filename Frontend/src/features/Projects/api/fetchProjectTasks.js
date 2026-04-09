import API from '../../../api/axiosInstance'

export const fetchProjectTasks = (id) => {
    return API.get(`/api/project/tasks/${id}`)
}
import API from "./axiosInstance";

export const fetchTodos = async () => {
        return API.get('/todos/');
};
